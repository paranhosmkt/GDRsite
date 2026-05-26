export default async function handler(req: any, res: any) {
  const code = req.query.code;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    res.status(400).send('Erro: O parâmetro "code" de autorização está faltando.');
    return;
  }

  if (!clientId || !clientSecret) {
    res.status(500).send('Erro: GITHUB_CLIENT_ID ou GITHUB_CLIENT_SECRET não configurados no Vercel.');
    return;
  }

  try {
    // Exchange the temporary auth code for a permanent access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await tokenResponse.json() as { error?: string; error_description?: string; access_token?: string };

    if (data.error) {
      res.status(400).send(`Erro do GitHub OAuth: ${data.error_description || data.error}`);
      return;
    }

    const token = data.access_token;

    // Render HTML page that communicates the token back to Decap CMS through postMessage
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Autenticação Concluída — GDR Advogados</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f9f9fb;
            color: #1e1e2f;
          }
          .spinner {
            border: 4px solid rgba(0,0,0,0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          .error-box {
            display: none;
            background: #fff0f0;
            border: 1px solid #ffc0c0;
            color: #bd2c00;
            padding: 15px;
            border-radius: 6px;
            margin: 20px auto;
            max-width: 500px;
            text-align: left;
            font-size: 14px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <h2>Autenticação Bem-Sucedida!</h2>
        <p>Conectando ao painel do Decap CMS, por favor aguarde...</p>
        <div class="spinner" id="spinner"></div>

        <div id="error-box" class="error-box">
          <strong>Aviso Importante:</strong><br>
          Seu navegador impediu a comunicação automática entre a janela de login e o painel de administração (window.opener não disponível). <br><br>
          Isso geralmente acontece por restrições de segurança ou privacidade no navegador (como navegação anônima, Brave, Safari, ou extensões bloqueadoras).
        </div>

        <script>
          const tokenData = {
            token: "${token}",
            provider: "github"
          };

          const userObj = {
            backendName: "github",
            token: "${token}",
            useLocalRepository: false
          };
          const userStr = JSON.stringify(userObj);

          // 1. Write immediately to our local web origin storage (shared since same domain)
          try {
            localStorage.setItem("decap-cms-user", userStr);
            localStorage.setItem("netlify-cms-user", userStr);
            console.log("Token gravado no localStorage local com sucesso!");
          } catch (e) {
            console.error("Falha ao gravar no localStorage local:", e);
          }

          // 2. Try to write directly to parent (opener) local storage
          if (window.opener) {
            try {
              window.opener.localStorage.setItem("decap-cms-user", userStr);
              window.opener.localStorage.setItem("netlify-cms-user", userStr);
              console.log("Token gravado no localStorage do opener!");
            } catch (e) {
              console.error("Falha ao gravar no localStorage do opener:", e);
            }
          }

          const message = "authorization:github:success:" + JSON.stringify(tokenData);
          let sentSuccessfully = false;

          function sendToken() {
            // Try to post message to the opener window
            if (window.opener) {
              try {
                window.opener.postMessage(message, "*");
                console.log("Mensagem enviada com sucesso para window.opener!");
                sentSuccessfully = true;
              } catch (err) {
                console.error("Erro ao enviar postMessage para window.opener:", err);
              }
            } else {
              console.warn("window.opener não está disponível.");
            }

            // Fallback: Also try window.parent if nested (e.g. inside an iframe proxy)
            if (window.parent && window.parent !== window) {
              try {
                window.parent.postMessage(message, "*");
                console.log("Mensagem enviada com sucesso para window.parent!");
                sentSuccessfully = true;
              } catch (err) {
                console.error("Erro ao enviar postMessage para window.parent:", err);
              }
            }
          }

          // Send message immediately
          sendToken();

          // And repeat it a few times to ensure the listener on the other side is fully active/ready
          let attempts = 0;
          const intervalId = setInterval(() => {
            attempts++;
            sendToken();
            if (attempts >= 5 || sentSuccessfully) {
              clearInterval(intervalId);

              // Close the authentication window automatically in 1 second
              console.log("Fechando a janela de autenticação de forma automática...");
              setTimeout(() => {
                window.close();
              }, 1000);
            }
          }, 200);
        </script>
      </body>
      </html>
    `);
  } catch (error: any) {
    res.status(500).send(`Erro ao conectar ao GitHub OAuth: ${error.message}`);
  }
}
