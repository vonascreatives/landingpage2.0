import * as prismic from "@prismicio/client";

/**
 * Primary content in *ContactOne* → *Default* Slice variation.
 */
export interface ContactOneSliceDefaultPrimary {

  main_title?: prismic.KeyTextField;

  highlighted_title?: prismic.KeyTextField;

  description?: prismic.RichTextField;

  contact_link?: prismic.LinkField;

  button_text_line_1?: prismic.KeyTextField;

  button_text_line_2?: prismic.KeyTextField;

  background_color?: prismic.SelectField<"black" | "dark" | "custom">;

  show_default_icon?: prismic.BooleanField;

  custom_icon_image?: prismic.ImageField;

  custom_shape_svg?: prismic.BooleanField;
}

/**
 * Default variation for ContactOne Slice
 */
export interface ContactOneSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "contact_one";
  items: never[];
  primary: ContactOneSliceDefaultPrimary;
}

/**
 * Slice type for *ContactOne* Slices
 */
export type ContactOneSlice = ContactOneSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };