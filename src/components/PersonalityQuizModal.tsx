import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Heart } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface PersonalityQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const MOODS = [
  { id: 'soft', label: 'Soft & Dreamy', emoji: '🌸', desc: 'Gentle mornings, pastel skies, slow songs' },
  { id: 'sunny', label: 'Sunny & Bright', emoji: '☀️', desc: 'Dopamine hits, warm laughter, golden hour' },
  { id: 'playful', label: 'Playful & Cute', emoji: '🎀', desc: 'Sweet charms, quirky trinkets, good hair days' },
  { id: 'calm', label: 'Calm & Earthy', emoji: '🌿', desc: 'Hot matcha, quiet pages, windowsill greens' },
  { id: 'romantic', label: 'Romantic & Nostalgic', emoji: '❤️', desc: 'Vintage postcards, forever blooms, slow walks' },
  { id: 'chaotic', label: 'Cute-but-Chaotic', emoji: '✨', desc: 'Overpacked totes, 3 lip balms, spontaneous fun' },
];

const OBSESSIONS = [
  { id: 'books', label: 'Books & Quiet Corners', emoji: '📚', desc: 'Never dog-ear a paperback page again' },
  { id: 'flowers', label: 'Flowers that Stay', emoji: '🌷', desc: 'No wilting petals or messy vase water' },
  { id: 'totes', label: 'Everyday Totes & Bags', emoji: '👜', desc: 'Making a plain canvas bag uniquely mine' },
  { id: 'desk', label: 'Desk Plants & Cozy Corners', emoji: '🌱', desc: 'Companions that require zero watering' },
  { id: 'trinkets', label: 'Charms & Hair Knots', emoji: '🎀', desc: 'Little tactile details that spark joy' },
];

const REASONS = [
  { id: 'self', label: 'For me ♡', emoji: '🪞', desc: 'A little reminder to be gentle with myself' },
  { id: 'bestie', label: 'For my bestie', emoji: '👯‍♀️', desc: 'Something that says “I saw this and thought of you”' },
  { id: 'special', label: 'For someone special', emoji: '💌', desc: 'A thoughtful token of deep affection' },
  { id: 'because', label: 'Just because', emoji: '🎈', desc: 'No anniversary or occasion needed' },
];

export const PersonalityQuizModal: React.FC<PersonalityQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedMood, setSelectedMood] = useState<string>('sunny');
  const [selectedObsession, setSelectedObsession] = useState<string>('flowers');
  const [selectedReason, setSelectedReason] = useState<string>('self');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedMood('sunny');
    setSelectedObsession('flowers');
    setSelectedReason('self');
  };

  // Determine knot personality archetype and recommended products
  const calculateResult = () => {
    let knotName = 'The Sentimental Sunshine';
    let personaTagline = 'For someone who radiates warm kindness and keeps every little memory close.';
    let recommendedIds = ['daisy-bouquet', 'dhoop-sunflower', 'strawberry-charm'];

    if (selectedMood === 'calm' || selectedObsession === 'books') {
      knotName = 'The Quiet Dreamer';
      personaTagline = 'For slow afternoons, matcha sips, and pages worth bookmarking forever.';
      recommendedIds = ['matcha-sprout-bookmark', 'dhoop-sunflower', 'crochet-market-tote'];
    } else if (selectedMood === 'romantic' || selectedObsession === 'flowers') {
      knotName = 'The Vintage Romantic';
      personaTagline = 'For feelings that don’t wilt and love letters written with patience.';
      recommendedIds = ['rose-ishq', 'daisy-bouquet', 'fairy-tale-hair-bows'];
    } else if (selectedMood === 'chaotic' || selectedObsession === 'totes') {
      knotName = 'The Dopamine Daydreamer';
      personaTagline = 'Keyrings packed with charm, iced coffees, and unabashed individuality.';
      recommendedIds = ['strawberry-charm', 'checker-tumbler-sling', 'crochet-market-tote'];
    } else if (selectedObsession === 'desk') {
      knotName = 'The Botanical Soul';
      personaTagline = 'Bringing organic greenery and joyful handmade texture to everyday study desks.';
      recommendedIds = ['dhoop-sunflower', 'matcha-sprout-bookmark', 'daisy-bouquet'];
    }

    const matchedProducts = PRODUCTS.filter((p) => recommendedIds.includes(p.id));
    return { knotName, personaTagline, matchedProducts };
  };

  const result = calculateResult();

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E4D9CC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE2D5] flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A25F4B]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C5A48]">
              Find Your Knot · Personality Quiz
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

        {/* Progress Bar */}
        <div className="w-full bg-[#EFE8DD] h-1">
          <div
            className="bg-[#9E5D49] h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A25F4B]">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2825] mt-1 mb-2">
                What’s your current vibe?
              </h2>
              <p className="text-sm text-[#6B5E52] mb-6">
                Pick the energy you’re channeling today or want more of in your everyday life.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOODS.map((m) => {
                  const isSelected = selectedMood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMood(m.id)}
                      className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-white border-[#8F5543] ring-2 ring-[#8F5543]/20 shadow-xs'
                          : 'bg-white/60 border-[#E5DDD2] hover:bg-white hover:border-[#D6C7B7]'
                      }`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#2D2825]">{m.label}</p>
                          {isSelected && <Check className="w-4 h-4 text-[#8F5543] shrink-0" />}
                        </div>
                        <p className="text-xs text-[#7B6E62] mt-0.5">{m.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-[#2D2825] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#433B37] transition-all"
                >
                  <span>Next: Your Obsession</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A25F4B]">Step 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2825] mt-1 mb-2">
                What’s your everyday obsession?
              </h2>
              <p className="text-sm text-[#6B5E52] mb-6">
                Which corner of your daily life deserves a little more personality?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBSESSIONS.map((obs) => {
                  const isSelected = selectedObsession === obs.id;
                  return (
                    <button
                      key={obs.id}
                      onClick={() => setSelectedObsession(obs.id)}
                      className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-white border-[#8F5543] ring-2 ring-[#8F5543]/20 shadow-xs'
                          : 'bg-white/60 border-[#E5DDD2] hover:bg-white hover:border-[#D6C7B7]'
                      }`}
                    >
                      <span className="text-2xl">{obs.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#2D2825]">{obs.label}</p>
                          {isSelected && <Check className="w-4 h-4 text-[#8F5543] shrink-0" />}
                        </div>
                        <p className="text-xs text-[#7B6E62] mt-0.5">{obs.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7B6E62] hover:text-[#2D2825] font-medium"
                >
                  ← Back to Mood
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-[#2D2825] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#433B37] transition-all"
                >
                  <span>Next: Who’s This For?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A25F4B]">Step 3 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2825] mt-1 mb-2">
                Who are you shopping for?
              </h2>
              <p className="text-sm text-[#6B5E52] mb-6">
                Handmade crochet carries meaning best when intentional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REASONS.map((r) => {
                  const isSelected = selectedReason === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedReason(r.id)}
                      className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-white border-[#8F5543] ring-2 ring-[#8F5543]/20 shadow-xs'
                          : 'bg-white/60 border-[#E5DDD2] hover:bg-white hover:border-[#D6C7B7]'
                      }`}
                    >
                      <span className="text-2xl">{r.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#2D2825]">{r.label}</p>
                          {isSelected && <Check className="w-4 h-4 text-[#8F5543] shrink-0" />}
                        </div>
                        <p className="text-xs text-[#7B6E62] mt-0.5">{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#7B6E62] hover:text-[#2D2825] font-medium"
                >
                  ← Back to Obsession
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-[#9E5D49] hover:bg-[#864A38] text-white px-6 py-2.5 rounded-full text-xs font-medium shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal My Knot Match</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              {/* Knot Persona Badge */}
              <div className="inline-flex items-center gap-2 bg-[#F6ECE4] border border-[#E7D6C9] rounded-full px-3.5 py-1 text-xs font-semibold text-[#8C4E3C] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Personality Match</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#2D2825] mb-2">
                {result.knotName}
              </h2>
              <p className="text-sm text-[#665A4F] max-w-md mx-auto mb-8 font-serif italic">
                “{result.personaTagline}”
              </p>

              {/* Recommended Items */}
              <div className="text-left mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#935D4A] mb-3">
                  Creations that feel like you
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {result.matchedProducts.map((product) => {
                    const isAdded = addedItemIds.includes(product.id);
                    const wishlisted = isWishlisted(product.id);
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl p-3 border border-[#E8DFD3] flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F6F0E8] mb-2.5">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => onToggleWishlist(product.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#7D6B5E] hover:text-[#E06D67] transition-colors"
                              aria-label="Wishlist"
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  wishlisted ? 'fill-[#E06D67] text-[#E06D67]' : ''
                                }`}
                              />
                            </button>
                          </div>
                          <h4 className="text-xs font-semibold text-[#2D2825] line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#7B6E62] line-clamp-1 mt-0.5">
                            {product.personalitySubtitle}
                          </p>
                          <p className="text-xs font-bold text-[#2D2825] mt-1 tabular-nums">
                            ₹{product.price}
                          </p>
                        </div>

                        <button
                          onClick={() => handleQuickAdd(product)}
                          className={`mt-3 w-full py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                            isAdded
                              ? 'bg-[#E5F1E7] text-[#2F6739]'
                              : 'bg-[#2D2825] text-white hover:bg-[#433B37]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Knotted! ✓</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>I want this ♡</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EBE2D5]">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-[#7B6E62] hover:text-[#2D2825] font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FAF4ED] border border-[#DFCFC1] text-xs font-medium text-[#483E36] hover:bg-[#F2E6D8] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
