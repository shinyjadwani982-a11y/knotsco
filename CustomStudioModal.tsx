import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, Clock, Palette } from 'lucide-react';
import { Product } from '../data/products';

interface CustomStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomPiece: (customProduct: Product, details: { shadeName: string; monogram: string; specialNote: string }) => void;
}

const BASE_PIECES = [
  {
    id: 'custom-bag-charm',
    title: 'Personalized Bag Charm',
    subtitle: 'With custom engraved/stitched wooden letter tag',
    basePrice: 540,
    craftDays: '3–4 days',
    icon: '🍓',
    category: 'Tiny personality pieces'
  },
  {
    id: 'custom-flower-stem',
    title: 'Custom Single Stem Bloom',
    subtitle: 'In your choice of flower variety & petal colors',
    basePrice: 580,
    craftDays: '3–5 days',
    icon: '🌷',
    category: 'Flowers that don’t fade'
  },
  {
    id: 'custom-bookmark',
    title: 'Sprout & Monogram Bookmark',
    subtitle: 'Woven page buddy with your initial hand-stitched',
    basePrice: 420,
    craftDays: '2–3 days',
    icon: '📚',
    category: 'For pages worth staying in'
  },
  {
    id: 'custom-tumbler-strap',
    title: 'Custom Tumbler Sling',
    subtitle: 'Custom dual-tone checkerboard or pastel solid',
    basePrice: 950,
    craftDays: '4–5 days',
    icon: '✨',
    category: 'For your emotional-support tumbler'
  }
];

const PASTEL_SHADES = [
  { name: 'Buttercup Yellow', hex: '#FDF1C2', border: '#ECC86C', tag: 'Warm & Sunny' },
  { name: 'Matcha Sage', hex: '#DCE7DD', border: '#9CB49E', tag: 'Calm Botanical' },
  { name: 'Blossom Pink', hex: '#F7DCD5', border: '#E2A99E', tag: 'Romantic Nostalgia' },
  { name: 'Powder Sky Blue', hex: '#DCE8F7', border: '#A6C3E4', tag: 'Dreamy & Soft' },
  { name: 'Lavender Cream', hex: '#EBE2F5', border: '#BEA6DE', tag: 'Quiet Wonder' },
  { name: 'Warm Paper Linen', hex: '#F4ECE1', border: '#D3C2B1', tag: 'Minimal Neutral' },
];

export const CustomStudioModal: React.FC<CustomStudioModalProps> = ({
  isOpen,
  onClose,
  onAddCustomPiece
}) => {
  const [selectedBase, setSelectedBase] = useState(BASE_PIECES[0]);
  const [selectedShade, setSelectedShade] = useState(PASTEL_SHADES[0]);
  const [monogramText, setMonogramText] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isKnotted, setIsKnotted] = useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `${selectedBase.title} (${selectedShade.name})`,
      personalitySubtitle: monogramText.trim()
        ? `Made uniquely for "${monogramText.trim().toUpperCase()}"`
        : `Hand-knotted in ${selectedShade.name}`,
      category: selectedBase.category,
      categorySlug: 'charms',
      price: selectedBase.basePrice,
      rating: 5.0,
      reviewCount: 1,
      image: '/src/assets/images/regenerated_image_1792149856407.png',
      story: `A slow-crafted bespoke piece, hand-knotted by our artisan in ${selectedShade.name} milk-cotton yarn. ${
        monogramText.trim() ? `Custom initial: "${monogramText.trim()}".` : ''
      }`,
      whyYouWillLoveIt: [
        '100% bespoke color composition made to order',
        'Includes handwritten artisan tag with your craft date',
        'Stitched by hand with combed hypoallergenic milk cotton'
      ],
      materials: '100% Milk-cotton yarn, bespoke hardware/stems',
      dimensions: 'Custom dimension suited to item',
      care: 'Spot clean gently with cold water. Air dry flat.',
      personalityArchetypes: ['The Sentimental One', 'The Sunshine Person'],
      vibes: ['Soft & Dreamy', 'Romantic & Nostalgic'],
      occasions: ['Self-gifting ♡', 'For my bestie', 'For someone special'],
      inStock: true
    };

    onAddCustomPiece(customProduct, {
      shadeName: selectedShade.name,
      monogram: monogramText.trim(),
      specialNote: giftNote.trim()
    });

    setIsKnotted(true);
    setTimeout(() => {
      setIsKnotted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border border-[#E4D9CC] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE2D5] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A25F4B]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C5A48]">
              Make It Yours · Custom Studio
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8C7A6B] hover:text-[#2D2825] hover:bg-[#EFE8DD] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#26211E] tracking-tight">
              Same idea. Your version.
            </h2>
            <p className="mt-1 text-sm text-[#665A50]">
              Choose your piece, choose your pastel yarn palette, and add an initial or secret note.
            </p>
          </div>

          {/* 1. Pick Base Piece */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-3">
              01. Choose your little thing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BASE_PIECES.map((piece) => {
                const isSelected = selectedBase.id === piece.id;
                return (
                  <button
                    key={piece.id}
                    onClick={() => setSelectedBase(piece)}
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-white border-[#8F5543] ring-2 ring-[#8F5543]/20 shadow-xs'
                        : 'bg-white/60 border-[#E5DDD2] hover:bg-white hover:border-[#D6C7B7]'
                    }`}
                  >
                    <span className="text-2xl">{piece.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#2D2825]">{piece.title}</p>
                        {isSelected && <Check className="w-4 h-4 text-[#8F5543] shrink-0" />}
                      </div>
                      <p className="text-xs text-[#7B6E62] mt-0.5">{piece.subtitle}</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#2D2825] tabular-nums">₹{piece.basePrice}</span>
                        <span className="text-[11px] text-[#8C7A6B] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {piece.craftDays}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Pick Pastel Shade */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#935D4A]">
                02. Choose yarn palette
              </label>
              <span className="text-xs font-medium text-[#7D6B5E]">
                Selected: <strong className="text-[#2D2825]">{selectedShade.name}</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PASTEL_SHADES.map((shade) => {
                const isSelected = selectedShade.name === shade.name;
                return (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedShade(shade)}
                    className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-white border-[#8F5543] ring-2 ring-[#8F5543]/20 shadow-xs'
                        : 'bg-white/60 border-[#E5DDD2] hover:bg-white hover:border-[#D6C7B7]'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border shadow-2xs shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: shade.hex, borderColor: shade.border }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#543329]" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#2D2825] truncate">{shade.name}</p>
                      <p className="text-[10px] text-[#8C7A6B] truncate">{shade.tag}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personalization: Monogram & Gift Note */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-1.5">
                03. Monogram / Initial (Optional)
              </label>
              <input
                type="text"
                maxLength={12}
                placeholder="e.g. 'A &amp; R' or 'DAISY'"
                value={monogramText}
                onChange={(e) => setMonogramText(e.target.value)}
                className="w-full text-xs bg-white border border-[#DDD3C6] rounded-xl px-3.5 py-2.5 text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
              />
              <p className="text-[11px] text-[#8C7A6B] mt-1">Stitched on a wooden tag or yarn ribbon</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-1.5">
                04. Handwritten note message
              </label>
              <input
                type="text"
                maxLength={80}
                placeholder="e.g. 'For my favorite human. Happy birthday!'"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full text-xs bg-white border border-[#DDD3C6] rounded-xl px-3.5 py-2.5 text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
              />
              <p className="text-[11px] text-[#8C7A6B] mt-1">Written on craft card with dried petal accent</p>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E4D7C8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E3C]">
                  Your Custom Creation
                </span>
                <span className="text-[10px] text-[#8C7A6B]">·</span>
                <span className="text-[11px] text-[#786C60]">{selectedBase.craftDays} handmade turnaround</span>
              </div>
              <p className="text-base font-serif font-medium text-[#2D2825]">
                {selectedBase.title} in {selectedShade.name}
              </p>
              {monogramText && (
                <p className="text-xs text-[#705F52] mt-0.5">
                  Initial / Tag: <span className="font-semibold text-[#2D2825]">"{monogramText.toUpperCase()}"</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xl font-bold text-[#2D2825] tabular-nums">
                ₹{selectedBase.basePrice}
              </span>

              <button
                onClick={handleCreate}
                className={`px-5 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isKnotted
                    ? 'bg-[#2F6739] text-white'
                    : 'bg-[#2D2825] text-white hover:bg-[#433B37]'
                }`}
              >
                {isKnotted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Knotted to Bag! ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Make This Mine ♡</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
