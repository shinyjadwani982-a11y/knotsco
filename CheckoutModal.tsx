import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ShieldCheck, MapPin, Phone, User, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  giftWrapping: boolean;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  giftWrapping,
  onClearCart,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 999 ? 0 : 60;
  const wrapFee = giftWrapping && subtotal < 999 ? 49 : 0;
  const totalAmount = subtotal + shippingFee + wrapFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !pinCode.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = `KNOT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed({
        orderId,
        name,
        phone,
        address,
        totalAmount,
        paymentMethod,
        itemCount: items.reduce((acc, it) => acc + it.quantity, 0),
        giftNote: giftNote.trim(),
      });
      onClearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#E4D9CC] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE2D5] flex items-center justify-between bg-white/70">
          <h2 className="text-sm font-serif font-medium text-[#26211E] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8C4E3C]" />
            <span>Almost yours ♡ Checkout</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8C7A6B] hover:text-[#2D2825] hover:bg-[#EFE8DD] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {orderConfirmed ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-[#E5F1E7] text-[#2F6739] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-medium text-[#26211E]">
                Order Confirmed ♡
              </h3>
              <p className="text-xs text-[#8C7A6B] mt-1">
                Receipt Reference: <span className="font-mono font-bold text-[#2D2825]">{orderConfirmed.orderId}</span>
              </p>

              <div className="mt-6 p-5 bg-white rounded-2xl border border-[#E8DFD3] text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-[#F0E8DC] pb-2">
                  <span className="text-[#786C60]">Recipient</span>
                  <span className="font-semibold text-[#2D2825]">{orderConfirmed.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0E8DC] pb-2">
                  <span className="text-[#786C60]">Delivery To</span>
                  <span className="font-medium text-[#2D2825] text-right max-w-xs truncate">{orderConfirmed.address}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0E8DC] pb-2">
                  <span className="text-[#786C60]">Payment Method</span>
                  <span className="font-medium text-[#2D2825] uppercase">
                    {orderConfirmed.paymentMethod === 'upi' ? 'Instant UPI' : 'Cash on Delivery'}
                  </span>
                </div>
                {orderConfirmed.giftNote && (
                  <div className="pt-1">
                    <span className="text-[#786C60] block mb-0.5">Handwritten Gift Note:</span>
                    <p className="italic text-[#7D4C3A] bg-[#FAF5EE] p-2 rounded-lg font-serif">
                      “{orderConfirmed.giftNote}”
                    </p>
                  </div>
                )}
                <div className="flex justify-between pt-1 font-bold text-sm text-[#2D2825]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{orderConfirmed.totalAmount}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#FAF5EE] border border-[#EADFCF] text-xs text-[#6B5D50] flex items-center gap-3 text-left">
                <Sparkles className="w-5 h-5 text-[#8F5543] shrink-0" />
                <p>
                  Our artisan has queued your pieces. Each knot is woven slowly and carefully. You'll receive SMS tracking updates shortly!
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="mt-6 w-full py-3 bg-[#2D2825] text-white rounded-xl text-xs font-semibold hover:bg-[#433B37] transition-all"
              >
                Back to Knots &amp; Co.
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9E8F82] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aanya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C6] rounded-xl text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9E8F82] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C6] rounded-xl text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 560034"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C6] rounded-xl text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                  Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#9E8F82] absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat number, building, street, city..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C6] rounded-xl text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2825] mb-1">
                  Handwritten Gift Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'To the best friend in the universe. Miss you! ♡'"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C6] rounded-xl text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#2D2825] mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-white border-[#8F5543] ring-1 ring-[#8F5543]'
                        : 'bg-white/60 border-[#E5DDD2] hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#2D2825]">UPI / Cards</p>
                    <p className="text-[10px] text-[#786C60] mt-0.5">GPay, PhonePe, Paytm, Cards</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-white border-[#8F5543] ring-1 ring-[#8F5543]'
                        : 'bg-white/60 border-[#E5DDD2] hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#2D2825]">Cash on Delivery</p>
                    <p className="text-[10px] text-[#786C60] mt-0.5">Pay in cash when delivered</p>
                  </button>
                </div>
              </div>

              {/* Summary Bar */}
              <div className="mt-4 pt-3 border-t border-[#EAE0D3] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#786C60]">Payable Amount</span>
                  <p className="text-base font-bold text-[#2D2825] tabular-nums">₹{totalAmount}</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#2D2825] hover:bg-[#433B37] text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Knots...</span>
                  ) : (
                    <span>Confirm Order ♡</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
