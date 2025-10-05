import * as prismic from "@prismicio/client";

/**
 * Item in *ServiceFour* → *Default* Slice variation.
 */
export interface ServiceFourSliceDefaultItem {

  service_title?: prismic.KeyTextField;

  service_description?: prismic.RichTextField;

  service_link?: prismic.LinkField;

  service_categories?: prismic.GroupField<Simplify<ServiceFourSliceDefaultItemServiceCategoriesItem>>;

  service_button_text?: prismic.KeyTextField;

  service_icon?: prismic.ImageField;
}

/**
 * Item in *ServiceFour* → *Default* Slice variation → *service_categories* Group.
 */
export interface ServiceFourSliceDefaultItemServiceCategoriesItem {

  category_name?: prismic.KeyTextField;
}

/**
 * Item in *ServiceFour* → *Default* Slice variation → *service_items* Group.
 */
export interface ServiceFourSliceDefaultPrimaryServiceItemsItem {

  service_title?: prismic.KeyTextField;

  service_description?: prismic.RichTextField;

  service_link?: prismic.LinkField;

  service_button_text?: prismic.KeyTextField;

  category_1?: prismic.KeyTextField;

  category_2?: prismic.KeyTextField;

  category_3?: prismic.KeyTextField;
}

/**
 * Primary content in *ServiceFour* → *Default* Slice variation.
 */
export interface ServiceFourSliceDefaultPrimary {

  section_subtitle?: prismic.KeyTextField;

  section_title?: prismic.RichTextField;

  service_icon?: prismic.ImageField;

  section_spacing?: prismic.SelectField<"default" | "large" | "compact">;

  layout_style?: prismic.SelectField<"default" | "compact" | "expanded">;

  show_icons?: prismic.BooleanField;

  service_items?: prismic.GroupField<Simplify<ServiceFourSliceDefaultPrimaryServiceItemsItem>>;
}

/**
 * Default variation for ServiceFour Slice
 */
export interface ServiceFourSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "service_four";
  items: ServiceFourSliceDefaultItem[];
  primary: ServiceFourSliceDefaultPrimary;
}

/**
 * Slice type for *ServiceFour* Slices
 */
export type ServiceFourSlice = ServiceFourSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };