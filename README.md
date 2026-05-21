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
- `/en/advertise`
- `/pt`
- `/pt/about`
- `/pt/advertise`

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env.local` file from `.env.example` and set:

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

## Notes

- Homepage number-style stats are env-driven, so you can keep them intentionally approximate with values like `5M+` or `1.2B+`.
- YouTube subscribers, total views, and total published videos are fetched automatically when `YOUTUBE_API_KEY` plus the matching locale channel ID are set. Manual `HOMEPAGE_YOUTUBE`, `HOMEPAGE_TOTAL_VIEWS`, and `HOMEPAGE_YOUTUBE_VIDEOS` values override the automatic values.
- Private audience analytics such as age, gender, countries, retention, and watch time are intentionally not displayed until a proper YouTube Analytics OAuth flow is added.
- Sponsor copy, league coverage, and social links are stored in [`lib/site-content.ts`](./lib/site-content.ts).
- The sponsor inquiry endpoint is available at `/api/sponsor-inquiry`.
