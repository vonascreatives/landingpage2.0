# Brand Pages Guide

## Overview

This implementation allows you to publish multiple brand pages from the Prismic Migration Release, and each brand will be accessible via its own unique URL. All published brands are also listed on the homepage.

## How It Works

### 1. **Dynamic Brand Pages** (`/[uid].tsx`)
- Each brand page published from Prismic gets its own URL route
- URL format: `yoursite.com/brand-uid`
- Example: If you publish a brand with UID `singapourdrinks`, it will be accessible at `/singapourdrinks`

### 2. **Homepage Brand List**
- The homepage (`/`) displays your main content (hero, gallery, projects, etc.)
- At the bottom, it shows a list of ALL published brand pages
- Users can click on any brand card to navigate to that specific brand page

### 3. **Individual Brand Content**
- Each brand page shows its own unique content from Prismic
- Content includes: Hero section, Gallery, Projects, About section, etc.
- No content overwriting - each brand maintains its own data

## Workflow

### Publishing Multiple Brands

1. **Run Migration Script**
   - Your migration script generates multiple brand pages in Prismic
   - Each brand gets a unique UID (e.g., `brand-1`, `brand-2`, `singapourdrinks`, etc.)

2. **Publish in Prismic**
   - Go to Prismic Dashboard → Migration Release
   - Click on each generated brand page
   - Click "Publish" for each one

3. **Automatic URL Generation**
   - Next.js automatically creates routes for each published brand
   - Each brand is accessible at `yoursite.com/[brand-uid]`

4. **Homepage Updates**
   - The homepage automatically fetches all published brand pages
   - Displays them in a grid layout with clickable cards
   - Users can navigate to any brand page

## File Structure

```
src/
├── pages/
│   ├── index.tsx                 # Main homepage (lists all brands)
│   └── [uid].tsx                 # Dynamic brand page route
├── components/
│   ├── homepage-client.tsx       # Homepage component
│   ├── brand-page-client.tsx    # Individual brand page component
│   └── brand-list-section.tsx   # Brand list cards on homepage
└── lib/
    └── prismic-helpers.ts        # Helper functions for fetching data
```

## Key Features

### ✅ No Overwriting
- Each brand page has its own UID and content
- Publishing a new brand doesn't overwrite existing brands
- All brands coexist independently

### ✅ Automatic Discovery
- Homepage automatically finds all published brands
- No manual configuration needed
- New brands appear automatically when published

### ✅ SEO-Friendly URLs
- Each brand gets a clean, readable URL
- Format: `/brand-name` instead of query parameters
- Better for search engines and sharing

### ✅ Incremental Static Regeneration
- Pages are cached but refresh every 60 seconds
- New brands appear within 1 minute of publishing
- Fast loading for users

## Example URLs

### Homepage
```
https://yoursite.com/
```
Shows main content + list of all brand pages

### Individual Brand Pages
```
https://yoursite.com/singapourdrinks
https://yoursite.com/brand-1
https://yoursite.com/brand-2
https://yoursite.com/awesome-coffee-shop
```
Each shows specific brand content

## Customization

### Hiding the Brand List

If you don't want to show the brand list on the homepage, edit `src/components/homepage-client.tsx`:

```tsx
{/* Comment out or remove this section */}
{/* allPages && allPages.length > 0 && (
  <BrandListSection pages={allPages} />
) */}
```

### Styling Brand Cards

Edit `src/components/brand-list-section.tsx` to customize:
- Card layout
- Colors and fonts
- Hover effects
- Card content

### Changing Brand List Order

Edit `src/lib/prismic-helpers.ts` in the `getAllPublishedPages` function:

```typescript
orderings: [
  { field: "document.last_publication_date", direction: "desc" } // Latest first
  // OR
  { field: "document.first_publication_date", direction: "asc" } // Oldest first
  // OR
  { field: "my_custom_type.title", direction: "asc" } // Alphabetical
],
```

## Troubleshooting

### Brand page shows 404
- Make sure the page is **published** in Prismic (not just saved)
- Check that the UID matches the URL (case-sensitive)
- Wait up to 60 seconds for the page to be generated

### Brand not appearing on homepage list
- Verify the page type is "page" (not "homepage")
- Ensure the page is published
- Check browser console for any errors

### Content not updating
- Wait 60 seconds for revalidation
- Or restart the development server
- Clear browser cache

## Development vs Production

### Development (`npm run dev`)
- Pages generate on-demand when you visit them
- Changes reflect immediately after server restart

### Production (`npm run build && npm start`)
- All published brand pages are pre-generated at build time
- New pages appear within 60 seconds (ISR revalidation)
- Better performance for users

## Questions?

This setup allows unlimited brand pages without any overwriting. Each brand maintains its own content and URL, and users can discover all brands from the homepage.
