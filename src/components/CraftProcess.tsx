import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

interface CraftProcessProps {
  onOpenCustomStudio: () => void;
}

export const CraftProcess: React.FC<CraftProcessProps> = ({ onOpenCustomStudio }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: High Fidelity Process Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6DDD0] shadow-md bg-[#FAF4ED] aspect-[4/3]">
              <img
                src="/src/assets/images/regenerated_image_1792149856407.png"
                alt="Artisan hands crocheting a floral piece with soft pastel yarn and wooden hook"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#2D2825] px-3.5 py-1.5 rounded-lg border border-[#EAE0D3] shadow-2xs text-[11px] font-script">
                *every single stitch looped by hand ♡*
              </div>
            </div>

            {/* Subtle Floating Editorial Tag */}
            <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-[#FEFAF5] border border-[#E9DECF] rounded-2xl p-4 shadow-sm max-w-xs">
              <HeartHandshake className="w-5 h-5 text-[#9E5D49] shrink-0 mt-0.5" />
              <div className="ml-3">
                <p className="text-xs font-semibold text-[#2D2825]">Human Hands, Zero Automation</p>
                <p className="text-[11px] text-[#786C60] mt-0.5">
                  Over 1,200 delicate loops per daisy bouquet.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Craft Story & Philosophy */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-[#935D4A] font-semibold">
              The Handmade Process
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-medium text-[#26211E] tracking-tight text-balance">
              You can see the stitches. That’s the point.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#5E5248] leading-relaxed">
              <p>
                No conveyor belt. No factory laser cut. No two pieces that are sterile or perfectly identical.
              </p>
              <p>
                Just milk-cotton yarn, patient hours, gentle hands, and a whole lot of tiny knots. When you look closely at a Knots &amp; Co. daisy or strawberry charm, you can see where one thread met another.
              </p>
              <p className="font-serif italic text-[#7D4938]">
                “Because in a world overflowing with mass-produced carbon copies, something that someone actually sat down and made for you feels like a quiet rebellion.”
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="mt-8 pt-6 border-t border-[#EAE0D3] grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="text-xs font-bold text-[#2D2825]">Slow-Spun Cotton</p>
                <p className="text-[11px] text-[#7A6C60] mt-1">Hypoallergenic milk-cotton with zero itch or fuzzing.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#2D2825]">Pliable Inner Core</p>
                <p className="text-[11px] text-[#7A6C60] mt-1">Stems bend into any vase; charms never lose shape.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#2D2825]">Fair Maker Wages</p>
                <p className="text-[11px] text-[#7A6C60] mt-1">Crafted by independent women artisans with respect.</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenCustomStudio}
                className="inline-flex items-center gap-2 bg-[#2D2825] text-white px-5 py-3 rounded-full text-xs font-medium hover:bg-[#433B37] transition-all"
              >
                <span>Make Something Yours →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
