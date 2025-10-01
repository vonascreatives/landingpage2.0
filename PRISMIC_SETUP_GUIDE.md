# Prismic CMS Setup Guide with Slices for Hero Banner Section

This guide provides complete instructions to integrate Prismic CMS using **Slices** with your Hero Banner component for maximum flexibility and reusability.

## Why Slices?

✨ **Modular Content**: Create reusable content blocks  
✨ **Flexible Layouts**: Mix and match different sections  
✨ **Better Content Management**: Drag & drop interface in Prismic  
✨ **Scalable**: Easy to add more slice types later  

## Prerequisites

1. **Prismic Account**: Create an account at [prismic.io](https://prismic.io)
2. **Prismic Repository**: Create a new repository in your Prismic dashboard

## Step 1: Install Dependencies

```bash
npm install @prismicio/client @prismicio/next @prismicio/types
```

## Step 2: Environment Setup

1. **Update your `.env.local` file**:
```env
# Replace 'your-repo-name' with your actual Prismic repository name
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token
```

2. **Get your repository name**: Found in your Prismic dashboard URL (e.g., `https://your-repo-name.prismic.io`)

3. **Get your access token** (if needed):
   - Go to Settings > API & Security in your Prismic dashboard
   - Generate a new access token if your repository is private

## Step 3: Prismic Configuration

The following files have been created for you:

### `prismicio.ts` (Root level)
- Configures Prismic client with slice support
- Handles routing for pages and homepage
- Manages environment variables

### `src/lib/prismic-helpers.ts`
- Helper functions to fetch page data with slices
- Support for both homepage and regular pages
- Error handling for missing content

### `src/components/SliceZone.tsx`
- Renders all slices dynamically
- Maps slice types to components
- Extensible for adding more slices

## Step 4: Create Slice and Custom Types in Prismic Dashboard

### A. Create Hero Banner Slice
1. **Go to your Prismic dashboard**
2. **Navigate to "Slices"** in the left sidebar
3. **Click "Create slice"** button
4. **Choose "Shared Slice"** (allows reuse across different custom types)
5. **Name it "HeroBanner"** with API ID `hero_banner`
6. **In the slice builder, add these fields to the "Non-repeatable" section**:
   
   **📝 Title Field:**
   - Drag **Rich Text** field to the builder
   - Field name: `title`
   - Label: "Title"
   - Placeholder: "Enter the hero title..."
   - In formatting options, enable: Heading 1, Heading 2, Heading 3, Strong, Emphasis
   
   **📝 Subtitle Field:**
   - Drag **Rich Text** field to the builder
   - Field name: `subtitle`
   - Label: "Subtitle"
   - Placeholder: "Enter the hero subtitle..."
   - In formatting options, enable: Paragraph, Strong, Emphasis
   
   **📝 Button Text Field:**
   - Drag **Key Text** field to the builder
   - Field name: `button_text`
   - Label: "Button Text"
   - Placeholder: "Enter button text..."
   
   **📝 Button Link Field:**
   - Drag **Link** field to the builder
   - Field name: `button_link`
   - Label: "Button Link"
   - Placeholder: "Select a link..."
   - Enable "Allow Target Blank"

7. **Click "Save slice"**

### B. Create Homepage Custom Type
1. **Navigate to "Custom Types"** in the left sidebar
2. **Click "Create custom type"** button
3. **Choose "Single"** (since there's only one homepage)
4. **Name it "Homepage"** with API ID `homepage`
5. **In the custom type builder**:
   - Drag **Slice Zone** field to the "Main" tab
   - Field name: `slices`
   - Label: "Slice Zone"
   - **Click "Add slice choice"** and select "HeroBanner" from the dropdown
6. **Click "Save type"**

### C. Create Page Custom Type (Optional - for other pages)
1. **Click "Create custom type"** button again
2. **Choose "Repeatable"** (for multiple pages)
3. **Name it "Page"** with API ID `page`
4. **In the custom type builder**:
   - Drag **Slice Zone** field to the "Main" tab
   - Field name: `slices`
   - Label: "Slice Zone"
   - **Click "Add slice choice"** and select "HeroBanner" from the dropdown
5. **Click "Save type"**

> **💡 Pro Tip**: You can add more slice choices to the Slice Zone later as you create more slices (testimonials, features, etc.)



## Step 5: Slice Component Architecture

The slice-based system includes:

### `slices/HeroBanner/index.tsx`
- React component that renders the hero banner slice
- Accepts slice data as props
- Maintains original styling and animations
- Provides fallback content

### `slices/HeroBanner/model.ts`
- TypeScript types for the slice structure
- Ensures type safety for slice data

### `slices/HeroBanner/index.json`
- Prismic slice schema definition
- Defines the structure of slice fields

## Step 6: Usage in Pages

### Homepage with SliceZone (Recommended)
```tsx
import { Suspense } from "react";
import SliceZone from "../components/SliceZone";
import { getHomepageData } from "../lib/prismic-helpers";

export default async function HomePage() {
  const homepageData = await getHomepageData();
  
  return (
    <main>
      {homepageData?.data.slices && (
        <SliceZone slices={homepageData.data.slices} />
      )}
    </main>
  );
}
```

### With Loading States
```tsx
import { Suspense } from "react";
// See complete example in src/app/slice-homepage/page.tsx
```

### Individual Slice Usage
```tsx
import HeroBanner from "../slices/HeroBanner";

// Use specific slice data
<HeroBanner slice={sliceData} />
```

## Step 7: Content Management Workflow

### A. Create Homepage Document
1. **Go to your Prismic dashboard**
2. **Navigate to "Documents"**
3. **Create a new "Homepage" document**
4. **Add content in the Slice Zone**:
   - Click "Add Slice"
   - Select "HeroBanner"
   - Fill in the slice content:
     - Title: "Transform Your Workflow with AI-Powered Templates"
     - Subtitle: "Beautiful AI Images for Social Media & Webshops" 
     - Button Text: "Get Started Now"
     - Button Link: Select internal page or enter external URL
5. **Click "Save" then "Publish"**

### B. Add More Slices (Future)
- Create additional slices for other sections (testimonials, features, etc.)
- Add them to the same page by clicking "Add Slice"
- Reorder slices by dragging and dropping

## Step 8: Testing

1. **Start your development server**:
```bash
npm run dev
```

2. **Visit your page** with the hero banner component
3. **Verify** that content loads from Prismic
4. **Test fallback** by temporarily making your repository private or changing the repo name

## File Structure Created

```
your-project/
├── .env.local                           # Environment variables
├── prismicio.ts                        # Prismic configuration with slices
├── slices/
│   └── HeroBanner/
│       ├── model.ts                    # TypeScript slice types
│       └── index.tsx                   # Slice component
├── src/
│   ├── lib/
│   │   └── prismic-helpers.ts         # Data fetching for pages/slices
│   ├── components/
│   │   └── SliceZone.tsx              # Slice renderer
│   └── app/
│       └── slice-homepage/
│           └── page.tsx               # Example slice-based page
```

## Benefits of Slice-based Architecture

✅ **Modular Content**: Create reusable content blocks across pages  
✅ **Visual Editor**: Drag & drop interface in Prismic dashboard  
✅ **Flexible Layouts**: Mix different sections on any page  
✅ **Type Safety**: Full TypeScript support for all slices  
✅ **Scalable**: Easy to add new slice types (testimonials, features, etc.)  
✅ **Performance**: Optimized caching and loading  
✅ **Developer Experience**: Component-based architecture  
✅ **Content Freedom**: Content creators can build pages independently  

## Next Steps

1. **Create your Prismic repository**
2. **Update environment variables**
3. **Create slice and custom types manually** (follow Step 4 instructions above):
   - Create HeroBanner shared slice
   - Create Homepage custom type with slice zone
   - Create Page custom type (optional)
4. **Create your first homepage document with hero banner slice**
5. **Replace your existing pages** with the slice-powered version

## Adding More Slices (Future Enhancement)

To add new sections (e.g., testimonials, features):

1. **Create new slice directory**: `slices/NewSlice/`
2. **Add slice component**: `slices/NewSlice/index.tsx`
3. **Add slice types**: `slices/NewSlice/model.ts`
4. **Create slice in Prismic dashboard**: Follow the manual slice creation process
5. **Update SliceZone**: Add new slice to component mapping
6. **Update Prismic config**: Add slice to `AllSlices` type

## Troubleshooting

### Common Issues:

1. **"Repository not found"**: Check your repository name in `.env.local`
2. **"Document not found"**: Ensure you've created and published a homepage document with slices
3. **"Slice not found"**: Make sure you've created the HeroBanner slice and added it to your custom type's slice zone choices
4. **TypeScript errors**: Run `npm run build` to check for type issues
5. **Content not updating**: Check Prismic dashboard for published changes
6. **Slice not rendering**: Verify the slice type matches exactly in your SliceZone component mapping

### Manual Setup Tips:

- **Field naming**: Make sure field names match exactly what's in your TypeScript types (`title`, `subtitle`, `button_text`, `button_link`)
- **API IDs**: Use lowercase with underscores (e.g., `hero_banner`, `button_text`)
- **Slice Zone setup**: Don't forget to add the HeroBanner slice as a choice in your slice zone
- **Publishing**: Always click "Save" then "Publish" your documents

### Support Resources:

- [Prismic Documentation](https://prismic.io/docs)
- [Next.js with Prismic Guide](https://prismic.io/docs/nextjs)
- [Prismic Slice Builder Guide](https://prismic.io/docs/slice-builder)

## Migrating from Single Custom Type to Slices

If you previously used a single custom type approach:

1. **Keep existing data**: Your current hero banner data remains
2. **Create slice version**: Follow this guide to set up slices
3. **Gradually migrate**: Move content to slice-based pages
4. **Update components**: Replace direct component usage with SliceZone
5. **Remove old types**: Clean up old custom types once migration is complete

---

**Need help?** Check the example implementations:
- `src/app/slice-homepage/page.tsx` - Complete slice-based homepage
- `slices/HeroBanner/index.tsx` - Hero banner slice component
- `src/components/SliceZone.tsx` - Slice rendering system