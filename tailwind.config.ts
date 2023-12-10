import type { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      rotate: {
        '0': '0deg',
        '90': '90deg',
        '180': '180deg',
        '270': '270deg',
      },
      colors: {
        "colourblue-600": "rgba(0, 115, 230, 1);",
        "colourgrey-0": "var(--colourgrey-0)",
        "colourgrey-100": "var(--colourgrey-100)",
        "colourgrey-200": "var(--colourgrey-200)",
        "colourgrey-300": "var(--colourgrey-300)",
        "colourgrey-400": "var(--colourgrey-400)",
        "colourgrey-500": "var(--colourgrey-500)",
        "colourgrey-700": "var(--colourgrey-700)",
        "colourgrey-900": "var(--colourgrey-900)",
        colourgreybackground: "var(--colourgreybackground)",
        "colourred-500": "var(--colourred-500)",
        "colourred-600": "var(--colourred-600)",
        "colourred-800": "var(--colourred-800)",
        "colouryellow-100": "var(--colouryellow-100)",
        "colouryellow-300": "var(--colouryellow-300)",
        "colouryellow-600": "var(--colouryellow-600)",
        "colouryellow-800": "var(--colouryellow-800)",
      },
      fontFamily: {
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        big: "var(--big)",
        "white-sm": "var(--white-sm)",
      },
    },
  },
  plugins: [],
}
export default config
