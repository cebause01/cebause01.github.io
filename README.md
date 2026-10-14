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
| `npm run deploy:aws` | Sync to S3 bucket & invalidate CloudFront cache |
| `npm run preview` | Preview production build |

## Structure

- `index.html` — Main portfolio landing page
- `src/` — React components & dome embed
- `dome/` — Interactive 3D dome experience
- `public/` — Static assets & resume
- `scripts/deploy-aws.sh` — S3 sync and CloudFront invalidation script
- `vercel.json` — Vercel deployment configuration

## Deployment

- **GitHub Pages**: Automatically serves root directory (`index.html`).
- **Vercel**: Configured via `vercel.json` (`outputDirectory: "."`) to serve root assets after running `npm run build`.
- **AWS (S3 REST + CloudFront OAC)**:
  - **Custom Domains:** `https://cebause.one` & `https://www.cebause.one`
  - **SSL/TLS Certificate:** AWS ACM (`arn:aws:acm:us-east-1:084362065057:certificate/dae5d50b-98d0-43f2-9cd4-eae7c9ab69ef`)
  - **S3 Bucket:** `cebause-site-my-084362065057` (`ap-southeast-5` Malaysia)
  - **Security:** Private bucket (Block Public Access: ON). Direct access is blocked (`403 Forbidden`).
  - **CloudFront OAC:** `cebause-oac` (`E1ZCR9MYQZS3A8`) using SigV4 signing.
  - **CloudFront Function:** `cebause-url-rewrite` (handles subfolder URL & index mapping).
  - **CloudFront Distribution ID:** `E1WS23SL7K4YBT`
  - **CloudFront Default Domain:** `https://d1h2htnb2ruakd.cloudfront.net`
  - **Deploy Command:** `npm run deploy:aws`


