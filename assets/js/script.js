const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

// Fecha menu ao clicar em link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});


// LOGO SVG 
// Espera o carregamento e adiciona a classe 'abrir' para iniciar a animação
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.flor').classList.add('abrir');
  }, 500); // meio segundo de delay antes de começar
});


// GALERIA DE FOTOS 
// Dados da galeria
const galleryData = [
  { img: 'assets/imagens/img-clinica-01.jpg', category: 'centro',  alt: 'Sala do Centro Estético' },
  { img: 'assets/imagens/img-clinica-02.jpg', category: 'centro',  alt: 'Sala do Centro Estético' },
  { img: 'assets/imagens/img-clinica-03.jpg', category: 'centro',  alt: 'Sala do Centro Estético' },
  { img: 'assets/imagens/img-clinica-04.jpg', category: 'centro',  alt: 'Sala do Centro Estético' },
  { img: 'assets/imagens/img-procedimento-01.jpg', category: 'procedimentos', alt:'Tratamento facial' },
  { img: 'assets/imagens/img-procedimento-02.jpg', category: 'procedimentos', alt: 'Massagem terapêutica' },
  { img: 'assets/imagens/img-procedimento-03.jpg', category: 'procedimentos', alt: 'Massagem terapêutica' },
  { img: 'assets/imagens/img-procedimento-04.jpg', category: 'procedimentos', alt: 'Tratamento facial' }
];

const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.gallery-filters button');
let currentCategory = 'all';

// Renderiza a galeria dinamicamente
function renderGallery(category = 'all') {
  galleryGrid.innerHTML = '';
  const filtered = category === 'all' ? galleryData : galleryData.filter(item => item.category === category);

  filtered.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    div.style.transitionDelay = `${index * 0.1}s`;
    div.innerHTML = `<img src="${item.img}" alt="${item.alt}">`;
    galleryGrid.appendChild(div);
  });

  initScrollReveal(); // animação scroll reveal

}

// Inicializa a galeria
renderGallery(currentCategory);

// Filtragem
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-filter');
    renderGallery(currentCategory);
  });
});

// Scroll reveal
function initScrollReveal() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach((item, index) => observer.observe(item));
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

let lastFocusedElement; // guarda quem tinha foco antes do lightbox

// abre o lightbox
function openLightbox(src, alt = '') {
  lastFocusedElement = document.activeElement; // guarda foco atual
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCaption.textContent = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (closeBtn) closeBtn.focus(); // foco no botão fechar
}

// fecha o lightbox
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  lightboxCaption.textContent = '';
  document.body.style.overflow = '';

  // devolve o foco para onde estava antes
  if (lastFocusedElement) lastFocusedElement.focus();
}

// eventos de fechamento
if (closeBtn) {
  closeBtn.addEventListener('click', closeLightbox);
}

// fecha clicando fora do conteúdo (overlay)
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// fecha com Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

// adiciona evento às imagens da galeria
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
