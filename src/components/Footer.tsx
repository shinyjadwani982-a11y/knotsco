import React, { useState } from 'react';
import { Heart, Sparkles, Send, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenQuiz: () => void;
  onOpenCustomStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenQuiz,
  onOpenCustomStudio,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#F5EFE6] border-t border-[#E6DCD0] text-[#554A42]">
      {/* Top Newsletter / Warm Community Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#EAE0D3]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <span className="text-xs uppercase tracking-widest text-[#935D4A] font-semibold">
              The Knots Club
            </span>
            <h3 className="text-2xl font-serif font-medium text-[#26211E] mt-1">
              Drop knots, not spam ♡
            </h3>
            <p className="text-xs text-[#7A6C60] mt-1">
              Be the first to know about tiny seasonal drops, new yarn shades, and workshop stories.
            </p>
          </div>

          <div className="md:col-span-6">
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md ml-auto">
              <input
                type="email"
                required
                placeholder="your.email@aesthetic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-[#DDD3C6] rounded-xl px-4 py-2.5 text-xs text-[#2D2825] placeholder:text-[#A99A8E] focus:outline-none focus:border-[#8F5543]"
              />
              <button
                type="submit"
                className="bg-[#2D2825] hover:bg-[#433B37] text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Joined! ♡</span>
                  </>
                ) : (
                  <>
                    <span>Join Club</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Manifesto */}
          <div className="md:col-span-5">
            <span className="text-2xl font-serif font-medium text-[#26211E] tracking-tight">
              Knots &amp; Co.
            </span>
            <p className="mt-3 text-sm text-[#665A50] leading-relaxed max-w-sm">
              We take ordinary, familiar everyday objects and give them personality, emotion, and individuality through handmade crochet.
            </p>
            <p className="mt-4 text-xs font-serif italic text-[#8C5241]">
              Ordinary things. Personal meanings. Made by hand.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2825] mb-3">
              Explore
            </p>
            <ul className="space-y-2 text-xs text-[#6B5D51]">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-[#2D2825] transition-colors"
                >
                  All Creations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('personalities')}
                  className="hover:text-[#2D2825] transition-colors"
                >
                  Shop by Personality
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-[#2D2825] transition-colors"
                >
                  Personality Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomStudio}
                  className="hover:text-[#2D2825] transition-colors"
                >
                  Make It Yours
                </button>
              </li>
            </ul>
          </div>

          {/* Brand Philosophy */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2825] mb-3">
              About
            </p>
            <ul className="space-y-2 text-xs text-[#6B5D51]">
              <li>
                <button
                  onClick={() => onNavigateSection('our-story')}
                  className="hover:text-[#2D2825] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <span className="text-[#8C7A6B]">Artisan Collective</span>
              </li>
              <li>
                <span className="text-[#8C7A6B]">Slow Crafting Ethos</span>
              </li>
              <li>
                <span className="text-[#8C7A6B]">Yarn Care Guide</span>
              </li>
            </ul>
          </div>

          {/* Little Care Notes */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2825] mb-3">
              Handmade Promise
            </p>
            <div className="p-4 rounded-xl bg-white/60 border border-[#E8DFD3] text-xs text-[#6B5E52] space-y-1.5">
              <p>✨ 100% Combed milk-cotton</p>
              <p>🌸 Stems &amp; blooms that never wilt</p>
              <p>💌 Complimentary handwritten note</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#EAE0D3] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7B6D] gap-2">
          <p>© {new Date().getFullYear()} Knots &amp; Co. Studio. Hand-knotted with patience &amp; love.</p>
          <p className="font-script text-sm text-[#8C5847]">for things that deserve a little more personality ♡</p>
        </div>
      </div>
    </footer>
  );
};
