import React, { useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, Product } from './data/products';
import { CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { PersonalityGrid } from './components/PersonalityGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PersonalityQuizModal } from './components/PersonalityQuizModal';
import { CustomStudioModal } from './components/CustomStudioModal';
import { CraftProcess } from './components/CraftProcess';
import { CustomerStories } from './components/CustomerStories';
import { InstagramGrid } from './components/InstagramGrid';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function App() {
  // State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('knots_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('knots_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [giftWrapping, setGiftWrapping] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync persistence
  useEffect(() => {
    try {
      localStorage.setItem('knots_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('knots_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart operations
  const handleAddToCart = (product: Product, customization?: { shadeName?: string; monogram?: string; specialNote?: string }) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customization?.monogram === customization?.monogram &&
          item.customization?.shadeName === customization?.shadeName
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        const newLineItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity: 1,
          customization,
        };
        return [...prev, newLineItem];
      }
    });

    showToast(`Knotted! "${product.name}" added to your collection ♡`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your keepsakes.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your keepsakes ♡');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    // Category filter
    if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
      return false;
    }
    // Personality filter
    if (selectedPersonality && !p.personalityArchetypes.includes(selectedPersonality)) {
      return false;
    }
    // Mood filter
    if (selectedMood && !p.vibes.includes(selectedMood)) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.personalitySubtitle.toLowerCase().includes(q);
      const matchStory = p.story.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchSubtitle && !matchStory && !matchCat) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2825]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2825] text-white px-4 py-3 rounded-2xl text-xs font-medium shadow-xl border border-[#483F39] flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-[#EAB5A8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
        onNavigateSection={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            scrollToSection('catalog');
          }
        }}
      />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero
          onExplore={() => scrollToSection('catalog')}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
        />

        {/* Section 2: Brand Philosophy */}
        <BrandPhilosophy
          onLearnMore={() => scrollToSection('catalog')}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Section 3: Shop Your Personality */}
        <PersonalityGrid
          activePersonality={selectedPersonality}
          onSelectPersonality={(archTitle) => {
            setSelectedPersonality(archTitle);
            scrollToSection('catalog');
          }}
        />

        {/* Section 4 & 5: Catalog & Bestsellers */}
        <section id="catalog" className="py-16 sm:py-20 bg-[#FAF7F2] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-widest text-[#935D4A] font-semibold">
                Our Handmade Catalog
              </span>
              <h2 className="mt-1 text-3xl sm:text-4xl font-display font-medium text-[#26211E] tracking-tight">
                The ones everyone keeps knotting about.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6B5E52]">
                Every single piece is looped slowly by hand using premium combed milk cotton yarn.
              </p>
            </div>

            {/* Active Filter Indicators */}
            {(selectedPersonality || selectedMood || searchQuery) && (
              <div className="mb-6 flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#F4EDE4] border border-[#E5DAD0] text-xs">
                <span className="text-[#7A6B5F] font-medium">Filtering by:</span>

                {selectedPersonality && (
                  <span className="bg-white text-[#8C4E3C] font-semibold px-2.5 py-1 rounded-full border border-[#DFCFC2] flex items-center gap-1.5">
                    <span>{selectedPersonality}</span>
                    <button
                      onClick={() => setSelectedPersonality(null)}
                      className="text-[#9E8E82] hover:text-[#2D2825]"
                    >
                      ×
                    </button>
                  </span>
                )}

                {selectedMood && (
                  <span className="bg-white text-[#8C4E3C] font-semibold px-2.5 py-1 rounded-full border border-[#DFCFC2] flex items-center gap-1.5">
                    <span>{selectedMood}</span>
                    <button
                      onClick={() => setSelectedMood(null)}
                      className="text-[#9E8E82] hover:text-[#2D2825]"
                    >
                      ×
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="bg-white text-[#2D2825] font-medium px-2.5 py-1 rounded-full border border-[#DFCFC2] flex items-center gap-1.5">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[#9E8E82] hover:text-[#2D2825]"
                    >
                      ×
                    </button>
                  </span>
                )}

                <button
                  onClick={() => {
                    setSelectedPersonality(null);
                    setSelectedMood(null);
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-[#8C5847] hover:underline font-medium ml-auto"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Reimagined Category Tabs (Functional Button Controls with Clean Styling) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap shrink-0 transition-all font-medium ${
                      isActive
                        ? 'bg-[#2D2825] text-white shadow-2xs'
                        : 'bg-white/80 text-[#615449] hover:bg-white hover:text-[#2D2825] border border-[#E7DFD4]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Secondary Controls: Mood Quick Filters & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2 border-t border-[#ECE3D7]">
              {/* Mood Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-[#6B5D52]">
                <span className="font-semibold text-[#8C7A6B] mr-1 text-[11px] uppercase tracking-wider">
                  Vibe:
                </span>
                {['Sunny & Bright', 'Soft & Dreamy', 'Romantic & Nostalgic', 'Calm & Earthy', 'Playful & Cheerful'].map((mood) => {
                  const isCurrent = selectedMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(isCurrent ? null : mood)}
                      className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        isCurrent
                          ? 'bg-[#F2E5DC] text-[#7D3E2C] font-semibold'
                          : 'hover:bg-[#EFE8DE] text-[#695C51]'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2 text-xs text-[#6B5D52] self-end sm:self-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#9E8F82]" />
                <span className="text-[#8C7A6B]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#DDD3C6] rounded-lg px-2.5 py-1 text-xs text-[#2D2825] focus:outline-none focus:border-[#8F5543]"
                >
                  <option value="featured">Most Knotted (Featured)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated ★</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE0D3] max-w-md mx-auto my-12">
                <span className="text-4xl">🧶</span>
                <h3 className="text-lg font-serif font-medium text-[#2D2825] mt-3">
                  Hmm... we haven’t knotted that one yet.
                </h3>
                <p className="text-xs text-[#7B6E62] mt-1 leading-relaxed">
                  Try clearing your search or explore our custom studio to bring your own dream piece to life!
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedPersonality(null);
                      setSelectedMood(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FAF5EE] border border-[#DDD2C4] text-xs font-medium text-[#4D4137] hover:bg-[#F2ECE2]"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setIsCustomStudioOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#2D2825] text-white text-xs font-medium hover:bg-[#433B37]"
                  >
                    Make It Yours →
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isWishlisted(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(p) => setViewingProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 6: Handmade Craft Process */}
        <CraftProcess onOpenCustomStudio={() => setIsCustomStudioOpen(true)} />

        {/* Section 7: Customer Stories ("Things people are knotting about") */}
        <CustomerStories />

        {/* Section 8: Social Proof & UGC ("Spotted in the wild ♡") */}
        <InstagramGrid
          onSelectTag={(tag) => {
            setSearchQuery(tag.split(' ')[0]);
            scrollToSection('catalog');
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => scrollToSection('catalog')}
        giftWrapping={giftWrapping}
        onToggleGiftWrapping={() => setGiftWrapping(!giftWrapping)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onExplore={() => scrollToSection('catalog')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        isWishlisted={viewingProduct ? isWishlisted(viewingProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectRelatedProduct={(rel) => setViewingProduct(rel)}
      />

      {/* Personality Quiz Modal ("Find Your Knot") */}
      <PersonalityQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={isWishlisted}
      />

      {/* Custom Studio Modal ("Make It Yours") */}
      <CustomStudioModal
        isOpen={isCustomStudioOpen}
        onClose={() => setIsCustomStudioOpen(false)}
        onAddCustomPiece={(customProd, details) => {
          handleAddToCart(customProd, details);
          setIsCartOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        giftWrapping={giftWrapping}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
