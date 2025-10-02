import * as prismic from "@prismicio/client";

/**
 * Item in *ProjectFour* → *Default* Slice variation.
 */
export interface ProjectFourSliceDefaultItem {

  project_image_1?: prismic.ImageField;

  project_image_2?: prismic.ImageField;

  project_meta?: prismic.KeyTextField;

  project_title?: prismic.KeyTextField;

  project_link?: prismic.LinkField;

  project_button_text?: prismic.KeyTextField;
}

/**
 * Primary content in *ProjectFour* → *Default* Slice variation.
 */
export interface ProjectFourSliceDefaultPrimary {

  section_title?: prismic.RichTextField;

  show_header?: prismic.BooleanField;

  view_all_projects_link?: prismic.LinkField;

  view_all_button_text?: prismic.KeyTextField;

  style_variant?: prismic.SelectField<"default" | "style_2">;

  repeatable_items?: prismic.GroupField<Simplify<ProjectFourSliceDefaultPrimaryRepetableItemsItem>>;
}

/**
 * Item in *ProjectFour* → *Default* Slice variation → *repeatable_items* Group.
 */
export interface ProjectFourSliceDefaultPrimaryRepetableItemsItem {

  project_image_1?: prismic.ImageField;

  project_image_2?: prismic.ImageField;

  project_meta?: prismic.KeyTextField;

  project_title?: prismic.KeyTextField;

  project_link?: prismic.LinkField;

  ct_button_text?: prismic.KeyTextField;
}

/**
 * Default variation for ProjectFour Slice
 */
export interface ProjectFourSliceDefault {
  variation: "default";
  version: "initial";
  slice_type: "project_four";
  items: ProjectFourSliceDefaultItem[];
  primary: ProjectFourSliceDefaultPrimary;
}

/**
 * Slice type for *ProjectFour* Slices
 */
export type ProjectFourSlice = ProjectFourSliceDefault;

// Helper type for TypeScript
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };