# Zarif Haikal — Portfolio

Personal portfolio and project hub for **Zarif Haikal**, software developer.

Live at [cebause.one](https://cebause.one) · [cebause01.github.io](https://cebause01.github.io)

## Stack

- React, TypeScript
- Tailwind CSS
- Vite

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (`npm run build:dome`) |
| `npm run build:dome` | Build interactive dome experience |
| `npm run build:react-app` | Build React app |
| `npm run preview` | Preview production build |

## Structure

- `index.html` — Main portfolio landing page
- `src/` — React components & dome embed
- `dome/` — Interactive 3D dome experience
- `whatsapp/` — WhatsApp link redirect portal
- `public/` — Static assets & resume
- `vercel.json` — Vercel deployment configuration

## Deployment

- **GitHub Pages**: Automatically serves root directory (`index.html`).
- **Vercel**: Configured via `vercel.json` (`outputDirectory: "."`) to serve root assets after running `npm run build`.

