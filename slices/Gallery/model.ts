import * as prismic from "@prismicio/client";

/**
 * Item in *Gallery* → *Default* Slice variation.
 */
export interface GallerySliceDefaultItem {
 
  gallery_image: prismic.KeyTextField;

}

/**
 * Primary content in *Gallery* → *Default* Slice variation.
 */
export interface GallerySliceDefaultPrimary {
 
  section_title?: prismic.KeyTextField;
  
  repeatable_zone?: GallerySliceDefaultItem[];
}

/**
 * Default variation for Gallery Slice
 */
export interface GallerySliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "gallery";
  items: GallerySliceDefaultItem[];
  primary: GallerySliceDefaultPrimary;
}

export type GallerySlice = GallerySliceDefault;