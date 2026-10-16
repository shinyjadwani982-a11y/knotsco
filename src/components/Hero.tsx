import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenQuiz: () => void;
  onOpenCustomStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenQuiz, onOpenCustomStudio }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#8F5A47] tracking-wider uppercase mb-3">
              <span>Handmade Crochet &amp; Lifestyle</span>
              <span aria-hidden="true">·</span>
              <span className="font-script text-base normal-case text-[#7D4C3A]">made slowly ♡</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] font-display font-medium text-[#26211E] tracking-tight mb-5 text-balance">
              Give the ordinary a personality.
            </h1>

            {/* Supporting Copy from PRD */}
            <p className="text-base sm:text-lg text-[#5E5248] leading-relaxed mb-8 max-w-xl">
              Handmade little things for people who aren’t afraid to make everyday life a little more <em>them</em>. A flower that stays, a charm that speaks your mood, and gifts that say everything without saying a word.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 bg-[#2D2825] text-[#FAF7F2] hover:bg-[#433B37] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-xs transition-all hover:translate-x-0.5"
              >
                <span>Find Yours</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 bg-[#F3E7DC] text-[#6E4233] hover:bg-[#ECD9CB] border border-[#DFCFC1] px-5 py-3.5 rounded-full text-sm font-medium transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#B85D43]" />
                <span>What's Your Vibe? (Quiz)</span>
              </button>

              <button
                onClick={onOpenCustomStudio}
                className="text-xs text-[#6B5E52] hover:text-[#2D2825] underline underline-offset-4 font-medium transition-colors ml-1"
              >
                Make it yours →
              </button>
            </div>

            {/* Understated Editorial Values Row (No pills) */}
            <div className="pt-6 border-t border-[#E8DFD3] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs font-semibold text-[#2D2825] tracking-tight">100% Milk Cotton</p>
                <p className="text-[11px] text-[#786C60] mt-0.5">Soft, tactile yarn with zero itch</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2D2825] tracking-tight">Never Wilts</p>
                <p className="text-[11px] text-[#786C60] mt-0.5">Keepsakes that last for years</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2D2825] tracking-tight">Human Knotted</p>
                <p className="text-[11px] text-[#786C60] mt-0.5">Every tiny loop stitched by hand</p>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Lifestyle Editorial Image */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Soft decorative backdrop glow in warm butter cream */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#F7E5DB] via-[#FCEFE3] to-[#E9F0E9] rounded-3xl -rotate-1 opacity-70 filter blur-xs" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E4D9CC] shadow-md bg-[#FAF4ED] aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_crochet_lifestyle_1792146742852.jpg"
                  alt="Young woman walking with a canvas tote styled with Knots & Co daisy and strawberry crochet charms in the golden morning sun"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Quiet Floating Caption Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#E9E0D4] shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#A25F4B]">Spotted on Campus</span>
                    <span className="text-[#8C7A6B] text-[10px]">·</span>
                    <span className="text-[10px] text-[#8C7A6B]">Daisy &amp; Strawberry Charms</span>
                  </div>
                  <p className="text-xs text-[#3E352F] italic font-serif">
                    “Suddenly my plain canvas tote doesn’t look like everyone else’s.”
                  </p>
                </div>
              </div>

              {/* Hand-annotated sticky note badge */}
              <div className="hidden sm:flex absolute -top-4 -right-3 bg-[#FEF9E7] border border-[#EADBAC] rounded-xl px-3 py-2 shadow-xs rotate-3 items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[#B87A24]" />
                <span className="text-xs font-script text-[#6D4E12] font-semibold">
                  each piece has its own tiny story ♡
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
