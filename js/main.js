/* ========================================
   CAKE TOOLS — Main JS
   Navigation, Search, Shared Utilities
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSearch();
  initScrollEffects();
  initBackToTop();
  setActiveNavLink();
});

/* ─── Navigation ────────────────────────────────── */
function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ─── Search ────────────────────────────────────── */
function initSearch() {
  const searchBar = document.querySelector('.search-bar');
  const searchDropdown = document.querySelector('.search-dropdown');

  if (!searchBar || !searchDropdown) return;

  let debounceTimer;

  searchBar.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.trim();
      if (query.length >= 2) {
        showSearchResults(query, searchDropdown);
      } else {
        searchDropdown.classList.remove('active');
      }
    }, 250);
  });

  searchBar.addEventListener('focus', () => {
    const query = searchBar.value.trim();
    if (query.length >= 2) {
      showSearchResults(query, searchDropdown);
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      searchDropdown.classList.remove('active');
    }
  });

  // Handle Enter key
  searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchBar.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

function showSearchResults(query, dropdown) {
  if (typeof searchProducts !== 'function') return;

  const results = searchProducts(query).slice(0, 6);

  if (results.length === 0) {
    dropdown.innerHTML = `
      <div class="search-dropdown-empty">
        <p>😔 No products found for "<strong>${escapeHtml(query)}</strong>"</p>
        <p style="margin-top: 8px; font-size: 12px;">Try different keywords</p>
      </div>
    `;
  } else {
    dropdown.innerHTML = results.map(product => {
      const cat = getCategoryById(product.category);
      return `
        <a href="product-detail.html?id=${product.id}" class="search-dropdown-item">
          <div class="item-emoji" style="background: transparent; padding: 0;">
            <img src="${product.image || (cat ? cat.image : 'assets/images/placeholder.png')}" alt="" style="width:100%; height:100%; object-fit:cover; border-radius: var(--radius-sm);">
          </div>
          <div class="item-info">
            <h4>${highlightMatch(product.name, query)}</h4>
            <p>${cat ? cat.name : ''} · ${formatPrice(product.price)}</p>
          </div>
        </a>
      `;
    }).join('');
  }

  dropdown.classList.add('active');
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark style="background: var(--color-primary-lighter); color: var(--color-primary-dark); padding: 1px 2px; border-radius: 2px;">$1</mark>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ─── Scroll Effects ────────────────────────────── */
function initScrollEffects() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
}

/* ─── Back to Top ───────────────────────────────── */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Active Nav Link ───────────────────────────── */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── Toast Notification ────────────────────────── */
function showToast(message, icon = '✅') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ─── Product Card Renderer ─────────────────────── */
function renderProductCard(product, delay = 0) {
  const cat = getCategoryById(product.category);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;
  const badgeClass = product.badge ?
    (product.badge === 'Trending' ? 'trending' :
    product.badge === 'Premium' ? 'premium' :
    product.badge === 'Eco-Friendly' ? 'eco' : '') : '';

  return `
    <a href="product-detail.html?id=${product.id}" class="product-card reveal" style="transition-delay: ${delay}ms;">
      <div class="product-card-image">
        <img src="${product.image || (cat ? cat.image : 'assets/images/placeholder.png')}" alt="${product.name}" class="product-real-image">
        ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${cat ? cat.name : ''}</div>
        <h3 class="product-card-title">${product.name}</h3>
        <div class="product-card-rating">
          ${renderStars(product.rating)}
          <span class="rating-text">${product.rating} (${product.reviews})</span>
        </div>
        <div class="product-card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
        </div>
      </div>
    </a>
  `;
}

/* ─── Shared Header HTML ────────────────────────── */
function getHeaderHTML() {
  return `
    <header class="header" id="header">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">🎂</div>
          <span>CakeTools</span>
        </a>

        <nav class="nav-links" id="navLinks">
          <a href="index.html">Home</a>
          <a href="products.html">Products</a>
          <a href="categories.html">Categories</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <div class="search-wrapper mobile-search">
            <input type="text" class="search-bar" id="searchBar" placeholder="Search cake tools..." autocomplete="off">
            <span class="search-icon">🔍</span>
            <div class="search-dropdown" id="searchDropdown"></div>
          </div>
        </nav>

        <div class="header-right">
          <div class="search-wrapper desktop-search">
            <input type="text" class="search-bar" id="searchBarDesktop" placeholder="Search cake tools..." autocomplete="off">
            <span class="search-icon">🔍</span>
            <div class="search-dropdown" id="searchDropdownDesktop"></div>
          </div>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="nav-overlay" id="navOverlay"></div>
  `;
}

/* ─── Shared Footer HTML ────────────────────────── */
function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <div class="logo-icon">🎂</div>
              <span>CakeTools</span>
            </a>
            <p>Your one-stop shop for premium cake decorating tools and supplies. Helping bakers create stunning masterpieces since 2020.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Pinterest">📌</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">All Products</a></li>
              <li><a href="categories.html">Categories</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><a href="products.html?category=piping-tips">Piping Tips</a></li>
              <li><a href="products.html?category=fondant-tools">Fondant Tools</a></li>
              <li><a href="products.html?category=cake-molds">Cake Molds</a></li>
              <li><a href="products.html?category=decorating-supplies">Decorating</a></li>
              <li><a href="products.html?category=baking-essentials">Baking</a></li>
              <li><a href="products.html?category=packaging-display">Packaging</a></li>
            </ul>
          </div>

          <div class="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 1rem;">Get the latest updates on new tools and exclusive offers!</p>
            <input type="email" class="form-input" placeholder="Your email address">
            <button class="btn btn-primary" style="width: 100%;">Subscribe ✨</button>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2024 CakeTools. All rights reserved. Made with 🎂 and ❤️</p>
          <p>
            <a href="#" style="color: rgba(255,255,255,0.5);">Privacy Policy</a> ·
            <a href="#" style="color: rgba(255,255,255,0.5);">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
  `;
}
