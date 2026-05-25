# Guia de Configuração do Sanity Studio & Publicação na Vercel

Este projeto foi totalmente adaptado para suportar **edição em tempo real através do Sanity CMS** e **deploy imediato na Vercel**. Abaixo, detalhamos como estruturar seu Sanity Studio perfeitamente e quais variáveis configurar na Vercel.

---

## 1. Variáveis de Ambiente na Vercel

No painel de controle da sua aplicação na **Vercel** (`Settings > Environment Variables`), adicione as seguintes variáveis:

| Nome da Variável | Valor Padrão / Exemplo | Descrição |
| :--- | :--- | :--- |
| `VITE_SANITY_PROJECT_ID` | `xkc900rm` | O ID do seu projeto Sanity. |
| `VITE_SANITY_DATASET` | `production` | O dataset ativo no Sanity. |

---

## 2. Esquemas de Conteúdo (Schemas) no Sanity

Para permitir que todos os conteúdos editados no Sanity alimentem o site instantaneamente, defina os esquemas abaixo no seu projeto **Sanity** (`/schemas` ou custom types):

### A. Portfólios de Representação (`portfolioCase`)
*Para editar o conteúdo do Portfólio Institucional em tempo real.*

```javascript
export default {
  name: 'portfolioCase',
  title: 'Casos do Portfólio',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Caso',
      type: 'string',
      description: 'Ex: Sistema de Pagamento Variável, Reforma Tributária, NR-1, LGPD, etc.'
    },
    {
      name: 'representativeness',
      title: 'Foco Operacional / Representatividade',
      type: 'string',
      description: 'Breve subtítulo que resume o foco. Ex: Incentivos corporativos de alta produtividade.'
    },
    {
      name: 'description',
      title: 'Descrição Detalhada',
      type: 'text',
      description: 'Parágrafo explicativo com os detalhes técnicos e operacionais de vanguarda.'
    },
    {
      name: 'highlights',
      title: 'Atividades e Medidas Práticas (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Adicione as principais tags de atuação técnica para este caso.'
    }
  ]
}
```

### B. Materiais & Blog (`material`)
*Para gerenciar os artigos, e-books, vídeos e notícias com imagens customizadas.*

```javascript
export default {
  name: 'material',
  title: 'Materiais Educativos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Material',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Slug da Categoria',
      type: 'string',
      description: 'Deve ser um destes: artigos, ebooks, noticias, palestras, publicacoes, videos'
    },
    {
      name: 'categoryLabel',
      title: 'Rótulo da Categoria',
      type: 'string',
      description: 'Ex: E-book, Artigo Técnico, Vídeo Exclusivo'
    },
    {
      name: 'description',
      title: 'Descrição / Resumo',
      type: 'text'
    },
    {
      name: 'badge',
      title: 'Texto do Botão / Badge',
      type: 'string',
      description: 'Ex: Baixar PDF gratuito, Ler Artigo Inteiro'
    },
    {
      name: 'date',
      title: 'Data de Publicação',
      type: 'string',
      description: 'Ex: Maio de 2026'
    },
    {
      name: 'author',
      title: 'Autor ou Responsável',
      type: 'string'
    },
    {
      name: 'readTimeOrDuration',
      title: 'Tempo de Leitura ou Páginas',
      type: 'string',
      description: 'Ex: 42 páginas, 10 min de leitura'
    },
    {
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true // Permite recortes inteligentes no Sanity
      },
      description: 'Faça o upload da imagem real para este material.'
    }
  ]
}
```

### C. Áreas de Atuação (`practiceArea`)
*Para personalizar as esferas de atendimento do escritório.*

```javascript
export default {
  name: 'practiceArea',
  title: 'Áreas de Atuação',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Área',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'description',
      title: 'Descrição de Capa',
      type: 'text'
    },
    {
      name: 'extendedDescription',
      title: 'Descrição Expandida (Modal)',
      type: 'text'
    },
    {
      name: 'howWeAct',
      title: 'Como Atuamos (Passo a passo)',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}
```

### D. Membros da Equipe (`teamMember`)
*Permite adicionar, editar e remover profissionais do Corpo Jurídico, Conserto, Fundador ou Equipe Administrativa.*

```javascript
export default {
  name: 'teamMember',
  title: 'Membros da Equipe',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome Completo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Cargo / Função',
      type: 'string',
      description: 'Ex: Sócio-Diretor • OAB/SC 11.234 ou Secretária Executiva',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoria do Profissional',
      type: 'string',
      description: 'Deve ser preenchido exatamente com um destes termos: juridico, conselho, founder, administrativo',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'E-mail Corporativo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'phone',
      title: 'Telefone Corporativo (Opcional)',
      type: 'string'
    },
    {
      name: 'area',
      title: 'Área de Atuação ou Foco administrativo',
      type: 'string',
      description: 'Ex: Planejamento Sucessório, Holding Familiar e Negócios Imobiliários',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biografia Completa (Modal)',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'credentials',
      title: 'Lista de Credenciais / Titularidades (Opcional)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Adicione títulos acadêmicos ou certificações profissionais'
    },
    {
      name: 'isHonorary',
      title: 'É Membro de Honra (Ex: Sócio In Memoriam)',
      type: 'boolean',
      description: 'Marcar como Ativo se for para ocupar a seção principal de Legado Histórico'
    },
    {
      name: 'image',
      title: 'Foto Profissional',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Faça upload da imagem oficial do membro da equipe'
    }
  ]
}
```

### E. Textos Gerais e Slidings/Headlines (`pageText`)
*Permite alterar slogans, subtítulos e títulos dinâmicos da página diretamente sem programação.*

```javascript
export default {
  name: 'pageText',
  title: 'Textos da Página',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Chave do Texto',
      type: 'string',
      description: 'Use "hero_title" para gerenciar o título principal na seção de abertura do site.',
      validation: Rule => Rule.required()
    },
    {
      name: 'textValue',
      title: 'Conteúdo / Texto',
      type: 'text',
      description: 'O texto que substituirá o original. Ex: Segurança para avançar. Clareza para decidir. Parceria para crescer.',
      validation: Rule => Rule.required()
    }
  ]
}
```

### F. Arquivos de Mídia e Logotipos (`pageAsset`)
*Gerenciamento dinâmico da imagem da logo do cabeçalho, da logo do rodapé e dos selos/chancelas institucionais.*

```javascript
export default {
  name: 'pageAsset',
  title: 'Arquivos de Mídia do Site',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de Controle',
      type: 'string',
      description: 'Sugestão: "Recursos Globais do Site"'
    },
    {
      name: 'headerLogo',
      title: 'Imagem da Logo (Cabeçalho)',
      type: 'image',
      options: { hotspot: true },
      description: 'Substitui a área do placeholder da logo no cabeçalho.'
    },
    {
      name: 'footerLogo',
      title: 'Imagem da Logo (Rodapé)',
      type: 'image',
      options: { hotspot: true },
      description: 'Substitui a área do placeholder da logo no rodapé.'
    },
    {
      name: 'seals',
      title: 'Selas e Chancelas institucionais (Até 9 itens)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sealItem',
          title: 'Item de Selo',
          fields: [
            {
              name: 'image',
              title: 'Imagem do Selo',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Nome do Selo',
              type: 'string',
              description: 'Ex: OAB Compliant ou ISO 9001'
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 3. Guia Passo a Passo: Como criar e conectar o seu projeto no Sanity?

Caso você queira criar o seu próprio banco de dados Sanity no site para começar a cadastrar e remover equipe/textos, siga estas etapas simples:

### Etapa 1: Criar sua conta e projeto no painel do Sanity
1. Acesse **[sanity.io](https://www.sanity.io/)** e crie uma conta (pode usar sua conta do GitHub ou Google).
2. Na página inicial do seu Dashboard do Sanity, clique em **"Create new project"** (ou crie usando o terminal no próximo passo).

### Etapa 2: Inicializar o Studio no seu computador local
1. Instale o kit de ferramentas do Sanity abrindo o terminal do seu computador e digitando:
   ```bash
   npm install -g @sanity/cli
   ```
2. Crie uma nova pasta vazia no seu sistema dedicada ao painel administrativo (ex: `gdr-admin-studio`) e acesse-a:
   ```bash
   mkdir gdr-admin-studio
   cd gdr-admin-studio
   ```
3. Digite o seguinte comando para inicializar o setup:
   ```bash
   sanity init
   ```
4. Faça login usando o navegador quando solicitado. Escolha a opção de conectar a um projeto existente (se criou no site anteriormente) ou selecione para criar um **novo projeto** chamado `gdr-advogados`, utilizando o dataset padrão `production`. Escolha o template em branco (**"Clean Studio"**).

### Etapa 3: Criar os arquivos de Schema
1. No seu editor de código (como o VS Code), abra a pasta `gdr-admin-studio`.
2. Dentro do diretório `/schemas` (ou de tipos), crie arquivos correspondentes a cada um dos esquemas que documentamos acima:
   - `portfolioCase.js` (Casos)
   - `material.js` (E-books, vídeos, artigos)
   - `practiceArea.js` (Especialidades de atuação)
   - `teamMember.js` (Advogados e Administrativo)
   - `pageText.js` (Slogans e títulos como `hero_title`)
   - `pageAsset.js` (Logos do Cabeçalho/Rodapé e os 9 Selos)
3. Adicione estas referências no arquivo compilador principal, geralmente chamado `/schemas/index.js` (ou `schema.js`), inserindo as variáveis na lista de `types`.

### Etapa 4: Publicar (Deploy) do Painel na web de forma Gratuita
1. Quando quiser publicar o seu painel de gerenciamento para que qualquer um da sua equipe possa acessar pelo navegador, acesse a pasta `gdr-admin-studio` no terminal e simplesmente digite:
   ```bash
   sanity deploy
   ```
2. Escolha um nome exclusivo para a subdomínio (ex: `gouveadosreis.sanity.studio`). O Sanity hospedará o painel gratuitamente. Pronto! Você ja pode acessar o painel, fazer login e começar a cadastrar pessoas na equipe, editar textos e apagar registros.

### Etapa 5: Vincular à Aplicação Principal (Vercel ou Applet)
1. Copie o ID exclusivo gerado para seu projeto (**Project ID**) exibido no terminal ou no painel do Sanity.
2. No local onde seu site estiver hospedado (Vercel, por exemplo), acesse `Settings > Environment Variables`.
3. Adicione a variável `VITE_SANITY_PROJECT_ID` com o valor de seu Project ID. O site começará a atualizar o feed em tempo real com as mudanças feitas no painel do Sanity, mantendo compatibilidade de backup offline robusto se a internet cair.

---

## 4. Comportamento Inteligente e Resiliência (Fallback)

Para garantir que o seu site **nunca fique fora do ar** e tenha ótima pontuação no Google PageSpeed:
1. O site consulta as chaves e dados diretamente das APIs otimizadas da **Sanity CDN** (Edge-Caching de alta performance).
2. Se nenhuma credencial do Sanity for inserida ou se o servidor CDN falhar, o React automaticamente ativa a nossa base de dados estática local de altíssima fidelidade. Dessa forma, seu portfólio de 8 tópicos, logomarcas e espaços de imagens permanecerão visíveis e operacionais.
