const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const MARGIN = 60;
const languageSwitch = document.getElementById("languageSwitch");
const languageContainer = document.querySelector('.language-switch-container');
const zoomBox = document.getElementById("zoomBox");
const stageEl = document.querySelector('.stage');

// Elementos que vão desaparecer/ficar P&B
const myPicture = document.querySelector('.my-picture');
const souzaLogo = document.querySelector('.souza-logo');
const imagesContainer = document.querySelector('.images-container');
const svgImage = document.querySelector('.svg-image');
const brazilIcon = document.querySelector('.brazil-icon-rotating');
const designIcon = document.querySelector('.design-icon');

// Elementos fixos que mudam de cor
const nameContainer = document.querySelector('.name-container');
const nameGiovane = document.querySelector('.name-giovane');
const nameSouza = document.querySelector('.name-souza');
const hamburger = document.getElementById("hamburgerMenu");
const hamburgerSpans = document.querySelectorAll('.hamburger span');
const languageLabels = document.querySelectorAll('.language-label');
const switchHandle = document.querySelector('.switch-handle');

// Elementos do texto e máscaras
const nameAlvaroContainer = document.getElementById('nameAlvaroContainer');
const descriptionContainer = document.getElementById('descriptionContainer');
const nameMaskContainer = document.getElementById('nameMaskContainer');
const descriptionMaskContainer = document.getElementById('descriptionMaskContainer');
const nameTextMask = document.getElementById('nameTextMask');
const descriptionTextMask = document.getElementById('descriptionTextMask');

// Elementos do vídeo e fundo cinza
const whiteVideo = document.querySelector('video:not(.background-black):not(.background-white)');
let grayBackground = null;

// Elementos de background para transição
const backgroundBlack = document.querySelector('.background-black');
const backgroundWhite = document.querySelector('.background-white');
const backgroundCreme = document.querySelector('.background-creme');
const backgroundGradient = document.querySelector('.background-gradient');

// NOVA IMAGEM SOUZA NO CENTRO SUPERIOR COM TEXTO
const souzaLogoFinalContainer = document.getElementById('souzaLogoFinalContainer');
const madeByText = document.getElementById('madeByText');

// NOVO TEXTO FINAL - LINHAS INDIVIDUAIS
const finalTextContainer = document.getElementById('finalTextContainer');
const finalMasksContainer = document.getElementById('finalMasksContainer');

// Elementos das linhas individuais
const finalLine1Text = document.getElementById('finalLine1Text');
const finalLine1Word1 = document.getElementById('finalLine1Word1');
const finalLine2Text = document.getElementById('finalLine2Text');
const finalLine3Text = document.getElementById('finalLine3Text');
const finalLine3Word1 = document.getElementById('finalLine3Word1');
const finalLine4Text = document.getElementById('finalLine4Text');
const finalLine5Text = document.getElementById('finalLine5Text');
const finalLine5Word1 = document.getElementById('finalLine5Word1');

// Máscaras individuais
const finalLine1Mask = document.getElementById('finalLine1Mask');
const finalLine2Mask = document.getElementById('finalLine2Mask');
const finalLine3Mask = document.getElementById('finalLine3Mask');
const finalLine4Mask = document.getElementById('finalLine4Mask');
const finalLine5Mask = document.getElementById('finalLine5Mask');

// LINKS DO CONTAINER FINAL
const finalTextLinks = document.querySelectorAll('.final-text-link');

// =========================
// ELEMENTOS ADICIONADOS PARA O CONTAINER FINAL
// =========================
const finalCenterText = document.getElementById('finalCenterText');
const finalCenterLine1 = document.getElementById('finalCenterLine1');
const finalCenterLine2 = document.getElementById('finalCenterLine2');
const finalContactsLabel = document.getElementById('finalContactsLabel');
const finalWorksLabel = document.getElementById('finalWorksLabel');

// =========================
// VARIÁVEIS DO CARROSSEL DE CASES
// =========================
const carouselContainer = document.getElementById('carouselContainer');
const carouselCanvasWrapper = document.getElementById('carouselCanvasWrapper');

// Cases (estilo Behance): elementos gerados a partir de js/projects.js
const casesTrack = document.getElementById('casesTrack');
const casesIntro = document.getElementById('casesIntro');
const casesGrid = document.getElementById('casesGrid');
const casesTitle1 = document.getElementById('casesTitle1');
const casesTitle2 = document.getElementById('casesTitle2');
const casesDesc = document.getElementById('casesDesc');
const caseModal = document.getElementById('caseModal');
const caseModalPanel = document.getElementById('caseModalPanel');
const caseModalScroll = document.getElementById('caseModalScroll');
const caseModalClose = document.getElementById('caseModalClose');
const caseModalCount = document.getElementById('caseModalCount');
const caseModalTitle = document.getElementById('caseModalTitle');
const caseModalChips = document.getElementById('caseModalChips');
const caseModalDesc = document.getElementById('caseModalDesc');
const caseModalLink = document.getElementById('caseModalLink');
const caseModalGallery = document.getElementById('caseModalGallery');
const caseModalPrev = document.getElementById('caseModalPrev');
const caseModalNext = document.getElementById('caseModalNext');

// =========================
// VARIÁVEIS DO STACKS
// =========================
const stacksContainer = document.getElementById('stacksContainer');

// =========================
// VARIÁVEIS DO CONTAINER FINAL
// =========================
const finalContainer = document.getElementById('finalContainer');
const finalCanvasBg = document.getElementById('finalCanvasBg');
const finalCtxBg = finalCanvasBg.getContext("2d");
const finalCanvasText = document.getElementById('finalCanvasText');
const finalCtxText = finalCanvasText.getContext("2d");
const finalCarouselTrack = document.getElementById('finalInfiniteCarousel');

// =========================
// VARIÁVEIS DO PORTFOLIO (TELA DO MENU)
// =========================
const portfolioContainer = document.getElementById('portfolioContainer');
let isPortfolioActive = false;

// =========================
// VARIÁVEIS DO BOTÃO DE IDIOMA NO PORTFOLIO
// =========================
const portfolioLanguageContainer = document.getElementById('portfolioLanguageContainer');
const portfolioLanguageSwitch = document.getElementById('portfolioLanguageSwitch');
const portfolioLanguageLabels = document.querySelectorAll('.portfolio-language-label');
const portfolioSwitchHandle = document.querySelector('.portfolio-switch-handle');
const portfolioLanguageContainerDiv = document.querySelector('.portfolio-language-container');

// Estado inicial do idioma
let currentLanguage = 'en';
let lastFixedColorKey = null;          // memo das cores dos elementos fixos
let lastCarouselFixedProgress = null;
let carouselActivationPending = false;
let isAnimating = false;
let currentScale = 1;

// Controlar se a animação da máscara já foi executada
let hasMaskAnimationPlayed = false;
let isTextVisible = false;

// Controlar se a imagem souza final já apareceu
let hasSouzaLogoFinalAppeared = false;

// Controlar se o texto final já apareceu
let hasFinalTextAppeared = false;

// Controlar se o carrossel de cases foi ativado
let hasCarouselBeenActivated = false;
let isCarouselActive = false;

// Controlar se o stacks foi ativado
let hasStacksBeenActivated = false;
let isStacksActive = false;

// Controlar se o container final foi ativado
let hasFinalContainerBeenActivated = false;
let isFinalContainerActive = false;

// Variável para controlar o escape do carrossel
let isExitingCarousel = false;
let carouselExitThreshold = 50;

// ==============================================
// VARIÁVEIS PARA A NOVA ANIMAÇÃO DE SUBIDA
// ==============================================
const FINAL_STATE_SCROLL = 0.98;
let isFinalState = false;
const LIFT_RANGE = 500;
const FINAL_TEXT_APPEAR_SCROLL = 300;

// Variáveis para controlar o parallax do texto final
let isFinalTextParallaxActive = false;
const FINAL_TEXT_PARALLAX_RANGE = 500;
const FINAL_TEXT_PARALLAX_START = FINAL_TEXT_APPEAR_SCROLL;

// Variáveis para controlar a transição para o container final
const FINAL_CONTAINER_APPEAR_SCROLL = 800;

// ==============================================
// VARIÁVEIS DE RESPONSIVIDADE DO CARROSSEL
// ==============================================
let isMobile = window.innerWidth <= 768;
let carouselLayoutMode = isMobile ? 'vertical' : 'horizontal';

// ==============================================
// VARIÁVEIS PARA TOUCH DO CARROSSEL (CORREÇÃO)
// ==============================================
let touchStartX = 0;
let touchStartY = 0;
let isDraggingCarousel = false;
const CAROUSEL_SWIPE_THRESHOLD = 50;

// ==============================================
// CONSTANTES DE ATIVAÇÃO DO STACKS (CORREÇÃO 2)
// ==============================================
const STACKS_TRIGGER_DESKTOP = 0.75;
const STACKS_TRIGGER_MOBILE = 0.40; // Aparece mais cedo no mobile

// Textos para tradução
const texts = {
  en: {
    description: `Creative Designer focused on branding, visual identity, UI/UX, and digital experiences, based in Porto Ferreira, São Paulo, Brazil.

Currently working as a Graphic Designer at FW2 Propaganda while pursuing a degree in Artificial Intelligence at Cruzeiro do Sul University.

Combining design, technology, and AI to create impactful visual solutions, with experience in branding, social media, web design, motion graphics, and creative development.`,
    madeBy: 'made by giovane souza',
    casesText: 'CASES',
    projectsText: '& PROJECTS',
    viewProject: 'View project', coverSlot: 'Project cover', imageSlot: 'Project image',
    client: 'Client', service: 'Service', year: 'Year', prevProject: 'Previous', nextProject: 'Next',
    closeModal: 'Close', openLink: 'View full project',
    casesDescription: "I specialize in visual identities and have been creating brands for over two years. Each project combines strategy, creativity and visual consistency to give brands a memorable presence and real results.",
    lines: [
      { text: '<span class="final-line-word">ELEVATING</span> STANDARDS,', wordIndex: 0 },
      { text: 'SCALING BRANDS,', wordIndex: -1 },
      { text: '<span class="final-line-word">INTEGRATING</span> MARKETING & AI,', wordIndex: 0 },
      { text: 'CONTROLLING ATTENTION,', wordIndex: -1 },
      { text: 'CREATING <span class="final-line-word">LEGACY</span> DIGITAL.', wordIndex: 1 }
    ],
    stacksTitle: "STACK OF",
    stacksSubtitle: "CREATION & AI",
    stacksDescription: "Strategic tools to create,<br>scale brands and maximize performance<br>with marketing and artificial intelligence.",
    finalCopyright: "© 2026 Giovane Souza. All rights reserved.",
    finalPerformanceText: "PERFORMANCE IS",
    finalFirstPlace: "OUR PRIORITY",
    finalContacts: "CONTACTS",
    finalWorks: "WORKS",
    portfolioContacts: "CONTACTS"
  },
  pt: {
    description: `Designer Criativo especializado em branding, identidade visual, UI/UX e experiências digitais, localizado em Porto Ferreira, São Paulo, Brasil.

Atualmente atuando como Designer Gráfico na FW2 Propaganda e cursando graduação em Inteligência Artificial na Universidade Cruzeiro do Sul.

Combinando design, tecnologia e IA para criar soluções visuais de impacto, com experiência em branding, redes sociais, web design, motion graphics e desenvolvimento criativo.`,
    madeBy: 'criado por giovane souza',
    casesText: 'CASES',
    projectsText: '& PROJETOS',
    viewProject: 'Ver projeto', coverSlot: 'Capa do projeto', imageSlot: 'Imagem do projeto',
    client: 'Cliente', service: 'Serviço', year: 'Ano', prevProject: 'Anterior', nextProject: 'Próximo',
    closeModal: 'Fechar', openLink: 'Ver projeto completo',
    casesDescription: "Sou especializado em identidades visuais e crio marcas há mais de dois anos. Cada projeto une estratégia, criatividade e consistência visual para dar às marcas uma presença memorável e resultados reais.",
    lines: [
      { text: '<span class="final-line-word">ELEVANDO</span> PADRÕES,', wordIndex: 0 },
      { text: 'ESCALANDO MARCAS,', wordIndex: -1 },
      { text: '<span class="final-line-word">INTEGRANDO</span> MARKETING E IA,', wordIndex: 0 },
      { text: 'CONTROLANDO ATENÇÃO,', wordIndex: -1 },
      { text: 'CRIANDO <span class="final-line-word">LEGADO</span> DIGITAL.', wordIndex: 1 }
    ],
    stacksTitle: "STACK DE",
    stacksSubtitle: "CRIAÇÃO & IA",
    stacksDescription: "Ferramentas estratégicas para criar,<br>escalar marcas e maximizar performance<br>com marketing e inteligência artificial.",
    finalCopyright: "© 2026 Giovane Souza. Todos os direitos reservados.",
    finalPerformanceText: "PERFORMACE EM",
    finalFirstPlace: "PRIMEIRO LUGAR",
    finalContacts: "CONTATOS",
    finalWorks: "TRABALHOS",
    portfolioContacts: "CONTATOS"
  }
};

// =========================
// FUNÇÕES PARA O CONTAINER FINAL
// =========================

let finalW, finalH, finalR, finalX, finalY;
let finalScaleFactor = 1;

const finalCarouselImages = [
  'whatsapp', 'instagram', 'telegram', 'gmail', 'github', 'linkedin', 'behance'
];

const finalCarouselConfig = {
  speed: 0.5,
  gap: 80,
  imageSize: 64,
  totalClones: 3
};

let finalCarouselBuilt = false;
let finalCarouselRAF = null;
let finalCarouselPos = 0;
let finalCarouselPitch = 0;
let finalCarouselLastT = 0;

function measureFinalCarouselPitch() {
  const n = finalCarouselImages.length;
  const kids = finalCarouselTrack.children;
  if (kids.length > n) {
    const pitch = kids[n].offsetLeft - kids[0].offsetLeft;
    if (pitch > 0) finalCarouselPitch = pitch;
  }
}

function createFinalInfiniteCarousel() {
  if (!finalCarouselBuilt) {
    finalCarouselTrack.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let clone = 0; clone < finalCarouselConfig.totalClones; clone++) {
      finalCarouselImages.forEach(imgName => {
        const img = document.createElement('img');
        img.src = `img/${imgName.charAt(0).toUpperCase() + imgName.slice(1)}.png`;
        img.alt = imgName;
        img.decoding = 'async';
        img.draggable = false;
        frag.appendChild(img);
      });
    }
    finalCarouselTrack.appendChild(frag);
    finalCarouselTrack.style.willChange = 'transform';
    finalCarouselBuilt = true;
  }
  measureFinalCarouselPitch();
  startFinalCarousel();
}

function finalCarouselFrame(t) {
  finalCarouselRAF = null;
  if (!isFinalContainerActive) { finalCarouselLastT = 0; return; }
  if (!finalCarouselPitch) measureFinalCarouselPitch();

  const dt = finalCarouselLastT ? Math.min(t - finalCarouselLastT, 64) : 16.667;
  finalCarouselLastT = t;

  if (finalCarouselPitch > 0) {
    // speed era 0.5px por frame a 60Hz => 30px/s, agora igual em qualquer tela
    finalCarouselPos -= (finalCarouselConfig.speed * 60) * (dt / 1000);
    if (finalCarouselPos <= -finalCarouselPitch) finalCarouselPos += finalCarouselPitch;
    finalCarouselTrack.style.transform = `translate3d(${finalCarouselPos.toFixed(2)}px, 0, 0)`;
  }
  finalCarouselRAF = requestAnimationFrame(finalCarouselFrame);
}

function startFinalCarousel() {
  if (finalCarouselRAF) return;
  finalCarouselLastT = 0;
  finalCarouselRAF = requestAnimationFrame(finalCarouselFrame);
}

function finalDesenharForma() {
  finalCtxBg.clearRect(0, 0, finalCanvasBg.width, finalCanvasBg.height);
  finalCtxBg.fillStyle = "transparent";
  finalCtxBg.fillRect(0, 0, finalCanvasBg.width, finalCanvasBg.height);

  finalW = 1750;
  finalH = 950;
  finalR = 42;

  finalX = (finalCanvasBg.width - finalW) / 2;
  finalY = (finalCanvasBg.height - finalH) / 2;

  const bumpTopBottomW = 720;
  const bumpTopTopW = 640;
  const bumpTopH = 44;
  const bumpBottomBottomW = 1440;
  const bumpBottomTopW = 1300;
  const bumpBottomH = 44;

  finalCtxBg.fillStyle = "#000";
  finalCtxBg.beginPath();
  finalCtxBg.moveTo(finalX + finalR, finalY);
  finalCtxBg.lineTo(finalX + finalW / 2 - bumpTopBottomW / 2, finalY);
  finalCtxBg.lineTo(finalX + finalW / 2 - bumpTopTopW / 2, finalY - bumpTopH);
  finalCtxBg.lineTo(finalX + finalW / 2 + bumpTopTopW / 2, finalY - bumpTopH);
  finalCtxBg.lineTo(finalX + finalW / 2 + bumpTopBottomW / 2, finalY);
  finalCtxBg.lineTo(finalX + finalW - finalR, finalY);
  finalCtxBg.quadraticCurveTo(finalX + finalW, finalY, finalX + finalW, finalY + finalR);
  finalCtxBg.lineTo(finalX + finalW, finalY + finalH - finalR);
  finalCtxBg.quadraticCurveTo(finalX + finalW, finalY + finalH, finalX + finalW - finalR, finalY + finalH);
  finalCtxBg.lineTo(finalX + finalW / 2 + bumpBottomBottomW / 2, finalY + finalH);
  finalCtxBg.lineTo(finalX + finalW / 2 + bumpBottomTopW / 2, finalY + finalH + bumpBottomH);
  finalCtxBg.lineTo(finalX + finalW / 2 - bumpBottomTopW / 2, finalY + finalH + bumpBottomH);
  finalCtxBg.lineTo(finalX + finalW / 2 - bumpBottomBottomW / 2, finalY + finalH);
  finalCtxBg.lineTo(finalX + finalR, finalY + finalH);
  finalCtxBg.quadraticCurveTo(finalX, finalY + finalH, finalX, finalY + finalH - finalR);
  finalCtxBg.lineTo(finalX, finalY + finalR);
  finalCtxBg.quadraticCurveTo(finalX, finalY, finalX + finalR, finalY);
  finalCtxBg.closePath();
  finalCtxBg.fill();
}

function finalDesenharTexto() {
  finalCtxText.clearRect(0, 0, finalCanvasText.width, finalCanvasText.height);
}

let finalFontsPromise = null;

function loadFinalFonts() {
  if (!finalFontsPromise) {
    finalFontsPromise = Promise.all([
      document.fonts.load('1em GCEpicPro'),
      document.fonts.load('1em Drogel'),
      document.fonts.load('1em Sora')
    ]).catch(() => {});
  }
  return finalFontsPromise;
}

function applyFinalContainerReady() {
  finalDesenharForma();

  if (finalCenterText) finalCenterText.style.opacity = '1';
  if (finalContactsLabel) finalContactsLabel.style.opacity = '0.8';
  if (finalWorksLabel) finalWorksLabel.style.opacity = '0.8';

  finalTextLinks.forEach(link => {
    link.style.opacity = '1';
    link.style.visibility = 'visible';
  });

  updateFinalContainerTexts();
  createFinalInfiniteCarousel();
}

function iniciarFinalContainer() {
  loadFinalFonts().then(applyFinalContainerReady);
}

function updateFinalContainerTexts() {
  if (finalCenterLine1) {
    finalCenterLine1.textContent = texts[currentLanguage].finalPerformanceText;
  }
  
  if (finalCenterLine2) {
    finalCenterLine2.textContent = texts[currentLanguage].finalFirstPlace;
  }
  
  if (finalContactsLabel) {
    finalContactsLabel.textContent = texts[currentLanguage].finalContacts;
  }
  
  if (finalWorksLabel) {
    finalWorksLabel.textContent = texts[currentLanguage].finalWorks;
  }
  
  const finalCopyright = document.querySelector('.final-copyright');
  if (finalCopyright) {
    finalCopyright.innerHTML = `<span class="final-copyright-bold">${texts[currentLanguage].finalCopyright.split('.')[0]}.</span> ${texts[currentLanguage].finalCopyright.split('.')[1]}`;
  }
}

function updatePortfolioTexts() {
  const portfolioContactsTitle = document.querySelector('.portfolio-contacts-title');
  if (portfolioContactsTitle) {
    portfolioContactsTitle.textContent = texts[currentLanguage].portfolioContacts;
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createGrayBackground() {
  grayBackground = document.createElement('div');
  grayBackground.className = 'gray-background';
  grayBackground.style.position = 'absolute';
  grayBackground.style.inset = '0';
  grayBackground.style.width = '100%';
  grayBackground.style.height = '100%';
  grayBackground.style.backgroundColor = '#E0E0E0';
  grayBackground.style.zIndex = '0.05';
  grayBackground.style.pointerEvents = 'none';
  grayBackground.style.opacity = '0';
  grayBackground.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  zoomBox.insertBefore(grayBackground, whiteVideo.nextSibling);
}

function showSouzaLogoFinal() {
  if (!souzaLogoFinalContainer || hasSouzaLogoFinalAppeared) return;
  
  hasSouzaLogoFinalAppeared = true;
  
  setTimeout(() => {
    souzaLogoFinalContainer.style.opacity = '1';
    souzaLogoFinalContainer.style.visibility = 'visible';
    
    setTimeout(() => {
      souzaLogoFinalContainer.classList.add('visible');
    }, 100);
  }, 300);
}

function hideSouzaLogoFinal() {
  if (!souzaLogoFinalContainer) return;
  
  hasSouzaLogoFinalAppeared = false;
  souzaLogoFinalContainer.style.opacity = '0';
  souzaLogoFinalContainer.style.visibility = 'hidden';
  souzaLogoFinalContainer.classList.remove('visible');
}

function showFinalText() {
  if (!finalTextContainer || hasFinalTextAppeared) return;
  
  hasFinalTextAppeared = true;
  
  finalMasksContainer.style.opacity = '1';
  finalMasksContainer.style.visibility = 'visible';
  
  finalTextContainer.style.opacity = '1';
  finalTextContainer.style.visibility = 'visible';
  
  const masks = [finalLine1Mask, finalLine2Mask, finalLine3Mask, finalLine4Mask, finalLine5Mask];
  const textsElements = [finalLine1Text, finalLine2Text, finalLine3Text, finalLine4Text, finalLine5Text];
  
  masks.forEach((mask, index) => {
    mask.style.opacity = '1';
    
    setTimeout(() => {
      mask.style.animation = 'revealLine 0.6s ease-out forwards';
      
      setTimeout(() => {
        textsElements[index].classList.add('visible');
        
        setTimeout(() => {
          mask.style.opacity = '0';
        }, 100);
      }, 300);
    }, index * 150);
  });
  
  setTimeout(() => {
    masks.forEach(mask => {
      mask.style.opacity = '0';
    });
  }, 1200);
}

function hideFinalText() {
  if (!finalTextContainer) return;
  
  hasFinalTextAppeared = false;
  finalTextContainer.style.opacity = '0';
  finalTextContainer.style.visibility = 'hidden';
  finalMasksContainer.style.opacity = '0';
  finalMasksContainer.style.visibility = 'hidden';
  
  [finalLine1Mask, finalLine2Mask, finalLine3Mask, finalLine4Mask, finalLine5Mask].forEach(mask => {
    mask.style.animation = 'none';
    mask.style.opacity = '0';
  });
  
  [finalLine1Text, finalLine2Text, finalLine3Text, finalLine4Text, finalLine5Text].forEach(text => {
    text.classList.remove('visible');
  });
}

// =========================

// Controles de estado do carrossel
let carouselScrollOffset = 0;
let carouselVerticalOffset = 0;
let carouselVerticalParallaxOffset = 0;
let isAtEndOfCarousel = false;
let maxVerticalParallax = 800;
let carouselScrollProgress = 0;

// Alvos de rolagem: o valor "real" persegue o alvo com easing a cada frame
let carouselScrollTarget = 0;
let carouselVerticalTarget = 0;
let carouselParallaxTarget = 0;

// Métricas do layout desktop, em unidades do "design" 1920x1080
let lastLayoutMaxH = 0;
let lastLayoutMaxV = 0;

// Intenção de sair do carrossel (antes bastavam 3 eventos de wheel/touch)
let carouselUpAccum = 0;
let carouselLastUpTime = 0;
const CAROUSEL_EXIT_WHEEL = 250;
const CAROUSEL_EXIT_TOUCH = 110;

// Loop de desenho único
let carouselRAF = null;
let carouselLastT = 0;
let carouselLastSig = '';
let hasReachedCarouselEnd = false;



// =========================
// CASES (estilo Behance): cards gerados de window.PROJECTS (js/projects.js)
// =========================
let mobileTotalHeight = 0;
let maxHorizontalScroll = 1600;
let carouselScrollUpCounter = 0;
let casesDragDist = 0;
let casesLastDragAt = 0;
let lastCasesColorKey = -1;

let isCaseModalOpen = false;
let openCaseIndex = -1;
let lastFocusedCard = null;

const clampNum = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// texto pode ser string simples ou { pt, en }
function tr(v) {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v[currentLanguage] || v.pt || v.en || '';
  return v == null ? '' : String(v);
}

function getProjects() {
  return Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
}

function renderCases() {
  const list = getProjects();
  const t = texts[currentLanguage];
  casesGrid.textContent = '';
  const frag = document.createDocumentFragment();

  list.forEach((p, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'case-card ph-' + (i % 4);
    card.style.setProperty('--i', i);
    card.dataset.index = i;
    card.setAttribute('aria-label', `${tr(p.title)} - ${t.viewProject}`);

    const cover = document.createElement('span');
    cover.className = 'case-cover';
    if (p.cover) {
      const img = new Image();
      img.src = p.cover;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      cover.appendChild(img);
    } else {
      cover.classList.add('is-placeholder');
      const num = document.createElement('span');
      num.className = 'case-ph-num';
      num.textContent = String(i + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.className = 'case-ph-label';
      label.textContent = t.coverSlot;
      cover.append(num, label);
    }

    const overlay = document.createElement('span');
    overlay.className = 'case-overlay';
    const title = document.createElement('span');
    title.className = 'case-title';
    title.textContent = tr(p.title);
    const meta = document.createElement('span');
    meta.className = 'case-meta';
    meta.textContent = [tr(p.service) || tr(p.client), tr(p.year)].filter(Boolean).join(' · ');
    overlay.append(title, meta);

    card.append(cover, overlay);
    frag.appendChild(card);
  });

  casesGrid.appendChild(frag);
  if (isCarouselActive) updateCarouselLayout(true);
}

function updateCasesLanguage() {
  const t = texts[currentLanguage];
  if (casesTitle1) casesTitle1.textContent = t.casesText;
  if (casesTitle2) casesTitle2.textContent = t.projectsText;
  if (casesDesc) casesDesc.textContent = t.casesDescription;
  if (caseModalClose) caseModalClose.setAttribute('aria-label', t.closeModal);
  const prevLabel = document.getElementById('caseModalPrevLabel');
  const nextLabel = document.getElementById('caseModalNextLabel');
  if (prevLabel) prevLabel.textContent = t.prevProject;
  if (nextLabel) nextLabel.textContent = t.nextProject;
  renderCases();
  if (isCaseModalOpen && openCaseIndex >= 0) fillCaseModal(openCaseIndex);
}

// ----- pop-up do projeto -----
function fillCaseModal(index) {
  const list = getProjects();
  const p = list[index];
  if (!p) return;
  const t = texts[currentLanguage];

  caseModalCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
  caseModalTitle.textContent = tr(p.title);

  caseModalChips.textContent = '';
  const chips = [];
  if (p.client) chips.push(`${t.client}: ${tr(p.client)}`);
  if (p.service) chips.push(`${t.service}: ${tr(p.service)}`);
  if (p.year) chips.push(`${t.year}: ${tr(p.year)}`);
  (Array.isArray(p.tags) ? p.tags : []).forEach(tag => chips.push(tr(tag)));
  chips.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    caseModalChips.appendChild(li);
  });

  caseModalDesc.textContent = '';
  tr(p.description).split(/\n\s*\n/).filter(Boolean).forEach(par => {
    const el = document.createElement('p');
    el.textContent = par.trim();
    caseModalDesc.appendChild(el);
  });

  if (p.link) {
    caseModalLink.href = p.link;
    caseModalLink.textContent = t.openLink;
    caseModalLink.hidden = false;
  } else {
    caseModalLink.hidden = true;
    caseModalLink.removeAttribute('href');
  }

  caseModalGallery.textContent = '';
  caseModalGallery.classList.toggle('is-seamless', p.gallery === 'seamless');
  const images = Array.isArray(p.images) ? p.images : [];
  if (images.length) {
    // cada item é um caminho ('img/...') ou { src, join: true } para colar na imagem anterior
    const nodes = images.map(entry => {
      const src = typeof entry === 'string' ? entry : entry.src;
      const join = typeof entry === 'object' && entry.join === true;
      let el;
      if (/\.(mp4|webm)$/i.test(src)) {
        el = document.createElement('video');
        el.src = src;
        el.muted = true;
        el.loop = true;
        el.playsInline = true;
        el.preload = 'metadata';
        el.setAttribute('disablepictureinpicture', '');
        el.className = 'case-video';
        observeCaseVideo(el);
      } else {
        el = new Image();
        el.src = src;
        el.alt = tr(p.title);
        el.loading = 'lazy';
        el.decoding = 'async';
      }
      if (join) el.classList.add('is-joined');
      return el;
    });
    // cantos arredondados só no começo e no fim de cada grupo colado
    nodes.forEach((el, i) => {
      const joinedToPrev = el.classList.contains('is-joined');
      const joinedToNext = nodes[i + 1] && nodes[i + 1].classList.contains('is-joined');
      if (joinedToPrev || joinedToNext) {
        el.classList.add('in-group');
        if (!joinedToPrev) el.classList.add('group-first');
        if (!joinedToNext) el.classList.add('group-last');
      }
      caseModalGallery.appendChild(el);
    });
  } else {
    for (let n = 1; n <= 3; n++) {
      const slot = document.createElement('div');
      slot.className = 'case-slot';
      slot.textContent = `${t.imageSlot} ${n}`;
      caseModalGallery.appendChild(slot);
    }
  }

  caseModalScroll.scrollTop = 0;
}

// vídeos do pop-up tocam só enquanto estão na tela
let caseVideoObserver = null;
function observeCaseVideo(video) {
  if (!('IntersectionObserver' in window)) { video.autoplay = true; return; }
  if (!caseVideoObserver) {
    caseVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const v = en.target;
        if (en.isIntersecting) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
        else v.pause();
      });
    }, { root: caseModalScroll, threshold: 0.35 });
  }
  caseVideoObserver.observe(video);
}

function openCase(index, trigger) {
  if (!getProjects()[index]) return;
  openCaseIndex = index;
  if (trigger) lastFocusedCard = trigger;
  fillCaseModal(index);
  caseModal.hidden = false;
  requestAnimationFrame(() => caseModal.classList.add('open'));
  isCaseModalOpen = true;
  document.body.classList.add('modal-open');
  caseModalClose.focus({ preventScroll: true });
}

function closeCase() {
  if (!isCaseModalOpen) return;
  isCaseModalOpen = false;
  document.body.classList.remove('modal-open');
  caseModal.classList.remove('open');
  setTimeout(() => { if (!isCaseModalOpen) caseModal.hidden = true; }, 280);
  if (lastFocusedCard) lastFocusedCard.focus({ preventScroll: true });
}

function stepCase(dir) {
  const n = getProjects().length;
  if (!n) return;
  openCaseIndex = (openCaseIndex + dir + n) % n;
  fillCaseModal(openCaseIndex);
}

function handleModalKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); closeCase(); return; }
  if (e.key === 'ArrowRight') { e.preventDefault(); stepCase(1); return; }
  if (e.key === 'ArrowLeft') { e.preventDefault(); stepCase(-1); return; }
  if (e.key === 'Tab') {
    const f = caseModalPanel.querySelectorAll('button, a[href]');
    const items = Array.from(f).filter(el => !el.hidden && el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

// ----- layout: cards em função da viewport -----
function updateCarouselLayout(preserve) {
  const wasMobile = carouselLayoutMode === 'vertical';
  isMobile = window.innerWidth <= 768;
  carouselLayoutMode = isMobile ? 'vertical' : 'horizontal';

  // ao redimensionar, mantém a posição proporcional em vez de voltar ao início
  const keep = preserve === true && wasMobile === isMobile;
  const rx = keep && lastLayoutMaxH > 0 ? carouselScrollTarget / lastLayoutMaxH : 0;
  const ry = keep && lastLayoutMaxV > 0 ? carouselVerticalTarget / lastLayoutMaxV : 0;
  const rp = keep ? carouselParallaxTarget / Math.max(1, maxVerticalParallax) : 0;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  carouselContainer.classList.toggle('cases-mobile', isMobile);

  let cw;
  let gap;
  if (isMobile) {
    cw = Math.min(vw - 48, 440);
    gap = 18;
  } else {
    gap = Math.round(clampNum(vh * 0.03, 14, 28 * uiK));
    const rowH = (vh - 215 * uiK - gap) / 2;
    cw = clampNum(rowH * 1.28, 180, 420 * uiK);
  }
  const ch = cw / 1.28;
  carouselContainer.style.setProperty('--card-w', cw.toFixed(1) + 'px');
  carouselContainer.style.setProperty('--card-h', ch.toFixed(1) + 'px');
  carouselContainer.style.setProperty('--gap', gap + 'px');

  // medidas reais do DOM
  const trackW = casesTrack.offsetWidth;
  const trackH = casesTrack.offsetHeight;
  maxHorizontalScroll = Math.max(300, trackW - vw);
  maxVerticalParallax = Math.max(800, Math.round(vh));
  mobileTotalHeight = trackH;

  const maxV = Math.max(0, mobileTotalHeight - vh + 100);
  lastLayoutMaxH = maxHorizontalScroll;
  lastLayoutMaxV = maxV;

  carouselScrollTarget = isMobile ? 0 : rx * maxHorizontalScroll;
  carouselVerticalTarget = isMobile ? ry * maxV : 0;
  carouselParallaxTarget = isMobile ? 0 : rp * maxVerticalParallax;

  carouselScrollOffset = carouselScrollTarget;
  carouselVerticalOffset = carouselVerticalTarget;
  carouselVerticalParallaxOffset = carouselParallaxTarget;
  carouselScrollProgress = (!isMobile && maxHorizontalScroll > 0)
    ? Math.min(carouselScrollOffset / maxHorizontalScroll, 1) : 0;
  isAtEndOfCarousel = false;
  hasReachedCarouselEnd = false;

  carouselLastSig = '';
  applyCarouselTransforms();
  drawCarousel();
}

// aplica posição e cores (só roda quando algo mudou)
function applyCarouselTransforms() {
  if (isMobile) {
    casesTrack.style.transform = `translate3d(0, ${(-carouselVerticalOffset).toFixed(1)}px, 0)`;
    casesIntro.style.transform = '';
    carouselCanvasWrapper.style.transform = '';
  } else {
    casesTrack.style.transform = `translate3d(${(-carouselScrollOffset).toFixed(1)}px, 0, 0)`;
    // o título anda mais devagar que os cards (efeito parallax)
    casesIntro.style.transform = `translate3d(${(carouselScrollOffset * 0.7).toFixed(1)}px, 0, 0)`;
    carouselCanvasWrapper.style.transform = `translate3d(0, ${(-carouselVerticalParallaxOffset).toFixed(1)}px, 0)`;
  }

  const key = Math.round(carouselScrollProgress * 48);
  if (key !== lastCasesColorKey) {
    lastCasesColorKey = key;
    const p = key / 48;
    carouselContainer.style.setProperty('--cases-fg', getInterpolatedColor(p));
    carouselContainer.style.setProperty('--cases-accent', getInterpolatedRedColor(p));
  }
}

function showCarousel() {
  if (isCarouselActive) return;

  isCarouselActive = true;
  document.body.classList.add('carousel-active');
  document.body.classList.remove('stacks-active');
  document.body.classList.remove('final-active');
  document.body.classList.remove('portfolio-active');
  carouselContainer.classList.add('active');

  lastCasesColorKey = -1;
  updateCarouselLayout();
  drawCarousel();

  carouselScrollUpCounter = 0;
  carouselUpAccum = 0;
  hasReachedCarouselEnd = false;
  carouselVerticalParallaxOffset = 0;
  lockSections(900);
  updateBackgroundTransition();
}

function hideCarousel() {
  if (!isCarouselActive) return;

  closeCase();
  isCarouselActive = false;
  document.body.classList.remove('carousel-active');
  carouselContainer.classList.remove('active');

  carouselScrollOffset = 0;
  carouselVerticalOffset = 0;
  carouselVerticalParallaxOffset = 0;
  isAtEndOfCarousel = false;
  carouselScrollProgress = 0;
  hasReachedCarouselEnd = false;
  carouselScrollTarget = 0;
  carouselVerticalTarget = 0;
  carouselParallaxTarget = 0;
  carouselUpAccum = 0;
  carouselScrollUpCounter = 0;
  lastCasesColorKey = -1;
  carouselCanvasWrapper.style.transform = '';
  casesTrack.style.transform = '';
  carouselLastSig = '';

  updateBackgroundTransition();
  resetFixedElementsColor();
}

function restoreCarouselToEnd() {
  if (isMobile) {
    const endV = Math.max(0, mobileTotalHeight - window.innerHeight + 100);
    carouselVerticalTarget = endV;
    carouselVerticalOffset = endV;
  } else {
    carouselScrollTarget = maxHorizontalScroll;
    carouselScrollOffset = maxHorizontalScroll;
    carouselParallaxTarget = 0;
    carouselVerticalParallaxOffset = 0;
    carouselScrollProgress = 1;
  }
  invalidateCarousel();
  applyCarouselTransforms();
}

function carouselFrame(t) {
  carouselRAF = null;
  if (!isCarouselActive) { carouselLastT = 0; return; }

  const dt = carouselLastT ? Math.min((t - carouselLastT) / 16.667, 4) : 1;
  carouselLastT = t;

  stepCarouselEasing(dt);

  const sig = `${carouselScrollOffset.toFixed(1)}|${carouselVerticalOffset.toFixed(1)}|${carouselVerticalParallaxOffset.toFixed(1)}|${isMobile ? 1 : 0}`;
  if (sig !== carouselLastSig) {
    carouselLastSig = sig;
    applyCarouselTransforms();
  }
  carouselRAF = requestAnimationFrame(carouselFrame);
}

function normalizeWheelDelta(e) {
  // trackpads mandam deltaX nos gestos horizontais: vale o eixo dominante
  let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (e.deltaMode === 1) d *= 16;
  else if (e.deltaMode === 2) d *= window.innerHeight;
  return d;
}

// ----- transições entre seções: trava curta + um gesto = uma transição -----
let sectionLockUntil = 0;
let lastWheelTs = 0;
let stacksGestureArmed = false;

function lockSections(ms) { sectionLockUntil = performance.now() + ms; }

function goBackToCarouselFromStacks() {
  hideStacks();
  setTimeout(() => {
    showCarousel();
    restoreCarouselToEnd();
    drawCarousel();
    isAtEndOfCarousel = true;
    updateBackgroundTransition();
  }, 300);
  lockSections(1000);
}

// voltar do final: um passo para trás (stacks) em vez de pular para o topo da página
function backToStacksFromFinal() {
  if (!isFinalContainerActive) return;
  isFinalContainerActive = false;
  hasFinalContainerBeenActivated = false;
  document.body.classList.remove('final-active');
  document.body.classList.add('stacks-active');
  finalContainer.classList.remove('active');

  backgroundGradient.style.opacity = '0';
  backgroundCreme.style.opacity = '1';
  backgroundWhite.style.opacity = '0';
  backgroundBlack.style.opacity = '0';

  if (finalCenterText) finalCenterText.style.opacity = '0';
  if (finalContactsLabel) finalContactsLabel.style.opacity = '0';
  if (finalWorksLabel) finalWorksLabel.style.opacity = '0';
  finalTextLinks.forEach(link => { link.style.opacity = '0'; });

  updateFixedElementsForStacks();
  syncVideoPlayback();
}

function handleStacksWheel(e) {
  if (!isStacksActive) return;
  e.preventDefault();
  const delta = normalizeWheelDelta(e);
  if (performance.now() < sectionLockUntil || !stacksGestureArmed || Math.abs(delta) < 4) return;
  stacksGestureArmed = false;
  if (delta < 0) {
    goBackToCarouselFromStacks();
  } else {
    showFinalContainer();
    lockSections(1000);
  }
}

function handleStacksTouchMove(e) {
  if (!isStacksActive) return;
  e.preventDefault();
  const deltaY = touchStartY - e.touches[0].clientY;   // acumulado desde o início do gesto
  if (Math.abs(deltaY) < 14 || !stacksGestureArmed || performance.now() < sectionLockUntil) return;
  stacksGestureArmed = false;
  if (deltaY < 0) {
    goBackToCarouselFromStacks();
  } else {
    showFinalContainer();
    lockSections(1000);
  }
}

function handleFinalContainerWheel(e) {
  if (!isFinalContainerActive) return;
  e.preventDefault();
  const delta = normalizeWheelDelta(e);
  if (performance.now() < sectionLockUntil || !stacksGestureArmed || delta > -4) return;
  stacksGestureArmed = false;
  backToStacksFromFinal();
  lockSections(1000);
}

function handleFinalContainerTouchMove(e) {
  if (!isFinalContainerActive) return;
  e.preventDefault();
  const deltaY = touchStartY - e.touches[0].clientY;
  if (deltaY > -14 || !stacksGestureArmed || performance.now() < sectionLockUntil) return;
  stacksGestureArmed = false;
  backToStacksFromFinal();
  lockSections(1000);
}

// ----- idioma: botão simples (sem bandeiras) -----
function applyLanguageSwitchState() {
  const pt = currentLanguage === 'pt';
  if (languageSwitch) {
    languageSwitch.classList.toggle('active', pt);
    languageSwitch.setAttribute('aria-checked', String(pt));
  }
  if (languageContainer) languageContainer.classList.toggle('active-pt', pt);
  updatePortfolioLanguageSwitch();
}

function pulseLanguageSwitches() {
  [languageSwitch, portfolioLanguageSwitch].forEach(sw => {
    if (!sw) return;
    sw.classList.remove('is-clicked');
    void sw.offsetWidth;   // reinicia a animação
    sw.classList.add('is-clicked');
    setTimeout(() => sw.classList.remove('is-clicked'), 650);
  });
}

function toggleLanguage() {
  if (isAnimating) return;
  isAnimating = true;
  pulseLanguageSwitches();
  currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
  applyLanguageSwitchState();
  updateTextLanguage();
  setTimeout(() => { isAnimating = false; }, 350);
}

function togglePortfolioLanguage() { toggleLanguage(); }


function getInterpolatedColor(progress) {
  const whiteValue = 255;
  const blackValue = 0;
  const value = Math.round(whiteValue * (1 - progress) + blackValue * progress);
  return `rgb(${value}, ${value}, ${value})`;
}

function getInterpolatedRedColor(progress) {
  const startColor = { r: 232, g: 0, b: 49 };
  const endColor = { r: 0, g: 0, b: 0 };
  const r = Math.round(startColor.r * (1 - progress) + endColor.r * progress);
  const g = Math.round(startColor.g * (1 - progress) + endColor.g * progress);
  const b = Math.round(startColor.b * (1 - progress) + endColor.b * progress);
  return `rgb(${r}, ${g}, ${b})`;
}

function updateBackgroundTransitionImpl() {
  if (isCarouselActive) {
    const transitionProgress = Math.min(carouselScrollOffset / maxHorizontalScroll, 1);
    
    backgroundBlack.style.opacity = (1 - transitionProgress).toString();
    backgroundWhite.style.opacity = transitionProgress.toString();
    backgroundCreme.style.opacity = '0';
    backgroundGradient.style.opacity = '0';
    
    updateFixedElementsForCarousel(transitionProgress);
  } else if (isStacksActive) {
    backgroundBlack.style.opacity = '0';
    backgroundWhite.style.opacity = '1';
    backgroundCreme.style.opacity = '1';
    backgroundGradient.style.opacity = '0';
    
    updateFixedElementsForStacks();
  } else if (isFinalContainerActive) {
    backgroundBlack.style.opacity = '0';
    backgroundWhite.style.opacity = '0';
    backgroundCreme.style.opacity = '0';
    backgroundGradient.style.opacity = '1';
    
    updateFixedElementsForFinalContainer();
    
    if (finalCenterText) {
      finalCenterText.style.opacity = '1';
    }
    
    if (finalContactsLabel) {
      finalContactsLabel.style.opacity = '0.8';
    }
    
    if (finalWorksLabel) {
      finalWorksLabel.style.opacity = '0.8';
    }
    
    finalTextLinks.forEach(link => {
      link.style.opacity = '1';
      link.style.visibility = 'visible';
    });
  } else if (isPortfolioActive) {
    backgroundBlack.style.opacity = '1';
    backgroundWhite.style.opacity = '0';
    backgroundCreme.style.opacity = '0';
    backgroundGradient.style.opacity = '0';
    
    updateFixedElementsForPortfolio();
    updatePortfolioTexts();
  } else {
    backgroundBlack.style.opacity = '1';
    backgroundWhite.style.opacity = '0';
    backgroundCreme.style.opacity = '0';
    backgroundGradient.style.opacity = '0';
    
    if (finalCenterText) {
      finalCenterText.style.opacity = '0';
    }
    
    if (finalContactsLabel) {
      finalContactsLabel.style.opacity = '0';
    }
    
    if (finalWorksLabel) {
      finalWorksLabel.style.opacity = '0';
    }
    
    finalTextLinks.forEach(link => {
      link.style.opacity = '0';
      link.style.visibility = 'hidden';
    });
  }
}

function updateBackgroundTransition() {
  updateBackgroundTransitionImpl();
  syncVideoPlayback();
}

function setVideoPlaying(v, want) {
  if (!v) return;
  if (want) {
    if (v.paused) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    }
  } else if (!v.paused) {
    v.pause();
  }
}

function syncVideoPlayback() {
  const portfolioVideo = document.querySelector('.portfolio-canvas-wrapper video');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
  const frac = Math.min(scrollTop / (window.innerHeight * 1.5), 1);
  const covered = isPortfolioActive || isStacksActive || isFinalContainerActive;

  setVideoPlaying(whiteVideo, !covered && !isCarouselActive && frac < 0.72);
  setVideoPlaying(backgroundBlack, !covered);
  setVideoPlaying(backgroundWhite, isCarouselActive && !covered);
  setVideoPlaying(portfolioVideo, isPortfolioActive);
}

function updateFixedElementsForPortfolio() {
  lastFixedColorKey = null;
  lastCarouselFixedProgress = null;
  const newColor = '#FFFFFF';
  const shadowColor = 'rgba(0, 0, 0, 0.6)';
  
  if (nameGiovane && nameSouza) {
    nameGiovane.style.color = newColor;
    nameSouza.style.color = newColor;
    nameGiovane.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
    nameSouza.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
  }
  
  if (hamburger) {
    hamburger.style.borderColor = newColor;
  }
  
  if (hamburgerSpans) {
    hamburgerSpans.forEach(span => {
      span.style.background = newColor;
    });
  }
  
  if (hamburgerSpans[0]) {
    hamburgerSpans[0].style.transform = 'translateY(6px) rotate(45deg)';
    hamburgerSpans[0].style.animation = 'drawX_A 3s cubic-bezier(0.4, 0, 0.2, 1) infinite';
    hamburgerSpans[0].style.animationDelay = '0.1s';
  }
  
  if (hamburgerSpans[1]) {
    hamburgerSpans[1].style.transform = 'translateY(-6px) rotate(-45deg)';
    hamburgerSpans[1].style.animation = 'drawX_B 3s cubic-bezier(0.4, 0, 0.2, 1) infinite';
    hamburgerSpans[1].style.animationDelay = '0.2s';
  }
}

function updateFixedElementsForFinalContainer() {
  lastFixedColorKey = null;
  lastCarouselFixedProgress = null;
  const newColor = '#FFFFFF';
  const shadowColor = 'rgba(0, 0, 0, 0.6)';
  
  if (nameGiovane && nameSouza) {
    nameGiovane.style.color = newColor;
    nameSouza.style.color = newColor;
    nameGiovane.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
    nameSouza.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
  }
  
  if (hamburger) {
    hamburger.style.borderColor = newColor;
  }
  
  if (hamburgerSpans) {
    hamburgerSpans.forEach(span => {
      span.style.background = newColor;
    });
  }
  
  if (languageLabels) {
    languageLabels.forEach(label => {
      label.style.color = newColor;
    });
  }
  
  if (switchHandle) {
    switchHandle.style.background = `
      radial-gradient(circle at 30% 30%, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(230, 230, 230, 0.9) 30%,
        rgba(210, 210, 210, 0.85) 100%),
      linear-gradient(145deg, 
        rgba(255, 255, 255, 0.9),
        rgba(240, 240, 240, 0.8))`;
    switchHandle.style.borderColor = 'rgba(200, 200, 200, 0.7)';
  }
}

function updateFixedElementsForStacks() {
  lastFixedColorKey = null;
  lastCarouselFixedProgress = null;
  const newColor = '#000000';
  const shadowColor = 'rgba(255, 255, 255, 0.6)';
  
  if (nameGiovane && nameSouza) {
    nameGiovane.style.color = newColor;
    nameSouza.style.color = newColor;
    nameGiovane.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
    nameSouza.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
  }
  
  if (hamburger) {
    hamburger.style.borderColor = newColor;
  }
  
  if (hamburgerSpans) {
    hamburgerSpans.forEach(span => {
      span.style.background = newColor;
    });
  }
  
  if (languageLabels) {
    languageLabels.forEach(label => {
      label.style.color = newColor;
    });
  }
  
  if (switchHandle) {
    switchHandle.style.background = `
      radial-gradient(circle at 30% 30%, 
        rgba(20, 20, 20, 0.95) 0%,
        rgba(10, 10, 10, 0.9) 30%,
        rgba(0, 0, 0, 0.85) 100%),
      linear-gradient(145deg, 
        rgba(40, 40, 40, 0.9),
        rgba(20, 20, 20, 0.8))`;
    switchHandle.style.borderColor = 'rgba(60, 60, 60, 0.7)';
  }
}

function updateFixedElementsForCarousel(progress) {
  progress = Math.round(Math.min(Math.max(progress, 0), 1) * 48) / 48;
  if (progress === lastCarouselFixedProgress) return;
  lastCarouselFixedProgress = progress;
  lastFixedColorKey = null;
  const colorValue = Math.round(255 - (progress * 255));
  const newColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
  
  if (nameGiovane && nameSouza) {
    nameGiovane.style.color = newColor;
    nameSouza.style.color = newColor;
    
    const shadowColor = progress > 0.5 ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    nameGiovane.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
    nameSouza.style.textShadow = `0 1px 2px ${shadowColor}, 0 2px 4px ${shadowColor}, 0 4px 8px ${shadowColor}`;
  }
  
  if (hamburger) {
    hamburger.style.borderColor = newColor;
  }
  if (hamburgerSpans) {
    hamburgerSpans.forEach(span => {
      span.style.background = newColor;
    });
  }
  
  if (languageLabels) {
    languageLabels.forEach(label => {
      label.style.color = newColor;
    });
  }
  
  if (switchHandle) {
    const handleLightness = 255 - (progress * 235);
    const handleBorderColor = `rgba(${Math.round(handleLightness * 0.8)}, ${Math.round(handleLightness * 0.8)}, ${Math.round(handleLightness * 0.8)}, 0.7)`;
    
    switchHandle.style.background = `
      radial-gradient(circle at 30% 30%, 
        rgba(${handleLightness}, ${handleLightness}, ${handleLightness}, 0.95) 0%,
        rgba(${handleLightness * 0.5}, ${handleLightness * 0.5}, ${handleLightness * 0.5}, 0.9) 30%,
        rgba(${handleLightness * 0.25}, ${handleLightness * 0.25}, ${handleLightness * 0.25}, 0.85) 100%),
      linear-gradient(145deg, 
        rgba(${handleLightness * 2}, ${handleLightness * 2}, ${handleLightness * 2}, 0.9),
        rgba(${handleLightness}, ${handleLightness}, ${handleLightness}, 0.8))`;
    switchHandle.style.borderColor = handleBorderColor;
  }
}

function showPortfolio() {
  if (isPortfolioActive) return;
  
  isPortfolioActive = true;
  document.body.classList.add('portfolio-active');
  document.body.classList.remove('carousel-active');
  document.body.classList.remove('stacks-active');
  document.body.classList.remove('final-active');
  portfolioContainer.classList.add('active');
  
  if (portfolioLanguageContainer) {
    portfolioLanguageContainer.style.display = 'flex';
    updatePortfolioLanguageSwitch();
  }
  
  if (languageContainer) {
    languageContainer.style.display = 'none';
  }
  
  updateFixedElementsForPortfolio();
  updateBackgroundTransition();
}

function hidePortfolio() {
  if (!isPortfolioActive) return;
  
  isPortfolioActive = false;
  document.body.classList.remove('portfolio-active');
  portfolioContainer.classList.remove('active');
  
  if (portfolioLanguageContainer) {
    portfolioLanguageContainer.style.display = 'none';
  }
  
  if (languageContainer) {
    languageContainer.style.display = 'flex';
  }
  
  resetFixedElementsColor();
  updateBackgroundTransition();
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function updatePortfolioLanguageSwitch() {
  if (!portfolioLanguageSwitch || !portfolioLanguageContainer) return;
  
  if (currentLanguage === 'pt') {
    portfolioLanguageSwitch.classList.add('active');
    portfolioLanguageContainer.classList.add('active-pt');
    portfolioLanguageSwitch.setAttribute('aria-checked', 'true');
  } else {
    portfolioLanguageSwitch.classList.remove('active');
    portfolioLanguageContainer.classList.remove('active-pt');
    portfolioLanguageSwitch.setAttribute('aria-checked', 'false');
  }
}

function togglePortfolio() {
  if (isPortfolioActive) {
    hidePortfolio();
  } else {
    if (isCarouselActive) hideCarousel();
    if (isStacksActive) hideStacks();
    if (isFinalContainerActive) hideFinalContainer();
    
    showPortfolio();
  }
}

function showStacks() {
  if (isStacksActive) return;
  
  isStacksActive = true;
  hasStacksBeenActivated = true;
  if (!stacksPitchOk) buildStacksCarousel();
  stacksGestureArmed = false;
  lockSections(900);
  document.body.classList.add('stacks-active');
  document.body.classList.remove('carousel-active');
  document.body.classList.remove('final-active');
  document.body.classList.remove('portfolio-active');
  stacksContainer.classList.add('active');
  
  backgroundWhite.style.opacity = '1';
  backgroundBlack.style.opacity = '0';
  backgroundGradient.style.opacity = '0';
  
  setTimeout(() => {
    backgroundCreme.style.opacity = '1';
    setTimeout(() => {
      backgroundWhite.style.opacity = '0';
    }, 300);
  }, 100);
  
  updateFixedElementsForStacks();
  
  // Ativar observer do stacks quando for exibido
  activateStacksObserver();
}

function hideStacks() {
  if (!isStacksActive) return;
  
  isStacksActive = false;
  hasStacksBeenActivated = false;
  document.body.classList.remove('stacks-active');
  stacksContainer.classList.remove('active');
  
  backgroundCreme.style.opacity = '0';
  setTimeout(() => {
    backgroundBlack.style.opacity = '1';
  }, 300);
  
  resetFixedElementsColor();
}

function showFinalContainer() {
  if (isFinalContainerActive) return;
  
  isFinalContainerActive = true;
  hasFinalContainerBeenActivated = true;
  document.body.classList.add('final-active');
  document.body.classList.remove('carousel-active');
  document.body.classList.remove('stacks-active');
  document.body.classList.remove('portfolio-active');
  finalContainer.classList.add('active');
  
  backgroundGradient.style.opacity = '1';
  backgroundBlack.style.opacity = '0';
  backgroundWhite.style.opacity = '0';
  backgroundCreme.style.opacity = '0';
  
  updateFixedElementsForFinalContainer();
  iniciarFinalContainer();
}

function hideFinalContainer() {
  if (!isFinalContainerActive) return;
  
  isFinalContainerActive = false;
  hasFinalContainerBeenActivated = false;
  document.body.classList.remove('final-active');
  finalContainer.classList.remove('active');
  
  backgroundWhite.style.opacity = '1';
  backgroundGradient.style.opacity = '0';
  
  setTimeout(() => {
    backgroundWhite.style.opacity = '0';
    setTimeout(() => {
      backgroundBlack.style.opacity = '1';
    }, 500);
  }, 100);
  
  if (finalCenterText) {
    finalCenterText.style.opacity = '0';
  }
  
  if (finalContactsLabel) {
    finalContactsLabel.style.opacity = '0';
  }
  
  if (finalWorksLabel) {
    finalWorksLabel.style.opacity = '0';
  }
  
  finalTextLinks.forEach(link => {
    link.style.opacity = '0';
    link.style.visibility = 'hidden';
  });
  
  resetFixedElementsColor();
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function resetFixedElementsColor() {
  lastFixedColorKey = null;
  lastCarouselFixedProgress = null;
  if (nameGiovane && nameSouza) {
    nameGiovane.style.color = '#000000';
    nameSouza.style.color = '#000000';
    nameGiovane.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(255, 255, 255, 0.4)';
    nameSouza.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(255, 255, 255, 0.4)';
  }
  if (hamburger) {
    hamburger.style.borderColor = '#000000';
  }
  if (hamburgerSpans) {
    hamburgerSpans.forEach(span => {
      span.style.background = '#000000';
      span.style.transform = '';
      span.style.animation = '';
    });
  }
  if (languageLabels) {
    languageLabels.forEach(label => {
      label.style.color = '#000000';
    });
  }
  if (switchHandle) {
    switchHandle.style.background = `
      radial-gradient(circle at 30% 30%, 
        rgba(20, 20, 20, 0.95) 0%,
        rgba(10, 10, 10, 0.9) 30%,
        rgba(0, 0, 0, 0.85) 100%),
      linear-gradient(145deg, 
        rgba(40, 40, 40, 0.9),
        rgba(20, 20, 20, 0.8))`;
    switchHandle.style.borderColor = 'rgba(60, 60, 60, 0.7)';
  }
}

// =========================
// FUNÇÕES DE DESENHO DO CARROSSEL - CORRIGIDAS
// =========================

function stepCarouselEasing(dt) {
  const k = 1 - Math.pow(1 - 0.14, dt);
  let moving = false;
  const ease = (cur, tar) => {
    const d = tar - cur;
    if (Math.abs(d) < 0.05) return tar;
    moving = true;
    return cur + d * k;
  };

  carouselScrollOffset = ease(carouselScrollOffset, carouselScrollTarget);
  carouselVerticalOffset = ease(carouselVerticalOffset, carouselVerticalTarget);

  if (!isMobile) {
    carouselVerticalParallaxOffset = ease(carouselVerticalParallaxOffset, carouselParallaxTarget);
    carouselScrollProgress = maxHorizontalScroll > 0
      ? Math.min(carouselScrollOffset / maxHorizontalScroll, 1) : 0;
  }

  if (moving && !isStacksActive && !isFinalContainerActive && !isPortfolioActive) {
    updateBackgroundTransition();   // cores dos elementos fixos acompanham o progresso
  }
}

// Pode ser chamada de qualquer lugar: nunca cria um segundo loop
function drawCarousel() {
  if (!isCarouselActive || carouselRAF) return;
  carouselLastT = 0;
  carouselRAF = requestAnimationFrame(carouselFrame);
}

function invalidateCarousel() { carouselLastSig = ''; }

function registerCarouselUp(amount) {
  const now = performance.now();
  if (now - carouselLastUpTime > 700) carouselUpAccum = 0;
  carouselLastUpTime = now;
  carouselUpAccum += Math.max(0, amount);
}

// =========================
// FUNÇÕES DE INTERAÇÃO DO CARROSSEL - CORRIGIDAS
// =========================

// =========================
// FUNÇÕES DE TOUCH DO CARROSSEL - CORRIGIDAS PARA FUNCIONAR NOS DOIS LADOS
// =========================

function exitCarouselBackward() {
  window.scrollBy({ top: -300, behavior: 'smooth' });
  setTimeout(() => {
    hideCarousel();
    hasCarouselBeenActivated = false;
  }, 300);
}

// só passa para os stacks se o usuário continuar no fim depois da pausa
function scheduleStacks() {
  setTimeout(() => {
    const atEnd = isMobile
      ? carouselVerticalTarget >= Math.max(0, mobileTotalHeight - window.innerHeight + 100) - 10
      : carouselParallaxTarget >= maxVerticalParallax - 10;
    if (atEnd) showStacks();
  }, 300);
}

// amount > 0 avança, amount < 0 volta. Mesma lógica para roda, toque e teclado.
// Voltar percorre o caminho inverso: desfaz o "levantar" do fim, volta pelos cases
// e só no começo dos cases sai para o container anterior.
function carouselStep(amount, kind) {
  const exitThreshold = kind === 'touch' ? CAROUSEL_EXIT_TOUCH : CAROUSEL_EXIT_WHEEL;
  const k = kind === 'touch' ? 1 : 0.9;
  const kPar = kind === 'touch' ? 0.6 : 0.4;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  if (isMobile) {
    const maxV = Math.max(0, mobileTotalHeight - window.innerHeight + 100);
    if (amount < 0 && carouselVerticalTarget <= 4) {
      registerCarouselUp(-amount);
      if (carouselUpAccum >= exitThreshold) {
        carouselUpAccum = 0;
        exitCarouselBackward();
      }
      return;
    }
    carouselUpAccum = 0;
    carouselVerticalTarget = clamp(carouselVerticalTarget + amount * k, 0, maxV);
    isAtEndOfCarousel = carouselVerticalTarget >= maxV - 10;
    if (isAtEndOfCarousel && amount > 0) scheduleStacks();
  } else if (amount > 0) {
    carouselUpAccum = 0;
    if (carouselScrollTarget >= maxHorizontalScroll - 10) {
      isAtEndOfCarousel = true;
      carouselParallaxTarget = clamp(carouselParallaxTarget + amount * kPar, 0, maxVerticalParallax);
      if (carouselParallaxTarget >= maxVerticalParallax - 10) scheduleStacks();
    } else {
      carouselScrollTarget = clamp(carouselScrollTarget + amount * k, 0, maxHorizontalScroll);
    }
  } else if (carouselParallaxTarget > 0) {
    carouselParallaxTarget = clamp(carouselParallaxTarget + amount * kPar, 0, maxVerticalParallax);
  } else if (carouselScrollTarget > 4) {
    carouselUpAccum = 0;
    isAtEndOfCarousel = false;
    carouselScrollTarget = clamp(carouselScrollTarget + amount * k, 0, maxHorizontalScroll);
  } else {
    registerCarouselUp(-amount);
    if (carouselUpAccum >= exitThreshold) {
      carouselUpAccum = 0;
      exitCarouselBackward();
    }
  }

  updateBackgroundTransition();
}

function handleCarouselWheel(e) {
  if (!isCarouselActive) return;
  e.preventDefault();
  const delta = normalizeWheelDelta(e);
  if (Math.abs(delta) < 1) return;
  carouselStep(delta, 'wheel');
}

function handleCarouselTouchMove(e) {
  if (!isCarouselActive || !isDraggingCarousel) return;
  e.preventDefault();

  const t = e.touches[0];
  const dx = touchStartX - t.clientX;
  const dy = touchStartY - t.clientY;
  casesDragDist += Math.abs(dx) + Math.abs(dy);
  casesLastDragAt = Date.now();

  const amount = isMobile ? dy : (Math.abs(dx) > Math.abs(dy) ? dx : dy);
  if (amount) carouselStep(amount, 'touch');

  touchStartX = t.clientX;
  touchStartY = t.clientY;
}

function handleCarouselTouchStart(e) {
  if (!isCarouselActive) return;
  
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDraggingCarousel = true;
  casesDragDist = 0;
}

function handleCarouselTouchEnd(e) {
  if (!isCarouselActive) return;
  isDraggingCarousel = false;
  
  // Reset contador de scroll up
  carouselUpAccum = 0;
}

function handleCarouselTouchCancel(e) {
  if (!isCarouselActive) return;
  isDraggingCarousel = false;
  carouselUpAccum = 0;
}


// =========================
// STACKS: carrossel infinito montado a partir de window.STACKS (js/stacks.js)
// =========================
const STACKS_SPEED = 35;   // px por segundo, igual qualquer que seja o nº de ícones
const stacksTrack = document.getElementById('stacksTrack');
let stacksBuildToken = 0;
let stacksPitchOk = false;
let stacksBuiltWidth = 0;

function stacksWhenLoaded(imgs) {
  return Promise.all(imgs.map(img => (img.complete && img.naturalWidth)
    ? Promise.resolve()
    : new Promise(res => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      })));
}

// Monta 1 conjunto, mede a largura exata de uma volta e repete o conjunto quantas vezes
// precisar para cobrir a tela + uma volta. Antes eram só 2 cópias fixas: em telas largas
// sobrava um buraco à direita, e o -50% ainda errava o ponto de emenda por causa do gap.
function buildStacksCarousel() {
  if (!stacksTrack) return;
  const list = Array.isArray(window.STACKS) ? window.STACKS : [];
  const token = ++stacksBuildToken;
  stacksBuiltWidth = window.innerWidth;
  stacksTrack.style.animation = 'none';
  stacksTrack.textContent = '';
  stacksPitchOk = false;
  if (!list.length) return;

  const makeImg = (item, hidden) => {
    const img = new Image();
    img.src = item.src;
    img.alt = hidden ? '' : (item.name || '');
    if (hidden) img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.draggable = false;
    return img;
  };

  const baseImgs = list.map(item => makeImg(item, false));
  const frag = document.createDocumentFragment();
  baseImgs.forEach(img => frag.appendChild(img));
  stacksTrack.appendChild(frag);

  stacksWhenLoaded(baseImgs).then(() => {
    if (token !== stacksBuildToken) return;

    const cs = getComputedStyle(stacksTrack);
    const gap = parseFloat(cs.columnGap || cs.gap) || 0;
    let pitch = 0;
    // largura fracionária (offsetWidth arredonda e o erro se acumula a cada volta do loop)
    baseImgs.forEach(img => { pitch += img.getBoundingClientRect().width + gap; });   // uma volta completa

    if (pitch <= gap * list.length) return;   // container ainda escondido: refaz ao mostrar

    const copies = Math.ceil(window.innerWidth / pitch) + 1;
    const more = document.createDocumentFragment();
    for (let i = 1; i < copies; i++) list.forEach(item => more.appendChild(makeImg(item, true)));
    stacksTrack.appendChild(more);

    stacksTrack.style.setProperty('--stacks-shift', `${-pitch}px`);
    stacksTrack.style.animation = `stacksMarquee ${(pitch / STACKS_SPEED).toFixed(2)}s linear infinite`;
    stacksPitchOk = true;
  });
}

// =========================
// FUNÇÕES PARA CONTROLE DO STACKS
// =========================

function handleStacksTouchStart(e) {
  if (!isStacksActive) return;
  touchStartY = e.touches[0].clientY;
}

// =========================
// FUNÇÕES PARA CONTROLE DO CONTAINER FINAL
// =========================

function handleFinalContainerTouchStart(e) {
  if (!isFinalContainerActive) return;
  touchStartY = e.touches[0].clientY;
}

// =========================
// STACKS OBSERVER - CORREÇÃO PARA APARECER MAIS RÁPIDO
// =========================

function activateStacksObserver() {
  const stacks = document.querySelectorAll('.stack-item, .stacks-title, .stacks-description, .stacks-grid');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Adicionar também aos filhos se necessário
        if (entry.target.classList.contains('stacks-grid')) {
          const gridItems = entry.target.querySelectorAll('.stack-item');
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('show');
            }, index * 100);
          });
        }
      }
    });
  }, {
    threshold: 0.1, // Ativa quando apenas 10% está visível
    rootMargin: "0px 0px -100px 0px" // Ativa um pouco antes de entrar totalmente na tela
  });
  
  stacks.forEach(stack => {
    observer.observe(stack);
  });
}

// =========================
// FUNÇÕES DE SCROLL PRINCIPAL
// =========================

function updateFixedElementsColorsImpl(scrollFraction) {
  const colorChangeStart = 0.3;
  
  if (scrollFraction > colorChangeStart) {
    const colorProgress = Math.min((scrollFraction - colorChangeStart) / (0.7 - colorChangeStart), 1);
    
    const blackToWhite = `rgb(${Math.round(colorProgress * 255)}, ${Math.round(colorProgress * 255)}, ${Math.round(colorProgress * 255)})`;
    const inverseShadow = colorProgress > 0.5 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';
    
    if (nameGiovane && nameSouza) {
      nameGiovane.style.color = blackToWhite;
      nameSouza.style.color = blackToWhite;
      nameGiovane.style.textShadow = `0 1px 2px ${inverseShadow}, 0 2px 4px ${inverseShadow}, 0 4px 8px ${inverseShadow}`;
      nameSouza.style.textShadow = `0 1px 2px ${inverseShadow}, 0 2px 4px ${inverseShadow}, 0 4px 8px ${inverseShadow}`;
    }
    
    if (hamburger) {
      hamburger.style.borderColor = blackToWhite;
    }
    if (hamburgerSpans) {
      hamburgerSpans.forEach(span => {
        span.style.background = blackToWhite;
      });
    }
    
    if (languageLabels) {
      languageLabels.forEach(label => {
        label.style.color = blackToWhite;
      });
    }
    
    if (switchHandle) {
      const handleLightness = 20 + (colorProgress * 80);
      const handleBorderColor = `rgba(${Math.round(handleLightness * 0.8)}, ${Math.round(handleLightness * 0.8)}, ${Math.round(handleLightness * 0.8)}, 0.7)`;
      
      switchHandle.style.background = `
        radial-gradient(circle at 30% 30%, 
          rgba(${handleLightness}, ${handleLightness}, ${handleLightness}, 0.95) 0%,
          rgba(${handleLightness * 0.5}, ${handleLightness * 0.5}, ${handleLightness * 0.5}, 0.9) 30%,
          rgba(${handleLightness * 0.25}, ${handleLightness * 0.25}, ${handleLightness * 0.25}, 0.85) 100%),
        linear-gradient(145deg, 
          rgba(${handleLightness * 2}, ${handleLightness * 2}, ${handleLightness * 2}, 0.9),
          rgba(${handleLightness}, ${handleLightness}, ${handleLightness}, 0.8))`;
      switchHandle.style.borderColor = handleBorderColor;
    }
  } else {
    resetFixedElementsColor();
  }
}

function updateFixedElementsColors(scrollFraction) {
  const start = 0.3;
  const p = scrollFraction > start ? Math.min((scrollFraction - start) / (0.7 - start), 1) : -1;
  const key = p < 0 ? -1 : Math.round(p * 48);
  if (key === lastFixedColorKey) return;
  const qFraction = key < 0 ? 0 : start + (key / 48) * (0.7 - start);
  updateFixedElementsColorsImpl(qFraction);
  lastFixedColorKey = key;   // depois: o reset interno zera a memo
}

let animationFrameId = null;
const zoomState = { s: 1, x: 0, y: 0, w: 1920, h: 1080 };
// alinhamento horizontal da caixa da foto (centro visual alvo, em px)
const zoomAlign = { active: false, centerX: 0 };
const zoomTarget = { s: 1, x: 0, y: 0, w: 1920, h: 1080 };
let zoomLastT = 0;

function setZoomTarget(s, x, y, w, h) {
  zoomTarget.s = s; zoomTarget.x = x; zoomTarget.y = y; zoomTarget.w = w; zoomTarget.h = h;
}

function requestZoomAnimation() {
  if (animationFrameId === null) {
    zoomLastT = 0;
    animationFrameId = requestAnimationFrame(smoothAnimate);
  }
}

function smoothAnimate(t) {
  animationFrameId = null;

  // easing independente do refresh rate (0.1 por frame a 60Hz)
  const dt = zoomLastT ? Math.min((t - zoomLastT) / 16.667, 4) : 1;
  zoomLastT = t;
  const k = 1 - Math.pow(1 - 0.1, dt);

  const st = zoomState;
  const tg = zoomTarget;
  st.s += (tg.s - st.s) * k;
  st.x += (tg.x - st.x) * k;
  st.y += (tg.y - st.y) * k;
  st.w += (tg.w - st.w) * k;
  st.h += (tg.h - st.h) * k;

  const settled =
    Math.abs(tg.s - st.s) <= 0.001 && Math.abs(tg.x - st.x) <= 0.1 && Math.abs(tg.y - st.y) <= 0.1 &&
    Math.abs(tg.w - st.w) <= 0.1 && Math.abs(tg.h - st.h) <= 0.1;

  if (settled) {
    st.s = tg.s; st.x = tg.x; st.y = tg.y; st.w = tg.w; st.h = tg.h;
  }

  if (zoomAlign.active && !isMobile) {
    // fixa o CENTRO visual da foto em zoomAlign.centerX, mesmo com largura/escala animando
    const vw = window.innerWidth;
    const effW = Math.min(st.w, vw);   // o CSS limita a largura a 100vw
    const R = zoomAlign.centerX - st.x * st.s + effW / 2;
    zoomBox.style.position = 'absolute';
    zoomBox.style.left = 'auto';
    zoomBox.style.right = `${(vw - R).toFixed(2)}px`;
  }
  zoomBox.style.transform = `scale(${st.s}) translate(${st.x}px, ${st.y}px)`;
  zoomBox.style.width = `${st.w}px`;
  zoomBox.style.height = `${st.h}px`;

  if (settled) {
    zoomLastT = 0;
  } else {
    animationFrameId = requestAnimationFrame(smoothAnimate);
  }
}

function updateStacksLanguage() {
  const stacksTitleLine1 = document.querySelector('.stacks-title .line-1');
  const stacksTitleLine2 = document.querySelector('.stacks-title .line-2');
  const stacksDescription = document.querySelector('.stacks-description');
  
  if (stacksTitleLine1) {
    stacksTitleLine1.textContent = texts[currentLanguage].stacksTitle;
  }
  
  if (stacksTitleLine2) {
    stacksTitleLine2.textContent = texts[currentLanguage].stacksSubtitle;
  }
  
  if (stacksDescription) {
    stacksDescription.innerHTML = texts[currentLanguage].stacksDescription;
  }
}

function updateTextLanguage() {
  const descriptionText = document.querySelector('.description-text');
  if (descriptionText) {
    descriptionText.textContent = texts[currentLanguage].description;
  }
  
  if (madeByText) {
    madeByText.textContent = texts[currentLanguage].madeBy;
  }
  
  const lines = texts[currentLanguage].lines;
  
  if (finalLine1Text) {
    finalLine1Text.innerHTML = lines[0].text;
  }
  
  if (finalLine2Text) {
    finalLine2Text.innerHTML = lines[1].text;
  }
  
  if (finalLine3Text) {
    finalLine3Text.innerHTML = lines[2].text;
  }
  
  if (finalLine4Text) {
    finalLine4Text.innerHTML = lines[3].text;
  }
  
  if (finalLine5Text) {
    finalLine5Text.innerHTML = lines[4].text;
  }
  
  updateStacksLanguage();
  updateFinalContainerTexts();
  updatePortfolioTexts();
  updateCasesLanguage();
  layoutAbout();
}

function playMaskAnimation() {
  if (hasMaskAnimationPlayed) return;
  
  hasMaskAnimationPlayed = true;
  isTextVisible = false;
  
  nameMaskContainer.style.transition = 'opacity 0.5s ease-out, visibility 0.5s ease-out, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  descriptionMaskContainer.style.transition = 'opacity 0.5s ease-out, visibility 0.5s ease-out, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  nameAlvaroContainer.style.opacity = '0';
  nameAlvaroContainer.style.visibility = 'hidden';
  descriptionContainer.style.opacity = '0';
  descriptionContainer.style.visibility = 'hidden';
  
  nameMaskContainer.style.opacity = '1';
  nameMaskContainer.style.visibility = 'visible';
  descriptionMaskContainer.style.opacity = '1';
  descriptionMaskContainer.style.visibility = 'visible';
  
  nameTextMask.style.animation = 'revealText 1.2s ease-out forwards';
  
  setTimeout(() => {
    nameAlvaroContainer.style.opacity = '1';
    nameAlvaroContainer.style.visibility = 'visible';
    descriptionContainer.style.opacity = '1';
    descriptionContainer.style.visibility = 'visible';
    isTextVisible = true;
  }, 100);
  
  setTimeout(() => {
    descriptionTextMask.style.animation = 'revealText 0.8s ease-out forwards';
    
    setTimeout(() => {
      nameMaskContainer.style.opacity = '0';
      nameMaskContainer.style.visibility = 'hidden';
      descriptionMaskContainer.style.opacity = '0';
      descriptionMaskContainer.style.visibility = 'hidden';
    }, 1000);
  }, 200);
}

// --- LÓGICA DE ZOOM AO SCROLL COM TRANSIÇÃO SUAVE ---
// Container 2: texto à esquerda e foto à direita, num conjunto centralizado na tela
// (antes o texto usava "centro - 490px" e a foto ficava presa a 50px da borda direita,
// então o vão entre os dois crescia com a largura da tela).
// ---- escala da interface em monitores grandes ----
// Até 1920px de largura nada muda (--k = 1). Acima disso, tudo cresce junto, para o site
// manter as mesmas proporções em vez de ficar "pequeno" no meio da tela. A altura também
// limita a escala (monitores ultrawide e baixos).
let uiK = 1;
function updateViewportScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  uiK = vw > 1920 ? Math.min(vw / 1920, Math.max(1, vh / 1000), 2.2) : 1;
  document.documentElement.style.setProperty('--k', uiK.toFixed(4));
}
updateViewportScale();

// ---- container 2 (sobre): ajuste dinâmico do bloco de texto ----
// desktop: texto à esquerda e foto à direita, escalados juntos (cabem em telas baixas e
// crescem em monitores grandes). Celular/tablet em pé: empilhado e centralizado, com a
// escala calculada pelo tamanho real do texto (muda com o idioma).
const ABOUT_DESK_W = 873;
const ABOUT_DESK_H = 519;   // altura natural do bloco de texto (nome + descrição)
let aboutScale = 1;

function layoutAbout() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const root = document.documentElement.style;
  const compact = vw <= 1024 && vh > vw * 0.9;
  document.body.classList.toggle('about-compact', compact);

  if (!compact) {
    aboutScale = Math.max(0.45, Math.min(uiK, (vw - 40) / ABOUT_DESK_W, (vh - 190) / ABOUT_DESK_H));
    root.setProperty('--abt', aboutScale.toFixed(4));
    root.removeProperty('--abt-name');
    root.removeProperty('--abt-desc');
    return;
  }

  const padX = Math.max(16, vw * 0.06);
  const availW = vw - padX * 2;
  const headerH = vw <= 700 ? 138 : 150;
  const availH = vh - headerH - Math.max(20, vh * 0.04);

  // medidas naturais (escala 1)
  const sD0 = Math.max(1, Math.min(1.7, vw / 400));
  root.setProperty('--abt-name', '1');
  root.setProperty('--abt-desc', '1');
  root.setProperty('--abt-desc-w', `${Math.min(availW / sD0, 520).toFixed(1)}px`);
  const nw = nameAlvaroContainer.offsetWidth || 325;
  const nh = nameAlvaroContainer.offsetHeight || 260;
  const dh0 = descriptionContainer.offsetHeight || 260;

  let sD = sD0;
  let sN = Math.min(availW / nw, 1.5);
  const gap = 18;
  const total = () => nh * sN + gap + dh0 * sD;

  if (total() > availH) sN = Math.max(0.5, (availH - gap - dh0 * sD) / nh);
  if (total() > availH) sD = Math.max(0.78, (availH - gap - nh * sN) / dh0);
  if (total() > availH) sN = Math.max(0.42, (availH - gap - dh0 * sD) / nh);

  aboutScale = sN;
  const top0 = headerH + Math.max(0, (availH - total()) / 2);
  root.setProperty('--abt-name', sN.toFixed(4));
  root.setProperty('--abt-desc', sD.toFixed(4));
  root.setProperty('--abt-desc-w', `${(Math.min(availW, 520 * sD) / sD).toFixed(1)}px`);
  root.setProperty('--abt-name-top', `${(top0 / sN).toFixed(1)}px`);
  root.setProperty('--abt-desc-top', `${((top0 + nh * sN + gap) / sD).toFixed(1)}px`);
}

// escala da foto do hero/sobre: cresce em monitores grandes (uiK) e encolhe junto com o
// texto em telas baixas (aboutScale), para os dois nunca se sobreporem
function aboutImageK() {
  if (document.body.classList.contains('about-compact')) return 1;
  return uiK > 1 ? uiK : aboutScale;
}

// posição vertical dos textos para que o centro do bloco coincida com o centro da foto
function aboutTops() {
  const x = (72 * aboutImageK()) / aboutScale - 107;
  return { name: `calc(50% + ${x.toFixed(1)}px)`, desc: `calc(50% + ${(x + 170).toFixed(1)}px)` };
}

function aboutLayoutMetrics() {
  const vw = window.innerWidth;
  const s = aboutScale;
  const group = Math.max(ABOUT_DESK_W * s, Math.min(1040 * s, vw - 120 * s));
  const textLeft = (vw - group) / 2;
  return { textLeft, imageRight: textLeft + group };
}

function aboutImageCenterX() {
  // foto no estado final: escala 0.6 e largura 555px (limitada à tela)
  const visibleW = 0.6 * Math.min(555.43 * aboutImageK(), window.innerWidth);
  return aboutLayoutMetrics().imageRight - visibleW / 2;
}

function handleMainScroll() {
  if (isPortfolioActive) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = window.innerHeight * 1.5;
  const scrollFraction = Math.min(scrollTop / maxScroll, 1);

  // Atualizar a variável isMobile (pode mudar com rotação do dispositivo)
  isMobile = window.innerWidth <= 768;

  // ==============================================
  // LÓGICA CONDICIONAL PARA ZOOM (DESKTOP) VS FADE (MOBILE)
  // ==============================================
  if (isMobile) {
    // MOBILE → fade ao invés de scale
    const fadeProgress = Math.min(scrollTop / 150, 1); // 150px para fade completo

    zoomAlign.active = false;
    zoomBox.style.transform = 'scale(1)';
    zoomBox.style.opacity = `${1 - fadeProgress}`;
    zoomBox.style.transition = 'opacity 0.3s ease-out';

    if (fadeProgress >= 1) {
      zoomBox.style.pointerEvents = 'none';
    } else {
      zoomBox.style.pointerEvents = 'auto';
    }

    // Manter currentScale para compatibilidade com outras partes do código
    currentScale = 1;
  } else {
    // DESKTOP → mantém comportamento atual (scale)
    currentScale = 1 - (scrollFraction * 0.4);
    
    const cropStart = 0.3;
    const cropEnd = 0.85;
    
    // a caixa começa cobrindo a viewport inteira (em monitores > 1920px sobrava faixa preta)
    const hk = aboutImageK();
    const heroW0 = Math.max(1920 * hk, window.innerWidth);
    const heroH0 = Math.max(1080 * hk, window.innerHeight);
    let width = heroW0;
    let height = heroH0;
    let aspectRatio = heroW0 / heroH0;
    
    if (scrollFraction > cropStart) {
      const cropProgress = Math.min((scrollFraction - cropStart) / (cropEnd - cropStart), 1);
      
      const startAspect = heroW0 / heroH0;
      const endAspect = 3/7;
      
      const easedProgress = cropProgress < 0.5 
        ? 0.5 * Math.pow(cropProgress * 2, 2)
        : 0.5 * (2 - Math.pow(2 - cropProgress * 2, 2));
      
      aspectRatio = startAspect + (endAspect - startAspect) * easedProgress;
      
      const baseHeight = heroH0 * (1 + cropProgress * 0.2);
      const newHeight = baseHeight;
      const newWidth = newHeight * aspectRatio;
      
      const minWidth = 1920 * 0.25 * hk;
      
      width = Math.max(newWidth, minWidth);
      height = newHeight;
      
      const translateY = scrollFraction * 120 * hk;
      
      const translateXProgress = cropProgress < 0.5 
        ? 0.5 * Math.pow(cropProgress * 2, 2)
        : 0.5 * (2 - Math.pow(2 - cropProgress * 2, 2));
      
      const translateX = translateXProgress * 15 * hk;
      
      setZoomTarget(currentScale, translateX, translateY, width, height);
      
      // o centro da foto desliza do meio da tela até a posição do conjunto (sem "pulo")
      zoomBox.style.transition = 'none';
      zoomBox.style.marginLeft = '';
      zoomBox.style.marginRight = '';
      zoomAlign.active = true;
      zoomAlign.centerX = window.innerWidth / 2 +
        (aboutImageCenterX() - window.innerWidth / 2) * translateXProgress;
      
    } else {
      setZoomTarget(currentScale, 0, 0, heroW0, heroH0);
      
      zoomAlign.active = false;
      zoomBox.style.position = '';
      zoomBox.style.right = '';
      zoomBox.style.left = '';
      zoomBox.style.marginLeft = '';
      zoomBox.style.marginRight = '';
    }
    
    zoomBox.style.borderRadius = '0';
    zoomBox.style.opacity = '1';
    zoomBox.style.pointerEvents = 'auto';
    
    // tablet em pé (layout compacto): a foto some por fade, como no celular,
    // em vez de deslizar para a direita por cima do texto centralizado
    if (document.body.classList.contains('about-compact')) {
      const fade = Math.min(Math.max((scrollFraction - 0.45) / 0.25, 0), 1);
      zoomBox.style.opacity = `${1 - fade}`;
      zoomBox.style.pointerEvents = fade >= 1 ? 'none' : 'auto';
    } else {
      zoomBox.style.opacity = '1';
      zoomBox.style.pointerEvents = 'auto';
    }
    
    requestZoomAnimation();
  }
  
  updateFixedElementsColors(scrollFraction);
  
  const videoTransitionStart = 0.4;
  const videoTransitionEnd = 0.7;
  
  if (scrollFraction > videoTransitionStart) {
    const videoProgress = Math.min((scrollFraction - videoTransitionStart) / (videoTransitionEnd - videoTransitionStart), 1);
    
    if (whiteVideo) {
      whiteVideo.style.opacity = (1 - videoProgress).toString();
      whiteVideo.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (grayBackground) {
      grayBackground.style.opacity = videoProgress.toString();
    }
    
    if (grayBackground) {
      grayBackground.style.width = '100%';
      grayBackground.style.height = '100%';
      grayBackground.style.objectFit = 'cover';
    }
  } else {
    if (whiteVideo) {
      whiteVideo.style.opacity = '1';
      whiteVideo.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (grayBackground) {
      grayBackground.style.opacity = '0';
    }
  }
  
  if (myPicture) {
    const saturation = 1 - (scrollFraction * 1);
    myPicture.style.filter = `saturate(${Math.max(0, saturation)})`;
    myPicture.style.transition = 'filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }
  
  const fadeStart = 0.3;
  const fadeEnd = 0.8;
  
  if (scrollFraction > fadeStart) {
    const fadeProgress = Math.min((scrollFraction - fadeStart) / (fadeEnd - fadeStart), 1);
    const opacity = 1 - fadeProgress;
    
    if (souzaLogo) {
      souzaLogo.style.opacity = opacity;
      souzaLogo.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (imagesContainer) {
      imagesContainer.style.opacity = opacity;
      imagesContainer.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (svgImage) {
      svgImage.style.opacity = opacity;
      svgImage.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (brazilIcon) {
      brazilIcon.style.opacity = opacity;
      brazilIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), animation-duration 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (designIcon) {
      designIcon.style.opacity = opacity;
      designIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  } else {
    if (souzaLogo) {
      souzaLogo.style.opacity = '1';
      souzaLogo.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (imagesContainer) {
      imagesContainer.style.opacity = '1';
      imagesContainer.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (svgImage) {
      svgImage.style.opacity = '1';
      svgImage.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (brazilIcon) {
      brazilIcon.style.opacity = '1';
      brazilIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), animation-duration 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (designIcon) {
      designIcon.style.opacity = '1';
      designIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (myPicture) {
      myPicture.style.filter = 'saturate(1)';
      myPicture.style.transition = 'filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  }

  const showTextThreshold = 0.85;
  
  if (scrollFraction > showTextThreshold) {
    const textProgress = Math.min((scrollFraction - showTextThreshold) / (1 - showTextThreshold), 1);
    
    const containerFinalWidth = 480;
    const screenCenter = window.innerWidth / 2;
    const containerLeft = screenCenter - (containerFinalWidth / 2);
    const aboutLeft = aboutLayoutMetrics().textLeft / aboutScale;
    const aboutTop = aboutTops();
    
    if (nameMaskContainer) {
      nameMaskContainer.style.left = `${aboutLeft}px`;
      nameMaskContainer.style.top = aboutTop.name;
      nameMaskContainer.style.transform = 'translateY(-50%)';
    }
    
    if (descriptionMaskContainer) {
      descriptionMaskContainer.style.left = `${aboutLeft}px`;
      descriptionMaskContainer.style.top = aboutTop.desc;
    }
    
    nameAlvaroContainer.style.left = `${aboutLeft}px`;
    nameAlvaroContainer.style.top = aboutTop.name;
    nameAlvaroContainer.style.transform = 'translateY(-50%)';
    
    descriptionContainer.style.left = `${aboutLeft}px`;
    descriptionContainer.style.top = aboutTop.desc;
    
    if (textProgress > 0.95 && !hasMaskAnimationPlayed) {
      playMaskAnimation();
    } else if (textProgress > 0.95 && isTextVisible) {
      nameAlvaroContainer.style.opacity = '1';
      nameAlvaroContainer.style.visibility = 'visible';
      descriptionContainer.style.opacity = '1';
      descriptionContainer.style.visibility = 'visible';
    }
  } else {
    hasMaskAnimationPlayed = false;
    isTextVisible = false;
    
    if (nameMaskContainer) {
      nameMaskContainer.style.opacity = '0';
      nameMaskContainer.style.visibility = 'hidden';
      nameTextMask.style.animation = 'none';
      nameMaskContainer.style.transform = 'translateY(-50%)';
    }
    
    if (descriptionMaskContainer) {
      descriptionMaskContainer.style.opacity = '0';
      descriptionMaskContainer.style.visibility = 'hidden';
      descriptionTextMask.style.animation = 'none';
      descriptionMaskContainer.style.transform = 'translateY(0)';
    }
    
    if (nameAlvaroContainer) {
      nameAlvaroContainer.style.opacity = '0';
      nameAlvaroContainer.style.visibility = 'hidden';
      nameAlvaroContainer.style.transform = 'translateY(-50%)';
    }
    
    if (descriptionContainer) {
      descriptionContainer.style.opacity = '0';
      descriptionContainer.style.visibility = 'hidden';
      descriptionContainer.style.transform = 'translateY(0)';
    }
  }
  
  const finalStateThreshold = 0.98;
  const isContainerAtFinalPosition = scrollFraction >= finalStateThreshold;
  
  const liftStartScroll = maxScroll + 50;
  const liftProgress = Math.max(0, (scrollTop - liftStartScroll) / LIFT_RANGE);
  
  const stage = stageEl;
  
  if (isContainerAtFinalPosition && !isFinalState) {
    isFinalState = true;
    
    if (stage) {
      stage.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    [nameAlvaroContainer, descriptionContainer, nameMaskContainer, descriptionMaskContainer, souzaLogoFinalContainer].forEach(el => {
      if (el) {
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out, visibility 0.5s ease-out';
      }
    });
  }
  
  if (isFinalState) {
    const easedLift = easeInOutCubic(Math.min(liftProgress, 1));
    const translateY = `${easedLift * -100}vh`;
    
    if (stage) {
      stage.style.transform = `translateY(${translateY})`;
    }
    
    [nameAlvaroContainer, descriptionContainer, nameMaskContainer, descriptionMaskContainer].forEach(el => {
      if (el) {
        const baseTransform = el === nameAlvaroContainer || el === nameMaskContainer
          ? 'translateY(-50%)' 
          : '';
        el.style.transform = `${baseTransform} translateY(${translateY})`;
      }
    });
    
    if (souzaLogoFinalContainer && hasSouzaLogoFinalAppeared) {
      souzaLogoFinalContainer.style.transform = `translateY(${translateY})`;
    }
  }
  
  if (!isContainerAtFinalPosition && isFinalState) {
    isFinalState = false;
    
    if (stage) {
      stage.style.transform = 'translateY(0)';
    }
    
    [nameAlvaroContainer, descriptionContainer, nameMaskContainer, descriptionMaskContainer, souzaLogoFinalContainer].forEach(el => {
      if (el) {
        if (el === nameAlvaroContainer || el === nameMaskContainer) {
          el.style.transform = 'translateY(-50%)';
        } else {
          el.style.transform = 'translateY(0)';
        }
      }
    });
  }
  
  const finalTextAppearThreshold = liftStartScroll + FINAL_TEXT_APPEAR_SCROLL;
  
  if (scrollTop > finalTextAppearThreshold) {
    if (!hasFinalTextAppeared) {
      showFinalText();
      isFinalTextParallaxActive = true;
      
      finalTextContainer.style.opacity = '1';
      finalMasksContainer.style.opacity = '1';
    }
    
    const finalTextParallaxProgress = Math.min(
      (scrollTop - finalTextAppearThreshold) / FINAL_TEXT_PARALLAX_RANGE, 
      1
    );
    
    const easedParallax = easeInOutCubic(finalTextParallaxProgress);
    const textTranslateY = `-${easedParallax * 50}vh`;
    const opacityProgress = Math.min(finalTextParallaxProgress, 1);
    const opacity = 1 - Math.max(0, (opacityProgress - 0.5) * 2);
    
    finalTextContainer.style.transform = `translate(-50%, calc(-50% + ${textTranslateY}))`;
    finalTextContainer.style.opacity = opacity.toString();
    finalMasksContainer.style.transform = `translate(-50%, calc(-50% + ${textTranslateY}))`;
    finalMasksContainer.style.opacity = opacity.toString();
    
    if (opacity <= 0.1 && hasFinalTextAppeared && !hasCarouselBeenActivated && !carouselActivationPending) {
      carouselActivationPending = true;
      setTimeout(() => {
        carouselActivationPending = false;
        showCarousel();
        hasCarouselBeenActivated = true;
      }, 300);
    }
    
  } else {
    if (hasFinalTextAppeared && !isFinalTextParallaxActive) {
      hideFinalText();
    }
    
    finalTextContainer.style.transform = 'translate(-50%, -50%)';
    finalTextContainer.style.opacity = '0';
    finalMasksContainer.style.transform = 'translate(-50%, -50%)';
    finalMasksContainer.style.opacity = '0';
    
    if (hasCarouselBeenActivated && scrollTop < finalTextAppearThreshold) {
      hideCarousel();
      hasCarouselBeenActivated = false;
    }
    
    if (hasStacksBeenActivated && scrollTop < finalTextAppearThreshold) {
      hideStacks();
      hasStacksBeenActivated = false;
    }
    
    if (hasFinalContainerBeenActivated && scrollTop < finalTextAppearThreshold) {
      hideFinalContainer();
      hasFinalContainerBeenActivated = false;
      
      if (finalCenterText) {
        finalCenterText.style.opacity = '0';
      }
      
      if (finalContactsLabel) {
        finalContactsLabel.style.opacity = '0';
      }
      
      if (finalWorksLabel) {
        finalWorksLabel.style.opacity = '0';
      }
      
      finalTextLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.visibility = 'hidden';
      });
    }
  }
  
  const finalContainerAppearThreshold = liftStartScroll + FINAL_CONTAINER_APPEAR_SCROLL;
  
  // CORREÇÃO 2: Stacks aparece mais cedo no mobile
  const stacksTrigger = isMobile ? STACKS_TRIGGER_MOBILE : STACKS_TRIGGER_DESKTOP;
  
  if (isStacksActive && scrollTop > finalContainerAppearThreshold) {
    if (!hasFinalContainerBeenActivated) {
      showFinalContainer();
    }
  }

  updateTiltTarget();
  syncVideoPlayback();
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    scrollTicking = false;
    handleMainScroll();
  });
}, { passive: true });

// --- INCLINAÇÃO DA FOTO EM DIREÇÃO AO MOUSE ---
// A foto fica no lugar e se inclina suavemente para o lado em que o mouse está.
const TILT_MAX_X = 5;      // graus (cima/baixo)
const TILT_MAX_Y = 8;      // graus (esquerda/direita)
const TILT_SHIFT = 12;     // deslocamento lateral em px
const TILT_EASE = 0.075;   // suavidade (menor = mais lento)

const tiltCur = { rx: 0, ry: 0, tx: 0 };
const tiltTarget = { rx: 0, ry: 0, tx: 0 };
let tiltRAF = null;
let tiltLastT = 0;
let tiltPointer = null;

// o efeito some conforme o hero é rolado (a foto vai ficando só no lugar)
function tiltStrength() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
  const frac = Math.min(scrollTop / (window.innerHeight * 1.5), 1);
  if (frac <= 0.3) return 1;
  return Math.max(0, 1 - (frac - 0.3) / 0.3);
}

function updateTiltTarget() {
  if (!myPicture) return;
  const blocked = isPortfolioActive || isCarouselActive || isMobile ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!tiltPointer || blocked) {
    tiltTarget.rx = tiltTarget.ry = tiltTarget.tx = 0;
  } else {
    const k = tiltStrength();
    const nx = (tiltPointer.x / window.innerWidth) * 2 - 1;
    const ny = (tiltPointer.y / window.innerHeight) * 2 - 1;
    tiltTarget.ry = nx * TILT_MAX_Y * k;
    tiltTarget.rx = -ny * TILT_MAX_X * k;
    tiltTarget.tx = nx * TILT_SHIFT * k;
  }
  if (tiltRAF === null) {
    tiltLastT = 0;
    tiltRAF = requestAnimationFrame(tiltFrame);
  }
}

function tiltFrame(t) {
  tiltRAF = null;
  const dt = tiltLastT ? Math.min((t - tiltLastT) / 16.667, 4) : 1;
  tiltLastT = t;
  const k = 1 - Math.pow(1 - TILT_EASE, dt);

  tiltCur.rx += (tiltTarget.rx - tiltCur.rx) * k;
  tiltCur.ry += (tiltTarget.ry - tiltCur.ry) * k;
  tiltCur.tx += (tiltTarget.tx - tiltCur.tx) * k;

  const settled = Math.abs(tiltTarget.rx - tiltCur.rx) < 0.01 &&
    Math.abs(tiltTarget.ry - tiltCur.ry) < 0.01 && Math.abs(tiltTarget.tx - tiltCur.tx) < 0.05;
  if (settled) {
    tiltCur.rx = tiltTarget.rx; tiltCur.ry = tiltTarget.ry; tiltCur.tx = tiltTarget.tx;
  }

  const idle = settled && tiltCur.rx === 0 && tiltCur.ry === 0 && tiltCur.tx === 0;
  myPicture.style.transform = idle
    ? ''
    : `perspective(1200px) translate3d(${tiltCur.tx.toFixed(2)}px, 0, 0) rotateX(${tiltCur.rx.toFixed(3)}deg) rotateY(${tiltCur.ry.toFixed(3)}deg) scale(1.03)`;

  if (!settled) tiltRAF = requestAnimationFrame(tiltFrame);
}

function processMouseMove(e) {
  if (isPortfolioActive) return;
  tiltPointer = { x: e.clientX, y: e.clientY };
  updateTiltTarget();
}

let pendingMouseEvent = null;
let mouseTicking = false;
const canHover = window.matchMedia('(hover: hover)').matches;
if (canHover) {
  document.addEventListener('mousemove', (e) => {
    pendingMouseEvent = e;
    if (mouseTicking) return;
    mouseTicking = true;
    requestAnimationFrame(() => {
      mouseTicking = false;
      if (pendingMouseEvent) processMouseMove(pendingMouseEvent);
    });
  }, { passive: true });
}

document.addEventListener('mouseleave', () => {
  tiltPointer = null;
  updateTiltTarget();
});

// --- INICIALIZAÇÃO ---
createGrayBackground();

// o site é uma sequência que começa no hero: não restaurar scroll no meio dela
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

layoutAbout();
// o texto do canvas usa fontes web: redesenha quando elas terminam de carregar
if (document.fonts) {
  document.fonts.ready.then(() => { invalidateCarousel(); layoutAbout(); });
  if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', invalidateCarousel);
}

if (portfolioLanguageSwitch) {
  portfolioLanguageSwitch.addEventListener('click', togglePortfolioLanguage);
}

if (languageSwitch) {
  languageSwitch.addEventListener('click', toggleLanguage);
}

if (hamburger) {
  hamburger.addEventListener('click', togglePortfolio);
}

// ---------------------------------------------------------------
// ROTEADOR DE ENTRADA (roda, toque e teclado)
// Antes cada seção escutava só o próprio container: a roda sobre o cabeçalho,
// o botão de idioma ou o menu rolava a página "por baixo" sem mover nada.
// Agora um único ponto decide, pelo estado atual, quem recebe o gesto.
// ---------------------------------------------------------------
function activeSection() {
  if (isPortfolioActive) return 'portfolio';
  if (isFinalContainerActive) return 'final';
  if (isStacksActive) return 'stacks';
  if (isCarouselActive) return 'carousel';
  return 'page';
}

function dispatchWheel(section, e) {
  if (section === 'carousel') handleCarouselWheel(e);
  else if (section === 'stacks') handleStacksWheel(e);
  else if (section === 'final') handleFinalContainerWheel(e);
}

const routerWheel = (e) => {
  if (e.ctrlKey) return;   // zoom do navegador
  if (isCaseModalOpen) {
    if (!e.target.closest || !e.target.closest('.case-modal-scroll')) e.preventDefault();
    return;
  }
  const section = activeSection();
  if (section === 'page' || section === 'portfolio') return;

  const now = performance.now();
  if (now - lastWheelTs > 140) stacksGestureArmed = true;   // pausa = gesto novo
  lastWheelTs = now;
  dispatchWheel(section, e);
};

const routerTouchStart = (e) => {
  if (isCaseModalOpen) return;
  const section = activeSection();
  if (section === 'carousel') handleCarouselTouchStart(e);
  else if (section === 'stacks') { stacksGestureArmed = true; handleStacksTouchStart(e); }
  else if (section === 'final') { stacksGestureArmed = true; handleFinalContainerTouchStart(e); }
};

const routerTouchMove = (e) => {
  if (isCaseModalOpen) {
    if (!e.target.closest || !e.target.closest('.case-modal-scroll')) e.preventDefault();
    return;
  }
  const section = activeSection();
  if (section === 'carousel') handleCarouselTouchMove(e);
  else if (section === 'stacks') handleStacksTouchMove(e);
  else if (section === 'final') handleFinalContainerTouchMove(e);
};

const routerTouchEnd = (e) => { if (!isCaseModalOpen && activeSection() === 'carousel') handleCarouselTouchEnd(e); };
const routerTouchCancel = (e) => { if (!isCaseModalOpen && activeSection() === 'carousel') handleCarouselTouchCancel(e); };

// Os listeners não passivos só existem enquanto uma seção controla o scroll
// (cases, stacks, final ou pop-up). No hero e nas seções iniciais não há nenhum
// listener de roda/toque da página: o navegador rola 100% nativo, sem esperar o JS.
let inputRouterOn = false;
function syncInputRouter() {
  const section = activeSection();
  const want = isCaseModalOpen || (section !== 'page' && section !== 'portfolio');
  if (want === inputRouterOn) return;
  inputRouterOn = want;
  const fn = want ? 'addEventListener' : 'removeEventListener';
  window[fn]('wheel', routerWheel, { passive: false });
  window[fn]('touchstart', routerTouchStart, { passive: false });
  window[fn]('touchmove', routerTouchMove, { passive: false });
  window[fn]('touchend', routerTouchEnd);
  window[fn]('touchcancel', routerTouchCancel);
}
// todas as trocas de seção alteram as classes do body
new MutationObserver(syncInputRouter).observe(document.body, { attributes: true, attributeFilter: ['class'] });
syncInputRouter();

// teclado: setas, PageUp/PageDown e espaço também navegam (antes só a roda/toque funcionavam)
window.addEventListener('keydown', (e) => {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target && e.target.tagName) || '';
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;

  if (isCaseModalOpen) { handleModalKey(e); return; }

  const section = activeSection();
  if (section === 'page' || section === 'portfolio') return;
  if (tag === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return;   // ativa o card/botão focado

  let d = 0;
  switch (e.key) {
    case 'ArrowDown': case 'ArrowRight': d = 140; break;
    case 'ArrowUp': case 'ArrowLeft': d = -140; break;
    case 'PageDown': d = 700; break;
    case 'PageUp': d = -700; break;
    case ' ': d = e.shiftKey ? -700 : 700; break;
    default: return;
  }
  e.preventDefault();
  stacksGestureArmed = true;
  dispatchWheel(section, { deltaX: 0, deltaY: d, deltaMode: 0, preventDefault() {} });
});

// ---------------------------------------------------------------
// CASES: clique/foco nos cards, pop-up e botão de idioma acessível
// ---------------------------------------------------------------
casesGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.case-card');
  if (!card) return;
  // um arrasto no celular não pode abrir o projeto
  if (casesDragDist > 10 && Date.now() - casesLastDragAt < 300) return;
  openCase(Number(card.dataset.index), card);
});

// navegar por Tab até um card fora da tela: leva o carrossel até ele
casesGrid.addEventListener('focusin', (e) => {
  const card = e.target.closest('.case-card');
  if (!card) return;
  carouselContainer.scrollLeft = 0;
  carouselContainer.scrollTop = 0;
  if (isMobile) {
    carouselVerticalTarget = clampNum(card.offsetTop + casesGrid.offsetTop - window.innerHeight * 0.25,
      0, Math.max(0, mobileTotalHeight - window.innerHeight + 100));
  } else {
    carouselScrollTarget = clampNum(card.offsetLeft - window.innerWidth * 0.2, 0, maxHorizontalScroll);
  }
});

caseModal.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) closeCase(); });
caseModalClose.addEventListener('click', closeCase);
caseModalPrev.addEventListener('click', () => stepCase(-1));
caseModalNext.addEventListener('click', () => stepCase(1));

[languageSwitch, portfolioLanguageSwitch].forEach(sw => {
  if (!sw) return;
  sw.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLanguage(); }
  });
});

renderCases();
updateCasesLanguage();
buildStacksCarousel();

// ---------------------------------------------------------------
// MENU: a foto do link sob o cursor fica colorida e saturada; as outras ficam em cinza
// ---------------------------------------------------------------
const menuPhotos = document.querySelectorAll('.portfolio-photo[data-key]');
function setMenuPhoto(key) {
  menuPhotos.forEach(p => p.classList.toggle('is-active', p.dataset.key === key));
}
document.querySelectorAll('.portfolio-menu-item[data-key]').forEach(link => {
  const on = () => setMenuPhoto(link.dataset.key);
  const off = () => setMenuPhoto(null);
  link.addEventListener('pointerenter', on);
  link.addEventListener('pointerleave', off);
  link.addEventListener('focus', on);        // teclado
  link.addEventListener('blur', off);
  link.addEventListener('touchstart', on, { passive: true });   // toque
});
// a página atual não abre nada (o href é só um marcador)
document.querySelectorAll('.portfolio-menu-item.portfolio').forEach(l => l.addEventListener('click', e => e.preventDefault()));


let resizeTimer = null;
let lastResizeW = window.innerWidth;
let lastResizeH = window.innerHeight;

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  // No celular a barra de endereço muda só a altura enquanto se rola:
  // isso não pode reiniciar o carrossel nem reconstruir o DOM.
  const onlyHeightChanged = w === lastResizeW && h !== lastResizeH;
  if (onlyHeightChanged && (w <= 768 || window.matchMedia('(pointer: coarse)').matches)) {
    lastResizeH = h;
    return;
  }

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    lastResizeW = window.innerWidth;
    lastResizeH = window.innerHeight;
    isMobile = window.innerWidth <= 768;
    updateViewportScale();
    layoutAbout();
    if (window.innerWidth !== stacksBuiltWidth) buildStacksCarousel();

    if (isCarouselActive) {
      updateCarouselLayout(true);
    }
    handleMainScroll();
  }, 120);
});

updatePortfolioLanguageSwitch();
updateTextLanguage();

// Tela de carregamento: sai quando a animação do logo terminou E a página carregou
// (antes era um tempo fixo de 7s, mesmo com tudo pronto)
const LOADING_HOLD_AFTER_LOGO_MS = 400;   // respiro depois do fim da animação
const LOADING_LOGO_FALLBACK_MS = 5000;    // se o vídeo não tocar (economia de dados etc.)
const LOADING_MAX_WAIT_MS = 12000;        // conexão muito lenta: entra mesmo assim

document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingLogo = document.querySelector('.loading-logo');

  let logoDone = false;
  let pageLoaded = document.readyState === 'complete';
  let finished = false;

  function tryFinish() {
    if (finished || !logoDone || !pageLoaded) return;
    finished = true;

    loadingScreen.classList.add('fade-out');
    setTimeout(function() {
      loadingScreen.style.display = 'none';
      startWebsite();
    }, 1000);
  }

  function markLogoDone() {
    if (logoDone) return;
    setTimeout(function() { logoDone = true; tryFinish(); }, LOADING_HOLD_AFTER_LOGO_MS);
  }

  if (loadingLogo) {
    loadingLogo.addEventListener('ended', markLogoDone);
    loadingLogo.addEventListener('error', markLogoDone);
    const p = loadingLogo.play();
    if (p && p.catch) p.catch(function() { markLogoDone(); });
  } else {
    markLogoDone();
  }

  setTimeout(markLogoDone, LOADING_LOGO_FALLBACK_MS);

  if (!pageLoaded) {
    window.addEventListener('load', function() { pageLoaded = true; tryFinish(); });
    setTimeout(function() { pageLoaded = true; tryFinish(); }, LOADING_MAX_WAIT_MS);
  }
});

function startWebsite() {
  console.log('Site iniciado após carregamento');
}