import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#00224B',
        'cetascean-blue': '#001540',
        'dark-midnight-blue': '#00316E',
        'maastricht-blue': '#001B3A',
        'white-smoke': '#F5F5F5',
        'light-slate-gray': '#778899',
        'slate-gray': '#708090',
        gray: '#808080',
        'dark-slate-gray': '#2F4F4F',
        // Awards
        PLATINUM: '#E5E4E2',
        GOLD: '#FFD700',
        SILVER: '#C0C0C0',
        BRONZE: '#CD7F32',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};
export default config;
