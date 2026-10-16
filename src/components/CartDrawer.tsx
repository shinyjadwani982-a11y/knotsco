import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Gift, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
  giftWrapping: boolean;
  onToggleGiftWrapping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
  giftWrapping,
  onToggleGiftWrapping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 999;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const giftWrapFee = giftWrapping ? 49 : 0;
  const grandTotal = subtotal + giftWrapFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DCD0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE0D3] bg-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#8F5543]" />
              <h2 className="text-base font-serif font-medium text-[#26211E]">
                Your Little Collection ♡
              </h2>
              <span className="text-xs text-[#8C7A6B] tabular-nums">
                ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#2D2825] hover:bg-[#EFE8DD] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#F4EDE3] border-b border-[#E7DDCE] text-xs text-[#5D5045]">
            {remainingForFreeShipping > 0 ? (
              <p>
                Add <strong className="text-[#8F5543] tabular-nums">₹{remainingForFreeShipping}</strong> more for complimentary gift wrap &amp; free shipping!
              </p>
            ) : (
              <p className="text-[#32693D] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#32693D]" />
                You unlocked free gift wrapping &amp; free shipping!
              </p>
            )}
            <div className="w-full bg-[#E3D8CA] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#9E5D49] h-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <span className="text-4xl mb-3">🧺</span>
                <h3 className="text-lg font-serif font-medium text-[#26211E]">
                  Your basket is feeling a little lonely.
                </h3>
                <p className="text-xs text-[#7B6E62] mt-1 max-w-xs leading-relaxed">
                  Every ordinary day deserves at least one little thing with personality.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="mt-6 bg-[#2D2825] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#433B37] transition-all"
                >
                  Go find something cute →
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#E9E0D4] shadow-2xs flex gap-3.5 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-[#FAF5EE] shrink-0 border border-[#EBE2D7]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#2D2825] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#A59587] hover:text-[#C54A44] transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.customization && (
                      <div className="mt-0.5 text-[10px] text-[#8C7A6B] space-y-0.5">
                        {item.customization.shadeName && (
                          <p>Shade: {item.customization.shadeName}</p>
                        )}
                        {item.customization.monogram && (
                          <p>Monogram: "{item.customization.monogram}"</p>
                        )}
                        {item.customization.specialNote && (
                          <p className="truncate italic">Note: "{item.customization.specialNote}"</p>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#DDD3C6] rounded-lg bg-[#FAF6F0]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#2D2825] text-[#7A6B5F]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums text-[#2D2825]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#2D2825] text-[#7A6B5F]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#2D2825] tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Actions (if items exist) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAE0D3] bg-white/80 space-y-3">
              {/* Gift Wrap Toggle */}
              <div
                onClick={onToggleGiftWrapping}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DED1] cursor-pointer hover:bg-[#F5EFE6] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#8F5543]" />
                  <span className="text-xs font-medium text-[#2D2825]">
                    Handwritten note &amp; wax seal wrap
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#8C7A6B] tabular-nums">{remainingForFreeShipping === 0 ? 'FREE' : '+₹49'}</span>
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={() => {}}
                    className="accent-[#8F5543] rounded"
                  />
                </div>
              </div>

              {/* Subtotal & Grand Total */}
              <div className="space-y-1 text-xs text-[#6B5E52] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#2D2825]">₹{subtotal}</span>
                </div>
                {giftWrapping && (
                  <div className="flex justify-between">
                    <span>Wax seal gift wrapping</span>
                    <span className="tabular-nums font-medium text-[#2D2825]">
                      {remainingForFreeShipping === 0 ? '₹0' : '₹49'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums font-medium text-[#2D2825]">
                    {remainingForFreeShipping === 0 ? 'FREE' : '₹60'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2D2825] pt-2 border-t border-[#EAE0D3]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    ₹{grandTotal + (remainingForFreeShipping === 0 ? 0 : 60)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-[#2D2825] text-white hover:bg-[#433B37] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Almost yours ♡ Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
