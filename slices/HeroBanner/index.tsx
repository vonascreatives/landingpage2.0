'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../../src/components/svg";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { HeroBannerSlice } from "./model";

export interface HeroBannerProps {
  slice: HeroBannerSlice;
}

// Helper function to render rich text as plain text
const renderRichText = (field: prismic.RichTextField) => {
  if (!prismic.isFilled.richText(field)) return "";
  return prismic.asText(field);
};

// Helper function to get link URL
const getLinkUrl = (field: prismic.LinkField) => {
  // Cast to any to access all possible properties
  const fieldAsAny = field as any;

  if (!field || (!prismic.isFilled.link(field) && !fieldAsAny.text)) {
    return "/contact";
  }

  if (field.link_type === "Web") {
    return field.url || "/contact";
  }
  if (field.link_type === "Document") {
    return field.url || "/contact";
  }
  if (field.link_type === "Media") {
    return field.url || "/contact";
  }

  if (fieldAsAny.link_type === "Any" && fieldAsAny.text) {
    return fieldAsAny.text;
  }

  if (fieldAsAny.text) {
    return fieldAsAny.text;
  }

  return "/contact";
};

// Helper function to clean title by removing URL-related parts
const cleanTitle = (text: string): string => {
  if (!text) return text;

  let cleaned = text;

  // Remove protocol (http://, https://)
  cleaned = cleaned.replace(/https?:\/\//gi, '');

  // Remove www. prefix
  cleaned = cleaned.replace(/\bwww\./gi, '');

  // Remove common TLDs (.com, .net, .org, .io, etc.)
  cleaned = cleaned.replace(/\.(com|net|org|io|co|edu|gov|mil|int|biz|info|name|museum|coop|aero|xxx|idv|sg|my|ph|id|th|vn|hk|tw|jp|kr|cn|au|nz|uk|us|ca|de|fr|it|es|nl|be|ch|at|se|no|dk|fi|pl|ru|br|mx|ar|cl|pe|ve|za)\b/gi, '');

  // Remove trailing slashes and dots
  cleaned = cleaned.replace(/[\/\.]+$/g, '');

  // Remove leading slashes and dots
  cleaned = cleaned.replace(/^[\/\.]+/g, '');

  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Trim whitespace
  cleaned = cleaned.trim();

  // Capitalize first letter of each word for better presentation
  cleaned = cleaned.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  return cleaned;
};

export default function HeroBanner({ slice }: HeroBannerProps) {
  // Extract content with fallbacks
  const rawTitle = slice.primary.title ? renderRichText(slice.primary.title) : "Transform Your Workflow with AI-Powered Airtable Templates";
  const title = cleanTitle(rawTitle); // Clean the title to remove URL parts
  const subtitle = slice.primary.subtitle ? renderRichText(slice.primary.subtitle) : "Beautiful AI Images for Social Media & Webshops";
  const buttonText = slice.primary.button_text || "Get Your Template";
  const buttonUrl = slice.primary.button_link ? getLinkUrl(slice.primary.button_link) : "/contact";

  // Smart title splitting - limit to 2 lines max for better responsiveness
  const splitTitleIntoLines = (text: string): string[] => {
    const words = text.split(' ');

    // If 2 words or less, keep on one line
    if (words.length <= 2) {
      return [text];
    }

    // For exactly 3 words (like "Welcome to singapourdrinks.com")
    // Split after the first 2 words to keep URL/long word intact on line 2
    if (words.length === 3) {
      const line1 = words.slice(0, 2).join(' ');
      const line2 = words[2];
      return [line1, line2];
    }

    // For 4-6 words, split after first 2 words for better balance
    // This handles cases like "Welcome to Webzilla Singapore Pte Ltd"
    if (words.length <= 6) {
      const line1 = words.slice(0, 2).join(' ');
      const line2 = words.slice(2).join(' ');
      return [line1, line2];
    }

    // For longer titles (7+ words), split at midpoint
    const midPoint = Math.ceil(words.length / 2);
    const line1 = words.slice(0, midPoint).join(' ');
    const line2 = words.slice(midPoint).join(' ');

    return [line1, line2];
  };

  const titleLines = splitTitleIntoLines(title);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="tp-hero-3-area tp-hero-3-ptb fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-hero-3-content-box text-center p-relative">
                <div className="tp-hero-3-circle-shape">
                  <span></span>
                </div>

                {/* Title - Responsive with max 2 lines */}
                <h4 className="tp-hero-3-title tp_reveal_anim hero-title-responsive">
                  {titleLines.map((line, index) => {
                    // Check if line contains a domain/URL (has a dot with no spaces around it)
                    const isURL = /\S+\.\S+/.test(line);
                    return (
                      <span
                        key={index}
                        className="tp-reveal-line"
                        style={{
                          display: 'block',
                          whiteSpace: isURL ? 'nowrap' : 'normal'
                        }}
                      >
                        {line}
                      </span>
                    );
                  })}
                </h4>

                {/* Subtitle */}
                <span className="tp-hero-3-category tp_reveal_anim">
                  {subtitle}
                </span>

                {/* Button */}
                <Link className="tp-btn-black-2" href={buttonUrl}>
                  {buttonText}{" "}
                  <span className="p-relative">
                    <RightArrowTwo />
                    <ArrowBg />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .hero-title-responsive {
          max-width: 100%;
          word-break: normal !important;
          padding: 0 15px;
        }

        .tp-reveal-line {
          display: block;
          word-break: normal !important;
          hyphens: manual !important;
          overflow-wrap: normal;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 991px) {
          .hero-title-responsive {
            padding: 0 20px;
          }
        }

        @media (max-width: 767px) {
          .hero-title-responsive {
            padding: 0 15px;
          }

          .tp-reveal-line {
            margin-bottom: 0;
            line-height: 1.1;
          }
        }

        @media (max-width: 575px) {
          .hero-title-responsive {
            padding: 0 10px;
          }

          .tp-reveal-line {
            font-size: 0.9em;
          }
        }
      `}</style>
    </section>
  );
}