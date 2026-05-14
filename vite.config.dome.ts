import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: fileURLToPath(new URL('./tailwind.dome.config.js', import.meta.url)) }),
        autoprefixer(),
      ],
    },
  },
  build: {
    outDir: 'dome',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/dome-embed.tsx', import.meta.url)),
      name: 'DomeSkillsEmbed',
      formats: ['iife'],
      fileName: () => 'dome-skills.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: 'dome-skills.css',
      },
    },
  },
});
