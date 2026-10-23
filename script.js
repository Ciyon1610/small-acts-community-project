document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.movie-card');
  const search = document.querySelector('#movie-search');
  const empty = document.querySelector('#no-results');
  let selectedGenre = 'all';

  function updateMovies() {
    const query = search ? search.value.trim().toLowerCase() : '';
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesGenre = selectedGenre === 'all' || card.dataset.genre === selectedGenre;
      const matchesSearch = card.dataset.title.includes(query);
      const visible = matchesGenre && matchesSearch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (empty) empty.hidden = visibleCount > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      selectedGenre = button.dataset.filter;
      updateMovies();
    });
  });
  if (search) search.addEventListener('input', updateMovies);

  const form = document.querySelector('#newsletter-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.querySelector('#form-message');
      message.textContent = 'Thanks for trying the demo! No email was sent or stored.';
      form.reset();
    });
  }
});
