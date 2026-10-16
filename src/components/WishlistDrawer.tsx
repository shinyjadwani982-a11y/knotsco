import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onExplore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DCD0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE0D3] bg-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E06D67] fill-[#E06D67]" />
              <h2 className="text-base font-serif font-medium text-[#26211E]">
                Things you're not ready to let go of yet.
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#2D2825] hover:bg-[#EFE8DD] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Heart className="w-12 h-12 text-[#DECFC2] mb-3" />
                <h3 className="text-base font-serif font-medium text-[#26211E]">
                  No keepsakes saved yet
                </h3>
                <p className="text-xs text-[#7B6E62] mt-1 max-w-xs leading-relaxed">
                  Tap the heart icon on any little creation to save it for later.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="mt-6 bg-[#2D2825] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#433B37] transition-all"
                >
                  Explore creations →
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#E9E0D4] shadow-2xs flex gap-3.5 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#FAF5EE] shrink-0 border border-[#EBE2D7]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#2D2825] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#7B6E62] truncate italic font-serif">
                      {product.personalitySubtitle}
                    </p>
                    <p className="text-xs font-bold text-[#2D2825] mt-1 tabular-nums">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="p-2 rounded-xl bg-[#2D2825] text-white hover:bg-[#433B37] text-xs transition-colors"
                      title="Move to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-2 rounded-xl bg-[#F6EFE6] text-[#8C7A6B] hover:text-[#C54A44] transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
