import { createClient, AllSlices } from "../../prismicio";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";

// Define the page document structure
export interface PageDocumentData {
  slices: AllSlices[];
  [key: string]: any;
}

export interface PrismicImage {
  url: string;
  alt?: string | null;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface HomepageDocumentData extends PageDocumentData {
  theme_settings_title?: string;
  theme_settings_icon?: string; // Changed from PrismicImage to string (URL)
}

export type PageDocument = prismic.PrismicDocumentWithUID<PageDocumentData, "page">;
export type HomepageDocument = prismic.PrismicDocumentWithoutUID<HomepageDocumentData, "homepage">;

/**
 * Fetches homepage data with slices from Prismic
 */
export async function getHomepageData(): Promise<HomepageDocument | null> {
  // Create client without routes to avoid link resolution errors
  const client = prismic.createClient(
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "airtable-pages",
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  try {
    const homepage = await client.getSingle("homepage");
    return homepage as HomepageDocument;
  } catch (error) {
    console.warn("Homepage not found in Prismic:", error);
    return null;
  }
}

/**
 * Fetches page data by UID with slices from Prismic
 */
export async function getPageData(uid: string): Promise<PageDocument | null> {
  // Create client without routes to avoid link resolution errors
  const client = prismic.createClient(
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "airtable-pages",
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  try {
    const page = await client.getByUID("page", uid);
    return page as PageDocument;
  } catch (error) {
    console.warn(`Page with UID "${uid}" not found in Prismic:`, error);
    return null;
  }
}

/**
 * Fetches homepage data with error handling for pages
 */
export async function getHomepageDataOrNotFound(): Promise<HomepageDocument> {
  const client = createClient();
  
  try {
    const homepage = await client.getSingle("homepage");
    return homepage as HomepageDocument;
  } catch (error) {
    console.error("Homepage not found:", error);
    notFound();
  }
}

/**
 * Fetches page data by UID with error handling
 */
export async function getPageDataOrNotFound(uid: string): Promise<PageDocument> {
  const client = createClient();
  
  try {
    const page = await client.getByUID("page", uid);
    return page as PageDocument;
  } catch (error) {
    console.error(`Page with UID "${uid}" not found:`, error);
    notFound();
  }
}


/**
 * Fetches ALL published brand/page documents from Prismic
 * This allows displaying multiple brand pages as a list
 * NOTE: All brand pages are actually type "homepage" with different UIDs
 */
export async function getAllPublishedPages(): Promise<any[]> {
  // Create client without routes to avoid link resolution errors
  const client = prismic.createClient(
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "airtable-pages",
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  try {
    // Fetch all documents
    const response = await client.get();

    // Filter to only include homepage documents that have UIDs (brand pages)
    // All brand pages are type "homepage" with UIDs
    const brandPages = response.results.filter((doc: any) =>
      doc.type === "homepage" && doc.uid
    );

    // Sort by last publication date
    brandPages.sort((a: any, b: any) => {
      const dateA = new Date(a.last_publication_date).getTime();
      const dateB = new Date(b.last_publication_date).getTime();
      return dateB - dateA;
    });

    return brandPages;
  } catch (error) {
    console.warn("Could not fetch published pages:", error);
    return [];
  }
}

export async function getHeroBannerData() {
  const homepage = await getHomepageData();

  if (!homepage?.data.slices) return null;

  // Find the hero banner slice
  const heroBannerSlice = homepage.data.slices.find(
    slice => slice.slice_type === "hero_section"
  );

  return heroBannerSlice?.primary || null;
}