'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { HeroBannerDocumentData } from "../../types/prismic-types";

interface HeroBannerFourProps {
  data?: HeroBannerDocumentData;
}

const renderRichText = (field: prismic.RichTextField) => {
  if (!prismic.isFilled.richText(field)) return "";
  return prismic.asText(field);
};

const getLinkUrl = (field: prismic.LinkField) => {
  if (!prismic.isFilled.link(field)) return "/contact";
  
  const fieldAsAny = field as any;
  
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

export default function HeroBannerFour({ data }: HeroBannerFourProps) {
  // Extract content with fallbacks
  const title = data?.title ? renderRichText(data.title) : "Transform Your Workflow with AI-Powered Airtable Templates";
  const subtitle = data?.subtitle ? renderRichText(data.subtitle) : "Beautiful AI Images for Social Media & Webshops";
  const buttonText = data?.button_text || "Get Your Template";
  const buttonUrl = data?.button_link ? getLinkUrl(data.button_link) : "/contact";

  const titleLines = title.split(' ').length > 4 
    ? [title.substring(0, title.indexOf(' ', title.length / 2)), title.substring(title.indexOf(' ', title.length / 2) + 1)]
    : [title];

  return (
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
  );
}
