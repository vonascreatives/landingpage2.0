import * as prismic from "@prismicio/client";

/**
 * Primary content in *HeroBanner* → *Default* Slice variation.
 */
export interface HeroBannerSliceDefaultPrimary {

  title: prismic.RichTextField;
  subtitle: prismic.RichTextField;
  button_text: prismic.KeyTextField;
  button_link: prismic.LinkField;
}

/**
 * Default variation for HeroBanner Slice
 */
export interface HeroBannerSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "hero_section";
  items: never[];
  primary: HeroBannerSliceDefaultPrimary;
}

export type HeroBannerSlice = HeroBannerSliceDefault;