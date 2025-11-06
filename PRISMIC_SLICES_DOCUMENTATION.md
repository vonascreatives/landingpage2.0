# 📚 Prismic Slices - Complete Documentation

## 🎯 Overview

This document provides comprehensive documentation for all Prismic slices used in the Next.js landing page project. Each slice is fully integrated with TypeScript and follows Prismic best practices.

**Project**: Landing Page 2.0
**CMS**: Prismic
**Framework**: Next.js 14.2.3
**Language**: TypeScript

### 📚 Related Documentation
- **[schema.md](schema.md)**: TypeScript interface definitions and field type references for all slices
- **PRISMIC_SLICES_DOCUMENTATION.md** (this file): Complete Prismic configuration guide with examples and setup instructions

**Note**: All TypeScript types mentioned in this document (e.g., `KeyTextField`, `RichTextField`, `GroupField`) are defined in schema.md.

### ⚠️ Important: Image Field Configuration
**All image fields in this project use `Text` type (KeyTextField), NOT `Image` type.**
- Images are stored as URL strings (e.g., "https://example.com/images/photo.jpg")
- No Prismic Image field types are used in any slice
- This approach provides flexibility for external image hosting and CDN integration

---

## 📋 Table of Contents

## 🎨 Theme Settings Component
**Non-Slice Component**: [Theme Settings](#theme-settings-component)

## 🏠 Homepage Custom Type Fields
1. [Theme Settings Title](#theme-settings-title) - Text Field
2. [Theme Settings Icon](#theme-settings-icon) - Image Field (HEIGHT AND WIDTH MUST BE 500 TO MATCH SETTINGS DEFAULT ICON SIZE)

## 🔧 Prismic Slices
1. [HeroBanner Slice](#1-herobanner-slice)
2. [Gallery Slice](#2-gallery-slice)
3. [About Slice](#3-about-slice)
4. [ProjectFour Slice](#4-projectfour-slice)
5. [CounterOne Slice](#5-counterone-slice)
6. [ServiceFour Slice](#6-servicefour-slice)
7. [InstagramArea Slice](#7-instagramarea-slice)
8. [ContactOne Slice](#8-contactone-slice)

---

## 🎨 Theme Settings Component

### 📝 Description
A client-side theme switcher component that allows users to toggle between light and dark modes. This component fetches its content (title and icon) directly from Prismic homepage fields and is rendered outside the slice zone.

### 🔧 Implementation Details
- **Component Type**: Non-slice, standalone component
- **Client-Side**: Uses `'use client'` directive for theme switching
- **Data Fetching**: Direct Prismic API calls via `useEffect`
- **Location**: Rendered after SliceZone on homepage

### 📊 Required Homepage Fields

#### Theme Settings Title
- **Field Name**: `theme_settings_title`
- **Type**: `KeyTextField` (Text)
- **Description**: Title displayed in theme settings component
- **Optional**: Yes

```json
{
  "theme_settings_title": {
    "type": "Text",
    "config": {
      "label": "Theme Settings Title",
      "placeholder": "Theme Settings"
    }
  }
}
```

#### Theme Settings Icon
- **Field Name**: `theme_settings_icon`
- **Type**: `KeyTextField` (Text)
- **Description**: Custom icon for theme settings - URL to image (500×500px recommended)
- **Optional**: Yes

```json
{
  "theme_settings_icon": {
    "type": "Text",
    "config": {
      "label": "Theme Settings Icon",
      "placeholder": "Enter image URL (500x500px recommended)"
    }
  }
}
```

### 💡 Example Content
- **Theme Settings Title**: "Vonas Settings"
- **Theme Settings Icon**: "https://example.com/images/settings-icon.svg" (500×500px recommended)

### 🎨 Features
- **Dynamic Content**: Title and icon pulled from Prismic
- **Theme Toggle**: Light/Dark mode switching with next-themes
- **Custom Icon**: Supports custom image upload or falls back to FontAwesome gear icon
- **Responsive Design**: 24×24px icon display with CSS animations
- **Accessibility**: Proper alt text and ARIA labels
- **Animation**: Spinning gear animation via CSS

---

## 1. HeroBanner Slice

### 📝 Description
The main hero section that appears at the top of the homepage with title, subtitle, and call-to-action button.

### 🔧 Slice Type
`hero_section`

### 📊 Schema Configuration

#### Primary Fields (No Items Section)

**Interface**: `HeroBannerSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `title` | `RichTextField` | Main hero title | No |
| `subtitle` | `RichTextField` | Hero subtitle text | No |
| `button_text` | `KeyTextField` | Call-to-action button text | No |
| `button_link` | `LinkField` | Call-to-action button destination | No |

```json
{
  "title": {
    "type": "StructuredText",
    "config": {
      "label": "Title",
      "placeholder": "Enter hero title",
      "allowTargetBlank": true,
      "multi": "paragraph,strong,em,heading1,heading2,heading3"
    }
  },
  "subtitle": {
    "type": "StructuredText",
    "config": {
      "label": "Subtitle",
      "placeholder": "Enter hero subtitle",
      "allowTargetBlank": true,
      "multi": "paragraph,strong,em"
    }
  },
  "button_text": {
    "type": "Text",
    "config": {
      "label": "Button Text",
      "placeholder": "Get Started"
    }
  },
  "button_link": {
    "type": "Link",
    "config": {
      "label": "Button Link",
      "placeholder": "/contact"
    }
  }
}
```

### 💡 Example Content

- **Title**: "Creative Digital Agency"
- **Subtitle**: "We transform ideas into digital experiences"
- **Button Text**: "Get Started"
- **Button Link**: "/contact"

### 🎨 Features

- Rich text formatting for title and subtitle
- Customizable button text and link
- Responsive design
- SEO optimized
- TypeScript interface: `HeroBannerSliceDefaultPrimary`

---

## 2. Gallery Slice

### 📝 Description
A gallery section displaying multiple images in a responsive grid layout.

### 🔧 Slice Type
`gallery`

### 📊 Schema Configuration

#### Primary Fields

**Interface**: `GallerySliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_title` | `KeyTextField` | Title for the gallery section | Yes |
| `repeatable_zone` | `GroupField<GallerySliceDefaultItem>` | Group of gallery images | Yes |

```json
{
  "section_title": {
    "type": "Text",
    "config": {
      "label": "Section Title",
      "placeholder": "Gallery"
    }
  },
  "repeatable_zone": {
    "type": "Group",
    "config": {
      "label": "Gallery Images",
      "fields": {
        "gallery_image": {
          "type": "Text",
          "config": {
            "label": "Gallery Image",
            "placeholder": "Enter image URL (800x600px recommended)"
          }
        }
      }
    }
  }
}
```

#### Items Section (Repeatable)

**Interface**: `GallerySliceDefaultItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `gallery_image` | `KeyTextField` | URL or reference to gallery image | No |

```json
{
  "gallery_image": {
    "type": "Text",
    "config": {
      "label": "Gallery Image",
      "placeholder": "Enter image URL (800x600px recommended)"
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Section Title**: "Our Portfolio"

**Items:** (Add multiple)
- **Gallery Image**: "https://example.com/images/gallery-1.jpg" (800×600px recommended)

### 🎨 Features

- Multiple images support via Items section
- Additional repeatable zone in Primary
- Responsive grid layout
- Image optimization
- TypeScript interface: `GallerySliceDefaultItem`

---

## 3. About Slice

### 📝 Description
An about section with description, image, statistics, and action buttons. Features both Items section and Primary Group fields.

### 🔧 Slice Type
`about`

### 📊 Schema Configuration

#### Primary Fields

**Interface**: `AboutSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_heading` | `RichTextField` | Main heading for the section | Yes |
| `section_subheading` | `RichTextField` | Subheading for the section | Yes |
| `about_description_field` | `RichTextField` | Main description content | Yes |
| `about_image` | `KeyTextField` | URL or reference to the main image | Yes |
| `shape_image` | `KeyTextField` | URL or reference to decorative shape image | Yes |
| `action_buttons` | `GroupField<ActionButtonsItem>` | Group of action buttons | Yes |
| `repetable_zone` | `GroupField<RepetableZoneItem>` | Group of statistics items | Yes |

##### Action Buttons Group Item
**Interface**: `AboutSliceDefaultPrimaryActionButtonsItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `button_text` | `KeyTextField` | Text displayed on the button | Yes |
| `button_link` | `LinkField` | URL or link destination for the button | Yes |

##### Statistics Group Item (Primary)
**Interface**: `AboutSliceDefaultPrimaryRepetableZoneItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `statistic_number` | `NumberField` | Numeric value for the statistic | Yes |
| `statistic_label` | `KeyTextField` | Label describing the statistic | Yes |
| `statistic_suffix` | `KeyTextField` | Suffix to display after the number | Yes |

```json
{
  "section_heading": {
    "type": "StructuredText",
    "config": {
      "label": "Section Heading",
      "placeholder": "About Us",
      "single": "heading2,heading3"
    }
  },
  "section_subheading": {
    "type": "StructuredText",
    "config": {
      "label": "Section Subheading",
      "placeholder": "Who We Are",
      "single": "paragraph"
    }
  },
  "about_description_field": {
    "type": "StructuredText",
    "config": {
      "label": "About Description",
      "placeholder": "Tell your story...",
      "multi": "paragraph,strong,em,hyperlink"
    }
  },
  "about_image": {
    "type": "Text",
    "config": {
      "label": "About Image",
      "placeholder": "Enter image URL (600x600px recommended)"
    }
  },
  "shape_image": {
    "type": "Text",
    "config": {
      "label": "Shape Image",
      "placeholder": "Enter image URL (400x400px recommended)"
    }
  },
  "action_buttons": {
    "type": "Group",
    "config": {
      "label": "Action Buttons",
      "fields": {
        "button_text": {
          "type": "Text",
          "config": {
            "label": "Button Text",
            "placeholder": "Learn More"
          }
        },
        "button_link": {
          "type": "Link",
          "config": {
            "label": "Button Link",
            "placeholder": "/about"
          }
        }
      }
    }
  },
  "repetable_zone": {
    "type": "Group",
    "config": {
      "label": "Statistics (Primary)",
      "fields": {
        "statistic_number": {
          "type": "Number",
          "config": {
            "label": "Statistic Number",
            "placeholder": "100"
          }
        },
        "statistic_label": {
          "type": "Text",
          "config": {
            "label": "Statistic Label",
            "placeholder": "Projects Completed"
          }
        },
        "statistic_suffix": {
          "type": "Text",
          "config": {
            "label": "Statistic Suffix",
            "placeholder": "+"
          }
        }
      }
    }
  }
}
```

#### Items Section (Repeatable)

**Note**: The About slice does not use the Items section according to schema.md. All repeatable content is managed through Primary Groups (`action_buttons` and `repetable_zone`).

```json
{
  "stat_number": {
    "type": "Number",
    "config": {
      "label": "Statistic Number",
      "placeholder": "150"
    }
  },
  "stat_label": {
    "type": "Text",
    "config": {
      "label": "Statistic Label",
      "placeholder": "Happy Clients"
    }
  },
  "stat_suffix": {
    "type": "Text",
    "config": {
      "label": "Statistic Suffix",
      "placeholder": "+"
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Section Heading**: "About Our Agency"
- **Section Subheading**: "Creative Excellence"
- **About Description**: "We are a team of passionate creators..."
- **About Image**: "https://example.com/images/about-us.jpg" (600×600px recommended)
- **Shape Image**: "https://example.com/images/shape-decoration.svg" (400×400px) - Falls back to default if not provided

**Action Buttons Group:** (Add 1-2)
- **Button Text**: "Learn More"
- **Button Link**: "/about"

**Statistics Group (Primary):** (Add 3-4)
- **Statistic Number**: 150
- **Statistic Label**: "Projects Completed"
- **Statistic Suffix**: "+"

**Items Section:** (Add 3-4 statistics)
- **Stat Number**: 150
- **Stat Label**: "Happy Clients"
- **Stat Suffix**: "+"

### 🎨 Features

- Rich text formatting
- Image with lazy loading
- **Custom shape image** with fallback to default
- Animated statistics counters (dual sources)
- Multiple action buttons
- Responsive layout
- TypeScript interfaces: `AboutSliceDefaultPrimary`, `AboutSliceDefaultItem`

### ⚠️ Important Notes
- **Dual Statistics**: Statistics can be added via both Primary Groups and Items section
- **Shape Image Fallback**: If no custom shape image is uploaded, displays default shape from `/public/assets/img/home-03/about/ab-shape-img.png`
- **Complex Schema**: This slice has the most complex field structure

---

## 4. ProjectFour Slice

### 📝 Description
A project showcase section displaying portfolio items with images, titles, and meta information.

### 🔧 Slice Type
`project_four`

### 📊 Schema Configuration

#### Primary Fields

**Interface**: `ProjectFourSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_title` | `RichTextField` | Main title for projects section | Yes |
| `show_header` | `BooleanField` | Whether to show the section header | Yes |
| `view_all_projects_link` | `LinkField` | Link to view all projects | Yes |
| `view_all_button_text` | `KeyTextField` | Text for view all button | Yes |
| `style_variant` | `SelectField<"default" \| "style_2">` | Visual style variant | Yes |
| `project_button_text` | `KeyTextField` | Default text for project buttons | Yes |
| `repeatable_items` | `GroupField<RepetableItemsItem>` | Group of project items | Yes |

##### Project Items Group
**Interface**: `ProjectFourSliceDefaultPrimaryRepetableItemsItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `project_image_1` | `KeyTextField` | First project image URL | Yes |
| `project_image_2` | `KeyTextField` | Second project image URL | Yes |
| `project_meta` | `KeyTextField` | Project metadata (category, date, etc.) | Yes |
| `project_title` | `KeyTextField` | Title of the project | Yes |
| `project_link` | `LinkField` | Link to project details | Yes |
| `ct_button_text` | `KeyTextField` | Call-to-action button text | Yes |

```json
{
  "section_title": {
    "type": "StructuredText",
    "config": {
      "label": "Section Title",
      "placeholder": "Our Projects",
      "single": "heading2"
    }
  },
  "show_header": {
    "type": "Boolean",
    "config": {
      "label": "Show Header",
      "default_value": true
    }
  },
  "view_all_projects_link": {
    "type": "Link",
    "config": {
      "label": "View All Projects Link",
      "placeholder": "/portfolio"
    }
  },
  "view_all_button_text": {
    "type": "Text",
    "config": {
      "label": "View All Button Text",
      "placeholder": "View All Projects"
    }
  },
  "style_variant": {
    "type": "Select",
    "config": {
      "label": "Style Variant",
      "options": ["default", "style_2"],
      "default_value": "default"
    }
  },
  "repeatable_items": {
    "type": "Group",
    "config": {
      "label": "Project Items",
      "fields": {
        "project_image_1": {
          "type": "Text",
          "config": {
            "label": "Project Image 1",
            "placeholder": "Enter image URL (800x600px recommended)"
          }
        },
        "project_image_2": {
          "type": "Text",
          "config": {
            "label": "Project Image 2",
            "placeholder": "Enter image URL (800x600px recommended)"
          }
        },
        "project_meta": {
          "type": "Text",
          "config": {
            "label": "Project Meta",
            "placeholder": "Web Design"
          }
        },
        "project_title": {
          "type": "Text",
          "config": {
            "label": "Project Title",
            "placeholder": "Creative Portfolio"
          }
        },
        "project_link": {
          "type": "Link",
          "config": {
            "label": "Project Link",
            "placeholder": "/portfolio/project-1"
          }
        },
        "ct_button_text": {
          "type": "Text",
          "config": {
            "label": "Button Text",
            "placeholder": "View Project"
          }
        }
      }
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Section Title**: "Featured Projects"
- **Show Header**: `true`
- **View All Projects Link**: "/portfolio"
- **View All Button Text**: "View All Projects"
- **Style Variant**: "default"

**Project Items Group:** (Add 3-6)
- **Project Image 1**: "https://example.com/images/project-main.jpg" (800×600px recommended)
- **Project Image 2**: "https://example.com/images/project-secondary.jpg" (800×600px recommended)
- **Project Meta**: "Branding"
- **Project Title**: "Creative Agency Website"
- **Project Link**: "/portfolio/creative-agency"
- **Button Text**: "View Case Study"

### 🎨 Features

- Dual image display per project
- Customizable meta information
- Toggle-able header section
- Multiple style variants
- Hover animations
- Responsive grid layout

---

## 5. CounterOne Slice

### 📝 Description
An animated counter section displaying statistics with optional background images.

### 🔧 Slice Type
`counter_one`

### 📊 Schema Configuration

#### Primary Fields

**Interface**: `CounterOneSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `enable_background_images` | `BooleanField` | Whether to enable background images | Yes |
| `section_spacing` | `SelectField<"default" \| "large" \| "compact">` | Spacing style for the section | Yes |
| `background_style` | `SelectField<"default" \| "custom" \| "none">` | Background style option | Yes |
| `custom_background_images` | `GroupField<CustomBackgroundImagesItem>` | Group of background images | Yes |
| `counter_items` | `GroupField<CounterItemsItem>` | Group of counter items | Yes |

##### Custom Background Images Group
**Interface**: `CounterOneSliceDefaultPrimaryCustomBackgroundImagesItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `background_image` | `KeyTextField` | URL to background image | Yes |
| `image_alt_text` | `KeyTextField` | Alt text for accessibility | Yes |

##### Counter Items Group
**Interface**: `CounterOneSliceDefaultPrimaryCounterItemsItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `counter_value` | `NumberField` | Final counter value | Yes |
| `counter_label` | `KeyTextField` | Label for the counter | Yes |
| `counter_suffix` | `KeyTextField` | Suffix to display after number | Yes |
| `counter_min_value` | `NumberField` | Starting counter value | Yes |

```json
{
  "enable_background_images": {
    "type": "Boolean",
    "config": {
      "label": "Enable Background Images",
      "default_value": true
    }
  },
  "section_spacing": {
    "type": "Select",
    "config": {
      "label": "Section Spacing",
      "options": ["default", "large", "compact"],
      "default_value": "default"
    }
  },
  "background_style": {
    "type": "Select",
    "config": {
      "label": "Background Style",
      "options": ["default", "custom", "none"],
      "default_value": "default"
    }
  },
  "custom_background_images": {
    "type": "Group",
    "config": {
      "label": "Custom Background Images",
      "fields": {
        "background_image": {
          "type": "Text",
          "config": {
            "label": "Background Image",
            "placeholder": "Enter image URL (200x200px recommended)"
          }
        },
        "image_alt_text": {
          "type": "Text",
          "config": {
            "label": "Image Alt Text",
            "placeholder": "Background decoration"
          }
        }
      }
    }
  },
  "counter_items": {
    "type": "Group",
    "config": {
      "label": "Counter Items",
      "fields": {
        "counter_value": {
          "type": "Number",
          "config": {
            "label": "Counter Value",
            "placeholder": "100"
          }
        },
        "counter_label": {
          "type": "Text",
          "config": {
            "label": "Counter Label",
            "placeholder": "Happy Clients"
          }
        },
        "counter_suffix": {
          "type": "Text",
          "config": {
            "label": "Counter Suffix",
            "placeholder": "+"
          }
        },
        "counter_min_value": {
          "type": "Number",
          "config": {
            "label": "Counter Min Value",
            "placeholder": "0"
          }
        }
      }
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Enable Background Images**: `true`
- **Section Spacing**: "default"
- **Background Style**: "default"

**Custom Background Images Group:** (Add 5-7 for best effect)
- **Background Image**: "https://example.com/images/bg-decoration-1.png" (200×200px recommended)
- **Image Alt Text**: "Background decoration"

**Counter Items Group:** (Add 3-4)
- **Counter Value**: 150
- **Counter Label**: "Projects Completed"
- **Counter Suffix**: "+"
- **Counter Min Value**: 0

### 🎨 Features

- Animated counting effect
- Custom background images
- Flexible spacing options
- Multiple layout styles
- Scroll-triggered animations
- Responsive design

---

## 6. ServiceFour Slice

### 📝 Description
A services showcase section with categorized service items. Features complex schema with both Items and Primary Groups.

### 🔧 Slice Type
`service_four`

### 📊 Schema Configuration

#### Primary Fields

**Interface**: `ServiceFourSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `section_subtitle` | `KeyTextField` | Subtitle for the services section | Yes |
| `section_title` | `RichTextField` | Main title for the services section | Yes |
| `service_icon` | `KeyTextField` | Default service icon | Yes |
| `section_spacing` | `SelectField<"default" \| "large" \| "compact">` | Spacing style for the section | Yes |
| `layout_style` | `SelectField<"default" \| "compact" \| "expanded">` | Layout style for services | Yes |
| `show_icons` | `BooleanField` | Whether to show service icons | Yes |
| `service_items` | `GroupField<ServiceItemsItem>` | Group of service items | Yes |

##### Service Items Group (Primary)
**Interface**: `ServiceFourSliceDefaultPrimaryServiceItemsItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `service_title` | `KeyTextField` | Title of the service | Yes |
| `service_description` | `RichTextField` | Description of the service | Yes |
| `service_link` | `LinkField` | Link to service details | Yes |
| `service_button_text` | `KeyTextField` | Text for service button | Yes |
| `category_1` | `KeyTextField` | First category tag | Yes |
| `category_2` | `KeyTextField` | Second category tag | Yes |
| `category_3` | `KeyTextField` | Third category tag | Yes |

```json
{
  "section_subtitle": {
    "type": "Text",
    "config": {
      "label": "Section Subtitle",
      "placeholder": "What We Do"
    }
  },
  "section_title": {
    "type": "StructuredText",
    "config": {
      "label": "Section Title",
      "placeholder": "Our Services",
      "single": "heading2"
    }
  },
  "service_icon": {
    "type": "Text",
    "config": {
      "label": "Service Icon (Global)",
      "placeholder": "Enter icon URL (100x100px recommended)"
    }
  },
  "section_spacing": {
    "type": "Select",
    "config": {
      "label": "Section Spacing",
      "options": ["default", "large", "compact"],
      "default_value": "default"
    }
  },
  "layout_style": {
    "type": "Select",
    "config": {
      "label": "Layout Style",
      "options": ["default", "compact", "expanded"],
      "default_value": "default"
    }
  },
  "show_icons": {
    "type": "Boolean",
    "config": {
      "label": "Show Icons",
      "default_value": true
    }
  },
  "service_items": {
    "type": "Group",
    "config": {
      "label": "Service Items (Primary)",
      "fields": {
        "service_title": {
          "type": "Text",
          "config": {
            "label": "Service Title",
            "placeholder": "Web Design"
          }
        },
        "service_description": {
          "type": "StructuredText",
          "config": {
            "label": "Service Description",
            "placeholder": "Create stunning websites...",
            "single": "paragraph"
          }
        },
        "service_link": {
          "type": "Link",
          "config": {
            "label": "Service Link",
            "placeholder": "/services/web-design"
          }
        },
        "service_button_text": {
          "type": "Text",
          "config": {
            "label": "Service Button Text",
            "placeholder": "Learn More"
          }
        },
        "category_1": {
          "type": "Text",
          "config": {
            "label": "Category 1",
            "placeholder": "Design"
          }
        },
        "category_2": {
          "type": "Text",
          "config": {
            "label": "Category 2",
            "placeholder": "Development"
          }
        },
        "category_3": {
          "type": "Text",
          "config": {
            "label": "Category 3",
            "placeholder": "Marketing"
          }
        }
      }
    }
  }
}
```

#### Items Section (Repeatable) - Legacy Support

**Interface**: `ServiceFourSliceDefaultItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `service_title` | `KeyTextField` | Title of the service | Yes |
| `service_description` | `RichTextField` | Description of the service | Yes |
| `service_link` | `LinkField` | Link to service details | Yes |
| `service_categories` | `GroupField<ServiceCategoriesItem>` | Group of service categories | Yes |
| `service_button_text` | `KeyTextField` | Text for service button | Yes |
| `service_icon` | `KeyTextField` | Service icon | Yes |

##### Service Categories Group (within Items)
**Interface**: `ServiceFourSliceDefaultItemServiceCategoriesItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `category_name` | `KeyTextField` | Name of the category | Yes |

```json
{
  "service_title": {
    "type": "Text",
    "config": {
      "label": "Service Title",
      "placeholder": "Branding"
    }
  },
  "service_description": {
    "type": "StructuredText",
    "config": {
      "label": "Service Description",
      "placeholder": "Build strong brand identity...",
      "single": "paragraph"
    }
  },
  "service_link": {
    "type": "Link",
    "config": {
      "label": "Service Link",
      "placeholder": "/services/branding"
    }
  },
  "service_categories": {
    "type": "Group",
    "config": {
      "label": "Service Categories",
      "fields": {
        "category_name": {
          "type": "Text",
          "config": {
            "label": "Category Name",
            "placeholder": "Visual Identity"
          }
        }
      }
    }
  },
  "service_button_text": {
    "type": "Text",
    "config": {
      "label": "Service Button Text",
      "placeholder": "Explore"
    }
  },
  "service_icon": {
    "type": "Text",
    "config": {
      "label": "Service Icon",
      "placeholder": "Enter icon URL (100x100px recommended)"
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Section Subtitle**: "What We Offer"
- **Section Title**: "Our Services"
- **Service Icon (Global)**: Upload default icon
- **Section Spacing**: "default"
- **Layout Style**: "default"
- **Show Icons**: `true`

**Service Items Group (Primary):** (Add 4-6)
- **Service Title**: "Web Design"
- **Service Description**: "Create beautiful, responsive websites"
- **Service Link**: "/services/web-design"
- **Service Button Text**: "Learn More"
- **Category 1**: "Design"
- **Category 2**: "UI/UX"
- **Category 3**: "Branding"

**Items Section:** (Add 4-6 services)
- **Service Title**: "Branding"
- **Service Description**: "Build strong brand identity"
- **Service Link**: "/services/branding"
- **Service Button Text**: "Explore"
- **Service Icon**: Upload service-specific icon

**Service Categories Group (within Items):** (Add 2-4 per service)
- **Category Name**: "Visual Identity"

### 🎨 Features

- **Dual Service Sources**: Services from both Primary Groups and Items section
- **Individual Icons**: Each service in Items can have its own icon
- **Nested Categories**: Items support nested Group for categories
- **Flattened Categories**: Primary uses category_1, category_2, category_3
- **Flexible layout options**
- **Hover animations**
- **Responsive grid**

### ⚠️ Important Notes

- **Complex Schema**: Most complex slice with both Primary Groups and Items Groups
- **Nested Groups**: Items section supports nested Groups for categories
- **Dual Icon Support**: Global icon in Primary + individual icons in Items
- **TypeScript interfaces**: `ServiceFourSliceDefaultPrimary`, `ServiceFourSliceDefaultItem`

---

## 7. InstagramArea Slice

### 📝 Description
An Instagram showcase section with background images, center image, and social media content.

### 🔧 Slice Type
`instagram_area`

### 📊 Schema Configuration

#### Primary Fields (No Items Section)

**Interface**: `InstagramAreaSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `instagram_username` | `KeyTextField` | Instagram username without @ | Yes |
| `instagram_link` | `LinkField` | Link to Instagram profile | Yes |
| `section_title` | `KeyTextField` | Title for the Instagram section | Yes |
| `description` | `RichTextField` | Description text for the section | Yes |
| `button_text` | `KeyTextField` | Text for follow button | Yes |
| `section_spacing` | `SelectField<"default" \| "large" \| "compact">` | Spacing style for the section | Yes |
| `show_background_images` | `BooleanField` | Whether to show background images | Yes |
| `center_instagram_image` | `KeyTextField` | Center featured Instagram image | Yes |
| `custom_instagram_images` | `GroupField<CustomInstagramImagesItem>` | Group of Instagram images | Yes |

##### Custom Instagram Images Group
**Interface**: `InstagramAreaSliceDefaultPrimaryCustomInstagramImagesItem`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `instagram_image` | `KeyTextField` | URL to Instagram image | Yes |
| `image_alt_text` | `KeyTextField` | Alt text for accessibility | Yes |

```json
{
  "instagram_username": {
    "type": "Text",
    "config": {
      "label": "Instagram Username",
      "placeholder": "@yourcompany"
    }
  },
  "instagram_link": {
    "type": "Link",
    "config": {
      "label": "Instagram Link",
      "placeholder": "https://instagram.com/yourcompany"
    }
  },
  "section_title": {
    "type": "Text",
    "config": {
      "label": "Section Title",
      "placeholder": "INSTAGRAM"
    }
  },
  "description": {
    "type": "StructuredText",
    "config": {
      "label": "Description",
      "placeholder": "Follow our journey...",
      "single": "paragraph"
    }
  },
  "button_text": {
    "type": "Text",
    "config": {
      "label": "Button Text",
      "placeholder": "Follow Us"
    }
  },
  "section_spacing": {
    "type": "Select",
    "config": {
      "label": "Section Spacing",
      "options": ["default", "large", "compact"],
      "default_value": "default"
    }
  },
  "show_background_images": {
    "type": "Boolean",
    "config": {
      "label": "Show Background Images",
      "default_value": true
    }
  },
  "center_instagram_image": {
    "type": "Text",
    "config": {
      "label": "Center Instagram Image",
      "placeholder": "Enter image URL (500x500px recommended)"
    }
  },
  "custom_instagram_images": {
    "type": "Group",
    "config": {
      "label": "Custom Instagram Images",
      "fields": {
        "instagram_image": {
          "type": "Text",
          "config": {
            "label": "Instagram Image",
            "placeholder": "Enter image URL (200x200px recommended)"
          }
        },
        "image_alt_text": {
          "type": "Text",
          "config": {
            "label": "Image Alt Text",
            "placeholder": "Instagram post"
          }
        }
      }
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Instagram Username**: "@yourcompany"
- **Instagram Link**: "https://instagram.com/yourcompany"
- **Section Title**: "INSTAGRAM"
- **Description**: "Follow our creative journey and behind-the-scenes moments!"
- **Button Text**: "Follow Us"
- **Section Spacing**: "default"
- **Show Background Images**: `true`
- **Center Instagram Image**: "https://example.com/images/instagram-featured.jpg" (500×500px recommended)

**Custom Instagram Images Group:** (Add 7 for full effect)
- **Instagram Image**: "https://example.com/images/instagram-post-1.jpg" (200×200px recommended)
- **Image Alt Text**: "Behind the scenes at our studio"

### 🎨 Features

- Center image with GSAP scroll animation
- 7 background Instagram images
- Scroll-triggered pinning effect
- Customizable content
- Responsive layout
- Social media integration

### ⚠️ Animation Note

- The center image animates on scroll (zooms from natural size to 580x580px with rounded corners)
- Animation is controlled by GSAP ScrollTrigger
- Only active on desktop (min-width: 1200px)

---

## 8. ContactOne Slice

### 📝 Description
A call-to-action contact section with customizable text and links. Simple, text-based configuration with minimal fields.

### 🔧 Slice Type
`contact_one`

### 📊 Schema Configuration

#### Primary Fields (No Items Section)

**Interface**: `ContactOneSliceDefaultPrimary`

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `main_title` | `KeyTextField` | Main contact section title | Yes |
| `highlighted_title` | `KeyTextField` | Highlighted portion of title | Yes |
| `description` | `RichTextField` | Contact section description | Yes |
| `contact_link` | `LinkField` | Contact link (email, phone, etc.) | Yes |
| `button_text_line_1` | `KeyTextField` | First line of button text | Yes |
| `button_text_line_2` | `KeyTextField` | Second line of button text | Yes |
| `background_color` | `SelectField<"black" \| "dark" \| "custom">` | Background color option | Yes |
| `show_default_icon` | `BooleanField` | Whether to show default icon | Yes |
| `custom_icon_image` | `KeyTextField` | Custom icon image URL | Yes |
| `custom_shape_svg` | `BooleanField` | Whether to use custom SVG shape | Yes |

```json
{
  "main_title": {
    "type": "Text",
    "config": {
      "label": "Main Title",
      "placeholder": "Let's talk"
    }
  },
  "highlighted_title": {
    "type": "Text",
    "config": {
      "label": "Highlighted Title",
      "placeholder": "about it"
    }
  },
  "description": {
    "type": "StructuredText",
    "config": {
      "label": "Description",
      "placeholder": "We will collaborate...",
      "single": "paragraph"
    }
  },
  "contact_link": {
    "type": "Link",
    "config": {
      "label": "Contact Link",
      "placeholder": "/contact"
    }
  },
  "button_text_line_1": {
    "type": "Text",
    "config": {
      "label": "Button Text Line 1",
      "placeholder": "Get"
    }
  },
  "button_text_line_2": {
    "type": "Text",
    "config": {
      "label": "Button Text Line 2",
      "placeholder": "In Touch"
    }
  },
  "background_color": {
    "type": "Select",
    "config": {
      "label": "Background Color",
      "options": ["black", "dark", "custom"],
      "default_value": "black"
    }
  },
  "show_default_icon": {
    "type": "Boolean",
    "config": {
      "label": "Show Default Icon",
      "default_value": true
    }
  },
  "custom_icon_image": {
    "type": "Text",
    "config": {
      "label": "Custom Icon Image",
      "placeholder": "Enter icon URL (200x200px recommended)"
    }
  },
  "custom_shape_svg": {
    "type": "Boolean",
    "config": {
      "label": "Show Button Shape SVG",
      "default_value": true
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Main Title**: "Ready to start"
- **Highlighted Title**: "your project?"
- **Description**: "Let's collaborate to create something amazing together"
- **Contact Link**: "/contact"
- **Button Text Line 1**: "Start"
- **Button Text Line 2**: "Project"
- **Background Color**: "black"
- **Show Default Icon**: `true`
- **Custom Icon Image**: "https://example.com/images/custom-contact-icon.svg" (200×200px) - Optional, overrides default icon
- **Show Button Shape SVG**: `true` - Toggle ProjectShape SVG on button

### 🎨 Features

- **Split headline for emphasis**
- **Two-line button text**
- **Customizable background colors**
- **Dual icon support**: Boolean toggle for default + optional custom image upload
- **Custom icon fallback**: Falls back to default CTA image from `/public/assets/img/home-03/cta/cta-1.png`
- **Button shape toggle**: Show/hide decorative ProjectShape SVG
- **Responsive design**
- **GSAP animations**
- **Flexible schema**

### ⚠️ Important Notes

- **Icon Priority**: Custom icon image overrides default icon when uploaded
- **Default Icon**: Shows when `show_default_icon` is true AND no custom icon uploaded
- **Button Shape**: ProjectShape SVG controlled by `custom_shape_svg` boolean
- **Split button text**: Two separate fields for multi-line button text
- **Simple schema**: One of the simplest slice configurations
- **TypeScript interface**: `ContactOneSliceDefaultPrimary`

---

## 🔄 Component Rendering Order

The homepage renders components in this specific order:

### SliceZone (Prismic-managed):
1. **HeroBanner Slice** (`hero_section`)
2. **Gallery Slice** (`gallery`)
3. **About Slice** (`about`)
4. **ProjectFour Slice** (`project_four`)
5. **CounterOne Slice** (`counter_one`)
6. **ServiceFour Slice** (`service_four`)
7. **InstagramArea Slice** (`instagram_area`)
8. **ContactOne Slice** (`contact_one`)

### Non-Slice Components:
9. **ThemeSetting Component** (Outside SliceZone, fetches own Prismic data)

### Implementation Details:
- **SliceZone**: Renders all Prismic slices dynamically
- **ThemeSetting**: Client-side component with `useEffect` Prismic data fetching
- **Data Flow**: Homepage → `getHomepageData()` → SliceZone + ThemeSetting
- **Error Handling**: Graceful fallbacks for missing Prismic data

---

## 🎨 General Guidelines

### Image Optimization

- **Always provide alt text** for accessibility and SEO
- **Use recommended dimensions** for optimal display
- **Compress images** before uploading (use tools like TinyPNG)
- **Use appropriate formats**: JPG for photos, PNG for graphics with transparency

### Content Best Practices

1. **Keep titles concise** (5-10 words)
2. **Write descriptive button text** (action-oriented)
3. **Use clear, benefit-focused descriptions**
4. **Maintain consistent voice and tone**
5. **Test all links** before publishing

### Field Types Reference

| Prismic Type | TypeScript Type | Use Case | Example |
|--------------|----------------|----------|---------|
| **Text** | `KeyTextField` | Short, single-line text | Button labels, titles, **image URLs** |
| **StructuredText** | `RichTextField` | Rich formatted text | Descriptions, paragraphs |
| **Link** | `LinkField` | URLs or internal links | Buttons, navigation |
| **Number** | `NumberField` | Numeric values | Statistics, counts |
| **Boolean** | `BooleanField` | True/false toggle | Feature flags |
| **Select** | `SelectField<options>` | Dropdown options | Variants, styles |
| **Group** | `GroupField<ItemType>` | Repeatable sets of fields | Multiple items |

**Note**: All TypeScript interfaces referenced in this document are auto-generated from Prismic schemas. For detailed type definitions, see [schema.md](schema.md).

**Important**: All image fields use `Text` type (KeyTextField) and store image URLs as strings. There are no `Image` type fields in this project.

### Prismic Limitations

⚠️ **Important Constraints:**

1. **No Nested Groups**: Prismic doesn't support Groups within Groups
2. **Items vs Primary**: Use Primary Group fields for better flexibility
3. **Image Constraints**: Some fields use image constraints for consistency
4. **Link Types**: Support Web URLs, Document links, and Media links

---

## � Recent Changes & Updates

### Theme Settings Implementation (Latest)
- **Added**: Client-side ThemeSetting component with Prismic integration
- **Fields**: `theme_settings_title` (Text) and `theme_settings_icon` (Image) in homepage
- **Functionality**: Dynamic title and custom icon upload support
- **Tech**: Direct Prismic API calls via `useEffect`, fallback to defaults
- **Location**: Rendered outside SliceZone after all slices

### TypeScript Integration
- **Model Files**: Auto-generated TypeScript interfaces for all slices
- **Type Safety**: Complete type coverage for Prismic data structures
- **Interfaces**: Primary, Items, and nested Group interfaces for each slice

### Architecture Updates
- **Data Fetching**: Centralized `getHomepageData()` in `prismic-helpers.ts`
- **Error Handling**: Graceful fallbacks for missing Prismic connections
- **Client-Side**: ThemeSetting component uses client-side data fetching
- **SSR**: Other components use server-side rendering with Suspense

---

## �🚀 Setup Workflow

### For Homepage Custom Type:

1. **Create Homepage Custom Type** in Prismic dashboard
2. **Add Theme Settings fields**:
   - `theme_settings_title` (Text field)
   - `theme_settings_icon` (Image field with 500×500px constraint)
3. **Add Slices field** for slice zone
4. **Configure and publish**

### For Each Slice:

1. **Create Custom Type** in Prismic dashboard
2. **Add all fields** using exact schemas from this document
3. **Configure field constraints** (images, select options, etc.)
4. **Pay attention to Primary vs Items** - some slices use both
5. **Add slice to homepage** document
6. **Populate with content**
7. **Test in preview** mode
8. **Publish** when ready

### ThemeSetting Component Setup:

1. **Ensure homepage fields exist** (`theme_settings_title`, `theme_settings_icon`)
2. **Fill content in Prismic** homepage document
3. **Component auto-fetches** data on client-side
4. **Verify fallbacks work** when fields are empty

### Quick Setup Checklist

- [ ] Homepage custom type created with theme settings fields
- [ ] All slices created in Prismic with correct field names
- [ ] Image constraints configured for optimal sizing (500×500px for theme icon)
- [ ] Select field options match schema exactly
- [ ] Boolean fields have correct default values
- [ ] Complex slices (About, ServiceFour) use both Primary Groups and Items
- [ ] Theme settings content populated in homepage document
- [ ] Content populated for all required slice fields
- [ ] Preview tested on desktop and mobile
- [ ] ThemeSetting component displays custom title and icon
- [ ] Links verified and working
- [ ] Images optimized and alt text added
- [ ] All documents published to production

---

## 🔧 Technical Implementation Notes

### Data Flow:
```
Homepage → getHomepageData() → {
  slices: [...] → SliceZone
  theme_settings_*: {...} → Available but ThemeSetting fetches own data
}
```

### TypeScript Coverage:
- ✅ All slice interfaces auto-generated
- ✅ Homepage document interface with theme settings
- ✅ PrismicImage interface for image fields
- ✅ Complete type safety throughout

### Environment Requirements:
- Next.js 14.2.3+
- Prismic client libraries
- Environment variables: `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`, `PRISMIC_ACCESS_TOKEN`


