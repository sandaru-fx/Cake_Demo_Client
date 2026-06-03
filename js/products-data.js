/* ========================================
   CAKE TOOLS — Product Catalog Data
   ======================================== */

const CATEGORIES = [
  {
    id: 'piping-tips',
    name: 'Piping Tips & Nozzles',
    icon: '🎯',
    emoji: '💮',
    description: 'Professional-grade piping tips for stunning cake decorations. From delicate petals to bold stars.',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    productCount: 5,
    image: 'assets/images/piping-tips.png'
  },
  {
    id: 'fondant-tools',
    name: 'Fondant Tools',
    icon: '🎨',
    emoji: '🎭',
    description: 'Shape, mold, and sculpt fondant like a pro. Essential tools for every cake artist.',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
    productCount: 5,
    image: 'assets/images/fondant-tools.png'
  },
  {
    id: 'cake-molds',
    name: 'Cake Molds & Pans',
    icon: '🍰',
    emoji: '🎂',
    description: 'Premium baking pans and silicone molds for perfectly shaped cakes every time.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    productCount: 5,
    image: 'assets/images/cake-molds.png'
  },
  {
    id: 'decorating-supplies',
    name: 'Decorating Supplies',
    icon: '✨',
    emoji: '🌟',
    description: 'Everything you need to create show-stopping cake designs. Turntables, spatulas & more.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    productCount: 5,
    image: 'assets/images/decorating-supplies.png'
  },
  {
    id: 'baking-essentials',
    name: 'Baking Essentials',
    icon: '🥄',
    emoji: '🧁',
    description: 'Must-have baking tools and accessories for every kitchen. Quality that lasts.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    productCount: 5,
    image: 'assets/images/baking-essentials.png'
  },
  {
    id: 'packaging-display',
    name: 'Packaging & Display',
    icon: '🎁',
    emoji: '📦',
    description: 'Present your creations beautifully. Premium boxes, boards, stands & ribbons.',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    productCount: 5,
    image: 'assets/images/packaging-display.png'
  }
];

const PRODUCTS = [
  // ─── PIPING TIPS & NOZZLES ─────────────────────
  {
    id: 1,
    name: 'Russian Piping Tips Set (24 Pcs)',
    category: 'piping-tips',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 124,
    description: 'Create stunning floral designs with this premium 24-piece Russian piping tips set. Each tip produces a unique flower pattern in a single squeeze, making it perfect for both beginners and professionals.',
    features: ['24 unique floral tips', 'Food-grade stainless steel', 'Dishwasher safe', 'Includes coupling & bag', 'Gift box packaging'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=80'
  },
  {
    id: 2,
    name: 'Wilton Master Tip Set (55 Pcs)',
    category: 'piping-tips',
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviews: 287,
    description: 'The ultimate piping tip collection from Wilton. Includes every tip you\'ll ever need — from writing tips to large star tips, petal tips, and specialty tips.',
    features: ['55 professional tips', 'Organized storage case', 'Tip chart included', 'Rust-resistant', 'Professional grade'],
    badge: 'Premium',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80'
  },
  {
    id: 3,
    name: 'Petal & Leaf Tip Collection',
    category: 'piping-tips',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviews: 89,
    description: 'Specialized petal and leaf tips for creating realistic buttercream flowers. Includes rose petal, carnation, chrysanthemum, and various leaf tips.',
    features: ['12 specialized tips', 'Seamless construction', 'Polished finish', 'Color-coded chart', 'Storage pouch'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80'
  },
  {
    id: 4,
    name: 'Large Star Tips Set (8 Pcs)',
    category: 'piping-tips',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.7,
    reviews: 156,
    description: 'Create dramatic swirls, rosettes, and borders with these large open and closed star tips. Perfect for cupcake toppers and cake borders.',
    features: ['8 large star tips', 'Open & closed star', 'Heavy-duty steel', 'Easy to clean', 'Size guide included'],
    badge: 'Popular',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558636508-e0969431e58c?w=600&q=80'
  },
  {
    id: 5,
    name: 'Fine Writing Tips Set (6 Pcs)',
    category: 'piping-tips',
    price: 9.99,
    originalPrice: 13.99,
    rating: 4.5,
    reviews: 72,
    description: 'Precision writing tips for detailed inscriptions, lace work, and fine piping. Various sizes from ultra-fine to medium.',
    features: ['6 writing tips', 'Ultra-fine precision', 'Sizes #1 to #6', 'Stainless steel', 'Practice sheets included'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80'
  },

  // ─── FONDANT TOOLS ─────────────────────────────
  {
    id: 6,
    name: 'Professional Fondant Rolling Pin',
    category: 'fondant-tools',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 198,
    description: 'Non-stick silicone rolling pin with adjustable thickness guides. Roll fondant to perfectly even thickness every time.',
    features: ['Non-stick silicone', '4 thickness guides', '20 inch length', 'Ergonomic handles', 'Easy to clean'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1600398137947-a2d63be00eb3?w=600&q=80'
  },
  {
    id: 7,
    name: 'Fondant Smoother Set (3 Pcs)',
    category: 'fondant-tools',
    price: 11.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 143,
    description: 'Achieve flawless fondant finishes with this professional 3-piece smoother set. Includes flat, curved, and edge smoothers.',
    features: ['3-piece set', 'Ergonomic grip', 'Flat & curved smoothers', 'Edge finisher', 'BPA-free plastic'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80'
  },
  {
    id: 8,
    name: 'Fondant Cutter & Embosser Kit (68 Pcs)',
    category: 'fondant-tools',
    price: 29.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 312,
    description: 'The ultimate fondant shaping kit with alphabet cutters, number cutters, flower cutters, and embossing stamps. Create endless designs.',
    features: ['68 pieces total', 'Letters & numbers', 'Flower plunger cutters', 'Embossing stamps', 'Storage case included'],
    badge: 'Premium',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80'
  },
  {
    id: 9,
    name: 'Silicone Embossing Mat Set',
    category: 'fondant-tools',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.6,
    reviews: 95,
    description: 'Food-grade silicone embossing mats with lace, damask, and quilted patterns. Simply press fondant onto the mat for instant texture.',
    features: ['6 pattern mats', 'Food-grade silicone', 'Flexible & durable', 'Easy release', 'Dishwasher safe'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&q=80'
  },
  {
    id: 10,
    name: 'Modeling Tools Set (14 Pcs)',
    category: 'fondant-tools',
    price: 13.99,
    originalPrice: 18.99,
    rating: 4.7,
    reviews: 167,
    description: 'Professional fondant and gum paste modeling tool set. Shape petals, create ruffles, score lines, and sculpt detailed figures.',
    features: ['14 dual-ended tools', 'Ball tools & veining', 'Shell & bone tools', 'Non-slip handles', 'Tool roll included'],
    badge: 'Popular',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'
  },

  // ─── CAKE MOLDS & PANS ────────────────────────
  {
    id: 11,
    name: 'Round Cake Pan Set (3 Pcs)',
    category: 'cake-molds',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 256,
    description: 'Professional anodized aluminum round cake pan set in 6", 8", and 10" sizes. Even heat distribution for perfectly baked layers.',
    features: ['3 sizes: 6", 8", 10"', 'Anodized aluminum', 'Even heat distribution', 'Straight sides', '2" depth'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=600&q=80'
  },
  {
    id: 12,
    name: 'Nordic Ware Bundt Pan',
    category: 'cake-molds',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 389,
    description: 'The iconic Bundt pan with intricate heritage design. Cast aluminum for superior baking performance and stunning presentation.',
    features: ['Cast aluminum', 'Heritage design', 'Non-stick coating', '10-cup capacity', 'Lifetime warranty'],
    badge: 'Premium',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&q=80'
  },
  {
    id: 13,
    name: 'Silicone Mold Collection (6 Pcs)',
    category: 'cake-molds',
    price: 22.99,
    originalPrice: 32.99,
    rating: 4.6,
    reviews: 134,
    description: 'Versatile silicone mold set including rose, daisy, butterfly, heart, star, and geometric shapes. Perfect for chocolates and fondant.',
    features: ['6 unique shapes', 'Food-grade silicone', 'Oven & freezer safe', 'Easy release', 'Vibrant colors'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600&q=80'
  },
  {
    id: 14,
    name: 'Number Cake Mold Set (0-9)',
    category: 'cake-molds',
    price: 27.99,
    originalPrice: 36.99,
    rating: 4.7,
    reviews: 178,
    description: 'Create trendy number cakes for birthdays and celebrations. Complete set of 0-9 with adjustable size templates.',
    features: ['Numbers 0-9', 'Adjustable templates', 'Food-safe material', 'Reusable', 'Instruction booklet'],
    badge: 'Trending',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80'
  },
  {
    id: 15,
    name: '3D Cake Mold (Large Dome)',
    category: 'cake-molds',
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.5,
    reviews: 91,
    description: 'Create spectacular 3D dome cakes, ball cakes, and hemisphere desserts. Heavy-gauge steel with non-stick coating.',
    features: ['Large dome shape', 'Heavy-gauge steel', 'Non-stick coating', '8" diameter', 'Easy unmolding'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80'
  },

  // ─── DECORATING SUPPLIES ───────────────────────
  {
    id: 16,
    name: 'Professional Cake Turntable',
    category: 'decorating-supplies',
    price: 32.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 445,
    description: 'Heavy-duty aluminum alloy turntable with smooth 360° rotation. Non-slip base with ball-bearing mechanism for effortless decorating.',
    features: ['12" aluminum plate', '360° smooth rotation', 'Non-slip rubber base', 'Ball-bearing mechanism', 'Supports 50+ lbs'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80'
  },
  {
    id: 17,
    name: 'Offset Spatula Set (4 Pcs)',
    category: 'decorating-supplies',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviews: 234,
    description: 'Professional stainless steel offset spatula set in 4 sizes. Perfect for smooth frosting, sharp edges, and detailed work.',
    features: ['4 sizes included', 'Stainless steel blade', 'Ergonomic handles', 'Offset design', 'Lifetime guarantee'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80'
  },
  {
    id: 18,
    name: 'Cake Scraper & Comb Set (8 Pcs)',
    category: 'decorating-supplies',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.7,
    reviews: 189,
    description: 'Create stunning textured finishes with this 8-piece scraper set. Includes smooth, patterned, and contour scrapers.',
    features: ['8 unique patterns', 'Stainless steel', 'Smooth & textured', 'Comfortable grip', 'Dishwasher safe'],
    badge: 'Popular',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80'
  },
  {
    id: 19,
    name: 'Cake Airbrush Kit',
    category: 'decorating-supplies',
    price: 54.99,
    originalPrice: 74.99,
    rating: 4.6,
    reviews: 98,
    description: 'Professional cake decorating airbrush system with compressor. Create stunning gradients, stencil designs, and color effects.',
    features: ['Quiet compressor', 'Fine mist nozzle', '0.3mm needle', 'Gravity feed cup', '8 food colors included'],
    badge: 'Premium',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1616690248053-f0e8b07fe2b6?w=600&q=80'
  },
  {
    id: 20,
    name: 'Cake Stencil Set (12 Pcs)',
    category: 'decorating-supplies',
    price: 11.99,
    originalPrice: 16.99,
    rating: 4.5,
    reviews: 112,
    description: 'Beautiful food-safe stencils for airbrushing, royal icing, and powdered sugar designs. Includes floral, geometric, and lace patterns.',
    features: ['12 unique designs', 'Food-safe plastic', 'Reusable & washable', 'Universal size', 'Design guide included'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=600&q=80'
  },

  // ─── BAKING ESSENTIALS ─────────────────────────
  {
    id: 21,
    name: 'Precision Measuring Cup Set',
    category: 'baking-essentials',
    price: 19.99,
    originalPrice: 27.99,
    rating: 4.8,
    reviews: 312,
    description: 'Professional stainless steel measuring cups with precise laser-etched markings. Nesting design for easy storage.',
    features: ['7-piece set', 'Laser-etched marks', 'Stainless steel', 'Nesting design', 'Ergonomic handles'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80'
  },
  {
    id: 22,
    name: 'Glass Mixing Bowl Set (5 Pcs)',
    category: 'baking-essentials',
    price: 28.99,
    originalPrice: 38.99,
    rating: 4.7,
    reviews: 198,
    description: 'Premium tempered glass mixing bowls with silicone lids. Microwave, oven, and dishwasher safe. Perfect for mixing, storing, and serving.',
    features: ['5 sizes with lids', 'Tempered glass', 'Pour spout', 'Non-slip base', 'Stackable design'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&q=80'
  },
  {
    id: 23,
    name: 'Balloon Whisk Set (3 Pcs)',
    category: 'baking-essentials',
    price: 12.99,
    originalPrice: 17.99,
    rating: 4.6,
    reviews: 145,
    description: 'Professional-grade stainless steel whisks in small, medium, and large sizes. Perfect for batter, meringue, and sauces.',
    features: ['3 sizes included', 'Stainless steel wires', 'Comfortable grip', 'Balanced weight', 'Hanging loop'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80'
  },
  {
    id: 24,
    name: 'Silicone Baking Mat Set (3 Pcs)',
    category: 'baking-essentials',
    price: 15.99,
    originalPrice: 21.99,
    rating: 4.9,
    reviews: 267,
    description: 'Non-stick silicone baking mats with measurement guides. Replaces parchment paper — saves money and the environment.',
    features: ['3 sizes included', 'Non-stick surface', 'Measurement guides', '3000+ uses each', 'FDA approved'],
    badge: 'Eco-Friendly',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?w=600&q=80'
  },
  {
    id: 25,
    name: 'Digital Kitchen Thermometer',
    category: 'baking-essentials',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 178,
    description: 'Instant-read digital thermometer with fold-out probe. Essential for candy making, chocolate tempering, and sugar work.',
    features: ['Instant read (2-3s)', 'Fold-out probe', 'LCD backlit display', 'Auto-off feature', 'Waterproof design'],
    badge: 'Popular',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1602526212974-3b1a0ed4debb?w=600&q=80'
  },

  // ─── PACKAGING & DISPLAY ───────────────────────
  {
    id: 26,
    name: 'Premium Cake Boxes (10 Pack)',
    category: 'packaging-display',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.8,
    reviews: 203,
    description: 'Elegant white cake boxes with window display. Sturdy corrugated construction with easy-fold assembly. Available in 10" and 12" sizes.',
    features: ['10 boxes per pack', 'Clear window display', 'Sturdy corrugated', '10" & 12" sizes', 'Easy assembly'],
    badge: 'Best Seller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558636508-e0969431e58c?w=600&q=80'
  },
  {
    id: 27,
    name: 'Gold Cake Boards Set (15 Pcs)',
    category: 'packaging-display',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 167,
    description: 'Elegant gold foil-wrapped cake boards in three sizes. Sturdy, food-safe, and perfect for presenting your creations.',
    features: ['15 boards total', '3 sizes: 8", 10", 12"', 'Gold foil finish', 'Food-safe cardboard', 'Grease resistant'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1549785701-d23cd0e1e1e2?w=600&q=80'
  },
  {
    id: 28,
    name: 'Acrylic Cake Display Stand',
    category: 'packaging-display',
    price: 42.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 145,
    description: 'Crystal-clear acrylic tiered cake stand. Modern minimalist design that showcases your cakes beautifully.',
    features: ['3-tier design', 'Crystal clear acrylic', 'Supports 30+ lbs', 'Easy assembly', 'Elegant finish'],
    badge: 'Premium',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=600&q=80'
  },
  {
    id: 29,
    name: 'Cupcake Holder Box (20 Pack)',
    category: 'packaging-display',
    price: 19.99,
    originalPrice: 27.99,
    rating: 4.6,
    reviews: 134,
    description: 'Individual cupcake boxes with inserts. Clear window displays your cupcakes perfectly for gifting and selling.',
    features: ['20 boxes per pack', 'Individual inserts', 'Clear window', 'Ribbon ties included', 'Multiple colors'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1612197527762-8cfb9b6ceeab?w=600&q=80'
  },
  {
    id: 30,
    name: 'Satin Ribbon Collection (6 Rolls)',
    category: 'packaging-display',
    price: 13.99,
    originalPrice: 18.99,
    rating: 4.5,
    reviews: 89,
    description: 'Premium double-faced satin ribbons in cake-complementing colors. Perfect for finishing cake boxes and gift packaging.',
    features: ['6 color rolls', '25 yards each', 'Double-faced satin', 'Pastel & metallic', 'Multiple widths'],
    badge: null,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80'
  }
];

// ─── Helper Functions ────────────────────────────

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(categoryId) {
  return PRODUCTS.filter(p => p.category === categoryId);
}

function getCategoryById(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    getCategoryById(p.category).name.toLowerCase().includes(q)
  );
}

function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

function getFeaturedProducts(limit = 8) {
  return PRODUCTS.filter(p => p.badge).slice(0, limit);
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}

function getDiscountPercent(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<span class="star filled">★</span>';
    } else if (i - 0.5 <= rating) {
      stars += '<span class="star half">★</span>';
    } else {
      stars += '<span class="star empty">☆</span>';
    }
  }
  return stars;
}
