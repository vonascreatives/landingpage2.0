# Landing Page Slices Schema Documentation

## Overview
This document outlines the complete schema structure for all slices in the landing page application.

## Field Type References

### Prismic Field Types
- **RichTextField**: Rich text content with formatting
- **KeyTextField**: Simple text field (single line)
- **NumberField**: Numeric value field
- **LinkField**: Link to internal/external content
- **GroupField**: Repeating group of items
- **BooleanField**: True/false toggle field
- **SelectField**: Dropdown selection with predefined options

---

## 1. About Slice

### Slice Type: `about`

#### AboutSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_heading` | `RichTextField` | Main heading for the section | Yes |
| `section_subheading` | `RichTextField` | Subheading for the section | Yes |
| `about_description_field` | `RichTextField` | Main description content | Yes |
| `about_image` | `KeyTextField` | URL or reference to the main image | Yes |
| `shape_image` | `KeyTextField` | URL or reference to decorative shape image | Yes |
| `action_buttons` | `GroupField<ActionButtonsItem>` | Group of action buttons | Yes |
| `repetable_zone` | `GroupField<RepetableZoneItem>` | Group of statistics items | Yes |

#### AboutSliceDefaultPrimaryActionButtonsItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `button_text` | `KeyTextField` | Text displayed on the button | Yes |
| `button_link` | `LinkField` | URL or link destination for the button | Yes |

#### AboutSliceDefaultPrimaryRepetableZoneItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `statistic_number` | `NumberField` | Numeric value for the statistic | Yes |
| `statistic_label` | `KeyTextField` | Label describing the statistic | Yes |
| `statistic_suffix` | `KeyTextField` | Suffix to display after the number | Yes |

---

## 2. HeroBanner Slice

### Slice Type: `hero_section`

#### HeroBannerSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `title` | `RichTextField` | Main hero title | No |
| `subtitle` | `RichTextField` | Hero subtitle text | No |
| `button_text` | `KeyTextField` | Call-to-action button text | No |
| `button_link` | `LinkField` | Call-to-action button destination | No |

---

## 3. Gallery Slice

### Slice Type: `gallery`

#### GallerySliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_title` | `KeyTextField` | Title for the gallery section | Yes |
| `repeatable_zone` | `GallerySliceDefaultItem[]` | Array of gallery images | Yes |

#### GallerySliceDefaultItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `gallery_image` | `KeyTextField` | URL or reference to gallery image | No |

---

## 4. ServiceFour Slice

### Slice Type: `service_four`

#### ServiceFourSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_subtitle` | `KeyTextField` | Subtitle for the services section | Yes |
| `section_title` | `RichTextField` | Main title for the services section | Yes |
| `service_icon` | `KeyTextField` | Default service icon | Yes |
| `section_spacing` | `SelectField<"default" | "large" | "compact">` | Spacing style for the section | Yes |
| `layout_style` | `SelectField<"default" | "compact" | "expanded">` | Layout style for services | Yes |
| `show_icons` | `BooleanField` | Whether to show service icons | Yes |
| `service_items` | `GroupField<ServiceItemsItem>` | Group of service items | Yes |

#### ServiceFourSliceDefaultPrimaryServiceItemsItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `service_title` | `KeyTextField` | Title of the service | Yes |
| `service_description` | `RichTextField` | Description of the service | Yes |
| `service_link` | `LinkField` | Link to service details | Yes |
| `service_button_text` | `KeyTextField` | Text for service button | Yes |
| `category_1` | `KeyTextField` | First category tag | Yes |
| `category_2` | `KeyTextField` | Second category tag | Yes |
| `category_3` | `KeyTextField` | Third category tag | Yes |

#### ServiceFourSliceDefaultItem (Legacy)
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `service_title` | `KeyTextField` | Title of the service | Yes |
| `service_description` | `RichTextField` | Description of the service | Yes |
| `service_link` | `LinkField` | Link to service details | Yes |
| `service_categories` | `GroupField<ServiceCategoriesItem>` | Group of service categories | Yes |
| `service_button_text` | `KeyTextField` | Text for service button | Yes |
| `service_icon` | `KeyTextField` | Service icon | Yes |

#### ServiceFourSliceDefaultItemServiceCategoriesItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `category_name` | `KeyTextField` | Name of the category | Yes |

---

## 5. ProjectFour Slice

### Slice Type: `project_four`

#### ProjectFourSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_title` | `RichTextField` | Main title for projects section | Yes |
| `show_header` | `BooleanField` | Whether to show the section header | Yes |
| `view_all_projects_link` | `LinkField` | Link to view all projects | Yes |
| `view_all_button_text` | `KeyTextField` | Text for view all button | Yes |
| `style_variant` | `SelectField<"default" | "style_2">` | Visual style variant | Yes |
| `project_button_text` | `KeyTextField` | Default text for project buttons | Yes |
| `repeatable_items` | `GroupField<RepetableItemsItem>` | Group of project items | Yes |

#### ProjectFourSliceDefaultPrimaryRepetableItemsItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `project_image_1` | `KeyTextField` | First project image URL | Yes |
| `project_image_2` | `KeyTextField` | Second project image URL | Yes |
| `project_meta` | `KeyTextField` | Project metadata (category, date, etc.) | Yes |
| `project_title` | `KeyTextField` | Title of the project | Yes |
| `project_link` | `LinkField` | Link to project details | Yes |
| `ct_button_text` | `KeyTextField` | Call-to-action button text | Yes |

#### ProjectFourSliceDefaultItem (Legacy)
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `project_image_1` | `KeyTextField` | First project image URL | Yes |
| `project_image_2` | `KeyTextField` | Second project image URL | Yes |
| `project_meta` | `KeyTextField` | Project metadata | Yes |
| `project_title` | `KeyTextField` | Title of the project | Yes |
| `project_link` | `LinkField` | Link to project details | Yes |
| `project_button_text` | `KeyTextField` | Project button text | Yes |

---

## 6. CounterOne Slice

### Slice Type: `counter_one`

#### CounterOneSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `enable_background_images` | `BooleanField` | Whether to enable background images | Yes |
| `custom_background_images` | `GroupField<CustomBackgroundImagesItem>` | Group of background images | Yes |
| `section_spacing` | `SelectField<"default" | "large" | "compact">` | Spacing style for the section | Yes |
| `background_style` | `SelectField<"default" | "custom" | "none">` | Background style option | Yes |
| `counter_items` | `GroupField<CounterItemsItem>` | Group of counter items | Yes |

#### CounterOneSliceDefaultPrimaryCustomBackgroundImagesItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `background_image` | `KeyTextField` | URL to background image | Yes |
| `image_alt_text` | `KeyTextField` | Alt text for accessibility | Yes |

#### CounterOneSliceDefaultPrimaryCounterItemsItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `counter_value` | `NumberField` | Final counter value | Yes |
| `counter_label` | `KeyTextField` | Label for the counter | Yes |
| `counter_suffix` | `KeyTextField` | Suffix to display after number | Yes |
| `counter_min_value` | `NumberField` | Starting counter value | Yes |

#### CounterOneSliceDefaultItem (Legacy)
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `counter_value` | `NumberField` | Final counter value | Yes |
| `counter_label` | `KeyTextField` | Label for the counter | Yes |
| `counter_suffix` | `KeyTextField` | Suffix to display after number | Yes |
| `counter_min_value` | `NumberField` | Starting counter value | Yes |

---

## 7. InstagramArea Slice

### Slice Type: `instagram_area`

#### InstagramAreaSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `instagram_username` | `KeyTextField` | Instagram username without @ | Yes |
| `instagram_link` | `LinkField` | Link to Instagram profile | Yes |
| `section_title` | `KeyTextField` | Title for the Instagram section | Yes |
| `description` | `RichTextField` | Description text for the section | Yes |
| `button_text` | `KeyTextField` | Text for follow button | Yes |
| `section_spacing` | `SelectField<"default" | "large" | "compact">` | Spacing style for the section | Yes |
| `show_background_images` | `BooleanField` | Whether to show background images | Yes |
| `center_instagram_image` | `KeyTextField` | Center featured Instagram image | Yes |
| `custom_instagram_images` | `GroupField<CustomInstagramImagesItem>` | Group of Instagram images | Yes |

#### InstagramAreaSliceDefaultPrimaryCustomInstagramImagesItem
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `instagram_image` | `KeyTextField` | URL to Instagram image | Yes |

---

## 8. ContactOne Slice

### Slice Type: `contact_one`

#### ContactOneSliceDefaultPrimary
| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `main_title` | `KeyTextField` | Main contact section title | Yes |
| `highlighted_title` | `KeyTextField` | Highlighted portion of title | Yes |
| `description` | `RichTextField` | Contact section description | Yes |
| `contact_link` | `LinkField` | Contact link (email, phone, etc.) | Yes |
| `button_text_line_1` | `KeyTextField` | First line of button text | Yes |
| `button_text_line_2` | `KeyTextField` | Second line of button text | Yes |
| `background_color` | `SelectField<"black" | "dark" | "custom">` | Background color option | Yes |
| `show_default_icon` | `BooleanField` | Whether to show default icon | Yes |
| `custom_icon_image` | `KeyTextField` | Custom icon image URL | Yes |
| `custom_shape_svg` | `BooleanField` | Whether to use custom SVG shape | Yes |

---

## Common Slice Properties

All slices share these common properties:

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `variation` | `"default"` | Slice variation identifier | No |
| `version` | `"initial"` | Slice version | No |
| `slice_type` | `string` | Unique slice type identifier | No |
| `items` | `Array` | Array of slice items (varies by slice) | No |
| `primary` | `Object` | Primary content object | No |

---

## Usage Notes

- **Legacy Items**: Some slices have both `items` arrays and `primary` group fields. The `primary` group fields are the preferred modern approach.
- **Optional Fields**: Most fields are optional to allow flexible content management.
- **Select Fields**: Fields with predefined options ensure consistent styling and behavior.
- **Group Fields**: Allow for repeating content structures like lists of services, projects, or statistics.
- **Boolean Fields**: Enable/disable features within slices without removing content.

---

## Slice Type Summary

| Slice Name | Slice Type | Primary Use Case |
|------------|------------|------------------|
| About | `about` | Company information and statistics |
| HeroBanner | `hero_section` | Landing page hero section |
| Gallery | `gallery` | Image gallery display |
| ServiceFour | `service_four` | Services showcase with categories |
| ProjectFour | `project_four` | Portfolio/project showcase |
| CounterOne | `counter_one` | Animated statistics counters |
| InstagramArea | `instagram_area` | Instagram feed integration |
| ContactOne | `contact_one` | Contact section with CTA |
