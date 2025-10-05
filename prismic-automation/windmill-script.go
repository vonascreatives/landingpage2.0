package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// Configuration
type Config struct {
	PrismicRepoName string
	PrismicAPIToken string
	DocumentType    string
	Language        string
}

// Prismic API structures
type PrismicDocument struct {
	Type  string                 `json:"type"`
	UID   string                 `json:"uid,omitempty"`
	Lang  string                 `json:"lang"`
	Data  map[string]interface{} `json:"data"`
	Title string                 `json:"title,omitempty"`
}

// Load environment variables from .env file
func loadEnv() {
	file, err := os.Open(".env")
	if err != nil {
		// .env file is optional, continue without it
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		
		// Skip empty lines and comments
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		
		// Parse KEY=VALUE
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])
			
			// Only set if not already set in environment
			if os.Getenv(key) == "" {
				os.Setenv(key, value)
			}
		}
	}
}

// Generate HeroBanner Slice (NO hero_image - not in schema)
func generateHeroBannerSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "hero_section",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"title": []interface{}{
				map[string]interface{}{
					"type": "paragraph",
					"text": "Transform Your Vision Into Digital Reality",
					"spans": []interface{}{
						map[string]interface{}{
							"start": 0,
							"end":   9,
							"type":  "strong",
						},
					},
				},
			},
			"subtitle": []interface{}{
				map[string]interface{}{
					"type": "paragraph",
					"text": "We create innovative digital experiences that drive results and inspire audiences worldwide",
					"spans": []interface{}{},
				},
			},
			"button_text": "Get Started Today",
			"button_link": map[string]interface{}{
				"link_type": "Web",
				"url":       "/contact",
			},
			// NO hero_image - field doesn't exist in schema
		},
	}
}

// Generate About Slice (NO images for now)
func generateAboutSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "about",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"section_heading": []interface{}{
				map[string]interface{}{
					"type":  "heading2",
					"text":  "About Our Creative Agency",
					"spans": []interface{}{},
				},
			},
			"section_subheading": []interface{}{
				map[string]interface{}{
					"type":  "paragraph",
					"text":  "Excellence in Digital Innovation",
					"spans": []interface{}{},
				},
			},
			"about_description_field": []interface{}{
				map[string]interface{}{
					"type":  "paragraph",
					"text":  "We are a team of passionate creators, designers, and developers dedicated to bringing your digital vision to life. With over a decade of experience, we've helped hundreds of brands establish their online presence and achieve their business goals through innovative solutions.",
					"spans": []interface{}{},
				},
			},
			// Images omitted - add manually in Prismic UI
			"action_buttons": []interface{}{
				map[string]interface{}{
					"button_text": "Learn More",
					"button_link": map[string]interface{}{
						"link_type": "Web",
						"url":       "/about",
					},
				},
				map[string]interface{}{
					"button_text": "View Portfolio",
					"button_link": map[string]interface{}{
						"link_type": "Web",
						"url":       "/portfolio",
					},
				},
			},
			"repetable_zone": []interface{}{
				map[string]interface{}{
					"statistic_number": 250,
					"statistic_label":  "Projects Completed",
					"statistic_suffix": "+",
				},
				map[string]interface{}{
					"statistic_number": 150,
					"statistic_label":  "Happy Clients",
					"statistic_suffix": "+",
				},
				map[string]interface{}{
					"statistic_number": 15,
					"statistic_label":  "Years Experience",
					"statistic_suffix": "+",
				},
				map[string]interface{}{
					"statistic_number": 50,
					"statistic_label":  "Team Members",
					"statistic_suffix": "+",
				},
			},
		},
	}
}

// Generate Gallery Slice (NO captions - removed per schema)
func generateGallerySlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "gallery",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"section_title": "Our Gallery",
			// Images omitted - add manually in Prismic UI
			"repeatable_zone": []interface{}{},
		},
	}
}

// Generate ProjectFour Slice with project_button_text (ADDED per schema)
func generateProjectFourSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "project_four",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"section_title":          "Featured Projects", // STRING not RichText
			"view_all_projects_link": map[string]interface{}{"link_type": "Web", "url": "/portfolio"},
			"style_variant":          "default",
			"project_button_text":    "View Project", // ADDED - new field
			"repeatable_items": []interface{}{
				map[string]interface{}{
					// Images omitted
					"project_meta":  "Web Design • E-commerce",
					"project_title": "Modern E-commerce Platform",
					"project_link":  map[string]interface{}{"link_type": "Web", "url": "/portfolio/ecommerce-platform"},
				},
				map[string]interface{}{
					"project_meta":  "Branding • Identity",
					"project_title": "Tech Startup Branding",
					"project_link":  map[string]interface{}{"link_type": "Web", "url": "/portfolio/tech-startup"},
				},
				map[string]interface{}{
					"project_meta":  "Mobile App • UI/UX",
					"project_title": "Fitness Tracking App",
					"project_link":  map[string]interface{}{"link_type": "Web", "url": "/portfolio/fitness-app"},
				},
			},
		},
	}
}

// Generate CounterOne Slice (NO images)
func generateCounterOneSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "counter_one",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"enable_background_images": false, // Disabled since no images
			"section_spacing":          "default",
			"background_style":         "default",
			"counter_items": []interface{}{
				map[string]interface{}{
					"counter_value":     500,
					"counter_label":     "Projects Delivered",
					"counter_suffix":    "+",
					"counter_min_value": 0,
				},
				map[string]interface{}{
					"counter_value":     250,
					"counter_label":     "Happy Clients",
					"counter_suffix":    "+",
					"counter_min_value": 0,
				},
				map[string]interface{}{
					"counter_value":     15,
					"counter_label":     "Years in Business",
					"counter_suffix":    "+",
					"counter_min_value": 0,
				},
				map[string]interface{}{
					"counter_value":     98,
					"counter_label":     "Client Satisfaction",
					"counter_suffix":    "%",
					"counter_min_value": 0,
				},
			},
		},
	}
}

// Generate ServiceFour Slice (STRING descriptions, not RichText)
func generateServiceFourSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "service_four",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"section_subtitle": "What We Offer",
			"section_title":    "Our Services", // STRING not RichText
			// service_icon omitted - images need IDs
			"section_spacing": "default",
			"layout_style":    "default",
			"show_icons":      true,
			"service_items": []interface{}{
				map[string]interface{}{
					"service_title":       "Web Design & Development",
					"service_description": "Create stunning, responsive websites that engage your audience and drive conversions.", // STRING not RichText
					"service_link":        map[string]interface{}{"link_type": "Web", "url": "/services/web-design"},
					"service_button_text": "Learn More",
					"category_1":          "Design",
					"category_2":          "Development",
					"category_3":          "UI/UX",
				},
				map[string]interface{}{
					"service_title":       "Brand Identity",
					"service_description": "Build a strong, memorable brand that stands out in today's competitive market.",
					"service_link":        map[string]interface{}{"link_type": "Web", "url": "/services/branding"},
					"service_button_text": "Learn More",
					"category_1":          "Branding",
					"category_2":          "Strategy",
					"category_3":          "Creative",
				},
				map[string]interface{}{
					"service_title":       "Digital Marketing",
					"service_description": "Grow your business with data-driven marketing strategies that deliver measurable results.",
					"service_link":        map[string]interface{}{"link_type": "Web", "url": "/services/marketing"},
					"service_button_text": "Learn More",
					"category_1":          "Marketing",
					"category_2":          "SEO",
					"category_3":          "Analytics",
				},
				map[string]interface{}{
					"service_title":       "Mobile App Development",
					"service_description": "Develop powerful mobile applications for iOS and Android that users love.",
					"service_link":        map[string]interface{}{"link_type": "Web", "url": "/services/mobile-apps"},
					"service_button_text": "Learn More",
					"category_1":          "Mobile",
					"category_2":          "iOS",
					"category_3":          "Android",
				},
			},
		},
	}
}

// Generate InstagramArea Slice (NO captions - removed per schema, STRING description)
func generateInstagramAreaSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "instagram_area",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"instagram_username": "@youragency",
			"instagram_link":     map[string]interface{}{"link_type": "Web", "url": "https://instagram.com/youragency"},
			"section_title":      "Follow Us on Instagram",
			"description":        "Stay connected and see our latest work, behind-the-scenes, and creative inspiration.", // STRING not RichText
			"button_text":        "Follow Us",
			"section_spacing":    "default",
			"show_background_images": false, // No images
			// Images omitted - add manually
		},
	}
}

// Generate ContactOne Slice (STRING description, NO section_spacing - removed per schema)
func generateContactOneSlice() map[string]interface{} {
	return map[string]interface{}{
		"slice_type":  "contact_one",
		"slice_label": nil,
		"variation":   "default",
		"items":       []interface{}{},
		"primary": map[string]interface{}{
			"main_title":        "Ready to start",
			"highlighted_title": "your project?",
			"description":       "Let's collaborate to create something amazing together. Get in touch today!", // STRING not RichText
			"contact_link":      map[string]interface{}{"link_type": "Web", "url": "/contact"},
			"button_text_line_1": "Start",
			"button_text_line_2": "Project",
			"background_color":   "black",
			"show_default_icon":  true,
			// REMOVED: section_spacing (not in schema)
		},
	}
}

// Generate a complete homepage document with ALL 8 slices (text-only)
func generateHomepageDocument(uid string) PrismicDocument {
	slices := []interface{}{
		generateHeroBannerSlice(),
		generateGallerySlice(),
		generateAboutSlice(),
		generateProjectFourSlice(),
		generateCounterOneSlice(),
		generateServiceFourSlice(),
		generateInstagramAreaSlice(),
		generateContactOneSlice(),
	}

	return PrismicDocument{
		Type:  "homepage",
		UID:   uid,
		Lang:  "en-us",
		Title: "Auto-Generated Homepage - " + time.Now().Format("2006-01-02 15:04:05"),
		Data: map[string]interface{}{
			"slices": slices,
		},
	}
}

// Create homepage document in Prismic
func createHomepage(config Config, doc PrismicDocument) error {
	writeURL := "https://migration.prismic.io/documents"

	jsonData, err := json.Marshal(doc)
	if err != nil {
		return fmt.Errorf("failed to marshal document: %w", err)
	}

	log.Printf("Payload size: %d bytes", len(jsonData))

	req, err := http.NewRequest("POST", writeURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", config.PrismicAPIToken))
	req.Header.Set("repository", config.PrismicRepoName)
	req.Header.Set("Accept", "application/json")

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	log.Printf("\nAPI Response:")
	log.Printf("Status: %d %s", resp.StatusCode, resp.Status)

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		log.Printf("✓ Successfully created homepage!")
		return nil
	}

	log.Printf("Response Body: %s", string(body))
	return fmt.Errorf("failed to create homepage (Status %d): %s", resp.StatusCode, string(body))
}

func main() {
	// Load environment variables from .env file if it exists
	loadEnv()

	config := Config{
		PrismicRepoName: os.Getenv("NEXT_PUBLIC_PRISMIC_ENVIRONMENT"),
		PrismicAPIToken: os.Getenv("PRISMIC_ACCESS_TOKEN"),
		DocumentType:    "homepage",
		Language:        "en-us",
	}

	if config.PrismicRepoName == "" {
		config.PrismicRepoName = "liko-landing"
	}

	if config.PrismicAPIToken == "" {
		log.Fatal("ERROR: PRISMIC_ACCESS_TOKEN environment variable is required")
	}

	log.Println("========================================")
	log.Println("  Prismic Homepage Content Generator")
	log.Println("========================================")
	log.Printf("Repository: %s", config.PrismicRepoName)
	log.Printf("Document Type: %s (Repeatable)", config.DocumentType)
	log.Printf("Language: %s", config.Language)
	log.Println("Slices: HeroBanner, Gallery, About, ProjectFour,")
	log.Println("        CounterOne, ServiceFour, Instagram, ContactOne")
	log.Println("Mode: Text-only (images excluded)")
	log.Println("========================================\n")

	// Generate unique UID for each run
	uid := fmt.Sprintf("homepage-%d", time.Now().Unix())

	log.Println("Generating homepage document with 8 slices...")
	doc := generateHomepageDocument(uid)

	log.Println("\nCreating homepage in Prismic...")
	
	if err := createHomepage(config, doc); err != nil {
		log.Fatalf("ERROR: %v", err)
	}

	log.Println("\n========================================")
	log.Println("✓ Homepage content generation completed!")
	log.Println("========================================")
	log.Printf("Document UID: %s", uid)
	log.Printf("Document Type: %s (Repeatable - multiple allowed)", config.DocumentType)
	log.Println("\nGenerated Slices:")
	log.Println("  1. Hero Banner")
	log.Println("  2. Gallery (empty - add images manually)")
	log.Println("  3. About Section (with 4 statistics)")
	log.Println("  4. Featured Projects (3 projects)")
	log.Println("  5. Counter Section (4 counters)")
	log.Println("  6. Services (4 services)")
	log.Println("  7. Instagram Area")
	log.Println("  8. Contact CTA")
	log.Println("\nNext steps:")
	log.Printf("1. Visit: https://%s.prismic.io/documents/\n", config.PrismicRepoName)
	log.Println("2. Find your new homepage document")
	log.Println("3. Add images manually in the Prismic editor")
	log.Println("4. Review and publish")
	log.Println("\n📝 NOTE: Images excluded due to Migration API limitations")
	log.Println("   Images require pre-uploaded asset IDs from Prismic Media Library")
	log.Println("   Add them manually after document creation")
	log.Println("========================================")
}
