'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { ContactOneSlice } from "./model";
import { ProjectShape, RightArrow } from "../../src/components/svg";

import cta from '@/assets/img/home-03/cta/cta-1.png';

export interface ContactOneProps {
  slice: ContactOneSlice;
}

function getLinkUrl(link: any): string {
  if (!link) return '/contact';
  
  if (prismic.isFilled.link(link)) {
    if (link.link_type === 'Web') {
      return (link as any).url || '/contact';
    } else if (link.link_type === 'Document') {
      return `/${(link as any).uid}` || '/contact';
    }
  }
  
  if (link.link_type === 'Any' && (link as any).text) {
    return (link as any).text;
  }
  
  return '/contact';
}

function getRichTextHTML(field: any): string {
  if (!field) return '';
  
  if (typeof field === 'string') return field;
  
  if (Array.isArray(field)) {
    return field.map((block: any) => {
      if (block.text) return block.text;
      return '';
    }).join(' ');
  }
  
  return '';
}

export default function ContactOne({ slice }: ContactOneProps) {
  const mainTitle = slice.primary?.main_title || "Let's talk";
  const highlightedTitle = slice.primary?.highlighted_title || "about it";
  const description = getRichTextHTML(slice.primary?.description) || "We will collaborate to find the right answer and bring progress to your business and to the world.";
  const contactLink = getLinkUrl(slice.primary?.contact_link);
  const buttonTextLine1 = slice.primary?.button_text_line_1 || "Get";
  const buttonTextLine2 = slice.primary?.button_text_line_2 || "In Touch";
  const sectionSpacing = slice.primary?.section_spacing || "default";
  const backgroundColor = slice.primary?.background_color || "black";
  const showDefaultIcon = slice.primary?.show_default_icon !== false; 

  const spacingClass = {
    default: 'pt-120 pb-120',
    large: 'pt-160 pb-160',
    compact: 'pt-80 pb-80'
  }[sectionSpacing];

  const backgroundClass = {
    black: 'black-bg',
    dark: 'dark-bg',
    custom: 'custom-bg'
  }[backgroundColor];

  return (
    <div 
      className={`tp-cta-area ${backgroundClass} ${spacingClass} z-index fix`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container">
        <div className="col-xl-12">
          <div className="tp-cta-title-box p-relative">
            <h4 className="tp-cta-title cta-text">
              {mainTitle}
              <span>{highlightedTitle}</span>
            </h4>
            <p className="tp_fade_bottom" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
            
            {showDefaultIcon && (
              <div className="tp-cta-icon">
                <Image src={cta} alt="Contact CTA icon" />
              </div>
            )}
            
            <div className="tp-cta-btn-box">
              <Link className="tp-btn-zikzak p-relative" href={contactLink}>
                <span className="zikzak-content">
                  {buttonTextLine1} <br /> {buttonTextLine2}
                  <RightArrow clr="#19191A" />
                </span>
                <ProjectShape />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}