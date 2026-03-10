import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'numidex-yellow': '#fcbf11',
        'numidex-blue': '#183159',
        'primary': '#fcbf11', // Updated to Numidex yellow
        'background-light': '#f8f7f5',
        'background-dark': '#183159', // Updated to Numidex blue
        'navy-section': '#183159', // Updated to Numidex blue
        'navy-deep': '#183159', // Updated to Numidex blue
        'navy-card': '#1e293b',
        'navy-muted': '#162a4a',
        'navy-border': '#1e3a61',
        'neutral-dark': '#1e293b',
        'border-dark': '#334155',
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
