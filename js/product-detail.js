/* ========================================
   CAKE TOOLS — Product Detail Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  if (!productId) {
    // Redirect or show error if no ID
    window.location.href = 'products.html';
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    document.getElementById('productContent').innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; margin: 100px 0;">
        <div class="empty-state-icon">⚠️</div>
        <h3>Product Not Found</h3>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <a href="products.html" class="btn btn-primary">Back to Products</a>
      </div>
    `;
    return;
  }

  renderProductDetails(product);
  renderRelatedProducts(product);
  setupQuantitySelector();
  
  // Init 3D Scene
  try {
    new ProductDetailScene('productCanvas', product.category);
  } catch(e) {
    console.log('3D Scene error:', e);
  }
});

function renderProductDetails(product) {
  const cat = getCategoryById(product.category);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0;
  
  document.title = `${product.name} — CakeTools`;
  
  // Breadcrumb
  const breadcrumb = document.getElementById('breadcrumbCurrent');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="products.html?category=${product.category}">${cat.name}</a>
      <span class="separator">/</span>
      <span class="current">${product.name}</span>
    `;
  }
  
  // Badges
  const badgesEl = document.getElementById('productBadges');
  if (badgesEl) {
    let badgesHtml = '';
    if (product.badge) {
      const badgeClass = product.badge === 'Trending' ? 'trending' : 
                         product.badge === 'Premium' ? 'premium' : 
                         product.badge === 'Eco-Friendly' ? 'eco' : '';
      badgesHtml += `<span class="product-badge ${badgeClass}" style="position:static;">${product.badge}</span>`;
    }
    if (discount > 0) {
      badgesHtml += `<span class="product-badge trending" style="position:static;">Save ${discount}%</span>`;
    }
    badgesEl.innerHTML = badgesHtml;
  }
  
  // Category gradient for showcase background
  const showcase = document.getElementById('productShowcase');
  if (showcase && cat) {
    showcase.style.background = cat.gradient;
  }
  
  // Text content
  document.getElementById('productCategory').innerHTML = `${cat.emoji} ${cat.name}`;
  document.getElementById('productCategory').href = `products.html?category=${product.category}`;
  document.getElementById('productTitle').textContent = product.name;
  
  // Rating
  document.getElementById('productRating').innerHTML = `
    <div style="display:flex; gap:2px;">${renderStars(product.rating)}</div>
    <span>${product.rating} (${product.reviews} reviews)</span>
  `;
  
  // Stock
  const stockEl = document.getElementById('productStock');
  if (product.inStock) {
    stockEl.innerHTML = '<span style="color:var(--color-success)">●</span> In Stock & Ready to Ship';
    stockEl.className = 'product-stock stock-in';
  } else {
    stockEl.innerHTML = '<span style="color:var(--color-error)">●</span> Out of Stock';
    stockEl.className = 'product-stock stock-out';
    document.getElementById('addToCartBtn').disabled = true;
    document.getElementById('addToCartBtn').textContent = 'Out of Stock';
    document.getElementById('addToCartBtn').classList.remove('btn-primary');
    document.getElementById('addToCartBtn').classList.add('btn-secondary');
  }
  
  // Price
  document.getElementById('productPrice').textContent = formatPrice(product.price);
  if (product.originalPrice) {
    document.getElementById('productOriginalPrice').textContent = formatPrice(product.originalPrice);
  }
  if (discount > 0) {
    document.getElementById('productDiscount').textContent = `-${discount}%`;
  }
  
  // Description & Features
  document.getElementById('productDesc').textContent = product.description;
  
  const featuresList = document.getElementById('productFeatures');
  if (product.features && product.features.length > 0) {
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
  }
}

function renderRelatedProducts(product) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;
  
  const related = getRelatedProducts(product, 4);
  
  if (related.length > 0) {
    grid.innerHTML = related.map((p, i) => renderProductCard(p, i * 100)).join('');
  } else {
    document.querySelector('.related-products').style.display = 'none';
  }
}

function setupQuantitySelector() {
  const input = document.getElementById('qtyInput');
  const minus = document.getElementById('qtyMinus');
  const plus = document.getElementById('qtyPlus');
  const addBtn = document.getElementById('addToCartBtn');
  
  if (!input || !minus || !plus) return;
  
  minus.addEventListener('click', () => {
    let val = parseInt(input.value) || 1;
    if (val > 1) input.value = val - 1;
  });
  
  plus.addEventListener('click', () => {
    let val = parseInt(input.value) || 1;
    if (val < 99) input.value = val + 1;
  });
  
  input.addEventListener('change', () => {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) input.value = 1;
    if (val > 99) input.value = 99;
  });
  
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const title = document.getElementById('productTitle').textContent;
      const qty = input.value;
      if (!addBtn.disabled) {
        if (typeof showToast === 'function') {
          showToast(`Added ${qty}x ${title} to cart!`, '🛒');
        } else {
          alert(`Added ${qty}x ${title} to cart!`);
        }
      }
    });
  }
}
