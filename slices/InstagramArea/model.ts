import * as prismic from "@prismicio/client";

/**
 * Primary content in *InstagramArea* → *Default* Slice variation.
 */
export interface InstagramAreaSliceDefaultPrimary {
 
  instagram_username?: prismic.KeyTextField;

  instagram_link?: prismic.LinkField;

  section_title?: prismic.KeyTextField;

  description?: prismic.RichTextField;

  button_text?: prismic.KeyTextField;

  section_spacing?: prismic.SelectField<"default" | "large" | "compact">;

  show_background_images?: prismic.BooleanField;

  center_instagram_image?: prismic.KeyTextField;

  custom_instagram_images?: prismic.GroupField<Simplify<InstagramAreaSliceDefaultPrimaryCustomInstagramImagesItem>>;
}

/**
 * Item in *InstagramArea* → *Default* Slice variation → *custom_instagram_images* Group.
 */
export interface InstagramAreaSliceDefaultPrimaryCustomInstagramImagesItem {
 
  instagram_image?: prismic.KeyTextField;

}

/**
 * Default variation for InstagramArea Slice
 */
export interface InstagramAreaSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "instagram_area";
  items: never[];
  primary: InstagramAreaSliceDefaultPrimary;
}

/**
 * Slice type for *InstagramArea* Slices
 */
export type InstagramAreaSlice = InstagramAreaSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };