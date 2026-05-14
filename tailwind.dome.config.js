/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/dome-embed.tsx', './src/components/ui/domegallery.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
};
