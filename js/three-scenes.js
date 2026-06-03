/* ========================================
   CAKE TOOLS — Three.js 3D Wireframe Scenes
   ======================================== */

class CakeScene {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      wireframeColor: 0xB76E79,
      backgroundColor: null,
      interactive: false,
      particleCount: 50,
      ...options
    };

    this.mouse = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.objects = [];
    this.particles = [];
    this.isRunning = true;

    this.init();
  }

  init() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xB76E79, 1, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Mouse tracking
    if (this.options.interactive) {
      this.renderer.domElement.classList.add('three-canvas-interactive');
    }

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize
    window.addEventListener('resize', () => this.onResize());

    // Start animation
    this.animate();
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  createWireframeMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color: color || this.options.wireframeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
  }

  createGlowMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color: color || this.options.wireframeColor,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());
    const time = this.clock.getElapsedTime();
    this.update(time);
    this.renderer.render(this.scene, this.camera);
  }

  update(time) {
    // Override in subclasses
  }

  destroy() {
    this.isRunning = false;
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container && this.renderer.domElement.parentNode === this.container) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
  }
}

/* ─── Hero Scene: Wireframe Wedding Cake ────────── */
class HeroCakeScene extends CakeScene {
  constructor(containerId) {
    super(containerId, { wireframeColor: 0xB76E79, particleCount: 80 });
    if (!this.container) return;
    this.buildScene();
  }

  buildScene() {
    const wireMat = this.createWireframeMaterial();
    const glowMat = this.createGlowMaterial();

    // Cake tiers
    const tiers = [
      { radius: 2.0, height: 1.0, y: -1.5 },
      { radius: 1.5, height: 0.9, y: -0.3 },
      { radius: 1.0, height: 0.8, y: 0.8 },
      { radius: 0.5, height: 0.6, y: 1.7 }
    ];

    this.cakeGroup = new THREE.Group();

    tiers.forEach((tier, i) => {
      const geo = new THREE.CylinderGeometry(tier.radius, tier.radius + 0.1, tier.height, 24, 1);
      const mesh = new THREE.Mesh(geo, wireMat.clone());
      mesh.position.y = tier.y;
      this.cakeGroup.add(mesh);

      // Glow layer
      const glowGeo = new THREE.CylinderGeometry(tier.radius + 0.02, tier.radius + 0.12, tier.height + 0.02, 24, 1);
      const glow = new THREE.Mesh(glowGeo, glowMat.clone());
      glow.position.y = tier.y;
      this.cakeGroup.add(glow);

      // Decorative ring on top of each tier
      const ringGeo = new THREE.TorusGeometry(tier.radius - 0.1, 0.03, 8, 32);
      const ring = new THREE.Mesh(ringGeo, wireMat.clone());
      ring.position.y = tier.y + tier.height / 2;
      ring.rotation.x = Math.PI / 2;
      this.cakeGroup.add(ring);
    });

    // Top decoration - sphere
    const topGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const topMesh = new THREE.Mesh(topGeo, wireMat.clone());
    topMesh.position.y = 2.3;
    this.cakeGroup.add(topMesh);

    // Star on top
    const starGeo = new THREE.OctahedronGeometry(0.2, 0);
    const star = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({
      color: 0xFFB347,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    }));
    star.position.y = 2.7;
    this.cakeGroup.add(star);
    this.star = star;

    this.scene.add(this.cakeGroup);

    // Floating particles
    this.createParticles();

    // Floating decorative shapes
    this.createFloatingShapes();

    // Adjust camera
    this.camera.position.set(0, 1, 7);
    this.camera.lookAt(0, 0.5, 0);
  }

  createParticles() {
    const particleGeo = new THREE.BufferGeometry();
    const count = this.options.particleCount;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xB76E79,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    this.particleSystem = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particleSystem);
  }

  createFloatingShapes() {
    this.floatingShapes = [];
    const shapes = [
      new THREE.IcosahedronGeometry(0.2, 0),
      new THREE.TetrahedronGeometry(0.2, 0),
      new THREE.OctahedronGeometry(0.15, 0),
      new THREE.DodecahedronGeometry(0.18, 0),
    ];

    const colors = [0xB76E79, 0xD4A0A8, 0xFFB347, 0xFF6B6B];

    for (let i = 0; i < 8; i++) {
      const geo = shapes[i % shapes.length];
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2
      );
      mesh.userData = {
        speed: 0.3 + Math.random() * 0.5,
        rotSpeed: 0.5 + Math.random(),
        floatOffset: Math.random() * Math.PI * 2
      };
      this.scene.add(mesh);
      this.floatingShapes.push(mesh);
    }
  }

  update(time) {
    if (this.cakeGroup) {
      this.cakeGroup.rotation.y = time * 0.3 + this.mouse.x * 0.3;
      this.cakeGroup.position.y = Math.sin(time * 0.5) * 0.15;
    }

    if (this.star) {
      this.star.rotation.y = time * 2;
      this.star.rotation.x = time * 1.5;
    }

    if (this.particleSystem) {
      this.particleSystem.rotation.y = time * 0.05;
      this.particleSystem.rotation.x = time * 0.02;
    }

    if (this.floatingShapes) {
      this.floatingShapes.forEach(shape => {
        const d = shape.userData;
        shape.rotation.x = time * d.rotSpeed;
        shape.rotation.z = time * d.rotSpeed * 0.7;
        shape.position.y += Math.sin(time * d.speed + d.floatOffset) * 0.003;
      });
    }
  }
}

/* ─── Category Scene: Floating Tools ────────────── */
class CategoryScene extends CakeScene {
  constructor(containerId) {
    super(containerId, { wireframeColor: 0xB76E79, particleCount: 40 });
    if (!this.container) return;
    this.buildScene();
  }

  buildScene() {
    this.toolGroup = new THREE.Group();

    // Spatula shape (flat box)
    const spatulaHandle = new THREE.BoxGeometry(0.15, 2, 0.1);
    const spatulaBlade = new THREE.BoxGeometry(0.6, 0.8, 0.05);
    const wireMat = this.createWireframeMaterial(0xB76E79);

    const handle1 = new THREE.Mesh(spatulaHandle, wireMat.clone());
    handle1.position.set(-3, 0, 0);
    this.toolGroup.add(handle1);

    const blade1 = new THREE.Mesh(spatulaBlade, wireMat.clone());
    blade1.position.set(-3, 1.4, 0);
    this.toolGroup.add(blade1);

    // Rolling pin (cylinder)
    const rollingGeo = new THREE.CylinderGeometry(0.25, 0.25, 3, 16);
    const rolling = new THREE.Mesh(rollingGeo, this.createWireframeMaterial(0xD4A0A8));
    rolling.position.set(0, 0, 0);
    rolling.rotation.z = Math.PI / 6;
    this.toolGroup.add(rolling);

    // Rolling pin handles
    const handleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 8);
    const lHandle = new THREE.Mesh(handleGeo, this.createWireframeMaterial(0xFFB347));
    lHandle.position.set(-1.4, -0.8, 0);
    lHandle.rotation.z = Math.PI / 6;
    this.toolGroup.add(lHandle);

    const rHandle = new THREE.Mesh(handleGeo.clone(), this.createWireframeMaterial(0xFFB347));
    rHandle.position.set(1.4, 0.8, 0);
    rHandle.rotation.z = Math.PI / 6;
    this.toolGroup.add(rHandle);

    // Whisk shape (cone + lines)
    const whiskGeo = new THREE.ConeGeometry(0.5, 1.5, 12, 1, true);
    const whisk = new THREE.Mesh(whiskGeo, this.createWireframeMaterial(0xFF6B6B));
    whisk.position.set(3, -0.5, 0);
    this.toolGroup.add(whisk);

    const whiskHandle = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8);
    const wHandle = new THREE.Mesh(whiskHandle, this.createWireframeMaterial(0xFF6B6B));
    wHandle.position.set(3, 1, 0);
    this.toolGroup.add(wHandle);

    this.scene.add(this.toolGroup);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(40 * 3);
    for (let i = 0; i < 40 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xD4A0A8, size: 0.04, transparent: true, opacity: 0.5 });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);

    this.camera.position.set(0, 0, 7);
    this.camera.lookAt(0, 0, 0);
  }

  update(time) {
    if (this.toolGroup) {
      this.toolGroup.rotation.y = time * 0.2 + this.mouse.x * 0.2;
      this.toolGroup.position.y = Math.sin(time * 0.4) * 0.2;
    }
    if (this.particles) {
      this.particles.rotation.y = time * 0.03;
    }
  }
}

/* ─── Product Detail Scene: Interactive 3D ──────── */
class ProductDetailScene extends CakeScene {
  constructor(containerId, productCategory) {
    super(containerId, { interactive: true, wireframeColor: 0xB76E79 });
    if (!this.container) return;
    this.productCategory = productCategory;
    this.buildScene();
    this.setupDrag();
  }

  buildScene() {
    this.productGroup = new THREE.Group();
    const wireMat = this.createWireframeMaterial();

    switch (this.productCategory) {
      case 'piping-tips':
        // Cone shape (piping tip)
        const cone = new THREE.ConeGeometry(1, 2, 12);
        const coneMesh = new THREE.Mesh(cone, wireMat);
        this.productGroup.add(coneMesh);
        // Inner detail
        const innerCone = new THREE.ConeGeometry(0.6, 1.8, 8);
        const inner = new THREE.Mesh(innerCone, this.createWireframeMaterial(0xD4A0A8));
        this.productGroup.add(inner);
        break;

      case 'fondant-tools':
        // Rolling pin
        const pin = new THREE.CylinderGeometry(0.4, 0.4, 3, 16);
        const pinMesh = new THREE.Mesh(pin, wireMat);
        pinMesh.rotation.z = Math.PI / 4;
        this.productGroup.add(pinMesh);
        break;

      case 'cake-molds':
        // Bundt pan (torus)
        const torus = new THREE.TorusGeometry(1.2, 0.5, 12, 24);
        const torusMesh = new THREE.Mesh(torus, wireMat);
        torusMesh.rotation.x = Math.PI / 3;
        this.productGroup.add(torusMesh);
        break;

      case 'decorating-supplies':
        // Turntable (flat cylinder)
        const disc = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 24);
        const discMesh = new THREE.Mesh(disc, wireMat);
        this.productGroup.add(discMesh);
        const base = new THREE.CylinderGeometry(0.8, 1, 0.8, 16);
        const baseMesh = new THREE.Mesh(base, this.createWireframeMaterial(0xD4A0A8));
        baseMesh.position.y = -0.5;
        this.productGroup.add(baseMesh);
        break;

      case 'baking-essentials':
        // Measuring cup (cylinder with handle)
        const cup = new THREE.CylinderGeometry(0.8, 0.6, 1.5, 16, 1, true);
        const cupMesh = new THREE.Mesh(cup, wireMat);
        this.productGroup.add(cupMesh);
        const handle = new THREE.TorusGeometry(0.4, 0.06, 8, 12, Math.PI);
        const handleMesh = new THREE.Mesh(handle, this.createWireframeMaterial(0xFFB347));
        handleMesh.position.set(0.9, 0, 0);
        handleMesh.rotation.y = Math.PI / 2;
        this.productGroup.add(handleMesh);
        break;

      default:
        // Generic box (cake box)
        const box = new THREE.BoxGeometry(2, 1.5, 2);
        const boxMesh = new THREE.Mesh(box, wireMat);
        this.productGroup.add(boxMesh);
        // Ribbon
        const ribbon = new THREE.TorusGeometry(1.2, 0.04, 4, 24);
        const ribbonMesh = new THREE.Mesh(ribbon, this.createWireframeMaterial(0xFF6B6B));
        ribbonMesh.rotation.x = Math.PI / 2;
        ribbonMesh.position.y = 0.3;
        this.productGroup.add(ribbonMesh);
        break;
    }

    this.scene.add(this.productGroup);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(30 * 3);
    for (let i = 0; i < 30 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xD4A0A8, size: 0.03, transparent: true, opacity: 0.4 });
    this.bgParticles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.bgParticles);

    this.camera.position.set(0, 1, 5);
    this.camera.lookAt(0, 0, 0);
  }

  setupDrag() {
    let isDragging = false;
    let prevX = 0, prevY = 0;
    const canvas = this.renderer.domElement;

    canvas.addEventListener('mousedown', (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.productGroup) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      this.productGroup.rotation.y += dx * 0.01;
      this.productGroup.rotation.x += dy * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    });
    canvas.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('mouseleave', () => { isDragging = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; });
    canvas.addEventListener('touchmove', (e) => {
      if (!isDragging || !this.productGroup) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      this.productGroup.rotation.y += dx * 0.01;
      this.productGroup.rotation.x += dy * 0.01;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    });
    canvas.addEventListener('touchend', () => { isDragging = false; });
  }

  update(time) {
    if (this.productGroup) {
      this.productGroup.rotation.y += 0.003;
      this.productGroup.position.y = Math.sin(time * 0.5) * 0.1;
    }
    if (this.bgParticles) {
      this.bgParticles.rotation.y = time * 0.02;
    }
  }
}

/* ─── Background Floating Shapes Scene ──────────── */
class BackgroundScene extends CakeScene {
  constructor(containerId) {
    super(containerId, { particleCount: 25 });
    if (!this.container) return;
    this.buildScene();
  }

  buildScene() {
    this.shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.DodecahedronGeometry(0.2, 0),
      new THREE.TorusGeometry(0.2, 0.08, 6, 12),
    ];

    const colors = [0xB76E79, 0xD4A0A8, 0xFFB347, 0xFF6B6B, 0xF5E0E4];

    for (let i = 0; i < 12; i++) {
      const geo = geometries[i % geometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 3
      );
      mesh.userData = {
        speed: 0.2 + Math.random() * 0.4,
        rotSpeed: 0.3 + Math.random() * 0.7,
        offset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y
      };
      this.scene.add(mesh);
      this.shapes.push(mesh);
    }

    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(0, 0, 0);
  }

  update(time) {
    this.shapes.forEach(shape => {
      const d = shape.userData;
      shape.rotation.x = time * d.rotSpeed;
      shape.rotation.z = time * d.rotSpeed * 0.5;
      shape.position.y = d.baseY + Math.sin(time * d.speed + d.offset) * 0.5;
    });
  }
}
