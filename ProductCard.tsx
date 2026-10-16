import React, { useState } from 'react';
import { Heart, Eye, Check, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isKnotted, setIsKnotted] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsKnotted(true);
    setTimeout(() => {
      setIsKnotted(false);
    }, 1800);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-[#E9E1D6] overflow-hidden transition-all duration-300 hover:border-[#D6C4B4] hover:shadow-md flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Asset Area */}
      <div className="relative aspect-[4/3] bg-[#FAF5EE] overflow-hidden">
        {imageFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF4ED]">
            <span className="text-3xl mb-2">🧶</span>
            <span className="text-xs font-semibold text-[#54463C]">{product.name}</span>
            <span className="text-[10px] text-[#8C7A6B] mt-1">Hand-knotted with milk cotton</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Minimalist Top Badge (Max 1 subtle text tag per Skill guidelines) */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#6B3E30] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-2xs border border-[#EFE5D8]">
            {product.badge}
          </span>
        )}

        {/* Top Right Floating Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#6E5D50] hover:text-[#E06D67] transition-colors shadow-2xs"
          title={isWishlisted ? 'Saved to keepsake list' : 'Add to keepsakes'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-[#E06D67] text-[#E06D67]' : ''
            }`}
          />
        </button>

        {/* Quick View Button Hover Reveal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-[#2D2825] hover:bg-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick peek</span>
        </button>
      </div>

      {/* Content & Metadata Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Subtle Category & Rating line */}
          <div className="flex items-center justify-between text-xs text-[#8C7B6D] mb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A25F4B]">
              {product.categorySlug}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#F4B251] text-[#F4B251]" />
              <span className="tabular-nums font-medium text-[#2D2825]">{product.rating}</span>
              <span className="text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-serif font-medium text-[#26211E] tracking-tight group-hover:text-[#8C4E3C] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Personality Subtitle (PRD Section 13) */}
          <p className="mt-1 text-xs text-[#6B5E52] leading-relaxed line-clamp-2 italic font-serif">
            “{product.personalitySubtitle}”
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="mt-5 pt-3 border-t border-[#F1E9DE] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#2D2825] tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E8F82] line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-2xs ${
              isKnotted
                ? 'bg-[#E5F1E7] text-[#2F6739]'
                : 'bg-[#FAF4ED] text-[#483B32] hover:bg-[#2D2825] hover:text-[#FAF7F2] border border-[#E2D5C7]'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isKnotted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Knotted! ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#8C5847] group-hover:text-inherit" />
                <span>I want this ♡</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
