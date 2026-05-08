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
      <Header />
      <main>
        <Hero />
        <About />
        <Products
          products={products}
          categories={categories}
          cart={cart}
          onAddToCart={addToCart}
          onQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={checkout}
        />
        <CustomOrder />
        <Collaborate />
        <Gallery />
        <Testimonials />
        <Contact />
        <AdminPanel
          products={products}
          categories={categories}
          orders={orders}
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
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
