/* =====================================================================
   PROJETOS (CASES)
   =====================================================================

   NOME DO PROJETO: "Cliente | Serviço" (ex.: "Pluzie | Rebranding").

   COMO ADICIONAR UM PROJETO NOVO
   1. Copie um bloco { ... } da lista abaixo.
   2. Cole no fim da lista (antes do "];"), depois da última vírgula.
   3. Preencha os campos. Pronto: o card e o pop-up são gerados sozinhos.

   COMO TROCAR A ORDEM OU REMOVER
   A ordem dos cards é a ordem desta lista. Para remover, apague o bloco.

   CAMPOS
   title        Nome do projeto (aparece no hover do card e no pop-up)
   client       Nome do cliente (opcional)
   service      Serviço prestado, ex.: Rebranding, Branding (opcional; vira uma etiqueta no pop-up)
   year         Ano (opcional)
   tags         Lista de categorias, ex.: ['Branding', 'Social Media']
   cover        Capa do card. Deixe '' para mostrar o template cinza/colorido.
                Ex.: 'img/cases/projeto-01/capa.webp'  (proporção 4:3 fica melhor)
   description  Texto do projeto. Use uma linha em branco para separar parágrafos.
   images       Imagens do pop-up, na ordem em que aparecem. Também aceita vídeo (.mp4):
                ele toca sozinho, sem som e em loop.
                Ex.: ['img/cases/projeto-01/01.webp', 'img/cases/projeto-01/02.webp']
                Se ficar vazio [], o pop-up mostra 3 espaços de imagem de exemplo.
   (em "images") { src: '...', join: true }  cola a imagem na anterior, sem espaço: use para
                páginas longas cortadas em várias partes. Imagens sem "join" ficam separadas.
   gallery      'seamless' = imagens coladas umas nas outras (para páginas longas de brand
                guidelines) ou 'spaced' = com espaço entre elas (para slides separados).
   link         Endereço do projeto completo, ex. no Behance (opcional).
                Se preencher, aparece um botão "Ver projeto completo" no pop-up.

   TEXTOS EM DOIS IDIOMAS
   Qualquer texto (title, client, description, tags) pode ser uma string simples
   ou { pt: 'Texto em português', en: 'Text in English' }. Com string simples,
   o mesmo texto aparece nos dois idiomas.

   DICAS
   - Use imagens .webp otimizadas: capas com ~808x632 px, páginas longas com 1600 px de
     largura (a altura pode ser grande, até 16000 px). Vídeos em .mp4 (H.264), sem áudio.
   - Nomes de arquivo: sem acento e sem espaço, e respeite maiúsculas/minúsculas
     (em hospedagem Linux "Capa.webp" e "capa.webp" são arquivos diferentes).
   ===================================================================== */

window.PROJECTS = [
  {
    title: { pt: 'Móveis Paulista | Branding Campanha', en: 'Móveis Paulista | Campaign Branding' },
    client: 'Móveis Paulista',
    service: { pt: 'Branding Campanha', en: 'Campaign Branding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/moveis-paulista-branding-campanha/capa.webp',
    description: {
      pt: 'Branding de campanha para Móveis Paulista: criação da identidade visual e do key visual da campanha Bota Fora.',
      en: 'Campaign branding for Móveis Paulista: visual identity and key visual created for the Bota Fora campaign.'
    },
    images: [
      'img/cases/moveis-paulista-branding-campanha/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Móveis Paulista | Branding 55 Anos', en: 'Móveis Paulista | Branding 55 Years' },
    client: 'Móveis Paulista',
    service: { pt: 'Branding 55 Anos', en: 'Branding 55 Years' },
    year: '2026',
    tags: [],
    cover: 'img/cases/moveis-paulista-branding-55-anos/capa.webp',
    description: {
      pt: 'Projeto de branding “55 Anos” para Móveis Paulista, com a criação da identidade visual e do key visual.',
      en: '“55 Years” branding project for Móveis Paulista, including the visual identity and key visual.'
    },
    images: [
      'img/cases/moveis-paulista-branding-55-anos/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Cerâmica Ferrara | Rebranding', en: 'Cerâmica Ferrara | Rebranding' },
    client: 'Cerâmica Ferrara',
    service: { pt: 'Rebranding', en: 'Rebranding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/ceramica-ferrara-rebranding/capa.webp',
    description: {
      pt: 'Projeto de rebranding para Cerâmica Ferrara: renovação da identidade visual e criação do key visual.',
      en: 'Rebranding project for Cerâmica Ferrara: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/ceramica-ferrara-rebranding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Moovia | Branding & Character Design', en: 'Moovia | Branding & Character Design' },
    client: 'Moovia',
    service: { pt: 'Branding & Character Design', en: 'Branding & Character Design' },
    year: '2026',
    tags: [],
    cover: 'img/cases/moovia-branding-character-design/capa.webp',
    description: {
      pt: 'Projeto de branding e character design para Moovia: identidade visual, criação de personagem e key visual.',
      en: 'Branding and character design project for Moovia: visual identity, character creation and key visual.'
    },
    images: [
      'img/cases/moovia-branding-character-design/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Tetrum | Branding & Character Design', en: 'Tetrum | Branding & Character Design' },
    client: 'Tetrum',
    service: { pt: 'Branding & Character Design', en: 'Branding & Character Design' },
    year: '2026',
    tags: [],
    cover: 'img/cases/tetrum-branding-character-design/capa.webp',
    description: {
      pt: 'Projeto de branding e character design para Tetrum: identidade visual, criação de personagem e key visual.',
      en: 'Branding and character design project for Tetrum: visual identity, character creation and key visual.'
    },
    images: [
      'img/cases/tetrum-branding-character-design/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Nova Elétrica | Rebranding', en: 'Nova Elétrica | Rebranding' },
    client: 'Nova Elétrica',
    service: { pt: 'Rebranding', en: 'Rebranding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/nova-eletrica-rebranding/capa.webp',
    description: {
      pt: 'Projeto de rebranding para Nova Elétrica: renovação da identidade visual e criação do key visual.',
      en: 'Rebranding project for Nova Elétrica: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/nova-eletrica-rebranding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Liga da Infibra | Branding', en: 'Liga da Infibra | Branding' },
    client: 'Liga da Infibra',
    service: { pt: 'Branding', en: 'Branding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/liga-da-infibra-branding/capa.webp',
    description: {
      pt: 'Projeto de branding para Liga da Infibra: criação da identidade visual e do key visual da marca.',
      en: 'Branding project for Liga da Infibra: creation of the brand’s visual identity and key visual.'
    },
    images: [
      'img/cases/liga-da-infibra-branding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Oxid | Rebranding', en: 'Oxid | Rebranding' },
    client: 'Oxid',
    service: { pt: 'Rebranding', en: 'Rebranding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/oxid-rebranding/capa.webp',
    description: {
      pt: 'Projeto de rebranding para Oxid: renovação da identidade visual e criação do key visual.',
      en: 'Rebranding project for Oxid: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/oxid-rebranding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Top Telha | Rebranding', en: 'Top Telha | Rebranding' },
    client: 'Top Telha',
    service: { pt: 'Rebranding', en: 'Rebranding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/top-telha-rebranding/capa.webp',
    description: {
      pt: 'Projeto de rebranding para Top Telha: renovação da identidade visual e criação do key visual.',
      en: 'Rebranding project for Top Telha: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/top-telha-rebranding/01.webp',
      { src: 'img/cases/top-telha-rebranding/02.webp', join: true },
      { src: 'img/cases/top-telha-rebranding/03.webp', join: true }
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Pluzie | Rebranding', en: 'Pluzie | Rebranding' },
    client: 'Pluzie',
    service: { pt: 'Rebranding', en: 'Rebranding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/pluzie-rebranding/capa.webp',
    description: {
      pt: 'Projeto de rebranding para Pluzie: renovação da identidade visual e criação do key visual.',
      en: 'Rebranding project for Pluzie: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/pluzie-rebranding/01.webp',
      { src: 'img/cases/pluzie-rebranding/02.webp', join: true },
      { src: 'img/cases/pluzie-rebranding/03.webp', join: true },
      { src: 'img/cases/pluzie-rebranding/04.webp', join: true },
      { src: 'img/cases/pluzie-rebranding/05.webp', join: true }
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Larissa Bardi | BrandingBook', en: 'Larissa Bardi | Branding Book' },
    client: 'Larissa Bardi',
    service: { pt: 'BrandingBook', en: 'Branding Book' },
    year: '2026',
    tags: [],
    cover: 'img/cases/larissa-bardi-brandingbook/capa.webp',
    description: {
      pt: 'Branding book para Larissa Bardi: documentação da identidade visual e do key visual da marca.',
      en: 'Branding book for Larissa Bardi: documentation of the brand’s visual identity and key visual.'
    },
    images: [
      'img/cases/larissa-bardi-brandingbook/01.webp',
      { src: 'img/cases/larissa-bardi-brandingbook/02.webp', join: true },
      { src: 'img/cases/larissa-bardi-brandingbook/03.webp', join: true },
      { src: 'img/cases/larissa-bardi-brandingbook/04.webp', join: true },
      { src: 'img/cases/larissa-bardi-brandingbook/05.webp', join: true },
      { src: 'img/cases/larissa-bardi-brandingbook/06.webp', join: true },
      { src: 'img/cases/larissa-bardi-brandingbook/07.webp', join: true }
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Batrol | Rebranding & 50 Anos', en: 'Batrol | Rebranding & 50 Years' },
    client: 'Batrol',
    service: { pt: 'Rebranding & 50 Anos', en: 'Rebranding & 50 Years' },
    year: '2026',
    tags: [],
    cover: 'img/cases/batrol-rebranding-50-anos/capa.webp',
    description: {
      pt: 'Projeto de rebranding “50 Anos” para Batrol: renovação da identidade visual e criação do key visual.',
      en: '“50 Years” rebranding project for Batrol: renewed visual identity and a new key visual.'
    },
    images: [
      'img/cases/batrol-rebranding-50-anos/01.webp',
      { src: 'img/cases/batrol-rebranding-50-anos/02.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/03.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/04.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/05.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/06.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/07.webp', join: true },
      { src: 'img/cases/batrol-rebranding-50-anos/08.webp', join: true }
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Tulha | Branding Run Party & 20 Anos', en: 'Tulha | Run Party & 20 Years Branding' },
    client: 'Tulha',
    service: { pt: 'Branding Run Party & 20 Anos', en: 'Run Party & 20 Years Branding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/tulha-branding-run-party-20-anos/capa.webp',
    description: {
      pt: 'Projeto de branding “Run Party & 20 Anos” para Tulha, com a criação da identidade visual e do key visual.',
      en: '“Run Party & 20 Years” branding project for Tulha, including the visual identity and key visual.'
    },
    images: [
      'img/cases/tulha-branding-run-party-20-anos/01.webp'
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Duplas | Branding Campanha', en: 'Duplas | Campaign Branding' },
    client: 'Duplas',
    service: { pt: 'Branding Campanha', en: 'Campaign Branding' },
    year: '2026',
    tags: [],
    cover: 'img/cases/duplas-branding-campanha/capa.webp',
    description: {
      pt: 'Branding de campanha para Duplas: criação da identidade visual e do key visual da campanha MegaBig.',
      en: 'Campaign branding for Duplas: visual identity and key visual created for the MegaBig campaign.'
    },
    images: [
      'img/cases/duplas-branding-campanha/01.webp',
      { src: 'img/cases/duplas-branding-campanha/02.webp', join: true },
      { src: 'img/cases/duplas-branding-campanha/03.webp', join: true },
      { src: 'img/cases/duplas-branding-campanha/04.webp', join: true },
      { src: 'img/cases/duplas-branding-campanha/05.webp', join: true },
      'img/cases/duplas-branding-campanha/06.webp',
      'img/cases/duplas-branding-campanha/07.webp',
      'img/cases/duplas-branding-campanha/08.webp',
      'img/cases/duplas-branding-campanha/09.webp',
      'img/cases/duplas-branding-campanha/10.webp',
      'img/cases/duplas-branding-campanha/11.webp',
      'img/cases/duplas-branding-campanha/12.webp',
      'img/cases/duplas-branding-campanha/13.webp',
      'img/cases/duplas-branding-campanha/14.webp',
      'img/cases/duplas-branding-campanha/15.webp',
      'img/cases/duplas-branding-campanha/16.webp',
      'img/cases/duplas-branding-campanha/17.webp',
      'img/cases/duplas-branding-campanha/18.webp',
      'img/cases/duplas-branding-campanha/19.webp',
      'img/cases/duplas-branding-campanha/20.webp',
      'img/cases/duplas-branding-campanha/21.webp',
      'img/cases/duplas-branding-campanha/22.webp',
      'img/cases/duplas-branding-campanha/23.webp',
      'img/cases/duplas-branding-campanha/24.webp',
      'img/cases/duplas-branding-campanha/25.webp',
      'img/cases/duplas-branding-campanha/26.webp',
      'img/cases/duplas-branding-campanha/27.webp'
    ],
    gallery: 'spaced',
    link: ''
  },
  {
    title: { pt: 'Guest To Buy | Social Media Branding', en: 'Guest To Buy | Social Media Branding' },
    client: 'Guest To Buy',
    service: { pt: 'Social Media Branding', en: 'Social Media Branding' },
    year: '2025',
    tags: [],
    cover: 'img/cases/guest-to-buy-social-media-branding/capa.webp',
    description: {
      pt: 'Projeto de branding para redes sociais de Guest To Buy: identidade visual e key visual aplicados ao conteúdo digital.',
      en: 'Social media branding project for Guest To Buy: visual identity and key visual applied to digital content.'
    },
    images: [
      'img/cases/guest-to-buy-social-media-branding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  },
  {
    title: { pt: 'Sua Casa Rende Mais | Social Media Branding', en: 'Sua Casa Rende Mais | Social Media Branding' },
    client: 'Sua Casa Rende Mais',
    service: { pt: 'Social Media Branding', en: 'Social Media Branding' },
    year: '2025',
    tags: [],
    cover: 'img/cases/sua-casa-rende-mais-social-media-branding/capa.webp',
    description: {
      pt: 'Projeto de branding para redes sociais de Sua Casa Rende Mais: identidade visual e key visual aplicados ao conteúdo digital.',
      en: 'Social media branding project for Sua Casa Rende Mais: visual identity and key visual applied to digital content.'
    },
    images: [
      'img/cases/sua-casa-rende-mais-social-media-branding/01.webp'
    ],
    gallery: 'seamless',
    link: ''
  }

  /* ↓ Para adicionar outro projeto, coloque uma vírgula depois do "}" acima
       e cole aqui um novo bloco { ... } */
];
