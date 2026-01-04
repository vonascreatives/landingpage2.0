'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { ProjectFourSlice } from "./model";

import { ProjectShape, RightArrow } from "../../src/components/svg";

export interface ProjectFourProps {
  slice: ProjectFourSlice;
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

function getLinkUrl(link: any): string {
  if (!link) return '#';

  if (prismic.isFilled.link(link)) {
    if (link.link_type === 'Web') {
      return (link as any).url || '#';
    } else if (link.link_type === 'Document') {
      return `/${(link as any).uid}` || '#';
    }
  }

  if (link.link_type === 'Any' && (link as any).text) {
    return (link as any).text;
  }

  return '#';
}

export default function ProjectFour({ slice }: ProjectFourProps) {

  const sectionTitle = getRichTextContent(slice.primary?.section_title) || "Latest Projects";
  const showHeader = slice.primary?.show_header !== false;
  const viewAllLink = getLinkUrl(slice.primary?.view_all_projects_link) || "/portfolio-wrapper";
  const viewAllButtonText = slice.primary?.view_all_button_text || "Learn More";
  const isStyle2 = slice.primary?.style_variant === "style_2";

  const defaultProjects = [
    {
      id: 1,
      meta: "DEC 2024 . Creative",
      title: "Pellente dapibus",
      link: "/portfolio-details-1"
    },
    {
      id: 2,
      meta: "NOV 2024 . Creative",
      title: "Chania tourism",
      link: "/portfolio-details-1"
    },
    {
      id: 3,
      meta: "OCT 2024 . Creative",
      title: "Fashion sentence",
      link: "/portfolio-details-1"
    },
    {
      id: 4,
      meta: "SEP 2024 . Creative",
      title: "Fashion sentence",
      link: "/portfolio-details-1"
    }
  ];

  const itemsData = slice.items && slice.items.length > 0
    ? slice.items
    : (slice.primary as any)?.repeatable_items || [];


  const projectData = itemsData && itemsData.length > 0
    ? itemsData.map((item: any, index: number) => {

      const mappedItem = {
        id: index + 1,
        img_1: item.project_image_1,
        img_2: item.project_image_2,
        meta: item.project_meta || defaultProjects[index]?.meta || "Creative",
        title: item.project_title || defaultProjects[index]?.title || "Project Title",
        link: getLinkUrl(item.project_link) || defaultProjects[index]?.link || "/portfolio-details-1",
        buttonText: item.project_button_text || "Learn More"
      };

      return mappedItem;
    })
    : defaultProjects.map((project, index) => ({
      id: project.id,
      img_1: null,
      img_2: null,
      meta: project.meta,
      title: project.title,
      link: project.link,
      buttonText: "Learn More"
    }));

  return (
    <div
      className={`tp-project-3-area ${isStyle2 ? "pt-60 pw-project-style" : "pt-130 black-bg"}`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container container-1720">
        {showHeader && !isStyle2 && (
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
                <h4 className="tp-section-title-200 tp_reveal_anim">
                  {sectionTitle && sectionTitle !== "Latest Projects" ? (
                    sectionTitle.includes(' ') && sectionTitle.split(' ').length > 1 ? (
                      <>
                        {sectionTitle.split(' ').slice(0, -1).join(' ')}{' '}
                        <span>{sectionTitle.split(' ').slice(-1)[0]}</span>
                      </>
                    ) : (
                      <>
                        Latest <span>{sectionTitle}</span>
                      </>
                    )
                  ) : (
                    <>
                      Latest <span>Projects</span>
                    </>
                  )}
                </h4>
                <div className="tp-project-3-btn-box">
                  <Link
                    className="tp-btn-zikzak p-relative"
                    href={viewAllLink}
                  >
                    <span className="zikzak-content">
                      {viewAllButtonText.includes(' ') ? (
                        <>
                          {viewAllButtonText.split(' ').slice(0, -1).join(' ')} <br /> {viewAllButtonText.split(' ').slice(-1)[0]}
                        </>
                      ) : (
                        viewAllButtonText
                      )}
                      <RightArrow clr="#19191A" />
                    </span>
                    <ProjectShape />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xl-12">
            {projectData.map((item: any, i: number) => (
              <div key={item.id} className="tp-project-3-wrap">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="tp-project-3-thumb pro-img-1">
                      {item.img_1 ? (
                        <Image
                          src={item.img_1}
                          alt="Project image"
                          width={400}
                          height={300}
                          style={{
                            width: '100%',
                            height: '800px',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div className="placeholder-image" style={{
                          width: '100%',
                          height: '800px',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666'
                        }}>
                          Image {i * 2 + 1}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                    <div className="tp-project-3-content text-center project-content-enhanced">
                      <span className="tp-project-3-meta project-meta-enhanced">{item.meta}</span>
                      <h4 className="tp-project-3-title-sm project-title-enhanced">
                        Before <br />&<br /> After
                      </h4>
                      <Link
                        className="tp-btn-project-sm project-btn-enhanced"
                        href={item.link}
                      >
                        {item.buttonText}
                      </Link>
                    </div>
                    <div className="tp-project-3-border color-1 text-center">
                      <span></span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 order-0 order-lg-0">
                    <div className="tp-project-3-thumb pro-img-2">
                      {item.img_2 ? (
                        <Image
                          src={item.img_2}
                          alt="Project image"
                          width={400}
                          height={300}
                          style={{
                            width: '100%',
                            height: '800px',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div className="placeholder-image" style={{
                          width: '100%',
                          height: '800px',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666'
                        }}>
                          Image {i * 2 + 2}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Typography Styles */}
      <style jsx>{`
        .project-content-enhanced {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 800px;
          gap: 24px;
        }

        .project-meta-enhanced {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
          display: block;
        }

        .project-title-enhanced {
          margin: 0 !important;
          padding: 0 20px;
          line-height: 1.25 !important;
          max-width: 100%;
        }

        .project-title-link {
          font-size: 48px !important;
          font-weight: 900 !important;
          letter-spacing: -0.5px;
          color: #ffffff !important;
          text-decoration: none;
          display: block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1.2 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        }

        .project-title-link:hover {
          color: rgba(255, 255, 255, 0.8) !important;
          transform: translateY(-2px);
        }

        .project-btn-enhanced {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 14px 32px;
          margin-top: 16px;
          transition: all 0.3s ease;
        }

        .project-btn-enhanced:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Typography */
        @media (max-width: 1400px) {
          .project-title-link {
            font-size: 42px !important;
          }
        }

        @media (max-width: 1200px) {
          .project-title-link {
            font-size: 38px !important;
          }
          
          .project-content-enhanced {
            min-height: 600px;
            padding: 30px 15px;
          }
        }

        @media (max-width: 991px) {
          .project-title-link {
            font-size: 44px !important;
          }
          
          .project-content-enhanced {
            min-height: auto;
            padding: 60px 20px;
          }
        }

        @media (max-width: 767px) {
          .project-title-link {
            font-size: 36px !important;
          }
          
          .project-meta-enhanced {
            font-size: 10px;
            letter-spacing: 2px;
          }
          
          .project-btn-enhanced {
            font-size: 12px;
            padding: 12px 28px;
          }
        }

        @media (max-width: 575px) {
          .project-title-link {
            font-size: 32px !important;
          }
          
          .project-content-enhanced {
            padding: 50px 15px;
          }
        }
      `}</style>
    </div>
  );
}