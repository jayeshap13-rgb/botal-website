const { useEffect, useMemo, useRef, useState } = React;

// EDIT: Brand links and contact details.
const WHATSAPP_NUMBER = "919999999999";
const INSTAGRAM_URL = "https://instagram.com/botal";
const CONTACT_EMAIL = "hello@botal.in";
const LOCATION = "Nagpur, India";

// EDIT: Logo path. Replace this file to update the brand mark throughout the website.
const LOGO_SRC = "./assets/botal-logo.jpg";

const defaultCategories = [
  "Bottle Lamps",
  "Soap Dispensers",
  "Planters",
  "Candle Holders",
  "Decor Pieces",
  "Gift Hampers",
  "Custom Products",
];

// EDIT: Default product details, prices, 3D color, and product images. Add imageUrl to any product to replace the abstract bottle artwork.
const defaultProducts = [
  {
    id: "amber-bottle-lamp",
    name: "Amber Bottle Lamp",
    category: "Bottle Lamps",
    price: "From Rs. 1,499",
    cost: 1499,
    stock: 8,
    status: "Active",
    sku: "BTL-LAMP-001",
    modelColor: "#FFF44F",
    description: "Warm ambient lighting built from reclaimed glass and hand-finished hardware.",
  },
  {
    id: "olive-soap-pump",
    name: "Olive Soap Pump",
    category: "Soap Dispensers",
    price: "From Rs. 699",
    cost: 699,
    stock: 14,
    status: "Active",
    sku: "BTL-SOAP-001",
    modelColor: "#6B8E23",
    description: "A refined counter piece with reusable pump fittings and polished bottle edges.",
  },
  {
    id: "window-planter-trio",
    name: "Window Planter Trio",
    category: "Planters",
    price: "From Rs. 899",
    cost: 899,
    stock: 10,
    status: "Active",
    sku: "BTL-PLANT-001",
    modelColor: "#556B2F",
    description: "Cut-glass planters for herbs, succulents, and minimal green corners.",
  },
  {
    id: "glow-candle-set",
    name: "Glow Candle Set",
    category: "Candle Holders",
    price: "From Rs. 799",
    cost: 799,
    stock: 12,
    status: "Active",
    sku: "BTL-CANDLE-001",
    modelColor: "#FFF44F",
    description: "Soft-edged glass candle holders for dining tables, shelves, and gifting.",
  },
  {
    id: "bottle-neck-vase",
    name: "Bottle Neck Vase",
    category: "Decor Pieces",
    price: "From Rs. 599",
    cost: 599,
    stock: 16,
    status: "Active",
    sku: "BTL-DECOR-001",
    modelColor: "#050019",
    description: "Sculptural tabletop decor made from selected discarded bottle forms.",
  },
  {
    id: "sustainable-gift-hamper",
    name: "Sustainable Gift Hamper",
    category: "Gift Hampers",
    price: "From Rs. 1,999",
    cost: 1999,
    stock: 6,
    status: "Active",
    sku: "BTL-GIFT-001",
    modelColor: "#FFF44F",
    description: "Curated eco-gifts with lamps, planters, candles, tags, and custom packaging.",
  },
  {
    id: "cafe-counter-installation",
    name: "Cafe Counter Installation",
    category: "Custom Products",
    price: "Custom quote",
    cost: 0,
    stock: 3,
    status: "Active",
    sku: "BTL-CUSTOM-001",
    modelColor: "#6B8E23",
    description: "Bespoke bottle lighting, display corners, and decor concepts for spaces.",
  },
];

const gallery = [
  "Discarded bottle to bedside lamp",
  "Hand cutting and edge polishing",
  "Cafe table planter styling",
  "Custom hamper layout",
  "Before and after transformation",
  "Warm lamp lifestyle corner",
];

const testimonials = [
  {
    quote: "The lamp feels handcrafted and premium, not like a recycled compromise. It became the most asked-about piece in our studio.",
    name: "Aarohi Shah",
    role: "Interior stylist",
  },
  {
    quote: "Botal created a display corner for our cafe that tells a sustainability story without looking rustic or busy.",
    name: "Kunal Mehta",
    role: "Cafe owner",
  },
  {
    quote: "Their gift hampers are thoughtful, beautiful, and refreshingly different from the usual corporate gifting options.",
    name: "Neha Rao",
    role: "Founder, Studio Leaf",
  },
];

const defaultSiteContent = {
  brandName: "Botal",
  tagline: "Discarded glass, designed again.",
  hero: {
    kicker: "Handmade in Nagpur",
    headline: "Empty Bottles, Reimagined Beautifully.",
    subheadline: "Botal transforms discarded glass bottles into handcrafted lamps, dispensers, decor pieces, planters and sustainable gifting products.",
    stat: "7+",
    statLabel: "Product lines from rescued glass",
  },
  about: {
    kicker: "The Botal Story",
    headline: "Waste glass, treated like a design material.",
    paragraphOne: "Botal is built around a simple creative belief: a bottle does not become waste when it is empty. It becomes raw material for something more personal, useful, and beautiful.",
    paragraphTwo: "Every piece carries visible craft and a sustainability mission, with finishes designed to feel premium in modern homes, cafes, stores, and studio spaces.",
    steps: [
      ["Collect", "Discarded bottles are sourced from homes, cafes, and event waste."],
      ["Craft", "Each bottle is cut, sanded, cleaned, and finished by hand."],
      ["Reimagine", "The final piece becomes lighting, decor, gifting, or a custom installation."],
    ],
    beforeTitle: "Before Bottle",
    beforeText: "Discarded, ordinary, overlooked.",
    afterTitle: "After Product",
    afterText: "Handcrafted, useful, display-worthy.",
  },
  custom: {
    kicker: "Custom Orders",
    headline: "Bring a bottle, a space, or an idea. Botal will shape it.",
    body: "Use this form for custom lamps, event decor, brand gifting, cafe installations, and reference-led product requests.",
  },
  products: {
    kicker: "Product Studio",
    headline: "Small-batch pieces with a polished finish.",
    cartKicker: "Shopping Cart",
    cartTitle: "Checkout products",
    emptyCartText: "Your cart is ready for handmade glass goodness.",
  },
  collaborate: {
    kicker: "Retail and Collaboration",
    headline: "A sustainable product line for spaces that care about detail.",
    partners: ["Architects", "Interior Designers", "Decor Stores", "Cafes", "Sustainable Stores"],
    offers: ["Display corners", "Profit-sharing", "Bulk orders", "Custom installations"],
    cta: "Collaborate With Botal",
  },
  gallery: {
    kicker: "Gallery",
    headline: "Before, process, product, place.",
    items: gallery,
  },
  testimonials: {
    kicker: "Testimonials",
    headline: "Loved by people who notice craft.",
    items: testimonials,
  },
  contact: {
    kicker: "Contact",
    headline: "Start with a bottle. Leave with a story.",
    whatsappNumber: WHATSAPP_NUMBER,
    instagramUrl: INSTAGRAM_URL,
    instagramLabel: "Instagram: @botal",
    email: CONTACT_EMAIL,
    location: LOCATION,
  },
};

const Icon = ({ children }) => (
  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-botalYellow text-navyInk shadow-yellow">
    {children}
  </span>
);

function whatsappUrl(message) {
  const number = window.BOTAL_WHATSAPP_NUMBER || WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function Header({ content }) {
  const [open, setOpen] = useState(false);
  const links = ["About", "Products", "Custom", "Collaborate", "Gallery", "Contact", "Admin"];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/[0.82] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Botal home">
          <img src={LOGO_SRC} alt="Botal logo" className="h-12 w-12 rounded-full object-cover shadow-sm" />
          <span className="text-xl font-black tracking-tight text-navyInk">{content.brandName}</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-bold text-ink/72 transition hover:text-deepOlive">
              {link}
            </a>
          ))}
        </div>
        <a
          href={whatsappUrl("Hi Botal, I want to inquire about your upcycled bottle products.")}
          target="_blank"
          className="hidden rounded-full bg-navyInk px-5 py-3 text-sm font-extrabold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-deepOlive md:inline-flex"
        >
          WhatsApp Inquiry
        </a>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-5 bg-ink shadow-[0_6px_0_#222,-0_-6px_0_#222]" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-black/5 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-bold text-ink/75 hover:bg-cream">
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ content }) {
  return (
    <section id="home" className="hero-field relative min-h-screen overflow-hidden pt-28">
      <div className="bottle-mark right-4 top-36 hidden lg:block" style={{ "--rotate": "14deg" }} />
      <div className="bottle-mark bottom-16 left-8 hidden opacity-40 xl:block" style={{ "--rotate": "-18deg" }} />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:pb-24">
        <div className="reveal">
          <div className="section-kicker">{content.hero.kicker}</div>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-navyInk sm:text-6xl lg:text-7xl">
            {content.hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl">
            {content.hero.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="rounded-full bg-botalYellow px-7 py-4 text-center font-black text-navyInk shadow-yellow transition hover:-translate-y-1">
              Explore Products
            </a>
            <a href="#custom" className="rounded-full border border-deepOlive/30 bg-white px-7 py-4 text-center font-black text-deepOlive shadow-sm transition hover:-translate-y-1 hover:border-deepOlive">
              Custom Orders
            </a>
            <a href={whatsappUrl("Hi Botal, I want to discuss an upcycled bottle product.")} target="_blank" className="rounded-full bg-navyInk px-7 py-4 text-center font-black text-white shadow-premium transition hover:-translate-y-1">
              WhatsApp Inquiry
            </a>
          </div>
        </div>
        <div className="reveal relative">
          <div className="organic-curve absolute -inset-6 bg-botalYellow/80 blur-2xl" />
          <div className="glass-panel relative mx-auto max-w-md rounded-[2rem] p-5">
            <img src={LOGO_SRC} alt="Botal bottle silhouette logo" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" />
            <div className="absolute -bottom-8 -left-4 rounded-3xl bg-white p-5 shadow-premium sm:-left-10">
              <p className="text-3xl font-black text-deepOlive">{content.hero.stat}</p>
              <p className="text-sm font-bold text-ink/60">{content.hero.statLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ content }) {
  const steps = content.about.steps || [];
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-kicker">{content.about.kicker}</span>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.about.headline}</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-ink/72">
            <p>{content.about.paragraphOne}</p>
            <p>{content.about.paragraphTwo}</p>
          </div>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <article key={title} className="reveal rounded-[1.5rem] border border-black/5 bg-cream p-7 shadow-sm">
              <Icon>{index + 1}</Icon>
              <h3 className="mt-6 text-2xl font-black text-navyInk">{title}</h3>
              <p className="mt-3 leading-7 text-ink/68">{text}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-8 rounded-[1.75rem] bg-navyInk p-7 text-white shadow-premium md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-botalYellow">{content.about.beforeTitle}</p>
              <p className="mt-3 text-2xl font-black">{content.about.beforeText}</p>
            </div>
              <div className="text-4xl font-black text-botalYellow">-&gt;</div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-botalYellow">{content.about.afterTitle}</p>
              <p className="mt-3 text-2xl font-black">{content.about.afterText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function createProductId(name) {
  return `${name || "product"}-${Date.now()}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatCurrency(value) {
  const number = Number(value || 0);
  return number > 0 ? `Rs. ${number.toLocaleString("en-IN")}` : "Custom quote";
}

function normalizeProduct(product) {
  const fallback = product.price && product.price.match(/\d[\d,]*/);
  const cost = Number(product.cost || (fallback ? fallback[0].replace(/,/g, "") : 0));
  return {
    ...product,
    id: product.id || createProductId(product.name),
    cost,
    price: product.price || (cost ? `From ${formatCurrency(cost)}` : "Custom quote"),
    stock: Number(product.stock ?? 0),
    status: product.status || "Active",
    sku: product.sku || `BTL-${Math.floor(Math.random() * 9000 + 1000)}`,
    modelColor: product.modelColor || "#6B8E23",
  };
}

function loadStoredProducts() {
  try {
    const saved = localStorage.getItem("botal-products");
    const source = saved ? JSON.parse(saved) : defaultProducts;
    return source.map(normalizeProduct);
  } catch (error) {
    return defaultProducts.map(normalizeProduct);
  }
}

function loadStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem("botal-orders") || "[]");
  } catch (error) {
    return [];
  }
}

function loadStoredCategories() {
  try {
    const saved = localStorage.getItem("botal-categories");
    const source = saved ? JSON.parse(saved) : defaultCategories;
    return Array.from(new Set(source.filter(Boolean)));
  } catch (error) {
    return defaultCategories;
  }
}

function mergeSiteContent(saved) {
  return {
    ...defaultSiteContent,
    ...saved,
    hero: { ...defaultSiteContent.hero, ...(saved?.hero || {}) },
    about: { ...defaultSiteContent.about, ...(saved?.about || {}) },
    custom: { ...defaultSiteContent.custom, ...(saved?.custom || {}) },
    products: { ...defaultSiteContent.products, ...(saved?.products || {}) },
    collaborate: { ...defaultSiteContent.collaborate, ...(saved?.collaborate || {}) },
    gallery: { ...defaultSiteContent.gallery, ...(saved?.gallery || {}) },
    testimonials: { ...defaultSiteContent.testimonials, ...(saved?.testimonials || {}) },
    contact: { ...defaultSiteContent.contact, ...(saved?.contact || {}) },
  };
}

function loadStoredSiteContent() {
  try {
    return mergeSiteContent(JSON.parse(localStorage.getItem("botal-site-content") || "null"));
  } catch (error) {
    return defaultSiteContent;
  }
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + Number(item.cost || 0) * item.quantity, 0);
}

function adminPasswordHash(password) {
  return btoa(unescape(encodeURIComponent(`botal-admin:${password}`)));
}

function Product3DCanvas({ product }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !window.THREE) return undefined;

    const width = mount.clientWidth || 520;
    const height = mount.clientHeight || 420;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFDF2");

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glassColor = new THREE.Color(product.modelColor || "#6B8E23");
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: glassColor,
      metalness: 0.05,
      roughness: 0.22,
      transmission: 0.45,
      transparent: true,
      opacity: 0.82,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: "#050019", roughness: 0.4 });
    const yellowMaterial = new THREE.MeshStandardMaterial({ color: "#FFF44F", roughness: 0.34, metalness: 0.05 });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.35, 2.5, 64), glassMaterial);
    body.position.y = -0.45;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(1.16, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2), glassMaterial);
    shoulder.scale.set(1, 0.55, 1);
    shoulder.position.y = 0.78;
    shoulder.castShadow = true;
    group.add(shoulder);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.56, 1.7, 48), glassMaterial);
    neck.position.y = 1.88;
    neck.castShadow = true;
    group.add(neck);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.08, 16, 64), darkMaterial);
    rim.position.y = 2.78;
    rim.rotation.x = Math.PI / 2;
    group.add(rim);

    const label = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.27, 0.58, 64, 1, true), yellowMaterial);
    label.position.y = -0.85;
    label.rotation.y = 0.12;
    group.add(label);

    if (product.category === "Bottle Lamps" || product.category === "Candle Holders") {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32), new THREE.MeshStandardMaterial({ color: "#FFF44F", emissive: "#FFF44F", emissiveIntensity: 1.2 }));
      bulb.position.set(0, 0.25, 0.2);
      group.add(bulb);
      const glow = new THREE.PointLight("#FFF44F", 1.8, 7);
      glow.position.set(0, 0.25, 0.6);
      scene.add(glow);
    }

    if (product.category === "Planters") {
      const leafMaterial = new THREE.MeshStandardMaterial({ color: "#556B2F", roughness: 0.7 });
      [-0.38, 0, 0.38].forEach((x, index) => {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 16), leafMaterial);
        leaf.scale.set(0.72, 1.7, 0.28);
        leaf.position.set(x, 0.65 + index * 0.12, 0.1);
        leaf.rotation.z = (index - 1) * 0.45;
        group.add(leaf);
      });
    }

    const floor = new THREE.Mesh(new THREE.CircleGeometry(2.25, 64), new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.85 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.82;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.HemisphereLight("#ffffff", "#556B2F", 1.45));
    const keyLight = new THREE.DirectionalLight("#ffffff", 2.2);
    keyLight.position.set(3, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const handleResize = () => {
      const nextWidth = mount.clientWidth || width;
      const nextHeight = mount.clientHeight || height;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrame = 0;
    const animate = () => {
      group.rotation.y += 0.008;
      group.rotation.x = Math.sin(Date.now() * 0.001) * 0.03;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mount.innerHTML = "";
    };
  }, [product]);

  return <div ref={mountRef} className="viewer-canvas" aria-label={`${product.name} 3D viewer`} />;
}

function Product3DModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navyInk/70 p-4 backdrop-blur-sm">
      <div className="grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-white shadow-premium lg:grid-cols-[1.12fr_0.88fr]">
        <div className="min-h-[360px] bg-cream p-3 sm:p-5">
          <Product3DCanvas product={product} />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-deepOlive">3D Product View</p>
            <h3 className="mt-3 text-3xl font-black text-navyInk">{product.name}</h3>
            <p className="mt-3 rounded-full bg-botalYellow px-4 py-2 text-sm font-black text-navyInk inline-flex">{product.price}</p>
            <p className="mt-5 leading-8 text-ink/70">{product.description}</p>
            <p className="mt-5 text-sm font-bold text-ink/55">Drag-free auto rotation preview. Replace with exact 3D assets later if you create product scans.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(`Hi Botal, I want to inquire about ${product.name}.`)} target="_blank" className="rounded-full bg-navyInk px-5 py-3 text-center font-black text-white">
              WhatsApp Inquiry
            </a>
            <button onClick={onClose} className="rounded-full border border-black/10 px-5 py-3 font-black text-ink">
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductManager({ products, categories, onSave, onReset, onDelete }) {
  const blankProduct = {
    id: "",
    name: "",
    category: categories[0] || "Uncategorized",
    price: "From Rs. ",
    cost: 0,
    stock: 0,
    status: "Active",
    sku: "",
    modelColor: "#6B8E23",
    description: "",
    imageUrl: "",
  };
  const [draft, setDraft] = useState(blankProduct);

  useEffect(() => {
    setDraft((current) => {
      if (current.id || categories.includes(current.category)) return current;
      return { ...current, category: categories[0] || "Uncategorized" };
    });
  }, [categories]);

  const updateDraft = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  const editProduct = (product) => {
    setDraft({ ...blankProduct, ...product });
    document.getElementById("product-editor-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submitProduct = (event) => {
    event.preventDefault();
    const normalized = {
      ...draft,
      id: draft.id || createProductId(draft.name),
      name: draft.name.trim(),
      cost: Number(draft.cost || 0),
      stock: Number(draft.stock || 0),
      price: draft.price.trim() || `From ${formatCurrency(draft.cost)}`,
      description: draft.description.trim(),
    };
    if (!normalized.name || !normalized.price) return;
    onSave(normalized);
    setDraft(blankProduct);
  };

  return (
    <div id="product-manager" className="mt-14 rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-premium sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="section-kicker">Catalog Manager</span>
          <h3 className="mt-4 text-3xl font-black text-navyInk">Add products and edit costing.</h3>
          <p className="mt-3 max-w-2xl leading-7 text-ink/68">Changes update the storefront inventory data saved in this browser.</p>
        </div>
        <button onClick={onReset} className="rounded-full border border-black/10 px-5 py-3 text-sm font-black text-ink hover:border-deepOlive">
          Reset Default Products
        </button>
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
        <form id="product-editor-form" onSubmit={submitProduct} className="grid gap-4 rounded-[1.25rem] bg-cream p-4">
          <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder="Product name" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          <div className="grid gap-4 sm:grid-cols-2">
            <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive">
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <input value={draft.price} onChange={(event) => updateDraft("price", event.target.value)} placeholder="Costing / price" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input type="number" min="0" value={draft.cost} onChange={(event) => updateDraft("cost", event.target.value)} placeholder="Numeric cost" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input type="number" min="0" value={draft.stock} onChange={(event) => updateDraft("stock", event.target.value)} placeholder="Stock" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <select value={draft.status} onChange={(event) => updateDraft("status", event.target.value)} className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive">
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
          <input value={draft.sku} onChange={(event) => updateDraft("sku", event.target.value)} placeholder="SKU / product code" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
            <input value={draft.imageUrl || ""} onChange={(event) => updateDraft("imageUrl", event.target.value)} placeholder="Product image URL optional" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input type="color" value={draft.modelColor || "#6B8E23"} onChange={(event) => updateDraft("modelColor", event.target.value)} aria-label="3D model color" className="h-12 w-full rounded-full border border-black/10 bg-white px-2" />
          </div>
          <textarea rows="4" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} placeholder="Short product description" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          <button className="rounded-full bg-botalYellow px-5 py-3 font-black text-navyInk shadow-yellow">
            {draft.id ? "Update Product" : "Add Product"}
          </button>
        </form>
        <div className="grid max-h-[29rem] gap-3 overflow-auto pr-1">
          {products.map((product) => (
            <div key={product.id} className="grid gap-3 rounded-[1.25rem] border border-black/5 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="font-black text-navyInk">{product.name}</p>
                <p className="text-sm font-bold text-deepOlive">{product.category} / {product.price} / Stock {product.stock}</p>
                <p className="text-xs font-bold text-ink/50">{product.sku} / {product.status}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editProduct(product)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-black text-ink hover:border-olive">
                  Edit
                </button>
                <button onClick={() => onDelete(product.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartPanel({ content, cart, onQuantity, onRemove, onCheckout }) {
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const total = cartTotal(cart);
  const orderText = cart
    .map((item) => `${item.name} x ${item.quantity} - ${formatCurrency(Number(item.cost || 0) * item.quantity)}`)
    .join("\n");

  const submitOrder = (event) => {
    event.preventDefault();
    if (!cart.length || !customer.name || !customer.phone) return;
    onCheckout(customer);
    const message = `Hi Botal, I want to place an order.
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
Products:
${orderText}
Total: ${formatCurrency(total)}
Notes: ${customer.notes}`;
    window.open(whatsappUrl(message), "_blank");
    setCustomer({ name: "", phone: "", address: "", notes: "" });
  };

  return (
    <aside className="glass-panel reveal rounded-[1.5rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-deepOlive">{content.products.cartKicker}</p>
          <h3 className="mt-2 text-2xl font-black text-navyInk">{content.products.cartTitle}</h3>
        </div>
        <p className="rounded-full bg-botalYellow px-3 py-2 text-sm font-black text-navyInk">{cart.length} items</p>
      </div>
      <div className="mt-5 grid max-h-80 gap-3 overflow-auto pr-1">
        {cart.length ? (
          cart.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-navyInk">{item.name}</p>
                  <p className="text-sm font-bold text-deepOlive">{formatCurrency(item.cost)} each</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="rounded-full border border-black/10 px-3 py-1 text-xs font-black">Remove</button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => onQuantity(item.id, item.quantity - 1)} className="h-9 w-9 rounded-full bg-cream font-black">-</button>
                <span className="w-8 text-center font-black">{item.quantity}</span>
                <button onClick={() => onQuantity(item.id, item.quantity + 1)} className="h-9 w-9 rounded-full bg-botalYellow font-black">+</button>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-white p-5 font-bold text-ink/60">{content.products.emptyCartText}</p>
        )}
      </div>
      <div className="mt-5 rounded-2xl bg-navyInk p-4 text-white">
        <p className="text-sm font-bold text-white/65">Estimated total</p>
        <p className="text-3xl font-black text-botalYellow">{formatCurrency(total)}</p>
      </div>
      <form onSubmit={submitOrder} className="mt-5 grid gap-3">
        <input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Customer name" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
        <input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="Phone number" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
        <textarea rows="3" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Delivery address" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
        <input value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} placeholder="Order notes optional" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
        <button className="rounded-full bg-botalYellow px-5 py-4 font-black text-navyInk shadow-yellow disabled:opacity-50" disabled={!cart.length}>
          Place Order on WhatsApp
        </button>
      </form>
    </aside>
  );
}

function Products({ content, products, categories, cart, onAddToCart, onQuantity, onRemoveFromCart, onCheckout }) {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [viewerProduct, setViewerProduct] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = active === "All" || product.category === active;
      const query = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return product.status === "Active" && categoryMatch && query.includes(search.toLowerCase());
    });
  }, [active, search, products]);

  const inquiryMessage = cart.length
    ? `Hi Botal, I want to inquire about: ${cart.map((item) => `${item.name} x ${item.quantity}`).join(", ")}.`
    : "Hi Botal, I want to explore your upcycled bottle products.";

  return (
    <section id="products" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">{content.products.kicker}</span>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.products.headline}</h2>
          </div>
          <div className="glass-panel rounded-2xl p-3">
            <p className="text-sm font-bold text-ink/65">{cart.length} item{cart.length === 1 ? "" : "s"} in inquiry cart</p>
            <a href={whatsappUrl(inquiryMessage)} target="_blank" className="mt-2 inline-flex rounded-full bg-deepOlive px-5 py-3 text-sm font-black text-white">
              Send Inquiry
            </a>
          </div>
        </div>
        <div className="reveal mt-10 grid gap-4 lg:grid-cols-[1fr_18rem]">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full border px-4 py-3 text-sm font-black transition ${
                  active === category ? "border-navyInk bg-navyInk text-white" : "border-black/10 bg-white text-ink/70 hover:border-olive"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="rounded-full border border-black/10 bg-white px-5 py-3 font-semibold outline-none transition focus:border-olive focus:ring-4 focus:ring-olive/10"
          />
        </div>
        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_24rem] xl:items-start">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((product) => (
              <article key={product.id} className="product-card overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-60 w-full object-cover" />
                ) : (
                  <div className="product-art" aria-label={`${product.name} abstract bottle artwork`} />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-deepOlive">{product.category}</p>
                      <h3 className="mt-2 text-2xl font-black text-navyInk">{product.name}</h3>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-ink/45">{product.stock > 0 ? `${product.stock} in stock` : "Sold out"}</p>
                    </div>
                    <p className="rounded-full bg-botalYellow px-3 py-2 text-sm font-black text-navyInk">{product.price}</p>
                  </div>
                  <p className="mt-4 leading-7 text-ink/68">{product.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <button disabled={product.stock <= 0} onClick={() => onAddToCart(product)} className="flex-1 rounded-full border border-black/10 px-4 py-3 font-black text-ink transition hover:border-olive hover:text-deepOlive disabled:cursor-not-allowed disabled:opacity-40">
                      Add Cart
                    </button>
                    <button onClick={() => setViewerProduct(product)} className="flex-1 rounded-full border border-deepOlive/30 bg-cream px-4 py-3 font-black text-deepOlive transition hover:border-deepOlive">
                      3D View
                    </button>
                    <a href={whatsappUrl(`Hi Botal, I want to inquire about ${product.name}.`)} target="_blank" className="flex-1 rounded-full bg-navyInk px-4 py-3 text-center font-black text-white transition hover:bg-deepOlive">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <CartPanel content={content} cart={cart} onQuantity={onQuantity} onRemove={onRemoveFromCart} onCheckout={onCheckout} />
        </div>
      </div>
      <Product3DModal product={viewerProduct} onClose={() => setViewerProduct(null)} />
    </section>
  );
}

function CategoryManager({ categories, products, onAddCategory, onDeleteCategory, onResetCategories }) {
  const [name, setName] = useState("");

  const submitCategory = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name);
    setName("");
  };

  return (
    <div className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-premium sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="section-kicker">Category Manager</span>
          <h3 className="mt-4 text-3xl font-black text-navyInk">Add and remove product categories.</h3>
          <p className="mt-3 max-w-2xl leading-7 text-ink/68">These categories power the shop filters and the product editor dropdown.</p>
        </div>
        <button onClick={onResetCategories} className="rounded-full border border-black/10 px-5 py-3 text-sm font-black text-ink hover:border-deepOlive">
          Reset Categories
        </button>
      </div>
      <form onSubmit={submitCategory} className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="New category name" className="rounded-full border border-black/10 bg-cream px-5 py-4 font-semibold outline-none focus:border-olive" />
        <button className="rounded-full bg-botalYellow px-6 py-4 font-black text-navyInk shadow-yellow">Add Category</button>
      </form>
      <div className="mt-7 grid gap-3 md:grid-cols-2">
        {categories.map((category) => {
          const productCount = products.filter((product) => product.category === category).length;
          return (
            <div key={category} className="grid gap-3 rounded-[1.25rem] border border-black/5 bg-cream p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="font-black text-navyInk">{category}</p>
                <p className="text-sm font-bold text-ink/55">{productCount} product{productCount === 1 ? "" : "s"}</p>
              </div>
              <button
                onClick={() => onDeleteCategory(category)}
                disabled={productCount > 0 || categories.length <= 1}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-black/10 disabled:text-ink/35"
                title={productCount > 0 ? "Move or delete products in this category first" : categories.length <= 1 ? "Keep at least one category" : "Remove category"}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SiteContentManager({ content, onSave, onReset }) {
  const [draft, setDraft] = useState(content);
  useEffect(() => setDraft(content), [content]);

  const update = (section, key, value) => {
    if (!section) {
      setDraft((current) => ({ ...current, [key]: value }));
      return;
    }
    setDraft((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  };
  const splitLines = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean);
  const joinLines = (items) => (items || []).join("\n");
  const joinSteps = (items) => (items || []).map(([title, text]) => `${title} | ${text}`).join("\n");
  const parseSteps = (value) => splitLines(value).map((line) => {
    const [title, ...rest] = line.split("|");
    return [title.trim(), rest.join("|").trim()];
  });
  const joinTestimonials = (items) => (items || []).map((item) => `${item.quote} | ${item.name} | ${item.role}`).join("\n");
  const parseTestimonials = (value) => splitLines(value).map((line) => {
    const [quote, name, ...role] = line.split("|");
    return { quote: (quote || "").trim(), name: (name || "").trim(), role: role.join("|").trim() };
  }).filter((item) => item.quote && item.name);

  const save = (event) => {
    event.preventDefault();
    onSave(mergeSiteContent(draft));
  };

  return (
    <form onSubmit={save} className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-premium sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="section-kicker">Website Editor</span>
          <h3 className="mt-4 text-3xl font-black text-navyInk">Edit public website content.</h3>
          <p className="mt-3 max-w-2xl leading-7 text-ink/68">Update the brand text, contact links, section headings, gallery, testimonials, and collaboration copy.</p>
        </div>
        <button type="button" onClick={onReset} className="rounded-full border border-black/10 px-5 py-3 text-sm font-black text-ink hover:border-deepOlive">
          Reset Website Text
        </button>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={draft.brandName} onChange={(event) => update(null, "brandName", event.target.value)} placeholder="Brand name" className="rounded-full border border-black/10 bg-cream px-4 py-3 font-semibold outline-none focus:border-olive" />
          <input value={draft.tagline} onChange={(event) => update(null, "tagline", event.target.value)} placeholder="Footer tagline" className="rounded-full border border-black/10 bg-cream px-4 py-3 font-semibold outline-none focus:border-olive" />
        </div>

        <div className="rounded-[1.25rem] bg-cream p-4">
          <p className="mb-4 font-black text-navyInk">Hero</p>
          <div className="grid gap-3">
            <input value={draft.hero.kicker} onChange={(event) => update("hero", "kicker", event.target.value)} placeholder="Hero kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.hero.headline} onChange={(event) => update("hero", "headline", event.target.value)} placeholder="Hero headline" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="3" value={draft.hero.subheadline} onChange={(event) => update("hero", "subheadline", event.target.value)} placeholder="Hero subheadline" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <div className="grid gap-3 md:grid-cols-2">
              <input value={draft.hero.stat} onChange={(event) => update("hero", "stat", event.target.value)} placeholder="Hero stat" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
              <input value={draft.hero.statLabel} onChange={(event) => update("hero", "statLabel", event.target.value)} placeholder="Hero stat label" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] bg-cream p-4">
          <p className="mb-4 font-black text-navyInk">Products and Cart</p>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={draft.products.kicker} onChange={(event) => update("products", "kicker", event.target.value)} placeholder="Products kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.products.headline} onChange={(event) => update("products", "headline", event.target.value)} placeholder="Products headline" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.products.cartKicker} onChange={(event) => update("products", "cartKicker", event.target.value)} placeholder="Cart kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.products.cartTitle} onChange={(event) => update("products", "cartTitle", event.target.value)} placeholder="Cart title" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
          <input value={draft.products.emptyCartText} onChange={(event) => update("products", "emptyCartText", event.target.value)} placeholder="Empty cart text" className="mt-3 w-full rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
        </div>

        <div className="rounded-[1.25rem] bg-cream p-4">
          <p className="mb-4 font-black text-navyInk">About</p>
          <div className="grid gap-3">
            <input value={draft.about.kicker} onChange={(event) => update("about", "kicker", event.target.value)} placeholder="About kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.about.headline} onChange={(event) => update("about", "headline", event.target.value)} placeholder="About headline" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="3" value={draft.about.paragraphOne} onChange={(event) => update("about", "paragraphOne", event.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="3" value={draft.about.paragraphTwo} onChange={(event) => update("about", "paragraphTwo", event.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="4" value={joinSteps(draft.about.steps)} onChange={(event) => update("about", "steps", parseSteps(event.target.value))} placeholder="One step per line: Title | Description" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <div className="grid gap-3 md:grid-cols-2">
              <input value={draft.about.beforeTitle} onChange={(event) => update("about", "beforeTitle", event.target.value)} placeholder="Before title" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
              <input value={draft.about.afterTitle} onChange={(event) => update("about", "afterTitle", event.target.value)} placeholder="After title" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
              <input value={draft.about.beforeText} onChange={(event) => update("about", "beforeText", event.target.value)} placeholder="Before text" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
              <input value={draft.about.afterText} onChange={(event) => update("about", "afterText", event.target.value)} placeholder="After text" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.25rem] bg-cream p-4">
            <p className="mb-4 font-black text-navyInk">Custom Orders</p>
            <input value={draft.custom.kicker} onChange={(event) => update("custom", "kicker", event.target.value)} className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.custom.headline} onChange={(event) => update("custom", "headline", event.target.value)} className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="4" value={draft.custom.body} onChange={(event) => update("custom", "body", event.target.value)} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
          <div className="rounded-[1.25rem] bg-cream p-4">
            <p className="mb-4 font-black text-navyInk">Contact</p>
            <input value={draft.contact.whatsappNumber} onChange={(event) => update("contact", "whatsappNumber", event.target.value)} placeholder="WhatsApp number with country code" className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.contact.instagramUrl} onChange={(event) => update("contact", "instagramUrl", event.target.value)} placeholder="Instagram URL" className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.contact.instagramLabel} onChange={(event) => update("contact", "instagramLabel", event.target.value)} placeholder="Instagram label" className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.contact.email} onChange={(event) => update("contact", "email", event.target.value)} placeholder="Email" className="mb-3 rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.contact.location} onChange={(event) => update("contact", "location", event.target.value)} placeholder="Location" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
        </div>

        <div className="rounded-[1.25rem] bg-cream p-4">
          <p className="mb-4 font-black text-navyInk">Collaboration, Gallery, Testimonials</p>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={draft.collaborate.kicker} onChange={(event) => update("collaborate", "kicker", event.target.value)} placeholder="Collaboration kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.collaborate.cta} onChange={(event) => update("collaborate", "cta", event.target.value)} placeholder="Collaboration CTA" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
          <input value={draft.collaborate.headline} onChange={(event) => update("collaborate", "headline", event.target.value)} placeholder="Collaboration headline" className="mt-3 w-full rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <textarea rows="5" value={joinLines(draft.collaborate.partners)} onChange={(event) => update("collaborate", "partners", splitLines(event.target.value))} placeholder="Partners, one per line" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="5" value={joinLines(draft.collaborate.offers)} onChange={(event) => update("collaborate", "offers", splitLines(event.target.value))} placeholder="Offers, one per line" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="5" value={joinLines(draft.gallery.items)} onChange={(event) => update("gallery", "items", splitLines(event.target.value))} placeholder="Gallery captions, one per line" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <textarea rows="5" value={joinTestimonials(draft.testimonials.items)} onChange={(event) => update("testimonials", "items", parseTestimonials(event.target.value))} placeholder="Testimonials: Quote | Name | Role" className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input value={draft.gallery.kicker} onChange={(event) => update("gallery", "kicker", event.target.value)} placeholder="Gallery kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.gallery.headline} onChange={(event) => update("gallery", "headline", event.target.value)} placeholder="Gallery headline" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.testimonials.kicker} onChange={(event) => update("testimonials", "kicker", event.target.value)} placeholder="Testimonials kicker" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
            <input value={draft.testimonials.headline} onChange={(event) => update("testimonials", "headline", event.target.value)} placeholder="Testimonials headline" className="rounded-full border border-black/10 bg-white px-4 py-3 font-semibold outline-none focus:border-olive" />
          </div>
        </div>
      </div>

      <button className="mt-6 rounded-full bg-botalYellow px-6 py-4 font-black text-navyInk shadow-yellow">Save Website Changes</button>
    </form>
  );
}

function AdminPanel({ content, products, categories, orders, onSaveContent, onResetContent, onSaveProduct, onResetProducts, onDeleteProduct, onClearOrders, onUpdateOrderStatus, onAddCategory, onDeleteCategory, onResetCategories }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasPassword, setHasPassword] = useState(() => Boolean(localStorage.getItem("botal-admin-password")));
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("botal-admin") === "unlocked");
  const [error, setError] = useState("");
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const lowStock = products.filter((product) => product.stock <= 3);

  const login = (event) => {
    event.preventDefault();
    const storedPassword = localStorage.getItem("botal-admin-password");
    if (!hasPassword) {
      if (password.length < 6) {
        setError("Use at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      localStorage.setItem("botal-admin-password", adminPasswordHash(password));
      sessionStorage.setItem("botal-admin", "unlocked");
      setHasPassword(true);
      setUnlocked(true);
      setError("");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (storedPassword && adminPasswordHash(password) === storedPassword) {
      sessionStorage.setItem("botal-admin", "unlocked");
      setUnlocked(true);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <section id="admin" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <span className="section-kicker">Admin Panel</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">Protected inventory and backend data.</h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">Manage products, costing, stock, status, and saved orders from one dashboard.</p>
        </div>

        {!unlocked ? (
          <form onSubmit={login} className="reveal mt-10 max-w-xl rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-premium">
            <label className="grid gap-2 text-sm font-black text-ink/70">
              {hasPassword ? "Admin password" : "Create admin password"}
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="rounded-full border border-black/10 bg-cream px-5 py-4 text-lg outline-none focus:border-olive" />
            </label>
            {!hasPassword && (
              <label className="mt-4 grid gap-2 text-sm font-black text-ink/70">
                Confirm admin password
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="rounded-full border border-black/10 bg-cream px-5 py-4 text-lg outline-none focus:border-olive" />
              </label>
            )}
            {error && <p className="mt-3 text-sm font-black text-red-700">{error}</p>}
            <button className="mt-5 rounded-full bg-navyInk px-6 py-4 font-black text-white">{hasPassword ? "Unlock Admin" : "Create and Unlock Admin"}</button>
          </form>
        ) : (
          <div className="mt-10 grid gap-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-deepOlive">Products</p>
                <p className="mt-2 text-4xl font-black text-navyInk">{products.length}</p>
              </div>
              <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-deepOlive">Orders</p>
                <p className="mt-2 text-4xl font-black text-navyInk">{orders.length}</p>
              </div>
              <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-deepOlive">Revenue</p>
                <p className="mt-2 text-4xl font-black text-navyInk">{formatCurrency(revenue)}</p>
              </div>
            </div>

            {lowStock.length > 0 && (
              <div className="rounded-[1.25rem] border border-botalYellow bg-white p-5">
                <p className="font-black text-navyInk">Low stock alert</p>
                <p className="mt-2 text-sm font-bold text-ink/65">{lowStock.map((product) => `${product.name} (${product.stock})`).join(", ")}</p>
              </div>
            )}

            <SiteContentManager content={content} onSave={onSaveContent} onReset={onResetContent} />

            <CategoryManager
              categories={categories}
              products={products}
              onAddCategory={onAddCategory}
              onDeleteCategory={onDeleteCategory}
              onResetCategories={onResetCategories}
            />

            <ProductManager products={products} categories={categories} onSave={onSaveProduct} onReset={onResetProducts} onDelete={onDeleteProduct} />

            <div className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-premium sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="section-kicker">Orders</span>
                  <h3 className="mt-4 text-3xl font-black text-navyInk">Customer checkout data.</h3>
                </div>
                <button onClick={onClearOrders} className="rounded-full border border-red-200 px-5 py-3 text-sm font-black text-red-700 hover:bg-red-50">Clear Orders</button>
              </div>
              <div className="mt-6 grid gap-4">
                {orders.length ? (
                  orders.map((order) => (
                    <article key={order.id} className="rounded-[1.25rem] border border-black/10 bg-cream p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-black text-navyInk">{order.customer.name} / {order.customer.phone}</p>
                          <p className="text-sm font-bold text-ink/60">{order.customer.address || "No address added"}</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                          <p className="rounded-full bg-botalYellow px-3 py-2 text-sm font-black text-navyInk">{formatCurrency(order.total)}</p>
                          <select value={order.status || "New"} onChange={(event) => onUpdateOrderStatus(order.id, event.target.value)} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-black text-ink">
                            <option>New</option>
                            <option>Confirmed</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-1 text-sm font-bold text-ink/70">
                        {order.items.map((item) => (
                          <p key={item.id}>{item.name} x {item.quantity}</p>
                        ))}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl bg-cream p-5 font-bold text-ink/60">No checkout orders yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomOrder({ content }) {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "", quantity: "" });
  const message = `Hi Botal, I want a custom order.
Name: ${form.name}
Phone: ${form.phone}
Requirement: ${form.requirement}
Quantity: ${form.quantity}`;

  return (
    <section id="custom" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="reveal">
          <span className="section-kicker">{content.custom.kicker}</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.custom.headline}</h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">{content.custom.body}</p>
        </div>
        <form className="reveal glass-panel grid gap-4 rounded-[1.75rem] p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
          {[
            ["name", "Name"],
            ["phone", "Phone Number"],
            ["requirement", "Product Requirement"],
            ["quantity", "Quantity"],
          ].map(([key, label]) => (
            <label key={key} className="grid gap-2 text-sm font-black text-ink/70">
              {label}
              {key === "requirement" ? (
                <textarea rows="4" value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-olive focus:ring-4 focus:ring-olive/10" />
              ) : (
                <input value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-olive focus:ring-4 focus:ring-olive/10" />
              )}
            </label>
          ))}
          <label className="grid gap-2 text-sm font-black text-ink/70">
            Upload Reference Image
            <input type="file" accept="image/*" className="rounded-full border border-dashed border-olive/40 bg-cream px-4 py-3 text-sm" />
          </label>
          <a href={whatsappUrl(message)} target="_blank" className="rounded-full bg-botalYellow px-6 py-4 text-center font-black text-navyInk shadow-yellow transition hover:-translate-y-1">
            Submit on WhatsApp
          </a>
        </form>
      </div>
    </section>
  );
}

function Collaborate({ content }) {
  const partners = content.collaborate.partners || [];
  const offers = content.collaborate.offers || [];
  return (
    <section id="collaborate" className="bg-navyInk py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <span className="section-kicker border-white/10 bg-white/10 text-botalYellow">{content.collaborate.kicker}</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{content.collaborate.headline}</h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="reveal rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-7">
            <h3 className="text-2xl font-black text-botalYellow">Built for</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {partners.map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-3 font-black text-navyInk">{item}</span>
              ))}
            </div>
          </div>
          <div className="reveal rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-7">
            <h3 className="text-2xl font-black text-botalYellow">Collaboration models</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {offers.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 p-4 font-bold">{item}</div>
              ))}
            </div>
          </div>
        </div>
        <a href={whatsappUrl("Hi Botal, I want to collaborate with Botal for retail, bulk orders, or installations.")} target="_blank" className="reveal mt-9 inline-flex rounded-full bg-botalYellow px-7 py-4 font-black text-navyInk shadow-yellow">
          {content.collaborate.cta}
        </a>
      </div>
    </section>
  );
}

function Gallery({ content }) {
  const items = content.gallery.items || [];
  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-kicker">{content.gallery.kicker}</span>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.gallery.headline}</h2>
          </div>
          <a href={content.contact.instagramUrl} target="_blank" className="font-black text-deepOlive underline decoration-botalYellow decoration-4 underline-offset-8">
            Instagram
          </a>
        </div>
        <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={item} className={`gallery-tile reveal flex items-end rounded-[1.5rem] p-5 shadow-sm ${index === 0 || index === 5 ? "md:row-span-2" : ""}`}>
              <p className="max-w-52 text-2xl font-black leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }) {
  const items = content.testimonials.items || [];
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <span className="section-kicker">{content.testimonials.kicker}</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.testimonials.headline}</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((testimonial) => (
            <article key={testimonial.name} className="reveal rounded-[1.5rem] border border-black/5 bg-white p-7 shadow-sm">
              <div className="h-2 w-16 rounded-full bg-botalYellow" />
              <p className="mt-6 leading-8 text-ink/72">"{testimonial.quote}"</p>
              <h3 className="mt-6 font-black text-navyInk">{testimonial.name}</h3>
              <p className="text-sm font-bold text-deepOlive">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content }) {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal">
          <span className="section-kicker">{content.contact.kicker}</span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-navyInk sm:text-5xl">{content.contact.headline}</h2>
        </div>
        <div className="reveal grid gap-4">
          <a href={whatsappUrl("Hi Botal, I want to connect.")} target="_blank" className="rounded-[1.25rem] bg-botalYellow p-6 text-2xl font-black text-navyInk shadow-yellow">WhatsApp Botal</a>
          <a href={content.contact.instagramUrl} target="_blank" className="rounded-[1.25rem] border border-black/10 bg-cream p-6 text-xl font-black text-deepOlive">{content.contact.instagramLabel}</a>
          <a href={`mailto:${content.contact.email}`} className="rounded-[1.25rem] border border-black/10 bg-white p-6 text-xl font-black text-ink">Email: {content.contact.email}</a>
          <p className="rounded-[1.25rem] border border-black/10 bg-white p-6 text-xl font-black text-ink">Location: {content.contact.location}</p>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="border-t border-black/5 bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="Botal logo" className="h-11 w-11 rounded-full object-cover" />
          <div>
            <p className="text-lg font-black text-navyInk">{content.brandName}</p>
            <p className="text-sm font-bold text-ink/60">{content.tagline}</p>
          </div>
        </a>
        <div className="flex flex-wrap gap-4 text-sm font-black text-ink/65">
          {["About", "Products", "Custom", "Gallery", "Contact", "Admin"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-deepOlive">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [siteContent, setSiteContent] = useState(loadStoredSiteContent);
  const [products, setProducts] = useState(loadStoredProducts);
  const [categories, setCategories] = useState(loadStoredCategories);
  const [orders, setOrders] = useState(loadStoredOrders);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("botal-cart") || "[]");
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem("botal-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("botal-site-content", JSON.stringify(siteContent));
    window.BOTAL_WHATSAPP_NUMBER = siteContent.contact.whatsappNumber;
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem("botal-categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("botal-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("botal-cart", JSON.stringify(cart));
  }, [cart]);

  const saveProduct = (product) => {
    const normalized = normalizeProduct(product);
    setProducts((items) => {
      const exists = items.some((item) => item.id === normalized.id);
      if (exists) return items.map((item) => (item.id === normalized.id ? normalized : item));
      return [normalized, ...items];
    });
  };

  const resetSiteContent = () => {
    setSiteContent(defaultSiteContent);
  };

  const deleteProduct = (id) => {
    setProducts((items) => items.filter((item) => item.id !== id));
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const resetProducts = () => {
    setProducts(defaultProducts.map(normalizeProduct));
    setCart([]);
  };

  const addCategory = (name) => {
    const cleaned = name.trim();
    if (!cleaned) return;
    setCategories((items) => (items.some((item) => item.toLowerCase() === cleaned.toLowerCase()) ? items : [...items, cleaned]));
  };

  const deleteCategory = (category) => {
    const used = products.some((product) => product.category === category);
    if (used) return;
    setCategories((items) => items.filter((item) => item !== category));
  };

  const resetCategories = () => {
    const usedCategories = products.map((product) => product.category).filter(Boolean);
    setCategories(Array.from(new Set([...defaultCategories, ...usedCategories])));
  };

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item));
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    const product = products.find((item) => item.id === id);
    const max = product ? product.stock : quantity;
    if (quantity <= 0) {
      setCart((items) => items.filter((item) => item.id !== id));
      return;
    }
    setCart((items) => items.map((item) => (item.id === id ? { ...item, quantity: Math.min(quantity, max) } : item)));
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const checkout = (customer) => {
    const order = {
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart,
      total: cartTotal(cart),
      status: "New",
    };
    setOrders((items) => [order, ...items]);
    setProducts((items) =>
      items.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem ? { ...product, stock: Math.max(Number(product.stock || 0) - cartItem.quantity, 0) } : product;
      })
    );
    setCart([]);
  };

  return (
    <>
      <Header content={siteContent} />
      <main>
        <Hero content={siteContent} />
        <About content={siteContent} />
        <Products
          content={siteContent}
          products={products}
          categories={categories}
          cart={cart}
          onAddToCart={addToCart}
          onQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={checkout}
        />
        <CustomOrder content={siteContent} />
        <Collaborate content={siteContent} />
        <Gallery content={siteContent} />
        <Testimonials content={siteContent} />
        <Contact content={siteContent} />
        <AdminPanel
          content={siteContent}
          products={products}
          categories={categories}
          orders={orders}
          onSaveContent={setSiteContent}
          onResetContent={resetSiteContent}
          onSaveProduct={saveProduct}
          onResetProducts={resetProducts}
          onDeleteProduct={deleteProduct}
          onClearOrders={() => setOrders([])}
          onUpdateOrderStatus={(id, status) => setOrders((items) => items.map((order) => (order.id === id ? { ...order, status } : order)))}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          onResetCategories={resetCategories}
        />
      </main>
      <Footer content={siteContent} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
