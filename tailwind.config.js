/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF7',
          100: '#FAF7EE',
          200: '#F4EEDE',
          300: '#EDE3CB',
          400: '#E4D5B4',
          500: '#D5BF96',
        },
        champagne: {
          50: '#FAF6F0',
          100: '#F5ECE0',
          200: '#EBDEC9',
          300: '#DDC9AC',
          400: '#CBB18B',
          500: '#B89A6B',
        },
        gold: {
          light: '#DFC49B',
          DEFAULT: '#C5A880',
          dark: '#9E7D4E',
          antique: '#B39264',
          subtle: '#E8DCB8',
        },
        sage: {
          50: '#F4F6F4',
          100: '#E6ECE5',
          200: '#CDD9CC',
          300: '#B0C2AF',
          400: '#8A9E88',
          500: '#6B8269',
          600: '#526750',
        },
        olive: {
          muted: '#8A8D7E',
          deep: '#4E5345',
        },
        taupe: {
          100: '#EFECE9',
          200: '#DDD8D3',
          300: '#C4BCB4',
          400: '#A4988E',
          500: '#84766A',
          600: '#64574D',
          700: '#4D423A',
        },
        maroon: {
          subtle: '#8C3542',
          DEFAULT: '#6B202D',
          deep: '#4E141E',
          accent: '#7D2332',
        },
        charcoal: {
          soft: '#4A423D',
          DEFAULT: '#2D2724',
          deep: '#1C1816',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'cursive'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      letterSpacing: {
        'widest-lux': '0.25em',
        'mega-lux': '0.35em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(77, 66, 58, 0.08)',
        'soft-glow': '0 0 25px rgba(197, 168, 128, 0.15)',
        'envelope': '0 30px 60px -12px rgba(45, 39, 36, 0.25)',
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(circle at 50% 50%, rgba(245, 236, 224, 0.4) 0%, rgba(253, 251, 247, 0) 100%)",
        'gold-shimmer': "linear-gradient(135deg, rgba(223, 196, 155, 0.2) 0%, rgba(197, 168, 128, 0.4) 50%, rgba(158, 125, 78, 0.2) 100%)",
      }
    },
  },
  plugins: [],
}
