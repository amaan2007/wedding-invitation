const fs = require('fs');

const css = fs.readFileSync('all-css.css', 'utf8');

const prefix = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&family=Italianno&family=Tangerine:wght@700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

`;

const customExpanded = `
/* ============================================================
   EXPANDED CARD AND CREATIVE ENHANCEMENTS (USER DIRECTIVE)
   ============================================================ */

/* Expanded Hero Card */
.hero-card {
  max-width: 680px !important;
  padding: clamp(2rem, 5vw, 3.2rem) clamp(2rem, 6vw, 3.5rem) !important;
  box-shadow: 0 30px 70px -15px rgba(138, 79, 76, 0.22), 0 0 0 1px rgba(212, 175, 55, 0.4) inset !important;
  border-radius: 2.2rem !important;
}

/* Expanded Event Cards */
.event-invite-frame {
  max-width: 500px !important;
  max-height: min(88vh, 740px) !important;
  box-shadow: 0 25px 60px -15px rgba(138, 79, 76, 0.25) !important;
  border-radius: 1.25rem !important;
}

/* Expanded Venue Card */
.venue-card {
  max-width: 660px !important;
  margin: 0 auto !important;
}

/* Expanded RSVP Form */
.rsvp-form {
  max-width: 660px !important;
  margin: 0 auto !important;
}

/* Expanded Scratch Cards */
.scratch-grid {
  gap: 1.8rem !important;
  justify-content: center !important;
}

.scratch-item {
  width: 140px !important;
}

.scratch-card-wrapper {
  width: 140px !important;
  height: 180px !important;
  border-radius: 1rem !important;
}

.scratch-canvas {
  width: 140px !important;
  height: 180px !important;
  border-radius: 1rem !important;
}

.scratch-value {
  font-size: 2.3rem !important;
}

/* Shimmer Effect for Couple Names */
@keyframes shimmerGold {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer-gold {
  background: linear-gradient(90deg, #8a4f4c 0%, #d4af37 40%, #f7efc8 50%, #d4af37 60%, #8a4f4c 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shimmerGold 5s linear infinite;
}
`;

const finalCss = prefix + css + customExpanded;
fs.writeFileSync('app/globals.css', finalCss);
console.log('Wrote app/globals.css successfully (length:', finalCss.length, ')');
