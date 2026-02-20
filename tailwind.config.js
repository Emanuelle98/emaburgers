/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Kiddo custom colors
        'sky-blue': '#B7E9FF',
        'soft-pink': '#F7C5F0',
        'neon-yellow': '#FFEA00',
        'mustard': '#FFD34E',
        'tangerine': '#FF8A4C',
        'bubblegum': '#FF6FAF',
        'lime': '#C6E858',
        'lavender': '#CDBBFF',
        'near-black': '#141414',
        'dark-gray': '#2F2F2F',
      },
      borderRadius: {
        'kiddo': '28px',
        'kiddo-sm': '22px',
        'kiddo-xs': '18px',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        'kiddo': '0 14px 0 #141414, 0 18px 30px rgba(0,0,0,0.12)',
        'kiddo-sm': '0 6px 0 #141414',
        'kiddo-hover': '0 8px 0 #141414',
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      fontSize: {
        'hero': 'clamp(44px, 6vw, 84px)',
        'section': 'clamp(34px, 4.2vw, 56px)',
        'card-title': 'clamp(28px, 3vw, 42px)',
        'body': 'clamp(15px, 1.2vw, 18px)',
        'price': 'clamp(18px, 1.4vw, 22px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "slow-rotate": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "slow-rotate": "slow-rotate 4s ease-in-out infinite",
        "float": "float 3.5s ease-in-out infinite",
        "bounce-in": "bounce-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
