// Carousel
document.addEventListener('DOMContentLoaded', function () {
  // Carousel logic
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.right');
  const prevBtn = document.querySelector('.carousel-btn.left');
  let currentIndex = 0;

  function getCards() {
    return Array.from(track.children);
  }

  function updateCarousel(transition = true) {
    const cards = getCards();
    if (!cards.length) return;
    const style = getComputedStyle(cards[0]);
    const cardWidth = cards[0].getBoundingClientRect().width;
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const totalCardWidth = cardWidth + margin;
    const containerWidth = document.querySelector('.carousel').offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    track.style.transition = transition ? 'transform 0.5s cubic-bezier(.77,0,.18,1)' : 'none';
    track.style.transform = `translateX(${-totalCardWidth * currentIndex + offset}px)`;

    cards.forEach((card, i) => {
      card.classList.remove('active', 'left');
      if (i === currentIndex) card.classList.add('active');
      else if (i === currentIndex - 1) card.classList.add('left');
    });

    prevBtn.style.display = currentIndex === 0 ? 'none' : 'inline-flex';
    nextBtn.style.display = currentIndex === cards.length - 1 ? 'none' : 'inline-flex';
  }

  nextBtn.addEventListener('click', () => {
    const cards = getCards();
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener('load', () => {
    updateCarousel(false);
  });

  // Saber mais (toggle)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more-info-btn')) {
      const info = e.target.nextElementSibling;
      info.style.display = info.style.display === 'block' ? 'none' : 'block';
    }
  });

  // Modal de contato
  const contatoBtn = document.querySelector('a[href="#contato"]');
  const modal = document.getElementById('modal-contato');
  const closeBtn = document.querySelector('.close-btn');

  // Garante que o modal começa oculto
  if (modal) modal.classList.remove('active');

  if (contatoBtn && modal && closeBtn) {
    contatoBtn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('active');
    });

    closeBtn.addEventListener('click', function () {
      modal.classList.remove('active');
    });

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
