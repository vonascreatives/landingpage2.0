'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { ServiceFourSlice } from "./model";
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../../src/components/svg";

import defaultIcon from '@/assets/img/home-03/service/sv-icon-1.png';

export interface ServiceFourProps {
  slice: ServiceFourSlice;
}

function getRichTextContent(field: any): string {
  if (!field) return '';
  
  if (typeof field === 'string') return field;
  
  if (Array.isArray(field)) {
    return field.map((block: any) => {
      if (block.text) return block.text;
      return '';
    }).join(' ');
  }
  
  if (field.text) return field.text;
  
  return '';
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

function getLinkUrl(link: any): string {
  if (!link) return '/service';
  
  if (prismic.isFilled.link(link)) {
    if (link.link_type === 'Web') {
      return (link as any).url || '/service';
    } else if (link.link_type === 'Document') {
      return `/${(link as any).uid}` || '/service';
    }
  }
  
  if (link.link_type === 'Any' && (link as any).text) {
    return (link as any).text;
  }
  
  return '/service';
}

const defaultServices = [
  {
    id: 1,
    title: "AI Image Generation",
    desc: "Generate stunning, high-quality images for your social media and webshop content with the power of AI. No design skills required.",
    category: ["AI-Powered", "Content Creation", "Social Media"],
    buttonText: "See Details",
    link: "/service"
  },
  {
    id: 2,
    title: "All-in-one Hub",
    desc: "Manage all your content in one place. From idea to publication, our Airtable template streamlines your entire workflow.",
    category: ["Airtable", "Workflow", "Organization"],
    buttonText: "See Details",
    link: "/service"
  },
  {
    id: 3,
    title: "Unlimited Customization",
    desc: "Customize the template to your heart's content. Adapt it to your brand, your workflow, and your unique needs. The possibilities are endless.",
    category: ["Customizable", "Branding", "No-Code"],
    buttonText: "See Details",
    link: "/service"
  },
];

export default function ServiceFour({ slice }: ServiceFourProps) {

const sectionSubtitle = slice.primary?.section_subtitle || "Our approach";
  const sectionTitle = getRichTextContent(slice.primary?.section_title) || "Creative development studio";
  const sectionSpacing = slice.primary?.section_spacing || "default";
  const layoutStyle = slice.primary?.layout_style || "default";
  const showIcons = slice.primary?.show_icons !== false; 

  const serviceItems = slice.primary?.service_items || [];
  const serviceData = serviceItems.length > 0 
    ? serviceItems.map((item: any, index: number) => {

        const categories = [
          item.category_1,
          item.category_2, 
          item.category_3
        ].filter(Boolean); 

        return {
          id: index + 1,
          title: item.service_title || defaultServices[index]?.title || "Service Title",
          desc: getRichTextHTML(item.service_description) || defaultServices[index]?.desc || "Service description",
          category: categories.length > 0 ? categories : defaultServices[index]?.category || [],
          buttonText: item.service_button_text || defaultServices[index]?.buttonText || "See Details",
          link: getLinkUrl(item.service_link) || defaultServices[index]?.link || "/service"
        };
      })
    : defaultServices.map((service, index) => ({
        ...service
      }));


  const spacingClass = {
    default: 'pt-130 pb-130',
    large: 'pt-160 pb-160',
    compact: 'pt-80 pb-80'
  }[sectionSpacing];

  const layoutClass = {
    default: '',
    compact: 'tp-service-compact',
    expanded: 'tp-service-expanded'
  }[layoutStyle];

  return (
    <div 
      className={`tp-service-3-area ${spacingClass} ${layoutClass}`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="tp-service-3-title-box mb-60 p-relative">
              {showIcons && (
                <div className="tp-service-3-icon">
                  <Image src={defaultIcon} alt="Service icon" />
                </div>
              )}
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
                {sectionTitle.includes('<br>') || sectionTitle.includes('\n') ? (
                  <span dangerouslySetInnerHTML={{ __html: sectionTitle.replace(/\n/g, '<br />') }} />
                ) : sectionTitle.includes(' ') ? (
                  <>
                    {sectionTitle.split(' ').slice(0, -1).join(' ')} <br />
                    {sectionTitle.split(' ').slice(-1)[0]}
                  </>
                ) : (
                  sectionTitle
                )}
              </h4>
            </div>
          </div>
        </div>

        {serviceData.map((item: any) => (
          <div key={item.id} className="tp-service-3-wrap tp_fade_bottom">
            <div className="row align-items-start">
              <div className="col-xl-3 col-lg-3">
                <div className="tp-service-3-title-box">
                  <h4 className="tp-service-3-title">
                    <Link href={item.link}>{item.title}</Link>
                  </h4>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7">
                <div className="tp-service-3-content">
                  <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                  {item.category && item.category.length > 0 && (
                    <div className="tp-service-3-category">
                      {item.category.map((c: any, i: number) => (
                        <span key={i}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-2 col-lg-2">
                <div className="tp-service-3-btn-box text-start text-md-end">
                  <Link
                    className="tp-btn-zikzak-sm p-relative"
                    href={item.link}
                  >
                    <span className="zikzak-content">
                      {item.buttonText.includes(' ') ? (
                        <>
                          {item.buttonText.split(' ').slice(0, -1).join(' ')} <br />
                          {item.buttonText.split(' ').slice(-1)[0]}
                        </>
                      ) : (
                        item.buttonText
                      )}
                      <RightArrow clr="currentColor" />
                    </span>
                    <span>
                      <SvgBg />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}