import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { HeroBannerSlice } from "./slices/HeroBanner/model";
import { GallerySlice } from "./slices/Gallery/model"; 
import { AboutSlice } from "./slices/About/model"; 

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "liko-landing";

// Define all your slices here
export type AllSlices = HeroBannerSlice | GallerySlice | AboutSlice;


const routes: prismic.ClientConfig["routes"] = [
  {
    type: "page",
    path: "/:uid",
  },
  {
    type: "homepage", 
    path: "/",
  },
];

/**
 * Creates a Prismic client for the current repository.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  // Only enable auto previews if not in build time
  if (typeof window !== 'undefined') {
    try {
      prismicNext.enableAutoPreviews({ client });
    } catch (error) {
      console.warn('Could not enable auto previews:', error);
    }
  }

  return client;
};