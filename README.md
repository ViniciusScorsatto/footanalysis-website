# FootAnalysys Website

Bilingual marketing website for the FootAnalysys football media brand, built with Next.js for Railway deployment.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Railway-ready Node deployment
- Resend email API for sponsor inquiries

## Routes

- `/en`
- `/en/about`
- `/pt`
- `/pt/about`

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env.local` file from `.env.example` and set:

- `SITE_URL` (optional): canonical origin, defaults to `https://footanalysis.io`. Use the public domain without a path. `NEXT_PUBLIC_SITE_URL` is supported as a legacy fallback.
- `RESEND_API_KEY`
- `SPONSOR_TO_EMAIL`
- `SPONSOR_FROM_EMAIL`
- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID_EN`
- `YOUTUBE_CHANNEL_ID_PT`
- `HOMEPAGE_TOTAL_VIEWS`
- `HOMEPAGE_TOTAL_FOLLOWERS`
- `HOMEPAGE_TOTAL_LIKES`
- `HOMEPAGE_TOTAL_SHARES`
- `HOMEPAGE_INSTAGRAM`
- `HOMEPAGE_TIKTOK`
- `HOMEPAGE_YOUTUBE`
- `HOMEPAGE_YOUTUBE_VIDEOS`

## SEO verification

- Titles, descriptions, canonical URLs and reciprocal language links are defined in `lib/seo.ts`.
- The Organization and WebSite JSON-LD identifies FootAnalysis, its logo and official social profiles.
- `/sitemap.xml` lists the four canonical content pages. Modification dates are omitted because build dates do not reflect editorial updates.
- `/robots.txt` points to the canonical sitemap; `/` permanently redirects to `/pt`.
- After deployment, verify the domain in Google Search Console, submit `https://footanalysis.io/sitemap.xml` and inspect the four URLs. This requires access to the Search Console property or the domain's verification settings.
- With the app running, use `npm run test:seo` to check the rendered HTML, sitemap, redirects and removed route. To inspect deployment: `npm run test:seo -- https://footanalysis.io`.

## Content and analytics

- Homepage number-style stats are env-driven, so you can keep them intentionally approximate with values like `5M+` or `1.2B+`.
- YouTube subscribers, total views, and total published videos are fetched automatically when `YOUTUBE_API_KEY` plus the matching locale channel ID are set. Manual `HOMEPAGE_YOUTUBE`, `HOMEPAGE_TOTAL_VIEWS`, and `HOMEPAGE_YOUTUBE_VIDEOS` values override the automatic values.
- Private audience analytics such as age, gender, countries, retention, and watch time are intentionally not displayed until a proper YouTube Analytics OAuth flow is added.
- Sponsor copy, league coverage, and social links are stored in [`lib/site-content.ts`](./lib/site-content.ts).
- The sponsor inquiry endpoint is available at `/api/sponsor-inquiry`.
