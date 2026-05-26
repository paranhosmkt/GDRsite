export default function handler(req: any, res: any) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const currentHost = req.headers.host ? `https://${req.headers.host}` : '';
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const redirectUriBase = currentHost || vercelUrl;

  if (!clientId) {
    res.status(500).send('Erro: A variável GITHUB_CLIENT_ID não está configurada nas variáveis de ambiente do Vercel.');
    return;
  }

  // Redirect to GitHub's OAuth login screen
  const redirectUri = redirectUriBase ? `${redirectUriBase}/api/callback` : undefined;
  let githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&state=github`;
  
  if (redirectUri) {
    githubUrl += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  res.writeHead(302, { Location: githubUrl });
  res.end();
}
