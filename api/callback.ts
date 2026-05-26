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
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <h2>Autenticação Bem-Sucedida!</h2>
        <p>Conectando ao painel do Decap CMS, por favor aguarde...</p>
        <div class="spinner"></div>
        <script>
          // Post message to opener with '*' to support cross-origin previews and Vercel domains
          const tokenData = {
            token: "${token}",
            provider: "github"
          };
          
          window.opener.postMessage(
            "authorization:github:success:" + JSON.stringify(tokenData),
            "*"
          );
          
          setTimeout(() => {
            window.close();
          }, 1500);
        </script>
      </body>
      </html>
    `);
  } catch (error: any) {
    res.status(500).send(`Erro ao conectar ao GitHub OAuth: ${error.message}`);
  }
}
