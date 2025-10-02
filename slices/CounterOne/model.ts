import * as prismic from "@prismicio/client";

/**
 * Item in *CounterOne* → *Default* Slice variation.
 */
export interface CounterOneSliceDefaultItem {
 

  counter_value?: prismic.NumberField;

  counter_label?: prismic.KeyTextField;

  counter_suffix?: prismic.KeyTextField;

  counter_min_value?: prismic.NumberField;
}

/**
 * Primary content in *CounterOne* → *Default* Slice variation.
 */
export interface CounterOneSliceDefaultPrimary {

  enable_background_images?: prismic.BooleanField;

  custom_background_images?: prismic.GroupField<Simplify<CounterOneSliceDefaultPrimaryCustomBackgroundImagesItem>>;

  section_spacing?: prismic.SelectField<"default" | "large" | "compact">;

  background_style?: prismic.SelectField<"default" | "custom" | "none">;

  counter_items?: prismic.GroupField<Simplify<CounterOneSliceDefaultPrimaryCounterItemsItem>>;
}

/**
 * Item in *CounterOne* → *Default* Slice variation → *custom_background_images* Group.
 */
export interface CounterOneSliceDefaultPrimaryCustomBackgroundImagesItem {
 
  background_image?: prismic.ImageField;

  image_alt_text?: prismic.KeyTextField;
}

/**
 * Item in *CounterOne* → *Default* Slice variation → *counter_items* Group.
 */
export interface CounterOneSliceDefaultPrimaryCounterItemsItem {

  counter_value?: prismic.NumberField;

  counter_label?: prismic.KeyTextField;

  counter_suffix?: prismic.KeyTextField;

  counter_min_value?: prismic.NumberField;
}

/**
 * Default variation for CounterOne Slice
 */
export interface CounterOneSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "counter_one";
  items: CounterOneSliceDefaultItem[];
  primary: CounterOneSliceDefaultPrimary;
}

/**
 * Slice type for *CounterOne* Slices
 */
export type CounterOneSlice = CounterOneSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };