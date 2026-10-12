'use client';

import { motion } from 'framer-motion';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from './Ornaments';

export default function OurStorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-[#F9F6F0] relative overflow-hidden">
      {/* Subtle background ambient line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            How Forever Began
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Our Journey Together
          </h2>
          <FloralDivider className="w-36 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            "Every love story is beautiful, but ours is our favourite chapter."
          </p>
        </div>

        {/* Editorial Timeline Chapters */}
        <div className="space-y-24 md:space-y-36">
          {WEDDING_DATA.storyChapters.map((chapter, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Image Column */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative overflow-hidden rounded-sm border border-gold/30 shadow-luxury bg-[#FAF6F0] p-2">
                    <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden">
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Corner Accent Label */}
                  <div className="absolute -bottom-4 right-6 bg-[#FFFDF9] border border-gold/40 px-4 py-1.5 shadow-sm">
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-taupe-600">
                      {chapter.caption}
                    </span>
                  </div>
                </div>

                {/* Text Editorial Column */}
                <div className="w-full lg:w-1/2 text-left lg:px-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-serif text-4xl sm:text-5xl text-gold/40 font-light">
                      {chapter.number}
                    </span>
                    <div className="h-[1px] w-12 bg-gold/40" />
                    <span className="text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
                      {chapter.period}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal tracking-wide mb-5">
                    {chapter.title}
                  </h3>

                  <p className="font-serif text-base sm:text-lg text-taupe-700 leading-relaxed font-light mb-6">
                    {chapter.story}
                  </p>

                  <div className="h-[1px] w-24 bg-gradient-to-r from-gold/50 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
