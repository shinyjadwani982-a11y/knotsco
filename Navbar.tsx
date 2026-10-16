import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Search, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenCustomStudio: () => void;
  onNavigateSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenCustomStudio,
  onNavigateSection,
  searchQuery,
  onSearchChange
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#EAE3D9] transition-all">
      {/* Optional Slim Announcement Banner (Under 40px) */}
      {showBanner && (
        <div className="relative bg-[#F4ECE1] text-[#635548] text-xs py-2 px-4 text-center border-b border-[#E6DDD0] flex items-center justify-center gap-2">
          <span>Ordinary things. Personal meanings. Made by hand.</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline font-medium text-[#7D5344]">Complimentary handwritten gift card on all orders ♡</span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C7A6B] hover:text-[#2D2825] transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-[#2D2825] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 text-left"
        >
          Knots &amp; Co.
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#574D45]">
          <button
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-[#2D2825] transition-colors whitespace-nowrap shrink-0"
          >
            Shop Creations
          </button>
          <button
            onClick={() => onNavigateSection('personalities')}
            className="hover:text-[#2D2825] transition-colors whitespace-nowrap shrink-0"
          >
            Shop Personality
          </button>
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 text-[#A25F4B] hover:text-[#7D3F2D] transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Your Knot</span>
          </button>
          <button
            onClick={onOpenCustomStudio}
            className="hover:text-[#2D2825] transition-colors whitespace-nowrap shrink-0"
          >
            Make It Yours
          </button>
          <button
            onClick={() => onNavigateSection('our-story')}
            className="hover:text-[#2D2825] transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </button>
        </nav>

        {/* Zone 3: Primary Action & Kept Affordances */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Input or Toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-[#DDD4C7] rounded-full px-3 py-1 shadow-sm">
                <Search className="w-3.5 h-3.5 text-[#8C7A6B] mr-2" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="text-xs bg-transparent focus:outline-none w-36 sm:w-48 text-[#2D2825] placeholder:text-[#9E8F82]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#9E8F82] hover:text-[#2D2825] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#574D45] hover:text-[#2D2825] rounded-full hover:bg-[#F2ECE2] transition-colors"
                title="Search little things"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#574D45] hover:text-[#2D2825] rounded-full hover:bg-[#F2ECE2] transition-colors"
            title="Things you're not ready to let go of"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E06D67] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Button (Primary Action) */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#2D2825] text-[#FAF7F2] hover:bg-[#433B37] px-4 py-2 rounded-full text-xs font-medium tracking-wide shadow-xs transition-all whitespace-nowrap shrink-0"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
