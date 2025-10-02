# 📚 Prismic Slices - Complete Documentation

## 🎯 Overview

This document provides comprehensive documentation for all Prismic slices used in the Next.js landing page project. Each slice is fully integrated with TypeScript and follows Prismic best practices.

**Project**: Landing Page 2.0  
**CMS**: Prismic  
**Framework**: Next.js 14.2.3  
**Language**: TypeScript

---

## 📋 Table of Contents

1. [HeroBanner Slice](#1-herobanner-slice)
2. [Gallery Slice](#2-gallery-slice)
3. [About Slice](#3-about-slice)
4. [ProjectFour Slice](#4-projectfour-slice)
5. [CounterOne Slice](#5-counterone-slice)
6. [ServiceFour Slice](#6-servicefour-slice)
7. [InstagramArea Slice](#7-instagramarea-slice)
8. [ContactOne Slice](#8-contactone-slice)

---

## 1. HeroBanner Slice

### 📝 Description
The main hero section that appears at the top of the homepage with title, subtitle, and call-to-action button.

### 🔧 Slice Type
`hero_section`

### 📊 Schema Configuration

#### Primary Fields (No Items Section)

```json
{
  "title": {
    "type": "StructuredText",
    "config": {
      "label": "Title",
      "placeholder": "Enter hero title",
      "allowTargetBlank": true,
      "multi": "paragraph,strong,em"
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

---

## 2. Gallery Slice

### 📝 Description
A gallery section displaying multiple images with optional captions.

### 🔧 Slice Type
`gallery`

### 📊 Schema Configuration

#### Primary Fields

```json
{
  "section_title": {
    "type": "Text",
    "config": {
      "label": "Section Title",
      "placeholder": "Gallery"
    }
  }
}
```

#### Items Section (Repeatable)

```json
{
  "gallery_image": {
    "type": "Image",
    "config": {
      "label": "Gallery Image",
      "constraint": {
        "width": 800,
        "height": 600
      }
    }
  },
  "image_caption": {
    "type": "Text",
    "config": {
      "label": "Image Caption",
      "placeholder": "Image description"
    }
  }
}
```

### 💡 Example Content

**Primary:**
- **Section Title**: "Our Work"

**Items:** (Add multiple)
- **Gallery Image**: Upload image (800x600px recommended)
- **Image Caption**: "Project showcase"

### 🎨 Features

- Multiple images support
- Optional captions
- Responsive grid layout
- Lightbox functionality
- Masonry layout

---

## 3. About Slice

### 📝 Description
An about section with description, image, statistics, and action buttons.

### 🔧 Slice Type
`about`

### 📊 Schema Configuration

#### Primary Fields

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
    "type": "Image",
    "config": {
      "label": "About Image",
      "constraint": {
        "width": 600,
        "height": 600
      }
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
      "label": "Statistics",
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

### 💡 Example Content

**Primary:**
- **Section Heading**: "About Our Agency"
- **Section Subheading**: "Creative Excellence"
- **About Description**: "We are a team of passionate creators..."
- **About Image**: Upload company image

**Action Buttons Group:** (Add 1-2)
- **Button Text**: "Learn More"
- **Button Link**: "/about"

**Statistics Group:** (Add 3-4)
- **Statistic Number**: 150
- **Statistic Label**: "Projects Completed"
- **Statistic Suffix**: "+"

### 🎨 Features

- Rich text formatting
- Image with lazy loading
- Animated statistics counters
- Multiple action buttons
- Responsive layout

---

## 4. ProjectFour Slice

### 📝 Description
A project showcase section displaying portfolio items with images, titles, and meta information.

### 🔧 Slice Type
`project_four`

### 📊 Schema Configuration

#### Primary Fields

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
          "type": "Image",
          "config": {
            "label": "Project Image 1",
            "constraint": {
              "width": 800,
              "height": 600
            }
          }
        },
        "project_image_2": {
          "type": "Image",
          "config": {
            "label": "Project Image 2",
            "constraint": {
              "width": 800,
              "height": 600
            }
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
- **Project Image 1**: Upload main project image
- **Project Image 2**: Upload secondary project image
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
          "type": "Image",
          "config": {
            "label": "Background Image",
            "constraint": {
              "width": 200,
              "height": 200
            }
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
- **Background Image**: Upload decorative image (200x200px)
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
A services showcase section with categorized service items.

### 🔧 Slice Type
`service_four`

### 📊 Schema Configuration

#### Primary Fields

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
      "label": "Service Items",
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

### 💡 Example Content

**Primary:**
- **Section Subtitle**: "What We Offer"
- **Section Title**: "Our Services"
- **Section Spacing**: "default"
- **Layout Style**: "default"
- **Show Icons**: `true`

**Service Items Group:** (Add 4-6)
- **Service Title**: "Web Design"
- **Service Description**: "Create beautiful, responsive websites"
- **Service Link**: "/services/web-design"
- **Service Button Text**: "Learn More"
- **Category 1**: "Design"
- **Category 2**: "UI/UX"
- **Category 3**: "Branding"

### 🎨 Features

- Multiple service cards
- Flattened category structure
- No nested Groups (Prismic limitation)
- Flexible layout options
- Hover animations
- Responsive grid

### ⚠️ Important Notes

- **No nested Groups**: Prismic doesn't support Groups within Groups
- **Flattened categories**: Instead of a nested Group, uses category_1, category_2, category_3 fields
- **No image mapping**: Services use default icons instead of custom images

---

## 7. InstagramArea Slice

### 📝 Description
An Instagram showcase section with background images, center image, and social media content.

### 🔧 Slice Type
`instagram_area`

### 📊 Schema Configuration

#### Primary Fields (No Items Section)

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
    "type": "Image",
    "config": {
      "label": "Center Instagram Image",
      "constraint": {
        "width": 500,
        "height": 500
      }
    }
  },
  "custom_instagram_images": {
    "type": "Group",
    "config": {
      "label": "Custom Instagram Images",
      "fields": {
        "instagram_image": {
          "type": "Image",
          "config": {
            "label": "Instagram Image",
            "constraint": {
              "width": 200,
              "height": 200
            }
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
- **Center Instagram Image**: Upload main image (500x500px)

**Custom Instagram Images Group:** (Add 7 for full effect)
- **Instagram Image**: Upload square image (200x200px)
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
A call-to-action contact section with customizable text and links.

### 🔧 Slice Type
`contact_one`

### 📊 Schema Configuration

#### Primary Fields (No Items Section, No Image Mapping)

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
  "section_spacing": {
    "type": "Select",
    "config": {
      "label": "Section Spacing",
      "options": ["default", "large", "compact"],
      "default_value": "default"
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
- **Section Spacing**: "default"
- **Background Color**: "black"
- **Show Default Icon**: `true`

### 🎨 Features

- Split headline for emphasis
- Two-line button text
- Customizable background colors
- Flexible spacing options
- Static default icon (no Prismic image mapping)
- Responsive design
- GSAP animations

### ⚠️ Important Notes

- **No image mapping**: Uses static default icon only
- **Text-only configuration**: All visual elements configured through text
- **Split button text**: Two separate fields for multi-line button text

---

## 🔄 Component Rendering Order

The homepage renders slices in this specific order:

1. **Hero Section** (Prismic)
2. **Gallery** (Prismic)
3. **About** (Prismic)
4. **BrandThree** (Static Component)
5. **ProjectFour** (Prismic)
6. **CounterOne** (Prismic)
7. **ServiceFour** (Prismic)
8. **InstagramArea** (Prismic)
9. **ContactOne** (Prismic)

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

| Field Type | Use Case | Example |
|------------|----------|---------|
| **Text** | Short, single-line text | Button labels, titles |
| **StructuredText** | Rich formatted text | Descriptions, paragraphs |
| **Image** | Image upload | Photos, graphics |
| **Link** | URLs or internal links | Buttons, navigation |
| **Number** | Numeric values | Statistics, counts |
| **Boolean** | True/false toggle | Feature flags |
| **Select** | Dropdown options | Variants, styles |
| **Group** | Repeatable sets of fields | Multiple items |

### Prismic Limitations

⚠️ **Important Constraints:**

1. **No Nested Groups**: Prismic doesn't support Groups within Groups
2. **Items vs Primary**: Use Primary Group fields for better flexibility
3. **Image Constraints**: Some fields use image constraints for consistency
4. **Link Types**: Support Web URLs, Document links, and Media links

---

## 🚀 Setup Workflow

### For Each Slice:

1. **Create Custom Type** in Prismic dashboard
2. **Add all fields** using exact schemas from this document
3. **Configure field constraints** (images, select options, etc.)
4. **Add slice to homepage** document
5. **Populate with content**
6. **Test in preview** mode
7. **Publish** when ready

### Quick Setup Checklist

- [ ] All slices created in Prismic with correct field names
- [ ] Image constraints configured for optimal sizing
- [ ] Select field options match schema exactly
- [ ] Boolean fields have correct default values
- [ ] All Group fields use Primary section (not Items)
- [ ] Content populated for all required fields
- [ ] Preview tested on desktop and mobile
- [ ] Links verified and working
- [ ] Images optimized and alt text added
- [ ] Published to production


