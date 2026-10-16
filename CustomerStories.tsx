import React from 'react';
import { Star, Heart } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerStories: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF4ED] border-t border-[#EAE0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#935D4A] font-semibold">
            Real Experiences
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-medium text-[#26211E] tracking-tight text-balance">
            Things people are knotting about.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B5E52]">
            Little moments of joy shared by people who gave their everyday items a personality.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#E7DFD3] shadow-2xs hover:border-[#D6C6B5] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Highlight Quote */}
                {rev.highlight && (
                  <p className="text-xs font-semibold text-[#8C4E3C] uppercase tracking-wider mb-2">
                    “{rev.highlight}”
                  </p>
                )}

                {/* Stars */}
                <div className="flex items-center gap-1 text-[#F4B251] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#554A42] leading-relaxed italic font-serif">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author & Item */}
              <div className="mt-6 pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#2D2825]">{rev.author}</p>
                  <p className="text-[10px] text-[#8C7A6B] mt-0.5">{rev.productName}</p>
                </div>
                <span className="text-[10px] text-[#8C7A6B]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
