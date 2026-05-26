# Guia de Configuração e Uso: Decap CMS 🚀

O seu site foi integrado com o **Decap CMS** (antigo Netlify CMS). Trata-se de um sistema gerenciador de conteúdo Open Source, **100% gratuito**, que armazena os arquivos de dados diretamente no repositório de forma estática (em arquivos `.json`).

Isso significa que você tem o **melhor desempenho do mundo (HTML estático e de carregamento instantâneo)**, sem limites de tráfego, sem depender de banco de dados ou APIs pagas.

---

## 📂 Como o Sistema Funciona?

1. **Localização do Painel Administrador:** O painel fica disponível em `/admin/` (ex: `https://gdr-advogados.vercel.app/admin/`).
2. **Localização dos Dados:** As informações preenchidas pelo editor são salvas nesta pasta do repositório:
   - `/public/admin/data/` (arquivos `.json` de fácil leitura).
3. **Imagens Carregadas:** Ficam salvas em `/public/uploads/` e são servidas de forma nativa e rápida.
4. **Resiliência Máxima:** O código do site tenta carregar os arquivos locais do Decap CMS primeiro. Se por acaso você deletar um arquivo ou houver erro, ele faz o fallback para o Sanity ou para os dados offline integrados. **O site nunca cai!**

---

## 🛠️ Como colocar o Painel no ar para Editar?

O painel necessita de um serviço que conecte o navegador diretamente ao seu Git para commitar as alterações de textos e fotos. Você tem as seguintes opções:

### Opção A: Hospedar pelo Netlify (Recomendado — Configuração em 2 minutos)
Se você hospedar o projeto no **Netlify**, o login com e-mail/senha funciona automaticamente:

1. Suba o projeto para o Netlify.
2. No painel do Netlify, vá em **Site Configuration** > **Identity** e clique em **Enable Identity**.
3. Na mesma aba, role para baixo até **Services** > **Git Gateway** e selecione **Enable**.
4. Acesse `seu-site.netlify.app/admin/`, cadastre-se, confirme o e-mail que receber e comece a editar!

---

### Opção B: Hospedar pela Vercel (Autenticação Gratuita e Integrada com GitHub)
Como o Netlify Identity tem limites de tráfego e créditos, nós configuramos um **serviço de autenticação próprio e 100% gratuito** instalado diretamente dentro do seu projeto na Vercel!

Para ativá-lo, siga estes passos simples:

#### Passo 1: Criar um aplicativo OAuth no GitHub
1. Acesse o seu GitHub, clique na sua foto de perfil no canto superior direito e vá em **Settings** (Configurações).
2. Na barra lateral esquerda, clique em **Developer Settings** (embaixo de tudo).
3. Selecione **OAuth Apps** e clique em **New OAuth App** (ou Register a new application).
4. Preencha os campos exatamente assim:
   - **Application Name**: GDR Advogados CMS
   - **Homepage URL**: `https://seu-site.vercel.app` (substitua pela URL definitiva que você usa na Vercel)
   - **Authorization callback URL**: `https://seu-site.vercel.app/api/callback` (precisa terminar com `/api/callback`)
5. Clique em **Register application**.
6. Guarde o **Client ID** gerado.
7. Clique em **Generate a new client secret** e copie o código secreto gerado imediatamente (ele só aparece uma vez!).

#### Passo 2: Cadastrar as variáveis no painel da Vercel
1. Abra o painel do seu projeto na **Vercel**.
2. Vá na aba **Settings** > **Environment Variables** (Variáveis de Ambiente).
3. Adicione duas novas variáveis:
   - Nome: `GITHUB_CLIENT_ID` | Valor: *(cole o Client ID do Passo 1)*
   - Nome: `GITHUB_CLIENT_SECRET` | Valor: *(cole o Client Secret do Passo 1)*
4. Salve e faça um novo deploy (ou re-deploy) na Vercel para que as mudanças façam efeito!

#### Passo 3: Configurar o repositório no arquivo config.yml
No arquivo `/public/admin/config.yml` do seu código, edite estas linhas do `backend:` para apontar para o seu repositório oficial:
```yaml
backend:
  name: github
  repo: seu-usuario-github/seu-repositorio-gdr  # Exemplo: paranhosmkt/gdr-advogados
  branch: main
  base_url: https://seu-site.vercel.app         # URL do seu site na Vercel (sem barra no final)
  auth_endpoint: api/auth
```

---

## 📝 O que eu consigo editar no Painel?

Criamos formulários e coleções organizadas para abranger todos os módulos do escritório:

* **Slogans e Textos Gerais**: Altere o título de destaque principal (Hero) da capa.
* **Logotipos e Selos**: Substitua a imagem da logo do cabeçalho, da logo do rodapé e a lista dos selos institucionais.
* **Membros da Equipe**: Cadastre novos advogados, insira fotos profissionais (`/public/uploads/`), biografias, e-mails e organize-os em corporativo, consultivo ou administrativo.
* **Áreas de Atuação**: Altere o título, a descrição curta (visível no card) e detalhada (visível no modal) das 14 especialidades de advocacia.
* **Casos de Sucesso**: Modifique os títulos e os itens de destaques das soluções do Portfólio.
* **Depoimentos de Clientes**: Altere os depoimentos e escolha se deseja mostrá-los com o nome real ou em modo anônimo.
* **E-books e Blog**: Cadastre novos artigos, e-books e divulgue as notícias oficiais da banca Gouvêa dos Reis.
