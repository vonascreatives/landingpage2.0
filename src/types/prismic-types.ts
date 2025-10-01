// Hero Banner Types for Prismic
import * as prismic from "@prismicio/client";

export interface HeroBannerDocumentData {
  title?: prismic.RichTextField;
  subtitle?: prismic.RichTextField;
  button_text?: prismic.KeyTextField;
  button_link?: prismic.LinkField;
  [key: string]: any; 
}

export type HeroBannerDocument = prismic.PrismicDocumentWithoutUID<HeroBannerDocumentData>;

// Slice Types for Hero Banner
export interface HeroBannerSlice {
  primary: {
    title: prismic.RichTextField;
    subtitle: prismic.RichTextField;
    button_text: prismic.KeyTextField;
    button_link: prismic.LinkField;
  };
  slice_type: "hero_banner";
}

// Utility type
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };