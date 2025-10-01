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

export default function HeroBanner({ slice }: HeroBannerProps) {
  // Extract content with fallbacks
  const title = slice.primary.title ? renderRichText(slice.primary.title) : "Transform Your Workflow with AI-Powered Airtable Templates";
  const subtitle = slice.primary.subtitle ? renderRichText(slice.primary.subtitle) : "Beautiful AI Images for Social Media & Webshops";
  const buttonText = slice.primary.button_text || "Get Your Template";
  const buttonUrl = slice.primary.button_link ? getLinkUrl(slice.primary.button_link) : "/contact";

  // Split title into lines for animation
  const titleLines = title.split(' ').length > 4 
    ? [title.substring(0, title.indexOf(' ', title.length / 2)), title.substring(title.indexOf(' ', title.length / 2) + 1)]
    : [title];

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
                
                {/* Title */}
                <h4 className="tp-hero-3-title tp_reveal_anim">
                  {titleLines.map((line, index) => (
                    <span key={index} className="tp-reveal-line">{line}</span>
                  ))}
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
    </section>
  );
}