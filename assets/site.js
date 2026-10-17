const cards = [...document.querySelectorAll('.post-card')];
const input = document.querySelector('#searchInput');
const count = document.querySelector('#resultCount');
const chips = [...document.querySelectorAll('.chip')];
let activeCategory = '全部';

function applyFilters() {
  const q = (input?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = activeCategory === '全部' || card.dataset.category === activeCategory;
    const haystack = `${card.dataset.title} ${card.dataset.excerpt} ${card.dataset.category}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const show = matchesCategory && matchesQuery;
    card.style.display = show ? '' : 'none';
    if (show) visible += 1;
  });
  if (count) count.textContent = visible;
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    activeCategory = chip.dataset.category;
    chips.forEach(item => item.classList.toggle('active', item === chip));
    applyFilters();
  });
});

input?.addEventListener('input', applyFilters);

document.querySelectorAll('.post-thumb img').forEach(img => {
  img.addEventListener('error', () => img.remove(), { once: true });
});

document.querySelectorAll('.prose img').forEach(img => {
  img.addEventListener('error', () => {
    const label = document.createElement('span');
    label.className = 'missing-image';
    const src = img.getAttribute('src') || '图片';
    label.textContent = `图片未加载：${src.split('/').pop() || '图片'}`;
    img.replaceWith(label);
  }, { once: true });
});
