'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from './Ornaments';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const categories = [
    { id: "all", label: "All Photographs" },
    { id: "couple", label: "The Couple" },
    { id: "destination", label: "Heritage & Venues" },
    { id: "details", label: "Details & Heirloom" },
  ];

  const filteredPhotos = WEDDING_DATA.gallery.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  // Handle keyboard navigation in Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#F9F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Moments in Udaipur
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Editorial Photo Gallery
          </h2>
          <FloralDivider className="w-40 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            Capturing the quiet glances, palace splendors, and timeless memories leading to forever.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-[#FFFDF9] border border-gold/30 text-taupe-700 hover:border-gold hover:text-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold/30 shadow-luxury bg-[#FAF6F0] p-1.5"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Refined Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1C1816]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[9px] font-sans tracking-mega-lux uppercase text-[#E8DCB8]">
                      {photo.category}
                    </span>
                    <h4 className="font-serif text-lg font-normal tracking-wide text-[#FAF7EE] my-0.5">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-taupe-200 font-serif italic line-clamp-2">
                      {photo.caption}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase font-sans tracking-widest text-[#DFC49B]">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View High-Res</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1614]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(
                  (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                );
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-50"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(
                  (prev) => (prev + 1) % filteredPhotos.length
                );
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-50"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image & Caption Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#251F1C] border border-gold/30 rounded-sm overflow-hidden shadow-2xl p-3"
            >
              <div className="relative max-h-[68vh] overflow-hidden">
                <img
                  src={filteredPhotos[activePhotoIndex].image}
                  alt={filteredPhotos[activePhotoIndex].title}
                  className="max-h-[68vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Caption Bar */}
              <div className="w-full pt-4 pb-2 px-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 border-t border-gold/20 mt-2">
                <div>
                  <h4 className="font-serif text-lg text-white font-normal">
                    {filteredPhotos[activePhotoIndex].title}
                  </h4>
                  <p className="font-serif italic text-xs text-[#DFC49B]">
                    {filteredPhotos[activePhotoIndex].caption}
                  </p>
                </div>

                <span className="text-xs font-sans text-taupe-300 tracking-widest uppercase">
                  {activePhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
