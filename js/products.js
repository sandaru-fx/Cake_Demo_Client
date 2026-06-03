/* ========================================
   CAKE TOOLS — Products Page Logic
   Search, Filter, Sort
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('productsSearch');
  const sortSelect = document.getElementById('sortSelect');
  const countEl = document.getElementById('productsCount');
  const filtersEl = document.getElementById('activeFilters');

  let currentCategory = null;
  let currentSearch = '';
  let currentSort = 'featured';

  // Get URL params
  const params = new URLSearchParams(window.location.search);
  if (params.has('category')) {
    currentCategory = params.get('category');
  }
  if (params.has('search')) {
    currentSearch = params.get('search');
    if (searchInput) searchInput.value = currentSearch;
  }

  // Build sidebar
  buildSidebar();

  // Initial render
  renderProducts();

  // Search
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderProducts();
      }, 300);
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  function buildSidebar() {
    const list = document.getElementById('categoryFilterList');
    if (!list) return;

    const allCount = PRODUCTS.length;
    let html = `
      <button class="category-filter-btn ${!currentCategory ? 'active' : ''}" data-category="">
        <span>All Products</span>
        <span class="count">${allCount}</span>
      </button>
    `;

    CATEGORIES.forEach(cat => {
      const count = getProductsByCategory(cat.id).length;
      html += `
        <button class="category-filter-btn ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
          <span>${cat.emoji} ${cat.name}</span>
          <span class="count">${count}</span>
        </button>
      `;
    });

    list.innerHTML = html;

    // Click handlers
    list.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category || null;

        // Update active state
        list.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update URL
        const url = new URL(window.location);
        if (currentCategory) {
          url.searchParams.set('category', currentCategory);
        } else {
          url.searchParams.delete('category');
        }
        window.history.replaceState({}, '', url);

        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!grid) return;

    let filtered = [...PRODUCTS];

    // Category filter
    if (currentCategory) {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Search filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        getCategoryById(p.category).name.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    // Update count
    if (countEl) {
      countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${PRODUCTS.length}</strong> products`;
    }

    // Render active filters
    if (filtersEl) {
      let filterHtml = '';
      if (currentCategory) {
        const cat = getCategoryById(currentCategory);
        filterHtml += `<span class="filter-tag" onclick="clearCategoryFilter()">${cat.emoji} ${cat.name} <span class="remove">✕</span></span>`;
      }
      if (currentSearch) {
        filterHtml += `<span class="filter-tag" onclick="clearSearchFilter()">🔍 "${currentSearch}" <span class="remove">✕</span></span>`;
      }
      if (filterHtml) {
        filterHtml += `<span class="clear-filters" onclick="clearAllFilters()">Clear All</span>`;
      }
      filtersEl.innerHTML = filterHtml;
    }

    // Render grid
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>No Products Found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
          <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map((p, i) => renderProductCard(p, i * 60)).join('');
    }

    // Re-init animations
    initTiltCards();
    initScrollReveal();
  }

  // Make functions global
  window.clearCategoryFilter = function() {
    currentCategory = null;
    const url = new URL(window.location);
    url.searchParams.delete('category');
    window.history.replaceState({}, '', url);
    document.querySelectorAll('.category-filter-btn').forEach(b => {
      b.classList.toggle('active', !b.dataset.category);
    });
    renderProducts();
  };

  window.clearSearchFilter = function() {
    currentSearch = '';
    if (searchInput) searchInput.value = '';
    renderProducts();
  };

  window.clearAllFilters = function() {
    currentCategory = null;
    currentSearch = '';
    if (searchInput) searchInput.value = '';
    const url = new URL(window.location);
    url.searchParams.delete('category');
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url);
    document.querySelectorAll('.category-filter-btn').forEach(b => {
      b.classList.toggle('active', !b.dataset.category);
    });
    renderProducts();
  };

  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    els.forEach(el => obs.observe(el));
  }

  function initTiltCards() {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / cy * -3;
        const ry = (x - cx) / cx * 3;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
