/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#767676",
        secondary: "#E94760",
        grey: "#B9B9B9",
        lightGrey: "#FAFAFA",
        darkGrey: "#E6E6E6",
        primaryGradientFrom: "#FE3462",
        primaryGradientVia: "#FF6946",
        primaryGradientTo: "#FF8737",
        pinkGradientFrom: "#EC525B75",
        pinkGradientVia: "#F48F4014",
        pinkGradientTo: "#F48F4000",
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(90deg, #FE2569 0%, #FD4C55 50%, #FF8636 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
