# YouTubeTimeSearch

Search podcasts and YouTube by exact timestamp.

**Production URL:** [youtubetimesearch.com](https://youtubetimesearch.com)

## Custom domain (Vercel)

1. Open your Vercel project → **Settings** → **Domains**
2. Add `youtubetimesearch.com` and `www.youtubetimesearch.com`
3. Configure DNS at your registrar using the records Vercel provides
4. Set `ADMIN_PASSWORD` in **Environment Variables** for admin pages

## Local development

```bash
npm install
npm run ingest   # optional: build transcript index
npm run dev
```

Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD`.
