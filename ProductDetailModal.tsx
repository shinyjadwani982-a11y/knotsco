import React, { useState } from 'react';
import { X, Heart, Star, Check, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, customization?: { monogram?: string; specialNote?: string }) => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectRelatedProduct,
}) => {
  const [isKnotted, setIsKnotted] = useState(false);
  const [monogram, setMonogram] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, {
      monogram: monogram.trim() || undefined,
      specialNote: specialNote.trim() || undefined,
    });
    setIsKnotted(true);
    setTimeout(() => {
      setIsKnotted(false);
    }, 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#E4D9CC] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE2D5] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E5D49]">
              {product.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8C7A6B] hover:text-[#2D2825] hover:bg-[#EFE8DD] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Product Image */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF4ED] border border-[#E6DCD0] shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#6E5D50] hover:text-[#E06D67] transition-colors shadow-2xs"
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#E06D67] text-[#E06D67]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Handcrafted note callout */}
              <div className="p-4 rounded-xl bg-white/70 border border-[#E9DFD3] text-xs text-[#6B5D52] flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#A25F4B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2D2825]">Human-knotted in small batches</p>
                  <p className="mt-0.5 text-[#7D7065]">
                    No factory mold. Because each stitch is made by hand, subtle tiny variations make your piece one of a kind.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Product Story & Specifications */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                {/* Rating & Review Count */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-[#F4B251]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#2D2825] tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#8C7A6B]">
                    · {product.reviewCount} customer stories
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#26211E] tracking-tight leading-snug">
                  {product.name}
                </h2>

                {/* One-Line Personality Statement (PRD Section 20) */}
                <p className="mt-2 text-sm text-[#7D4C3A] font-serif italic">
                  “{product.personalitySubtitle}”
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#2D2825] tabular-nums">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#9E8F82] line-through tabular-nums">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#487346] font-medium bg-[#EBF3EC] px-2 py-0.5 rounded-md">
                    In Stock · Ships in 24-48h
                  </span>
                </div>

                {/* Story Paragraph */}
                <div className="mt-6 pt-5 border-t border-[#EAE0D3]">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-2">
                    The Story Behind It
                  </h3>
                  <p className="text-sm text-[#5E5248] leading-relaxed">
                    {product.story}
                  </p>
                </div>

                {/* Why You'll Love It */}
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-2">
                    Why You’ll Love It
                  </h3>
                  <ul className="space-y-1.5">
                    {product.whyYouWillLoveIt.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#63564B]">
                        <span className="text-[#A25F4B] mt-0.5">✦</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The Details */}
                <div className="mt-5 pt-4 border-t border-[#EAE0D3] space-y-1.5 text-xs text-[#6B5E52]">
                  <p>
                    <strong className="text-[#2D2825]">Materials:</strong> {product.materials}
                  </p>
                  <p>
                    <strong className="text-[#2D2825]">Dimensions:</strong> {product.dimensions}
                  </p>
                  <p>
                    <strong className="text-[#2D2825]">Care:</strong> {product.care}
                  </p>
                </div>

                {/* Personalize: Monogram or Gift Note */}
                <div className="mt-5 pt-4 border-t border-[#EAE0D3]">
                  <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                    Make It Yours (Optional Initial or Name tag)
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="e.g. 'MIRA' or 'A ♡'"
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value)}
                    className="w-full text-xs bg-white border border-[#DDD3C6] rounded-xl px-3 py-2 text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                  />
                </div>
              </div>

              {/* Add to Bag Action Bar */}
              <div className="mt-8 pt-4 border-t border-[#EAE0D3]">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isKnotted
                      ? 'bg-[#2F6739] text-white'
                      : 'bg-[#2D2825] text-white hover:bg-[#433B37]'
                  }`}
                >
                  {isKnotted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Knotted! Added to your collection ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>I want this ♡</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Related Products: You Might Knot With This */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EAE0D3]">
              <h3 className="text-sm font-serif font-medium text-[#2D2825] mb-4">
                You might knot with this...
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-[#E7DFD3] hover:bg-white hover:border-[#D6C6B5] transition-all cursor-pointer"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2D2825] truncate">
                        {rel.name}
                      </p>
                      <p className="text-[11px] text-[#7B6E62] truncate italic font-serif">
                        {rel.personalitySubtitle}
                      </p>
                      <p className="text-xs font-bold text-[#2D2825] mt-0.5 tabular-nums">
                        ₹{rel.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
