const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.carousel-btn.right');
const prevBtn = document.querySelector('.carousel-btn.left');
let currentIndex = 0; // Começa no projeto 1 (índice 0)

function getCards() {
  return Array.from(track.children);
}

function updateCarousel(transition = true) {
  const cards = getCards();
  // Use o valor real do margin (40px de cada lado = 80px)
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

// Inicialização
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