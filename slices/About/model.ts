import * as prismic from "@prismicio/client";

/**
 * Item in *About* → *Default* Slice variation.
 */
export interface AboutSliceDefaultItem {

  stat_number?: prismic.NumberField;
  stat_label?: prismic.KeyTextField;
  stat_suffix?: prismic.KeyTextField;
}

/**
 * Primary content in *About* → *Default* Slice variation.
 */
export interface AboutSliceDefaultPrimary {


  section_heading?: prismic.RichTextField;

  section_subheading?: prismic.RichTextField;

  about_description_field?: prismic.RichTextField;

  about_image?: prismic.KeyTextField;

  shape_image?: prismic.KeyTextField;

  action_buttons?: prismic.GroupField<Simplify<AboutSliceDefaultPrimaryActionButtonsItem>>;

  repetable_zone?: prismic.GroupField<Simplify<AboutSliceDefaultPrimaryRepetableZoneItem>>;
}

/**
 * Item in *About* → *Default* Slice variation → *action_buttons* Group.
 */
export interface AboutSliceDefaultPrimaryActionButtonsItem {

  button_text?: prismic.KeyTextField;

  button_link?: prismic.LinkField;
}

/**
 * Item in *About* → *Default* Slice variation → *repetable_zone* Group.
 */
export interface AboutSliceDefaultPrimaryRepetableZoneItem {

  statistic_number?: prismic.NumberField;

  statistic_label?: prismic.KeyTextField;

  statistic_suffix?: prismic.KeyTextField;
}

/**
 * Default variation for About Slice
 */
export interface AboutSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "about";
  items: AboutSliceDefaultItem[];
  primary: AboutSliceDefaultPrimary;
}

/**
 * Slice type for *About* Slices
 */
export type AboutSlice = AboutSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };