import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { HeroBannerSlice } from "./slices/HeroBanner/model";
import { GallerySlice } from "./slices/Gallery/model"; 
import { AboutSlice } from "./slices/About/model"; 
import { ProjectFourSlice } from "./slices/ProjectFour/model";
import { CounterOneSlice } from "./slices/CounterOne/model";
import { ServiceFourSlice } from "./slices/ServiceFour/model";
import { InstagramAreaSlice } from "./slices/InstagramArea/model";
import { ContactOneSlice } from "./slices/ContactOne/model";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "liko-landing";

// Define all your slices here
export type AllSlices = 
  | HeroBannerSlice 
  | GallerySlice 
  | AboutSlice 
  | ProjectFourSlice 
  | CounterOneSlice 
  | ServiceFourSlice
  | InstagramAreaSlice
  | ContactOneSlice;


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