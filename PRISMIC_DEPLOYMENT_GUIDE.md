# Prismic Deployment Guide - Fixing 404s for New Pages

<<<<<<< Updated upstream
=======
# Revalidation Commands 
curl "https://landingpage2-0.vercel.app/api/revalidate?secret=bPR8ZGjmmIXU5qI5Gwg2qRREJZEub3JQ9aJGo0CDj88=&uid=NEW_PAGE_UID_HERE"


>>>>>>> Stashed changes
## Problem
Newly created Prismic pages work locally but return 404 on Vercel deployment.

## Root Cause
Your deployment uses **Incremental Static Regeneration (ISR)** which:
- Pre-generates pages at build time
- New pages created AFTER deployment aren't in the build cache
- Pages should regenerate with `fallback: "blocking"` but this wasn't working reliably

## Solution Implemented

### 1. Pre-Generate All Pages at Build Time ✅

Modified [`/src/pages/[uid].tsx`](src/pages/[uid].tsx#L13-L43) to fetch all existing Prismic pages during the build process:

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const client = prismic.createClient(...);

  const response = await client.getAllByType("homepage");

  const paths = response
    .filter((doc) => doc.uid)
    .map((doc) => ({
      params: { uid: doc.uid as string },
    }));

  return {
    paths, // All existing pages pre-generated
    fallback: "blocking", // New pages generated on-demand
  };
};
```

**Benefits:**
- All existing pages are pre-generated at build time
- New pages still work via `fallback: "blocking"`
- Pages revalidate every 60 seconds

### 2. On-Demand Revalidation API (Optional) ✅

Created [`/src/pages/api/revalidate.ts`](src/pages/api/revalidate.ts) for manual revalidation:

**Usage:**
```bash
# After creating a new Prismic page, trigger revalidation:
curl "https://yoursite.com/api/revalidate?secret=YOUR_SECRET&uid=new-page-uid"
```

This forces Vercel to regenerate the specific page immediately.

## Deployment Steps

### 1. Update Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=airtable-pages
PRISMIC_ACCESS_TOKEN=MC5hUXhYWh...
REVALIDATE_SECRET=your-secret-token-here-change-this
```

**Important:** Generate a strong secret for `REVALIDATE_SECRET`:
```bash
openssl rand -base64 32
```

### 2. Deploy to Vercel

```bash
git add .
git commit -m "Fix: Pre-generate all Prismic pages at build time"
git push origin main
```

### 3. Test Your Existing Page

After deployment completes:
```
https://landingpage2-0.vercel.app/webzilla-singapore-pte-ltd-1765620983660
```

Should now work! ✅

### 4. For Future New Pages

**Option A - Wait for Auto-Revalidation:**
- Create new page in Prismic
- Wait 60 seconds (ISR revalidation interval)
- Visit the page URL - it will generate via `fallback: "blocking"`

**Option B - Trigger Manual Revalidation (Faster):**
```bash
curl "https://landingpage2-0.vercel.app/api/revalidate?secret=YOUR_SECRET&uid=new-page-uid"
```

**Option C - Redeploy:**
- Push any commit to trigger a new build
- All pages will be pre-generated fresh

## How It Works Now

### Build Time (Vercel Deployment)
1. Fetch ALL "homepage" type documents from Prismic
2. Pre-generate static HTML for each page
3. Store in Vercel's edge cache

### Runtime (User Visits Page)
1. **Existing page:** Serve from cache (instant)
2. **New page created <60s ago:** Generate on-demand via `fallback: "blocking"`
3. **Page older than 60s:** Revalidate and regenerate if content changed

### After Creating New Page
- **Manual revalidation:** Immediate (via API)
- **Auto-revalidation:** Up to 60 seconds
- **Next deployment:** Included in pre-generation

## Troubleshooting

### Page still returns 404
1. Verify environment variables in Vercel
2. Check Prismic document type is "homepage"
3. Check Vercel build logs for errors
4. Try manual revalidation via API

### Build fails during deployment
- Check Prismic API rate limits
- Verify `PRISMIC_ACCESS_TOKEN` is valid
- Check Vercel function logs

### Page works locally but not on Vercel
- Ensure `.env.local` variables match Vercel environment variables
- Check if Prismic repository name is correct

## Key Files

- [`/src/pages/[uid].tsx`](src/pages/[uid].tsx) - Dynamic route handler
- [`/src/pages/api/revalidate.ts`](src/pages/api/revalidate.ts) - Manual revalidation
- [`/src/lib/prismic-helpers.ts`](src/lib/prismic-helpers.ts) - Prismic helper functions
- [`/prismicio.ts`](prismicio.ts) - Prismic client config

## Additional Options

### Set Up Prismic Webhook (Advanced)

Configure Prismic to automatically trigger revalidation on publish:

1. In Prismic dashboard: Settings → Webhooks
2. Add webhook URL: `https://yoursite.com/api/revalidate?secret=YOUR_SECRET&uid={uid}`
3. Trigger on: Document published/unpublished

This automatically revalidates pages when you publish in Prismic!
