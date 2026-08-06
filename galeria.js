// =========================================================
// MARCENARIA OLIVEIRA — galeria (filtros + lightbox)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* -------- Filtros por categoria -------- */
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  const itens = document.querySelectorAll('.galeria-item');

  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const categoria = btn.dataset.categoria;

      itens.forEach(item => {
        const pertence = categoria === 'todos' || item.dataset.categoria === categoria;
        item.style.display = pertence ? '' : 'none';
      });
    });
  });

  /* -------- Lightbox -------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategoria = document.getElementById('lightboxCategoria');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  const listaItens = Array.from(itens);
  let indiceAtual = 0;

  function abrirLightbox(indice) {
    indiceAtual = indice;
    atualizarLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxVideo.pause();
  }

  function atualizarLightbox() {
    const item = listaItens[indiceAtual];
    const titulo = item.dataset.titulo || 'Projeto';
    const categoria = item.dataset.categoriaLabel || '';
    const imagem = item.dataset.img || '';
    const video = item.dataset.video || '';

    lightboxVideo.pause();

    if (video) {
      // Item tem vídeo: mostra o player e esconde a foto
      lightboxVideo.src = video;
      lightboxVideo.style.display = 'block';
      lightboxImg.style.display = 'none';
    } else {
      // Item só tem foto: mostra a foto e esconde o player
      lightboxVideo.style.display = 'none';
      lightboxImg.style.display = 'flex';
      if (imagem) lightboxImg.style.backgroundImage = `url('${imagem}')`;
      lightboxImg.querySelector('span').textContent = 'Foto grande — ' + titulo;
    }

    lightboxTitle.textContent = titulo;
    lightboxCategoria.textContent = categoria;
  }

  function proximo() {
    indiceAtual = (indiceAtual + 1) % listaItens.length;
    atualizarLightbox();
  }

  function anterior() {
    indiceAtual = (indiceAtual - 1 + listaItens.length) % listaItens.length;
    atualizarLightbox();
  }

  itens.forEach((item, indice) => {
    item.addEventListener('click', () => abrirLightbox(indice));
  });

  btnClose.addEventListener('click', fecharLightbox);
  btnNext.addEventListener('click', proximo);
  btnPrev.addEventListener('click', anterior);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowRight') proximo();
    if (e.key === 'ArrowLeft') anterior();
  });
});
