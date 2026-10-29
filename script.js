const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cards = Array.from(document.querySelectorAll('.game-card-wrapper'));
const noResults = document.getElementById('no-results');
const recommendationsBox = document.getElementById('recommendations');
const allTitles = cards.map(c => c.dataset.title);

function renderRecommendations(query) {
  recommendationsBox.innerHTML = '';
  // recomienda los títulos más parecidos (o todos si no hay nada parecido)
  const suggestions = allTitles
    .slice()
    .sort((a, b) => {
      const qa = a.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      const qb = b.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      return qa - qb;
    })
    .slice(0, 4);

  suggestions.forEach(title => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'recommendation-chip';
    chip.textContent = title;
    chip.addEventListener('click', () => {
      searchInput.value = title;
      runSearch();
    });
    recommendationsBox.appendChild(chip);
  });
}

function runSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const matches = query === '' || title.includes(query);
    card.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  if (visibleCount === 0) {
    noResults.classList.add('active');
    renderRecommendations(query);
  } else {
    noResults.classList.remove('active');
  }
}

searchInput.addEventListener('input', runSearch);
searchBtn.addEventListener('click', runSearch);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') runSearch();
});
