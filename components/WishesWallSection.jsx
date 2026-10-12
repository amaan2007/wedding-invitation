'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageCircle, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from './Ornaments';

export default function WishesWallSection() {
  const [wishes, setWishes] = useState(WEDDING_DATA.initialWishes);
  const [likedMap, setLikedMap] = useState({});
  const [newAuthor, setNewAuthor] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    try {
      const savedWishes = localStorage.getItem('aria_kabir_wishes');
      if (savedWishes) {
        setWishes(JSON.parse(savedWishes));
      }
    } catch (e) {}
  }, []);

  const saveWishes = (updated) => {
    setWishes(updated);
    try {
      localStorage.setItem('aria_kabir_wishes', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleLike = (id) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));

    const updated = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, hearts: w.hearts + 1 };
      }
      return w;
    });
    saveWishes(updated);
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    const newEntry = {
      id: `w-${Date.now()}`,
      author: newAuthor.trim(),
      relationship: newRelation.trim() || 'Well-wisher & Friend',
      message: newMessage.trim(),
      date: 'Just Now',
      hearts: 1,
    };

    const updated = [newEntry, ...wishes];
    saveWishes(updated);
    setNewAuthor('');
    setNewRelation('');
    setNewMessage('');
    setFormOpen(false);
  };

  return (
    <section id="wishes" className="py-24 md:py-32 bg-[#FDFBF7] paper-texture relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Blessings &amp; Well Wishes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Words of Love
          </h2>
          <FloralDivider className="w-40 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            Warm wishes, heartfelt prayers, and timeless memories from family and friends.
          </p>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest bg-gold text-white hover:bg-gold-dark transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{formOpen ? "Close Form" : "Leave Your Blessings"}</span>
          </button>
        </div>

        {/* Wish Submission Form Modal / Drawer */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-14 overflow-hidden"
            >
              <form
                onSubmit={handleAddWish}
                className="bg-[#FFFDF9] border border-gold/40 p-6 sm:p-8 rounded-sm shadow-luxury space-y-4"
              >
                <h4 className="font-serif text-xl text-charcoal text-center mb-2">
                  Share Your Blessings for the Couple
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Relation (e.g. Groom's Cousin)"
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="Your heartfelt blessing or wish for Aria & Kabir... *"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                />

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest bg-gold text-white hover:bg-gold-dark transition-colors"
                  >
                    Post Blessing
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-[#FFFDF9] border border-gold/30 rounded-sm shadow-sm p-6 flex flex-col justify-between hover:border-gold/60 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-charcoal">
                      {item.author}
                    </h4>
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark">
                      {item.relationship}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans text-taupe-400">
                    {item.date}
                  </span>
                </div>

                {/* Message */}
                <p className="font-serif italic text-sm text-taupe-700 leading-relaxed font-light mb-4">
                  "{item.message}"
                </p>
              </div>

              {/* Footer Heart Button */}
              <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                <span className="text-[10px] font-sans text-taupe-400">
                  Udaipur Celebration
                </span>
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 text-xs font-sans transition-colors ${
                    likedMap[item.id] ? 'text-maroon font-medium' : 'text-taupe-500 hover:text-maroon'
                  }`}
                  aria-label="Send love to this blessing"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${likedMap[item.id] ? 'fill-maroon text-maroon' : ''}`}
                  />
                  <span>{item.hearts}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
