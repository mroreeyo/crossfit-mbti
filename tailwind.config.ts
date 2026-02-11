import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          pink: '#FF1493',
          blue: '#00D4FF',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#1a1a2e',
          lighter: '#16213e',
        },
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px var(--neon-green), 0 0 20px var(--neon-green)',
          },
          '50%': {
            boxShadow: '0 0 20px var(--neon-green), 0 0 30px var(--neon-green)',
          },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
