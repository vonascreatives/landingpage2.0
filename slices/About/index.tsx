'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { AboutSlice } from "./model";
// internal imports
import shape from '../../public/assets/img/home-03/about/ab-shape-img.png';
import { ArrowBg, RightArrowTwo, FirstBracket, FirstBracketTwo } from "../../src/components/svg";

export interface AboutProps {
  slice: AboutSlice;
}

// Helper function to get text content from rich text field
function getRichTextContent(field: any): string {
  if (!field) return '';
  
  // Handle different Prismic field formats
  if (typeof field === 'string') return field;
  
  if (Array.isArray(field)) {
    return field.map((block: any) => {
      if (block.text) return block.text;
      if (block.spans && block.spans.length > 0) {
        return block.spans.map((span: any) => span.text || '').join('');
      }
      return '';
    }).join(' ');
  }
  
  if (field.text) return field.text;
  
  return '';
}

// Helper function to render rich text as paragraphs
function renderRichTextParagraphs(field: any) {
  if (!field) return null;
  
  if (typeof field === 'string') {
    return (
      <p className="mb-30 tp_fade_bottom">
        {field}
      </p>
    );
  }
  
  if (!Array.isArray(field)) return null;
  
  return field.map((block: any, index: number) => {
    if (block.type === 'paragraph' || block.type === 'preformatted') {
      return (
        <p key={index} className={index === 0 ? "mb-30 tp_fade_bottom" : "mb-45 tp_fade_bottom"}>
          {block.text || ''}
        </p>
      );
    }
    return null;
  });
}

export default function About({ slice }: AboutProps) {
  // Extract data using actual Prismic field names
  const sectionSubtitle = getRichTextContent(slice.primary?.section_heading) || "About The Template";
  const sectionTitle = getRichTextContent(slice.primary?.section_subheading) || "All-in-one hub for your social media and webshop content.";
  
  // Extract CTA button data
  const ctaButton = slice.primary?.action_buttons?.[0];
  const ctaText = ctaButton?.button_text || "Learn More";
  
  // Handle button link properly
  let ctaLink = "/about-us";
  if (ctaButton?.button_link) {
    const buttonLink = ctaButton.button_link as any;
    
    // Handle different Prismic link types
    if (buttonLink.link_type === 'Any' && buttonLink.text) {
      ctaLink = buttonLink.text;
    } else if (buttonLink.link_type === 'Web' && buttonLink.url) {
      ctaLink = buttonLink.url;
    } else if (buttonLink.link_type === 'Document' && buttonLink.uid) {
      ctaLink = `/${buttonLink.uid}`;
    } else if (buttonLink.url) {
      ctaLink = buttonLink.url;
    } else if (typeof buttonLink === 'string') {
      ctaLink = buttonLink;
    }
  }

  return (
    <div 
      className="tp-about-3-area pt-120 pb-110"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-11">
            <div className="tp-about-3-title-box">
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  {sectionSubtitle}
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                {sectionTitle}
              </h4>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-4">
            <div className="tp-about-3-shape text-lg-end">
              <Image src={shape} alt="shape" style={{ height: "auto" }} />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="tp-about-3-content">
              {slice.primary?.about_description_field ? (
                renderRichTextParagraphs(slice.primary.about_description_field)
              ) : (
                <>
                  <p className="mb-30 tp_fade_bottom">
                    Streamline your content creation process with our AI-powered Airtable template. Generate stunning images for your social media posts and webshop products in seconds.
                  </p>
                  <p className="mb-45 tp_fade_bottom">
                    Unlimited customization options to perfectly match your brand. Say goodbye to content creation bottlenecks and hello to a world of creative possibilities.
                  </p>
                </>
              )}

              <Link className="tp-btn-black-2 tp_fade_bottom" href={ctaLink}>
                {ctaText}
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
  );
}