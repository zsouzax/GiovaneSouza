const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const MARGIN = 60;
const languageSwitch = document.getElementById("languageSwitch");
const languageContainer = document.querySelector('.language-switch-container');
const myPictureEditing = document.querySelector('.my-picture-editing');
const revealMask = document.querySelector('.reveal-mask');
const zoomBox = document.getElementById("zoomBox");

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
const carouselCanvas = document.getElementById('carouselCanvas');
const carouselCtx = carouselCanvas.getContext('2d');
const carouselCanvasWrapper = document.getElementById('carouselCanvasWrapper');

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
    description: `Creative marketing and design professional,
born on December 28, 2007, in Porto Ferreira, São Paulo, Brazil.

Graduated in Multimedia from SENAI and currently studying
Machine Learning at Cruzeiro do Sul University.

Over 2 years of experience in creative production, logo design,
and social media management.`,
    madeBy: 'made by giovane souza',
    casesText: 'CASES',
    projectsText: '& PROJECTS',
    casesDescription: "Works that combine strategies,\ncreativity and artificial intelligence\nto generate real results for brands.",
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
    description: `Profissional criativo de marketing e design,
nascido em 28/12/2007 em Porto Ferreira – SP.

Formado em Multimídia pelo SENAI e em
formação em Machine Learning (Cruzeiro do Sul).

Mais de 2 anos de experiência com criativos,
logos e gestão de redes sociais.`,
    madeBy: 'criado por giovane souza',
    casesText: 'CASES',
    projectsText: '& PROJETOS',
    casesDescription: "Trabalhos que unem estratégias,\ncriatividade e inteligência artificial\npara gerar resultado real para marcas.",
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

function createFinalInfiniteCarousel() {
  finalCarouselTrack.innerHTML = '';
  
  for (let clone = 0; clone < finalCarouselConfig.totalClones; clone++) {
    finalCarouselImages.forEach(imgName => {
      const img = document.createElement('img');
      img.src = `img/${imgName.charAt(0).toUpperCase() + imgName.slice(1)}.png`;
      img.alt = imgName;
      finalCarouselTrack.appendChild(img);
    });
  }
  
  const totalImages = finalCarouselImages.length * finalCarouselConfig.totalClones;
  const totalWidth = (totalImages * finalCarouselConfig.imageSize) + 
                    ((totalImages - 1) * finalCarouselConfig.gap);
  
  finalCarouselTrack.style.transform = `translateX(-${totalWidth / 3}px)`;
  
  animateFinalCarousel();
}

function animateFinalCarousel() {
  let position = parseFloat(
    finalCarouselTrack.style.transform.replace('translateX(', '').replace('px)', '') || '0'
  );
  
  function moveCarousel() {
    position -= finalCarouselConfig.speed;
    
    const singleSetWidth = (finalCarouselImages.length * finalCarouselConfig.imageSize) + 
                         ((finalCarouselImages.length - 1) * finalCarouselConfig.gap);
    
    if (position <= -singleSetWidth) {
      position += singleSetWidth;
    }
    
    finalCarouselTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveCarousel);
  }
  
  moveCarousel();
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

function iniciarFinalContainer() {
  const fonts = [
    new FontFace('GCEpicPro', 'url(font/gc-epicpro.otf)'),
    new FontFace('Drogel', 'url(font/Drogel-gwrY1.otf)'),
    new FontFace('Sora', 'url(font/Sora-VariableFont_wght.ttf)')
  ];
  
  Promise.all(fonts.map(f => f.load())).then(loadedFonts => {
    loadedFonts.forEach(f => document.fonts.add(f));
    finalDesenharForma();
    
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
    
    updateFinalContainerTexts();
    createFinalInfiniteCarousel();
    
  }).catch(() => {
    finalDesenharForma();
    
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
    
    updateFinalContainerTexts();
    createFinalInfiniteCarousel();
  });
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
// CONFIGURAÇÃO DO CARROSSEL DE CASES COM RESPONSIVIDADE E CENTRALIZAÇÃO
// =========================

// Dimensões dos projetos para desktop - CENTRALIZADAS
const DESKTOP_CANVAS_WIDTH = 1920;
const DESKTOP_CANVAS_HEIGHT = 1080;

// Centralizar todos os elementos do carrossel
const DESKTOP_CENTER_X = DESKTOP_CANVAS_WIDTH / 2;
const DESKTOP_CENTER_Y = DESKTOP_CANVAS_HEIGHT / 2;

// Posições centralizadas para cada elemento
const DESKTOP_MARGIN_Y = 500;

// Primeiro retângulo - posicionado mais à esquerda do centro
const DESKTOP_RECT_WIDTH = 400;
const DESKTOP_RECT_HEIGHT = DESKTOP_RECT_WIDTH * (4 / 5);
const DESKTOP_RECT_X = DESKTOP_CENTER_X - 700;

// Segundo retângulo - mais centralizado
const DESKTOP_RECT2_WIDTH = 260;
const DESKTOP_RECT2_HEIGHT = DESKTOP_RECT2_WIDTH * (16 / 9);
const DESKTOP_RECT2_X = DESKTOP_RECT_X + DESKTOP_RECT_WIDTH + 80;
const DESKTOP_RECT2_Y = DESKTOP_CENTER_Y - 50;

// Terceiro retângulo - acima do segundo
const DESKTOP_RECT3_HEIGHT = 360;
const DESKTOP_RECT3_WIDTH = DESKTOP_RECT3_HEIGHT * (4 / 5);
const DESKTOP_RECT3_X = DESKTOP_RECT2_X + DESKTOP_RECT2_WIDTH + 60;
const DESKTOP_RECT3_Y = DESKTOP_CENTER_Y - 200;

// Quadrado - centralizado
const DESKTOP_SQUARE_SIZE = 480;
const DESKTOP_SQUARE_X = DESKTOP_RECT3_X + DESKTOP_RECT3_WIDTH + 80;
const DESKTOP_SQUARE_Y = DESKTOP_CENTER_Y - 100;

// Quarto retângulo - abaixo do quadrado
const DESKTOP_RECT4_HEIGHT = 380;
const DESKTOP_RECT4_WIDTH = DESKTOP_RECT4_HEIGHT * (4 / 5);
const DESKTOP_RECT4_X = DESKTOP_SQUARE_X + DESKTOP_SQUARE_SIZE + 80;
const DESKTOP_RECT4_Y = DESKTOP_CENTER_Y + 50;

// Quinto retângulo - mais à direita
const DESKTOP_RECT5_HEIGHT = 440;
const DESKTOP_RECT5_WIDTH = DESKTOP_RECT5_HEIGHT * (4 / 5);
const DESKTOP_RECT5_X = DESKTOP_RECT4_X + DESKTOP_RECT4_WIDTH + 60;
const DESKTOP_RECT5_Y = DESKTOP_CENTER_Y - 150;

// Sexto retângulo (último) - mais à direita
const DESKTOP_RECT6_WIDTH = 560;
const DESKTOP_RECT6_HEIGHT = DESKTOP_RECT6_WIDTH * (9 / 16);
const DESKTOP_RECT6_X = DESKTOP_RECT5_X + DESKTOP_RECT5_WIDTH + 80;
const DESKTOP_RECT6_Y = DESKTOP_CENTER_Y - 50;

// Posições dos textos dos retângulos
const DESKTOP_TEXT_OFFSET_Y = -40;

// ==============================================
// AJUSTE: TEXTO "CASES & PROJECTS" MAIS PARA A ESQUERDA EM DESKTOP
// ==============================================
const DESKTOP_TITLE_X = DESKTOP_CENTER_X - 600;
const DESKTOP_TITLE_Y = DESKTOP_MARGIN_Y - 300;
const DESKTOP_DESCRIPTION_X = DESKTOP_TITLE_X + 700;

// ==============================================
// CONFIGURAÇÃO DO CARROSSEL MOBILE - CORRIGIDO PARA EVITAR ESTICAMENTO
// ==============================================

// Dimensões FIXAS para mobile - NUNCA usar porcentagem do canvas
const MOBILE_RECT_WIDTH = 280;
const MOBILE_RECT_HEIGHT = 224; // 280 * 4/5

const MOBILE_RECT2_WIDTH = 200;
const MOBILE_RECT2_HEIGHT = 356; // 200 * 16/9

const MOBILE_RECT3_HEIGHT = 280;
const MOBILE_RECT3_WIDTH = 224; // 280 * 4/5

const MOBILE_SQUARE_SIZE = 260;

const MOBILE_RECT4_HEIGHT = 260;
const MOBILE_RECT4_WIDTH = 208; // 260 * 4/5

const MOBILE_RECT5_HEIGHT = 300;
const MOBILE_RECT5_WIDTH = 240; // 300 * 4/5

const MOBILE_RECT6_WIDTH = 320;
const MOBILE_RECT6_HEIGHT = 180; // 320 * 9/16

const MOBILE_SPACING = 60;
const MOBILE_BASE_Y = 450;

// Posições centralizadas baseadas no viewport real
const MOBILE_CENTER_X = window.innerWidth / 2;

// Posição X centralizada para mobile
const MOBILE_RECT_X = MOBILE_CENTER_X - (MOBILE_RECT_WIDTH / 2);
const MOBILE_RECT2_X = MOBILE_CENTER_X - (MOBILE_RECT2_WIDTH / 2);
const MOBILE_RECT3_X = MOBILE_CENTER_X - (MOBILE_RECT3_WIDTH / 2);
const MOBILE_SQUARE_X = MOBILE_CENTER_X - (MOBILE_SQUARE_SIZE / 2);
const MOBILE_RECT4_X = MOBILE_CENTER_X - (MOBILE_RECT4_WIDTH / 2);
const MOBILE_RECT5_X = MOBILE_CENTER_X - (MOBILE_RECT5_WIDTH / 2);
const MOBILE_RECT6_X = MOBILE_CENTER_X - (MOBILE_RECT6_WIDTH / 2);

// Textos centralizados
const MOBILE_TITLE_X = MOBILE_CENTER_X - 150;
const MOBILE_DESCRIPTION_X = MOBILE_CENTER_X - 120;
const MOBILE_TEXT_X = MOBILE_CENTER_X;

// Posições dos textos
const MOBILE_TITLE_Y = MOBILE_BASE_Y - 300;
const MOBILE_PROJECTS_Y = MOBILE_TITLE_Y + 40;
const MOBILE_DESCRIPTION_Y = MOBILE_PROJECTS_Y + 80;
const MOBILE_FIRST_IMAGE_Y = MOBILE_DESCRIPTION_Y + 120;

// Calcular altura total do carrossel vertical
const mobileTotalHeight = 
  MOBILE_FIRST_IMAGE_Y + 
  MOBILE_RECT_HEIGHT + MOBILE_SPACING +
  MOBILE_RECT2_HEIGHT + MOBILE_SPACING +
  MOBILE_RECT3_HEIGHT + MOBILE_SPACING +
  MOBILE_SQUARE_SIZE + MOBILE_SPACING +
  MOBILE_RECT4_HEIGHT + MOBILE_SPACING +
  MOBILE_RECT5_HEIGHT + MOBILE_SPACING +
  MOBILE_RECT6_HEIGHT + 300;

// Calcular o ponto final do carrossel desktop
const lastRectRightEdge = DESKTOP_RECT6_X + DESKTOP_RECT6_WIDTH;
const canvasWidth = carouselCanvas.width;
const maxHorizontalScroll = Math.max(0, lastRectRightEdge - canvasWidth + 200);

// Controles de estado do carrossel
let carouselScrollOffset = 0;
let carouselVerticalOffset = 0;
let carouselVerticalParallaxOffset = 0;
let isAtEndOfCarousel = false;
const maxVerticalParallax = 800;
let carouselScrollProgress = 0;
let hasReachedCarouselEnd = false;

// Elementos para máscaras do carrossel
let carouselTitleMask = null;
let carouselDescriptionMask = null;
let carouselImageTextMasks = [];
let hasCarouselMaskAnimationPlayed = false;

// Variável para detectar scroll para cima no carrossel
let carouselScrollUpCounter = 0;
const CAROUSEL_EXIT_SCROLL_COUNT = 3;

// Carregar imagens e vídeos do carrossel
const carouselMediaElements = {
  img1: new Image(),
  img2: new Image(),
  img3: new Image(),
  img4: new Image(),
  img5: new Image(),
  img6: new Image(),
  img7: new Image()
};

carouselMediaElements.img1.src = 'img/SCRM.jpg';
carouselMediaElements.img2.src = 'img/ReelGTB.jpg';
carouselMediaElements.img3.src = 'img/GTB.jpg';
carouselMediaElements.img4.src = 'img/01 - NVE.jpg';
carouselMediaElements.img5.src = 'img/02 - NVE.jpg';
carouselMediaElements.img6.src = 'img/DRPD.jpg';
carouselMediaElements.img7.src = 'img/DBZA.png';

let carouselMediaLoaded = false;
let carouselMediaLoadCount = 0;
const totalCarouselMedia = Object.keys(carouselMediaElements).length;

function checkCarouselMediaLoaded() {
  carouselMediaLoadCount++;
  if (carouselMediaLoadCount >= totalCarouselMedia) {
    carouselMediaLoaded = true;
    console.log('Todas as mídias do carrossel carregadas!');
  }
}

carouselMediaElements.img1.onload = checkCarouselMediaLoaded;
carouselMediaElements.img2.onload = checkCarouselMediaLoaded;
carouselMediaElements.img3.onload = checkCarouselMediaLoaded;
carouselMediaElements.img4.onload = checkCarouselMediaLoaded;
carouselMediaElements.img5.onload = checkCarouselMediaLoaded;
carouselMediaElements.img6.onload = checkCarouselMediaLoaded;
carouselMediaElements.img7.onload = checkCarouselMediaLoaded;

// =========================
// FUNÇÕES DE RESPONSIVIDADE DO CARROSSEL - CORRIGIDAS
// =========================

function updateCarouselLayout() {
  isMobile = window.innerWidth <= 768;
  carouselLayoutMode = isMobile ? 'vertical' : 'horizontal';
  
  // Resetar posições do carrossel ao mudar o layout
  carouselScrollOffset = 0;
  carouselVerticalOffset = 0;
  carouselVerticalParallaxOffset = 0;
  carouselScrollProgress = 0;
  isAtEndOfCarousel = false;
  hasReachedCarouselEnd = false;
  
  if (isMobile) {
    // CORREÇÃO: Não usar porcentagem no width do canvas para evitar esticamento
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = Math.min(mobileTotalHeight, window.innerHeight * 2.5);
    
    // Usar CSS para controlar o dimensionamento visual
    carouselCanvas.style.width = "100%";
    carouselCanvas.style.height = "auto";
    carouselCanvasWrapper.style.height = `${carouselCanvas.height}px`;
  } else {
    // CORREÇÃO 1: Aplicar scale para diminuir o carrossel em desktop
    const DESKTOP_SCALE = 0.65; // Diminui tudo em 15%
    
    carouselCanvas.width = DESKTOP_CANVAS_WIDTH;
    carouselCanvas.height = DESKTOP_CANVAS_HEIGHT;
    
    carouselCanvas.style.width = `${DESKTOP_CANVAS_WIDTH * DESKTOP_SCALE}px`;
    carouselCanvas.style.height = `${DESKTOP_CANVAS_HEIGHT * DESKTOP_SCALE}px`;
    
    carouselCanvasWrapper.style.height = `${DESKTOP_CANVAS_HEIGHT * DESKTOP_SCALE}px`;
  }
  
  // Redesenhar o carrossel
  drawCarousel();
}

function createCarouselMasks() {
  if (!isCarouselActive) return;
  
  // Remover máscaras existentes
  const carouselScene = document.querySelector('.carousel-scene');
  const existingMasks = carouselScene.querySelectorAll('.carousel-title-mask-container, .carousel-description-mask-container, .carousel-image-text-mask-container');
  existingMasks.forEach(mask => {
    if (mask.parentNode === carouselScene) {
      carouselScene.removeChild(mask);
    }
  });
  
  carouselImageTextMasks = [];
  
  if (isMobile) {
    // Criar máscaras para mobile - com posições FIXAS
    carouselTitleMask = document.createElement('div');
    carouselTitleMask.className = 'carousel-text-mask';
    carouselTitleMask.style.width = '300px';
    carouselTitleMask.style.height = '60px';
    carouselTitleMask.style.top = MOBILE_TITLE_Y + 'px';
    carouselTitleMask.style.left = MOBILE_TITLE_X + 'px';
    
    const titleMaskContainer = document.createElement('div');
    titleMaskContainer.className = 'carousel-title-mask-container';
    titleMaskContainer.style.width = '300px';
    titleMaskContainer.style.height = '60px';
    titleMaskContainer.style.top = MOBILE_TITLE_Y + 'px';
    titleMaskContainer.style.left = MOBILE_TITLE_X + 'px';
    titleMaskContainer.appendChild(carouselTitleMask);
    carouselScene.appendChild(titleMaskContainer);
    
    carouselDescriptionMask = document.createElement('div');
    carouselDescriptionMask.className = 'carousel-text-mask';
    carouselDescriptionMask.style.width = '250px';
    carouselDescriptionMask.style.height = '100px';
    carouselDescriptionMask.style.top = MOBILE_DESCRIPTION_Y + 'px';
    carouselDescriptionMask.style.left = MOBILE_DESCRIPTION_X + 'px';
    
    const descriptionMaskContainer = document.createElement('div');
    descriptionMaskContainer.className = 'carousel-description-mask-container';
    descriptionMaskContainer.style.width = '250px';
    descriptionMaskContainer.style.height = '100px';
    descriptionMaskContainer.style.top = MOBILE_DESCRIPTION_Y + 'px';
    descriptionMaskContainer.style.left = MOBILE_DESCRIPTION_X + 'px';
    descriptionMaskContainer.appendChild(carouselDescriptionMask);
    carouselScene.appendChild(descriptionMaskContainer);
    
    // Textos das imagens - posições FIXAS
    let currentY = MOBILE_FIRST_IMAGE_Y;
    
    const mobileTextPositions = [
      { y: currentY + MOBILE_RECT_HEIGHT - 20, x: MOBILE_TEXT_X - 75, width: 150, height: 30 },
      { y: currentY + MOBILE_RECT_HEIGHT + MOBILE_SPACING + MOBILE_RECT2_HEIGHT - 20, x: MOBILE_TEXT_X - 75, width: 150, height: 30 },
      { y: currentY + MOBILE_RECT_HEIGHT + MOBILE_RECT2_HEIGHT + MOBILE_RECT3_HEIGHT + (MOBILE_SPACING * 2) - 20, x: MOBILE_TEXT_X - 75, width: 150, height: 30 },
      { y: currentY + MOBILE_RECT_HEIGHT + MOBILE_RECT2_HEIGHT + MOBILE_RECT3_HEIGHT + MOBILE_SQUARE_SIZE + (MOBILE_SPACING * 3) - 20, x: MOBILE_TEXT_X - 90, width: 180, height: 30 },
      { y: currentY + MOBILE_RECT_HEIGHT + MOBILE_RECT2_HEIGHT + MOBILE_RECT3_HEIGHT + MOBILE_SQUARE_SIZE + MOBILE_RECT4_HEIGHT + (MOBILE_SPACING * 4) - 20, x: MOBILE_TEXT_X - 90, width: 180, height: 30 },
      { y: currentY + MOBILE_RECT_HEIGHT + MOBILE_RECT2_HEIGHT + MOBILE_RECT3_HEIGHT + MOBILE_SQUARE_SIZE + MOBILE_RECT4_HEIGHT + MOBILE_RECT5_HEIGHT + (MOBILE_SPACING * 5) - 20, x: MOBILE_TEXT_X - 100, width: 200, height: 30 }
    ];
    
    mobileTextPositions.forEach((pos, index) => {
      const mask = document.createElement('div');
      mask.className = 'carousel-text-mask';
      mask.style.width = pos.width + 'px';
      mask.style.height = pos.height + 'px';
      mask.style.top = pos.y + 'px';
      mask.style.left = pos.x + 'px';
      
      const container = document.createElement('div');
      container.className = 'carousel-image-text-mask-container';
      container.style.width = pos.width + 'px';
      container.style.height = pos.height + 'px';
      container.style.top = pos.y + 'px';
      container.style.left = pos.x + 'px';
      container.appendChild(mask);
      
      carouselImageTextMasks.push({ mask, container });
      carouselScene.appendChild(container);
    });
  } else {
    // Criar máscaras para desktop
    carouselTitleMask = document.createElement('div');
    carouselTitleMask.className = 'carousel-text-mask';
    carouselTitleMask.style.width = '600px';
    carouselTitleMask.style.height = '80px';
    carouselTitleMask.style.top = (DESKTOP_TITLE_Y) + 'px';
    carouselTitleMask.style.left = (DESKTOP_TITLE_X) + 'px';
    carouselTitleMask.style.transform = 'translateX(0px)';
    
    const titleMaskContainer = document.createElement('div');
    titleMaskContainer.className = 'carousel-title-mask-container';
    titleMaskContainer.style.width = '600px';
    titleMaskContainer.style.height = '80px';
    titleMaskContainer.style.top = (DESKTOP_TITLE_Y) + 'px';
    titleMaskContainer.style.left = (DESKTOP_TITLE_X) + 'px';
    titleMaskContainer.style.transform = 'translateX(0px)';
    titleMaskContainer.appendChild(carouselTitleMask);
    carouselScene.appendChild(titleMaskContainer);
    
    carouselDescriptionMask = document.createElement('div');
    carouselDescriptionMask.className = 'carousel-text-mask';
    carouselDescriptionMask.style.width = '400px';
    carouselDescriptionMask.style.height = '100px';
    carouselDescriptionMask.style.top = (DESKTOP_TITLE_Y + 80) + 'px';
    carouselDescriptionMask.style.left = (DESKTOP_DESCRIPTION_X) + 'px';
    carouselDescriptionMask.style.transform = 'translateX(0px)';
    
    const descriptionMaskContainer = document.createElement('div');
    descriptionMaskContainer.className = 'carousel-description-mask-container';
    descriptionMaskContainer.style.width = '400px';
    descriptionMaskContainer.style.height = '100px';
    descriptionMaskContainer.style.top = (DESKTOP_TITLE_Y + 80) + 'px';
    descriptionMaskContainer.style.left = (DESKTOP_DESCRIPTION_X) + 'px';
    descriptionMaskContainer.style.transform = 'translateX(0px)';
    descriptionMaskContainer.appendChild(carouselDescriptionMask);
    carouselScene.appendChild(descriptionMaskContainer);
    
    const imageTextPositions = [
      { x: DESKTOP_RECT_X, y: DESKTOP_MARGIN_Y + DESKTOP_TEXT_OFFSET_Y, width: 200, height: 30 },
      { x: DESKTOP_RECT2_X, y: DESKTOP_RECT2_Y + DESKTOP_TEXT_OFFSET_Y, width: 150, height: 30 },
      { x: DESKTOP_RECT3_X, y: DESKTOP_RECT3_Y + DESKTOP_TEXT_OFFSET_Y, width: 150, height: 30 },
      { x: DESKTOP_SQUARE_X, y: DESKTOP_SQUARE_Y + DESKTOP_TEXT_OFFSET_Y, width: 180, height: 30 },
      { x: DESKTOP_RECT4_X, y: DESKTOP_RECT4_Y + DESKTOP_TEXT_OFFSET_Y, width: 180, height: 30 },
      { x: DESKTOP_RECT5_X, y: DESKTOP_RECT5_Y + DESKTOP_TEXT_OFFSET_Y, width: 200, height: 30 }
    ];
    
    imageTextPositions.forEach((pos, index) => {
      const mask = document.createElement('div');
      mask.className = 'carousel-text-mask';
      mask.style.width = pos.width + 'px';
      mask.style.height = pos.height + 'px';
      mask.style.top = pos.y + 'px';
      mask.style.left = pos.x + 'px';
      mask.style.transform = 'translateX(0px)';
      
      const container = document.createElement('div');
      container.className = 'carousel-image-text-mask-container';
      container.style.width = pos.width + 'px';
      container.style.height = pos.height + 'px';
      container.style.top = pos.y + 'px';
      container.style.left = pos.x + 'px';
      container.style.transform = 'translateX(0px)';
      container.appendChild(mask);
      
      carouselImageTextMasks.push({ mask, container, originalX: pos.x });
      carouselScene.appendChild(container);
    });
  }
  
  // Esconder máscaras inicialmente
  const allMaskContainers = [
    document.querySelector('.carousel-title-mask-container'),
    document.querySelector('.carousel-description-mask-container'),
    ...carouselImageTextMasks.map(item => item.container)
  ];
  
  allMaskContainers.forEach(container => {
    if (container) {
      container.style.opacity = '0';
      container.style.visibility = 'hidden';
    }
  });
}

function animateCarouselMasks() {
  if (hasCarouselMaskAnimationPlayed || !isCarouselActive) return;
  
  hasCarouselMaskAnimationPlayed = true;
  
  const allMaskContainers = [
    document.querySelector('.carousel-title-mask-container'),
    document.querySelector('.carousel-description-mask-container'),
    ...carouselImageTextMasks.map(item => item.container)
  ];
  
  allMaskContainers.forEach(container => {
    if (container) {
      container.style.opacity = '1';
      container.style.visibility = 'visible';
    }
  });
  
  const allMasks = [
    carouselTitleMask,
    carouselDescriptionMask,
    ...carouselImageTextMasks.map(item => item.mask)
  ];
  
  allMasks.forEach((mask, index) => {
    if (mask) {
      setTimeout(() => {
        mask.style.opacity = '1';
        mask.style.animation = 'revealLine 0.8s ease-out forwards';
        
        setTimeout(() => {
          mask.style.opacity = '0';
        }, 1000);
      }, index * 200);
    }
  });
  
  setTimeout(() => {
    allMaskContainers.forEach(container => {
      if (container) {
        container.style.opacity = '0';
        container.style.visibility = 'hidden';
      }
    });
  }, allMasks.length * 200 + 1000);
}

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

function updateBackgroundTransition() {
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

function updateFixedElementsForPortfolio() {
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

function showCarousel() {
  if (isCarouselActive) return;
  
  isCarouselActive = true;
  document.body.classList.add('carousel-active');
  document.body.classList.remove('stacks-active');
  document.body.classList.remove('final-active');
  document.body.classList.remove('portfolio-active');
  carouselContainer.classList.add('active');
  
  updateCarouselLayout();
  createCarouselMasks();
  drawCarousel();
  
  setTimeout(() => {
    animateCarouselMasks();
  }, 500);
  
  carouselScrollUpCounter = 0;
  hasReachedCarouselEnd = false;
  carouselVerticalParallaxOffset = 0;
  updateBackgroundTransition();
}

function hideCarousel() {
  if (!isCarouselActive) return;
  
  isCarouselActive = false;
  document.body.classList.remove('carousel-active');
  carouselContainer.classList.remove('active');
  
  carouselScrollOffset = 0;
  carouselVerticalOffset = 0;
  carouselVerticalParallaxOffset = 0;
  isAtEndOfCarousel = false;
  carouselScrollProgress = 0;
  hasReachedCarouselEnd = false;
  carouselCanvasWrapper.style.transform = 'translateY(0px)';
  
  carouselScrollUpCounter = 0;
  hasCarouselMaskAnimationPlayed = false;
  
  const carouselScene = document.querySelector('.carousel-scene');
  const maskContainers = carouselScene.querySelectorAll('.carousel-title-mask-container, .carousel-description-mask-container, .carousel-image-text-mask-container');
  maskContainers.forEach(container => {
    if (container && container.parentNode === carouselScene) {
      carouselScene.removeChild(container);
    }
  });
  
  carouselImageTextMasks = [];
  carouselTitleMask = null;
  carouselDescriptionMask = null;
  
  updateBackgroundTransition();
  resetFixedElementsColor();
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

function drawCarouselText() {
  if (isMobile) {
    const textColor = getInterpolatedColor(carouselScrollProgress);
    const redTextColor = getInterpolatedRedColor(carouselScrollProgress);
    
    // Fontes com tamanhos FIXOS - sem porcentagem do canvas
    carouselCtx.save();
    
    // "CASES"
    carouselCtx.fillStyle = textColor;
    carouselCtx.font = 'bold 32px "GC Epic Pro", Arial';
    carouselCtx.textBaseline = 'top';
    carouselCtx.textAlign = 'center';
    carouselCtx.fillText(texts[currentLanguage].casesText, MOBILE_CENTER_X, MOBILE_TITLE_Y);
    
    // "& PROJECTS"
    carouselCtx.fillStyle = redTextColor;
    carouselCtx.font = 'bold 32px "Drogel", Arial Black';
    carouselCtx.fillText(texts[currentLanguage].projectsText, MOBILE_CENTER_X, MOBILE_PROJECTS_Y);
    
    // Descrição
    const descriptionText = texts[currentLanguage].casesDescription;
    carouselCtx.fillStyle = textColor;
    carouselCtx.font = '16px "Sora", Arial';
    
    const lines = descriptionText.split('\n');
    const lineHeight = 24;
    let currentY = MOBILE_DESCRIPTION_Y;
    
    lines.forEach((line) => {
      carouselCtx.fillText(line, MOBILE_CENTER_X, currentY);
      currentY += lineHeight;
    });
    
    carouselCtx.restore();
  } else {
    // Desktop - sem alterações
    const currentMarginX = DESKTOP_TITLE_X - (carouselScrollOffset * 0.3);
    const descriptionX = DESKTOP_DESCRIPTION_X - (carouselScrollOffset * 0.3);
    
    const textColor = getInterpolatedColor(carouselScrollProgress);
    const redTextColor = getInterpolatedRedColor(carouselScrollProgress);
    
    carouselCtx.fillStyle = textColor;
    carouselCtx.font = 'bold 72px "GC Epic Pro", Arial';
    carouselCtx.textBaseline = 'top';
    carouselCtx.textAlign = 'left';
    carouselCtx.fillText(texts[currentLanguage].casesText, currentMarginX, DESKTOP_TITLE_Y);
    
    carouselCtx.fillStyle = redTextColor;
    carouselCtx.font = 'bold 72px "Drogel", Arial Black';
    carouselCtx.fillText(texts[currentLanguage].projectsText, currentMarginX, DESKTOP_TITLE_Y + 80);
    
    const descriptionText = texts[currentLanguage].casesDescription;
    carouselCtx.fillStyle = textColor;
    carouselCtx.font = '24px "Sora", Arial';
    
    const lines = descriptionText.split('\n');
    const lineHeight = 32;
    
    lines.forEach((line, index) => {
      carouselCtx.fillText(line, descriptionX, DESKTOP_TITLE_Y + 5 + (index * lineHeight));
    });
  }
}

function drawCarouselRectangleTexts() {
  const textColor = getInterpolatedColor(carouselScrollProgress);
  
  carouselCtx.fillStyle = textColor;
  carouselCtx.font = isMobile ? '14px "Sora", Arial' : '18px "Sora", Arial';
  carouselCtx.textBaseline = 'top';
  carouselCtx.textAlign = isMobile ? 'center' : 'left';
  
  if (isMobile) {
    // Posições FIXAS - sem cálculos dinâmicos
    let currentY = MOBILE_FIRST_IMAGE_Y - carouselVerticalOffset;
    
    carouselCtx.fillText('@suacasarendemais.', MOBILE_CENTER_X, currentY + MOBILE_RECT_HEIGHT - 20);
    currentY += MOBILE_RECT_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillText('@guesttobuy.', MOBILE_CENTER_X, currentY + MOBILE_RECT2_HEIGHT - 20);
    currentY += MOBILE_RECT2_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillText('@guesttobuy.', MOBILE_CENTER_X, currentY + MOBILE_RECT3_HEIGHT - 20);
    currentY += MOBILE_RECT3_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillText('@novaeletricapf', MOBILE_CENTER_X, currentY + MOBILE_SQUARE_SIZE - 20);
    currentY += MOBILE_SQUARE_SIZE + MOBILE_SPACING;
    
    carouselCtx.fillText('@novaeletricapf', MOBILE_CENTER_X, currentY + MOBILE_RECT4_HEIGHT - 20);
    currentY += MOBILE_RECT4_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillText('@respira.nao.pira.', MOBILE_CENTER_X, currentY + MOBILE_RECT5_HEIGHT - 20);
  } else {
    const scrollFactor = carouselScrollOffset;
    
    carouselCtx.fillText('@suacasarendemais.', DESKTOP_RECT_X - scrollFactor, DESKTOP_MARGIN_Y + DESKTOP_TEXT_OFFSET_Y);
    carouselCtx.fillText('@guesttobuy.', DESKTOP_RECT2_X - scrollFactor, DESKTOP_RECT2_Y + DESKTOP_TEXT_OFFSET_Y);
    carouselCtx.fillText('@guesttobuy.', DESKTOP_RECT3_X - scrollFactor, DESKTOP_RECT3_Y + DESKTOP_TEXT_OFFSET_Y);
    carouselCtx.fillText('@novaeletricapf', DESKTOP_SQUARE_X - scrollFactor, DESKTOP_SQUARE_Y + DESKTOP_TEXT_OFFSET_Y);
    carouselCtx.fillText('@novaeletricapf', DESKTOP_RECT4_X - scrollFactor, DESKTOP_RECT4_Y + DESKTOP_TEXT_OFFSET_Y);
    carouselCtx.fillText('@respira.nao.pira.', DESKTOP_RECT5_X - scrollFactor, DESKTOP_RECT5_Y + DESKTOP_TEXT_OFFSET_Y);
  }
}

function drawCarouselMediaElements() {
  if (!carouselMediaLoaded) {
    drawCarouselFallback();
    return;
  }

  if (isMobile) {
    drawMobileCarouselMedia();
  } else {
    drawDesktopCarouselMedia();
  }
}

function drawCarouselFallback() {
  carouselCtx.fillStyle = '#E80031';
  
  if (isMobile) {
    let currentY = MOBILE_FIRST_IMAGE_Y - carouselVerticalOffset - carouselVerticalParallaxOffset;
    
    carouselCtx.fillRect(MOBILE_RECT_X, currentY, MOBILE_RECT_WIDTH, MOBILE_RECT_HEIGHT);
    currentY += MOBILE_RECT_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_RECT2_X, currentY, MOBILE_RECT2_WIDTH, MOBILE_RECT2_HEIGHT);
    currentY += MOBILE_RECT2_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_RECT3_X, currentY, MOBILE_RECT3_WIDTH, MOBILE_RECT3_HEIGHT);
    currentY += MOBILE_RECT3_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_SQUARE_X, currentY, MOBILE_SQUARE_SIZE, MOBILE_SQUARE_SIZE);
    currentY += MOBILE_SQUARE_SIZE + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_RECT4_X, currentY, MOBILE_RECT4_WIDTH, MOBILE_RECT4_HEIGHT);
    currentY += MOBILE_RECT4_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_RECT5_X, currentY, MOBILE_RECT5_WIDTH, MOBILE_RECT5_HEIGHT);
    currentY += MOBILE_RECT5_HEIGHT + MOBILE_SPACING;
    
    carouselCtx.fillRect(MOBILE_RECT6_X, currentY, MOBILE_RECT6_WIDTH, MOBILE_RECT6_HEIGHT);
  } else {
    const scrollFactor = carouselScrollOffset;
    
    carouselCtx.fillRect(DESKTOP_RECT_X - scrollFactor, DESKTOP_MARGIN_Y, DESKTOP_RECT_WIDTH, DESKTOP_RECT_HEIGHT);
    carouselCtx.fillRect(DESKTOP_RECT2_X - scrollFactor, DESKTOP_RECT2_Y, DESKTOP_RECT2_WIDTH, DESKTOP_RECT2_HEIGHT);
    carouselCtx.fillRect(DESKTOP_RECT3_X - scrollFactor, DESKTOP_RECT3_Y, DESKTOP_RECT3_WIDTH, DESKTOP_RECT3_HEIGHT);
    carouselCtx.fillRect(DESKTOP_SQUARE_X - scrollFactor, DESKTOP_SQUARE_Y, DESKTOP_SQUARE_SIZE, DESKTOP_SQUARE_SIZE);
    carouselCtx.fillRect(DESKTOP_RECT4_X - scrollFactor, DESKTOP_RECT4_Y, DESKTOP_RECT4_WIDTH, DESKTOP_RECT4_HEIGHT);
    carouselCtx.fillRect(DESKTOP_RECT5_X - scrollFactor, DESKTOP_RECT5_Y, DESKTOP_RECT5_WIDTH, DESKTOP_RECT5_HEIGHT);
    carouselCtx.fillRect(DESKTOP_RECT6_X - scrollFactor, DESKTOP_RECT6_Y, DESKTOP_RECT6_WIDTH, DESKTOP_RECT6_HEIGHT);
  }
}

function drawMobileCarouselMedia() {
  // CORREÇÃO: Usar dimensões FIXAS e aplicar translateY de forma controlada
  carouselCtx.save();
  
  // Só começa a subir quando chega no final do carrossel
  const reachedEnd = carouselVerticalOffset >= (mobileTotalHeight - window.innerHeight);
  
  if (reachedEnd) {
    hasReachedCarouselEnd = true;
    // Calcula o parallax baseado no scroll extra após chegar no final
    const extraScroll = carouselVerticalOffset - (mobileTotalHeight - window.innerHeight);
    carouselVerticalParallaxOffset = Math.min(extraScroll * 0.6, maxVerticalParallax);
  } else {
    carouselVerticalParallaxOffset = 0;
  }
  
  // Aplica o deslocamento total: scroll normal + parallax (só após chegar no fim)
  const totalOffset = carouselVerticalOffset + carouselVerticalParallaxOffset;
  carouselCanvasWrapper.style.transform = `translateY(-${totalOffset}px)`;
  
  let currentY = MOBILE_FIRST_IMAGE_Y - carouselVerticalOffset - carouselVerticalParallaxOffset;
  
  // 1º: SCRM.jpg - Dimensões FIXAS
  if (carouselMediaElements.img1.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img1, 
      MOBILE_RECT_X, 
      currentY, 
      MOBILE_RECT_WIDTH, 
      MOBILE_RECT_HEIGHT
    );
  }
  currentY += MOBILE_RECT_HEIGHT + MOBILE_SPACING;
  
  // 2º: ReelGTB.jpg - Dimensões FIXAS
  if (carouselMediaElements.img2.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img2, 
      MOBILE_RECT2_X, 
      currentY, 
      MOBILE_RECT2_WIDTH, 
      MOBILE_RECT2_HEIGHT
    );
  }
  currentY += MOBILE_RECT2_HEIGHT + MOBILE_SPACING;
  
  // 3º: GTB.jpg - Dimensões FIXAS
  if (carouselMediaElements.img3.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img3, 
      MOBILE_RECT3_X, 
      currentY, 
      MOBILE_RECT3_WIDTH, 
      MOBILE_RECT3_HEIGHT
    );
  }
  currentY += MOBILE_RECT3_HEIGHT + MOBILE_SPACING;
  
  // 4º: 01 - NVE.jpg - Dimensões FIXAS
  if (carouselMediaElements.img4.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img4, 
      MOBILE_SQUARE_X, 
      currentY, 
      MOBILE_SQUARE_SIZE, 
      MOBILE_SQUARE_SIZE
    );
  }
  currentY += MOBILE_SQUARE_SIZE + MOBILE_SPACING;
  
  // 5º: 02 - NVE.jpg - Dimensões FIXAS
  if (carouselMediaElements.img5.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img5, 
      MOBILE_RECT4_X, 
      currentY, 
      MOBILE_RECT4_WIDTH, 
      MOBILE_RECT4_HEIGHT
    );
  }
  currentY += MOBILE_RECT4_HEIGHT + MOBILE_SPACING;
  
  // 6º: DRPD.jpg - Dimensões FIXAS
  if (carouselMediaElements.img6.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img6, 
      MOBILE_RECT5_X, 
      currentY, 
      MOBILE_RECT5_WIDTH, 
      MOBILE_RECT5_HEIGHT
    );
  }
  currentY += MOBILE_RECT5_HEIGHT + MOBILE_SPACING;
  
  // 7º: DBZA.png - Dimensões FIXAS
  if (carouselMediaElements.img7.complete) {
    carouselCtx.drawImage(
      carouselMediaElements.img7, 
      MOBILE_RECT6_X, 
      currentY, 
      MOBILE_RECT6_WIDTH, 
      MOBILE_RECT6_HEIGHT
    );
  }
  
  carouselCtx.restore();
}

function drawDesktopCarouselMedia() {
  const scrollFactor = carouselScrollOffset;
  
  if (carouselMediaElements.img1.complete) {
    carouselCtx.drawImage(carouselMediaElements.img1, DESKTOP_RECT_X - scrollFactor, DESKTOP_MARGIN_Y, DESKTOP_RECT_WIDTH, DESKTOP_RECT_HEIGHT);
  }
  
  if (carouselMediaElements.img2.complete) {
    carouselCtx.drawImage(carouselMediaElements.img2, DESKTOP_RECT2_X - scrollFactor, DESKTOP_RECT2_Y, DESKTOP_RECT2_WIDTH, DESKTOP_RECT2_HEIGHT);
  }
  
  if (carouselMediaElements.img3.complete) {
    carouselCtx.drawImage(carouselMediaElements.img3, DESKTOP_RECT3_X - scrollFactor, DESKTOP_RECT3_Y, DESKTOP_RECT3_WIDTH, DESKTOP_RECT3_HEIGHT);
  }
  
  if (carouselMediaElements.img4.complete) {
    carouselCtx.drawImage(carouselMediaElements.img4, DESKTOP_SQUARE_X - scrollFactor, DESKTOP_SQUARE_Y, DESKTOP_SQUARE_SIZE, DESKTOP_SQUARE_SIZE);
  }
  
  if (carouselMediaElements.img5.complete) {
    carouselCtx.drawImage(carouselMediaElements.img5, DESKTOP_RECT4_X - scrollFactor, DESKTOP_RECT4_Y, DESKTOP_RECT4_WIDTH, DESKTOP_RECT4_HEIGHT);
  }
  
  if (carouselMediaElements.img6.complete) {
    carouselCtx.drawImage(carouselMediaElements.img6, DESKTOP_RECT5_X - scrollFactor, DESKTOP_RECT5_Y, DESKTOP_RECT5_WIDTH, DESKTOP_RECT5_HEIGHT);
  }
  
  if (carouselMediaElements.img7.complete) {
    carouselCtx.drawImage(carouselMediaElements.img7, DESKTOP_RECT6_X - scrollFactor, DESKTOP_RECT6_Y, DESKTOP_RECT6_WIDTH, DESKTOP_RECT6_HEIGHT);
  }
  
  // Sincronizar máscaras de texto com as imagens
  if (carouselImageTextMasks && carouselImageTextMasks.length > 0) {
    carouselImageTextMasks.forEach(item => {
      if (item && item.container) {
        item.container.style.transform = `translateX(-${scrollFactor}px)`;
      }
      if (item && item.mask) {
        item.mask.style.transform = `translateX(-${scrollFactor}px)`;
      }
    });
  }
  
  const titleMaskContainer = document.querySelector('.carousel-title-mask-container');
  const descriptionMaskContainer = document.querySelector('.carousel-description-mask-container');
  
  if (titleMaskContainer) {
    titleMaskContainer.style.transform = `translateX(-${carouselScrollOffset * 0.3}px)`;
  }
  if (descriptionMaskContainer) {
    descriptionMaskContainer.style.transform = `translateX(-${carouselScrollOffset * 0.3}px)`;
  }
}

function drawCarousel() {
  if (!isCarouselActive) return;
  
  carouselCtx.clearRect(0, 0, carouselCanvas.width, carouselCanvas.height);
  
  drawCarouselMediaElements();
  drawCarouselText();
  drawCarouselRectangleTexts();
  
  requestAnimationFrame(drawCarousel);
}

// =========================
// FUNÇÕES DE INTERAÇÃO DO CARROSSEL - CORRIGIDAS
// =========================

function handleCarouselWheel(e) {
  if (!isCarouselActive) return;
  
  e.preventDefault();
  const delta = e.deltaY;
  
  if (delta < 0) {
    carouselScrollUpCounter++;
    
    if (carouselScrollUpCounter >= CAROUSEL_EXIT_SCROLL_COUNT) {
      window.scrollBy({
        top: -300,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        hideCarousel();
        hasCarouselBeenActivated = false;
      }, 300);
      
      return;
    }
  } else {
    carouselScrollUpCounter = 0;
  }
  
  if (isMobile) {
    // Mobile: scroll vertical
    const maxVerticalScroll = Math.max(0, mobileTotalHeight - window.innerHeight + 100);
    carouselVerticalOffset += delta * 0.5;
    carouselVerticalOffset = Math.max(0, Math.min(carouselVerticalOffset, maxVerticalScroll));
    
    const reachedEnd = carouselVerticalOffset >= (maxVerticalScroll - 10);
    isAtEndOfCarousel = reachedEnd;
    
    if (reachedEnd && delta > 0) {
      setTimeout(() => {
        showStacks();
      }, 300);
    }
  } else {
    // Desktop: scroll horizontal
    if (carouselScrollOffset >= maxHorizontalScroll - 10) {
      isAtEndOfCarousel = true;
      
      if (delta > 0) {
        carouselVerticalParallaxOffset += delta * 0.4;
        carouselVerticalParallaxOffset = Math.max(0, Math.min(carouselVerticalParallaxOffset, maxVerticalParallax));
        carouselCanvasWrapper.style.transform = `translateY(-${carouselVerticalParallaxOffset}px)`;
        
        if (carouselVerticalParallaxOffset >= maxVerticalParallax - 10 && delta > 0) {
          setTimeout(() => {
            showStacks();
          }, 300);
        }
      }
    } else {
      carouselScrollOffset += delta * 0.6;
      carouselScrollOffset = Math.max(0, Math.min(carouselScrollOffset, maxHorizontalScroll));
      carouselScrollProgress = Math.min(carouselScrollOffset / maxHorizontalScroll, 1);
    }
  }
  
  updateBackgroundTransition();
}

// =========================
// FUNÇÕES DE TOUCH DO CARROSSEL - CORRIGIDAS PARA FUNCIONAR NOS DOIS LADOS
// =========================

function handleCarouselTouchStart(e) {
  if (!isCarouselActive) return;
  
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDraggingCarousel = true;
}

function handleCarouselTouchMove(e) {
  if (!isCarouselActive || !isDraggingCarousel) return;
  
  e.preventDefault();
  
  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;
  const deltaX = touchStartX - touchX;
  const deltaY = touchStartY - touchY;
  
  // Determinar se o movimento é predominantemente horizontal ou vertical
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Movimento horizontal - para desktop
    if (!isMobile) {
      if (carouselScrollOffset >= maxHorizontalScroll - 10) {
        isAtEndOfCarousel = true;
        
        if (deltaX > 0) {
          // Deslizou para esquerda - avança
          carouselVerticalParallaxOffset += Math.abs(deltaX) * 0.6;
          carouselVerticalParallaxOffset = Math.max(0, Math.min(carouselVerticalParallaxOffset, maxVerticalParallax));
          carouselCanvasWrapper.style.transform = `translateY(-${carouselVerticalParallaxOffset}px)`;
          
          if (carouselVerticalParallaxOffset >= maxVerticalParallax - 10) {
            setTimeout(() => {
              showStacks();
            }, 300);
          }
        } else {
          // Deslizou para direita - retrocede
          carouselVerticalParallaxOffset -= Math.abs(deltaX) * 0.6;
          carouselVerticalParallaxOffset = Math.max(0, Math.min(carouselVerticalParallaxOffset, maxVerticalParallax));
          carouselCanvasWrapper.style.transform = `translateY(-${carouselVerticalParallaxOffset}px)`;
        }
      } else {
        carouselScrollOffset += deltaX * 0.8;
        carouselScrollOffset = Math.max(0, Math.min(carouselScrollOffset, maxHorizontalScroll));
        carouselScrollProgress = Math.min(carouselScrollOffset / maxHorizontalScroll, 1);
      }
    }
  } else {
    // Movimento vertical - para mobile
    if (isMobile) {
      if (deltaY < 0) {
        // Deslizou para baixo (scroll up) - tentar sair do carrossel
        carouselScrollUpCounter++;
        
        if (carouselScrollUpCounter >= CAROUSEL_EXIT_SCROLL_COUNT) {
          window.scrollBy({
            top: -300,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            hideCarousel();
            hasCarouselBeenActivated = false;
          }, 300);
          
          return;
        }
      } else {
        carouselScrollUpCounter = 0;
      }
      
      const maxVerticalScroll = Math.max(0, mobileTotalHeight - window.innerHeight + 100);
      carouselVerticalOffset += deltaY * 0.8;
      carouselVerticalOffset = Math.max(0, Math.min(carouselVerticalOffset, maxVerticalScroll));
      
      const reachedEnd = carouselVerticalOffset >= (maxVerticalScroll - 10);
      isAtEndOfCarousel = reachedEnd;
      
      if (reachedEnd && deltaY > 0) {
        setTimeout(() => {
          showStacks();
        }, 300);
      }
    }
  }
  
  updateBackgroundTransition();
  
  // Atualizar pontos de partida para o próximo movimento
  touchStartX = touchX;
  touchStartY = touchY;
}

function handleCarouselTouchEnd(e) {
  if (!isCarouselActive) return;
  isDraggingCarousel = false;
  
  // Reset contador de scroll up
  carouselScrollUpCounter = 0;
}

function handleCarouselTouchCancel(e) {
  if (!isCarouselActive) return;
  isDraggingCarousel = false;
  carouselScrollUpCounter = 0;
}

// =========================
// FUNÇÕES PARA CONTROLE DO STACKS
// =========================

function handleStacksWheel(e) {
  if (!isStacksActive) return;
  
  e.preventDefault();
  const delta = e.deltaY;
  
  if (delta < 0) {
    hideStacks();
    setTimeout(() => {
      showCarousel();
      if (isMobile) {
        carouselVerticalOffset = mobileTotalHeight - window.innerHeight + 100;
        carouselCanvasWrapper.style.transform = `translateY(-${carouselVerticalOffset}px)`;
      } else {
        carouselScrollOffset = maxHorizontalScroll;
        carouselVerticalParallaxOffset = maxVerticalParallax;
        carouselCanvasWrapper.style.transform = `translateY(-${maxVerticalParallax}px)`;
      }
      isAtEndOfCarousel = true;
      updateBackgroundTransition();
    }, 300);
  } else if (delta > 0) {
    showFinalContainer();
  }
}

function handleStacksTouchStart(e) {
  if (!isStacksActive) return;
  touchStartY = e.touches[0].clientY;
}

function handleStacksTouchMove(e) {
  if (!isStacksActive) return;
  
  e.preventDefault();
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;
  
  if (deltaY < 0) {
    hideStacks();
    setTimeout(() => {
      showCarousel();
      if (isMobile) {
        carouselVerticalOffset = mobileTotalHeight - window.innerHeight + 100;
        carouselCanvasWrapper.style.transform = `translateY(-${carouselVerticalOffset}px)`;
      } else {
        carouselScrollOffset = maxHorizontalScroll;
        carouselVerticalParallaxOffset = maxVerticalParallax;
        carouselCanvasWrapper.style.transform = `translateY(-${maxVerticalParallax}px)`;
      }
      isAtEndOfCarousel = true;
      updateBackgroundTransition();
    }, 300);
  } else if (deltaY > 0) {
    showFinalContainer();
  }
  
  touchStartY = touchY;
}

// =========================
// FUNÇÕES PARA CONTROLE DO CONTAINER FINAL
// =========================

function handleFinalContainerWheel(e) {
  if (!isFinalContainerActive) return;
  
  e.preventDefault();
  const delta = e.deltaY;
  
  if (delta < 0) {
    hideFinalContainer();
  }
}

function handleFinalContainerTouchStart(e) {
  if (!isFinalContainerActive) return;
  touchStartY = e.touches[0].clientY;
}

function handleFinalContainerTouchMove(e) {
  if (!isFinalContainerActive) return;
  
  e.preventDefault();
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;
  
  if (deltaY < 0) {
    hideFinalContainer();
  }
  
  touchStartY = touchY;
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

function updateFixedElementsColors(scrollFraction) {
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

let animationFrameId = null;
let targetTransform = 'scale(1) translate(0px, 0px)';
let targetWidth = 1920;
let targetHeight = 1080;
let currentTransform = 'scale(1) translate(0px, 0px)';
let currentWidth = 1920;
let currentHeight = 1080;

function smoothAnimate() {
  const transformRegex = /scale\(([\d.]+)\) translate\(([-\d.]+)px, ([-\d.]+)px\)/;
  const currentMatch = currentTransform.match(transformRegex);
  const targetMatch = targetTransform.match(transformRegex);
  
  if (currentMatch && targetMatch) {
    const currentScale = parseFloat(currentMatch[1]);
    const currentX = parseFloat(currentMatch[2]);
    const currentY = parseFloat(currentMatch[3]);
    
    const targetScale = parseFloat(targetMatch[1]);
    const targetX = parseFloat(targetMatch[2]);
    const targetY = parseFloat(targetMatch[3]);
    
    const easing = 0.1;
    const newScale = currentScale + (targetScale - currentScale) * easing;
    const newX = currentX + (targetX - currentX) * easing;
    const newY = currentY + (targetY - currentY) * easing;
    
    currentTransform = `scale(${newScale}) translate(${newX}px, ${newY}px)`;
    
    currentWidth = currentWidth + (targetWidth - currentWidth) * easing;
    currentHeight = currentHeight + (targetHeight - currentHeight) * easing;
    
    zoomBox.style.transform = currentTransform;
    zoomBox.style.width = `${currentWidth}px`;
    zoomBox.style.height = `${currentHeight}px`;
    
    canvas.width = currentWidth;
    canvas.height = currentHeight;
    
    const scaleDiff = Math.abs(targetScale - newScale);
    const xDiff = Math.abs(targetX - newX);
    const yDiff = Math.abs(targetY - newY);
    const widthDiff = Math.abs(targetWidth - currentWidth);
    const heightDiff = Math.abs(targetHeight - currentHeight);
    
    if (scaleDiff > 0.001 || xDiff > 0.1 || yDiff > 0.1 || widthDiff > 0.1 || heightDiff > 0.1) {
      animationFrameId = requestAnimationFrame(smoothAnimate);
    }
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
}

function togglePortfolioLanguage() {
  if (isAnimating) return;
  isAnimating = true;
  
  portfolioLanguageSwitch.classList.remove('show-flag-uk', 'show-flag-br', 'fade-to-red');
  
  if (currentLanguage === 'en') {
    portfolioLanguageSwitch.classList.add('active');
    portfolioLanguageContainer.classList.add('active-pt');
    currentLanguage = 'pt';
    portfolioLanguageSwitch.setAttribute('aria-checked', 'true');
    
    updateTextLanguage();
    
    setTimeout(() => {
      portfolioLanguageSwitch.classList.add('show-flag-br');
      
      setTimeout(() => {
        portfolioLanguageSwitch.classList.remove('show-flag-br');
        portfolioLanguageSwitch.classList.add('fade-to-red');
        
        setTimeout(() => {
          portfolioLanguageSwitch.classList.remove('fade-to-red');
          isAnimating = false;
        }, 400);
      }, 1200);
    }, 100);
  } else {
    portfolioLanguageSwitch.classList.remove('active');
    portfolioLanguageContainer.classList.remove('active-pt');
    currentLanguage = 'en';
    portfolioLanguageSwitch.setAttribute('aria-checked', 'false');
    
    updateTextLanguage();
    
    setTimeout(() => {
      portfolioLanguageSwitch.classList.add('show-flag-uk');
      
      setTimeout(() => {
        portfolioLanguageSwitch.classList.remove('show-flag-uk');
        portfolioLanguageSwitch.classList.add('fade-to-red');
        
        setTimeout(() => {
          portfolioLanguageSwitch.classList.remove('fade-to-red');
          isAnimating = false;
        }, 400);
      }, 1200);
    }, 100);
  }
  
  portfolioLanguageSwitch.style.transform = 'scale(0.95)';
  portfolioLanguageSwitch.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  setTimeout(() => {
    portfolioLanguageSwitch.style.transform = '';
  }, 150);
  
  if (!isPortfolioActive) {
    toggleLanguage();
  }
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

function toggleLanguage() {
  if (isAnimating) return;
  isAnimating = true;
  
  languageSwitch.classList.remove('show-flag-uk', 'show-flag-br', 'fade-to-red');
  
  if (currentLanguage === 'en') {
    languageSwitch.classList.add('active');
    languageContainer.classList.add('active-pt');
    currentLanguage = 'pt';
    languageSwitch.setAttribute('aria-checked', 'true');
    
    updateTextLanguage();
    
    setTimeout(() => {
      languageSwitch.classList.add('show-flag-br');
      
      setTimeout(() => {
        languageSwitch.classList.remove('show-flag-br');
        languageSwitch.classList.add('fade-to-red');
        
        setTimeout(() => {
          languageSwitch.classList.remove('fade-to-red');
          isAnimating = false;
        }, 400);
      }, 1200);
    }, 100);
  } else {
    languageSwitch.classList.remove('active');
    languageContainer.classList.remove('active-pt');
    currentLanguage = 'en';
    languageSwitch.setAttribute('aria-checked', 'false');
    
    updateTextLanguage();
    
    setTimeout(() => {
      languageSwitch.classList.add('show-flag-uk');
      
      setTimeout(() => {
        languageSwitch.classList.remove('show-flag-uk');
        languageSwitch.classList.add('fade-to-red');
        
        setTimeout(() => {
          languageSwitch.classList.remove('fade-to-red');
          isAnimating = false;
        }, 400);
      }, 1200);
    }, 100);
  }
  
  languageSwitch.style.transform = 'scale(0.95)';
  languageSwitch.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  setTimeout(() => {
    languageSwitch.style.transform = '';
  }, 150);
  
  if (isPortfolioActive) {
    updatePortfolioLanguageSwitch();
  }
}

// --- LÓGICA DE ZOOM AO SCROLL COM TRANSIÇÃO SUAVE ---
window.addEventListener('scroll', () => {
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
    
    let width = 1920;
    let height = 1080;
    let aspectRatio = 16/9;
    
    if (scrollFraction > cropStart) {
      const cropProgress = Math.min((scrollFraction - cropStart) / (cropEnd - cropStart), 1);
      
      const startAspect = 16/9;
      const endAspect = 3/7;
      
      const easedProgress = cropProgress < 0.5 
        ? 0.5 * Math.pow(cropProgress * 2, 2)
        : 0.5 * (2 - Math.pow(2 - cropProgress * 2, 2));
      
      aspectRatio = startAspect + (endAspect - startAspect) * easedProgress;
      
      const baseHeight = 1080 * (1 + cropProgress * 0.2);
      const newHeight = baseHeight;
      const newWidth = newHeight * aspectRatio;
      
      const minWidth = 1920 * 0.25;
      
      width = Math.max(newWidth, minWidth);
      height = newHeight;
      
      const translateY = scrollFraction * 120;
      
      const translateXProgress = cropProgress < 0.5 
        ? 0.5 * Math.pow(cropProgress * 2, 2)
        : 0.5 * (2 - Math.pow(2 - cropProgress * 2, 2));
      
      const translateX = translateXProgress * 15;
      
      targetTransform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
      targetWidth = width;
      targetHeight = height;
      
      if (scrollFraction > 0.5) {
        zoomBox.style.marginLeft = '';
        zoomBox.style.marginRight = '';
        
        zoomBox.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        zoomBox.style.position = 'absolute';
        zoomBox.style.right = '50px';
        zoomBox.style.left = 'auto';
      } else {
        zoomBox.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        zoomBox.style.position = '';
        zoomBox.style.right = '';
        zoomBox.style.left = '';
        zoomBox.style.marginLeft = '';
        zoomBox.style.marginRight = '';
      }
      
    } else {
      targetTransform = `scale(${currentScale}) translate(0px, 0px)`;
      targetWidth = 1920;
      targetHeight = 1080;
      
      zoomBox.style.position = '';
      zoomBox.style.right = '';
      zoomBox.style.left = '';
      zoomBox.style.marginLeft = '';
      zoomBox.style.marginRight = '';
    }
    
    zoomBox.style.borderRadius = '0';
    zoomBox.style.opacity = '1';
    zoomBox.style.pointerEvents = 'auto';
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(smoothAnimate);
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
      brazilIcon.style.animationDuration = `${8 * (1 + fadeProgress * 2)}s`;
    }
    
    if (designIcon) {
      designIcon.style.opacity = opacity;
      designIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      designIcon.style.animation = `glowPulse ${3 * (1 + fadeProgress)}s ease-in-out infinite`;
    }
    
    if (myPictureEditing && myPictureEditing.style.opacity === '1') {
      const currentEditingOpacity = parseFloat(myPictureEditing.style.opacity || '0');
      myPictureEditing.style.opacity = Math.min(currentEditingOpacity, opacity).toString();
      myPictureEditing.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      revealMask.style.opacity = Math.min(parseFloat(revealMask.style.opacity || '0'), opacity).toString();
      revealMask.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
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
      brazilIcon.style.animationDuration = '8s';
      brazilIcon.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), animation-duration 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    if (designIcon) {
      designIcon.style.opacity = '1';
      designIcon.style.animation = 'glowPulse 3s ease-in-out infinite';
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
    
    if (nameMaskContainer) {
      nameMaskContainer.style.left = `${containerLeft - 250}px`;
      nameMaskContainer.style.top = '43%';
      nameMaskContainer.style.transform = 'translateY(-50%)';
    }
    
    if (descriptionMaskContainer) {
      descriptionMaskContainer.style.left = `${containerLeft - 250}px`;
      descriptionMaskContainer.style.top = `calc(43% + 170px)`;
    }
    
    nameAlvaroContainer.style.left = `${containerLeft - 250}px`;
    nameAlvaroContainer.style.top = '43%';
    nameAlvaroContainer.style.transform = 'translateY(-50%)';
    
    descriptionContainer.style.left = `${containerLeft - 250}px`;
    descriptionContainer.style.top = `calc(43% + 170px)`;
    
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
  
  const stage = document.querySelector('.stage');
  
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
    
    if (opacity <= 0.1 && hasFinalTextAppeared && !hasCarouselBeenActivated) {
      setTimeout(() => {
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
});

// --- MÁSCARA DE REVELAÇÃO POR CURSOR ---
function updateMask(e) {
  const rect = zoomBox.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  const mask = `radial-gradient(circle 80px at ${x}% ${y}%, black 0%, rgba(0,0,0,0.8) 60%, transparent 100%)`;
  
  myPictureEditing.style.webkitMask = mask;
  myPictureEditing.style.mask = mask;
  revealMask.style.webkitMask = mask;
  revealMask.style.mask = mask;
}

document.addEventListener('mousemove', (e) => {
  if (isPortfolioActive) return;
  
  const rect = zoomBox.getBoundingClientRect();
  if (e.clientX >= rect.left && e.clientX <= rect.right && 
      e.clientY >= rect.top && e.clientY <= rect.bottom) {
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = window.innerHeight * 1.5;
    const scrollFraction = Math.min(scrollTop / maxScroll, 1);
    const fadeStart = 0.3;
    const fadeEnd = 0.8;
    
    let maxOpacity = 1;
    if (scrollFraction > fadeStart) {
      const fadeProgress = Math.min((scrollFraction - fadeStart) / (fadeEnd - fadeStart), 1);
      maxOpacity = 1 - fadeProgress;
    }
    
    myPictureEditing.style.opacity = maxOpacity.toString();
    myPictureEditing.style.transition = 'opacity 0.3s ease-out';
    revealMask.style.opacity = (maxOpacity * 0.5).toString();
    revealMask.style.transition = 'opacity 0.3s ease-out';
    
    updateMask(e);
  } else {
    myPictureEditing.style.opacity = '0';
    myPictureEditing.style.transition = 'opacity 0.3s ease-out';
    revealMask.style.opacity = '0';
    revealMask.style.transition = 'opacity 0.3s ease-out';
  }
});

document.addEventListener('mouseleave', () => {
  if (isPortfolioActive) return;
  
  myPictureEditing.style.opacity = '0';
  myPictureEditing.style.transition = 'opacity 0.5s ease-out';
  revealMask.style.opacity = '0';
  revealMask.style.transition = 'opacity 0.5s ease-out';
});

// --- INICIALIZAÇÃO ---
createGrayBackground();

if (portfolioLanguageSwitch) {
  portfolioLanguageSwitch.addEventListener('click', togglePortfolioLanguage);
}

if (languageSwitch) {
  languageSwitch.addEventListener('click', toggleLanguage);
}

if (hamburger) {
  hamburger.addEventListener('click', togglePortfolio);
}

// CORREÇÃO: Eventos de carrossel com suporte completo para touch nos dois lados
carouselContainer.addEventListener('wheel', handleCarouselWheel, { passive: false });
carouselContainer.addEventListener('touchstart', handleCarouselTouchStart, { passive: false });
carouselContainer.addEventListener('touchmove', handleCarouselTouchMove, { passive: false });
carouselContainer.addEventListener('touchend', handleCarouselTouchEnd);
carouselContainer.addEventListener('touchcancel', handleCarouselTouchCancel);

stacksContainer.addEventListener('wheel', handleStacksWheel, { passive: false });
stacksContainer.addEventListener('touchstart', handleStacksTouchStart, { passive: false });
stacksContainer.addEventListener('touchmove', handleStacksTouchMove, { passive: false });

finalContainer.addEventListener('wheel', handleFinalContainerWheel, { passive: false });
finalContainer.addEventListener('touchstart', handleFinalContainerTouchStart, { passive: false });
finalContainer.addEventListener('touchmove', handleFinalContainerTouchMove, { passive: false });

window.addEventListener('resize', () => {
  if (isCarouselActive) {
    updateCarouselLayout();
    createCarouselMasks();
  }
  // Atualizar isMobile na mudança de tamanho
  isMobile = window.innerWidth <= 768;
});

updatePortfolioLanguageSwitch();
updateTextLanguage();

document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingLogo = document.querySelector('.loading-logo');
  
  if (loadingLogo) {
    loadingLogo.play().catch(function(error) {
      console.log('Erro ao reproduzir vídeo:', error);
    });
  }
  
  setTimeout(function() {
    loadingScreen.classList.add('fade-out');
    
    setTimeout(function() {
      loadingScreen.style.display = 'none';
      startWebsite();
    }, 1000);
  }, 7000);
});

function startWebsite() {
  console.log('Site iniciado após carregamento');
}