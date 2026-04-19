(function () {
  const section = document.querySelector('.ourCollection');
  if (!section) return;

  const searchInput = section.querySelector('#project-search');
  const filterInputs = Array.from(section.querySelectorAll('input[name="tech-filter"]'));
  const clearButton = section.querySelector('.projectFilters__clear');
  const countElement = section.querySelector('#project-results-count');
  const emptyState = section.querySelector('.projectFilters__empty');

  const cards = Array.from(section.querySelectorAll('.ourCollection__menu-list'));
  if (!cards.length || !searchInput || !countElement || !emptyState || !clearButton) return;

  function normalize(value) {
    return (value || '').toString().trim().toLowerCase();
  }

  function getCardTechnologies(card) {
    const raw = card.getAttribute('data-technologies') || '';
    return raw
      .split(',')
      .map(normalize)
      .filter(Boolean);
  }

  function getCardSearchText(card) {
    const title = card.querySelector('.ourCollection__menu-title')?.textContent || '';
    const text = card.querySelector('.ourCollection__menu-text')?.textContent || '';
    const technologies = getCardTechnologies(card).join(' ');
    return normalize(`${title} ${text} ${technologies}`);
  }

  function getSelectedFilters() {
    return filterInputs.filter((input) => input.checked).map((input) => normalize(input.value));
  }

  function applyFilters() {
    const query = normalize(searchInput.value);
    const selectedFilters = getSelectedFilters();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchableText = getCardSearchText(card);
      const cardTechnologies = getCardTechnologies(card);

      const matchesQuery = !query || searchableText.includes(query);
      const matchesFilters = selectedFilters.every((filter) => cardTechnologies.includes(filter));

      const isVisible = matchesQuery && matchesFilters;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    countElement.textContent = String(visibleCount);
    emptyState.hidden = visibleCount > 0;
  }

  function emitUsageEvent(eventName, detail) {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  searchInput.addEventListener('input', function () {
    applyFilters();
    emitUsageEvent('project_search_used', { queryLength: searchInput.value.trim().length });
  });

  filterInputs.forEach((input) => {
    input.addEventListener('change', function () {
      applyFilters();
      emitUsageEvent('project_filter_used', { activeFilters: getSelectedFilters().length });
    });
  });

  clearButton.addEventListener('click', function () {
    searchInput.value = '';
    filterInputs.forEach((input) => {
      input.checked = false;
    });
    applyFilters();
  });

  applyFilters();
})();
