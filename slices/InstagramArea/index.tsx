'use client';
import React from "react";
import Image from "next/image";
import * as prismic from "@prismicio/client";
import { InstagramAreaSlice } from "./model";
import { Leaf } from "../../src/components/svg";

import inst_1 from "@/assets/img/home-02/instagram/insta-inner-1.jpg";
import inst_2 from "@/assets/img/home-02/instagram/insta-inner-2.jpg";
import inst_3 from "@/assets/img/home-02/instagram/insta-inner-3.jpg";
import inst_4 from "@/assets/img/home-02/instagram/insta-inner-4.jpg";
import inst_5 from "@/assets/img/home-02/instagram/insta-inner-5.jpg";
import inst_6 from "@/assets/img/home-02/instagram/insta-inner-6.jpg";
import inst_7 from "@/assets/img/home-02/instagram/insta-inner-7.jpg";

export interface InstagramAreaProps {
  slice: InstagramAreaSlice;
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
  
  return '#';
}

export default function InstagramArea({ slice }: InstagramAreaProps) {
  const instagramUsername = slice.primary?.instagram_username || "@likoagency";
  const instagramLink = getLinkUrl(slice.primary?.instagram_link) || "#";
  const sectionTitle = slice.primary?.section_title || "INSTAGRAM";
  const buttonText = slice.primary?.button_text || "Follow Us";
  const centerImageUrl = slice.primary?.center_instagram_image;
  const customImages = slice.primary?.custom_instagram_images || [];

  // Check if center media is a video (checks file extension)
  const isVideo = centerImageUrl && (
    centerImageUrl.toLowerCase().endsWith('.mp4') ||
    centerImageUrl.toLowerCase().endsWith('.webm') ||
    centerImageUrl.toLowerCase().endsWith('.mov') ||
    centerImageUrl.toLowerCase().endsWith('.avi')
  );

  const description = slice.primary?.description
    ? (typeof slice.primary.description === 'string'
        ? slice.primary.description
        : prismic.asText(slice.primary.description))
    : "Become a part of our stories! Join the adventure.";

  const defaultImages = [
    { id: 1, imageUrl: inst_1, isCustom: false },
    { id: 2, imageUrl: inst_2, isCustom: false },
    { id: 3, imageUrl: inst_3, isCustom: false },
    { id: 4, imageUrl: inst_4, isCustom: false },
    { id: 5, imageUrl: inst_5, isCustom: false },
    { id: 6, imageUrl: inst_6, isCustom: false },
    { id: 7, imageUrl: inst_7, isCustom: false },
  ];

  const instagram_images = customImages.length > 0
    ? customImages
        .filter((item: any) => item.instagram_image) // Filter out items without images
        .slice(0, 7)
        .map((item: any, index: number) => ({
          id: index + 1,
          imageUrl: item.instagram_image,
          isCustom: true
        }))
    : defaultImages;

  return (
    <>
      <div className="tp-instagram-area tp-instagram-ptb text-center">
        <div className="tp-instagram-thumb-wrap p-relative">
          {instagram_images.map((item) => (
            <div
              key={item.id}
              className={`tp-instagram-thumb-inner-${item.id} d-none d-xl-block`}
            >
              {item.isCustom && item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt="inst-img"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              ) : item.imageUrl ? (
                <Image src={item.imageUrl} alt="inst-img" />
              ) : null}
            </div>
          ))}
          <div className="tp-instagram-thumb-inner-8 d-none d-xl-block">
            <a href={instagramLink}>
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <div className="tp-instagram-thumb">
            {centerImageUrl ? (
              isVideo ? (
                <video
                  src={centerImageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="instagram-center-video"
                />
              ) : (
                <img
                  src={centerImageUrl}
                  alt="inst-img"
                />
              )
            ) : (
              <img src="/assets/img/home-02/instagram/insta-1.jpg" alt="inst-img"/>
            )}
          </div>

          <div className="tp-instagram-content-wrap text-start">
            <div className="tp-instagram-title-box">
              <span className="tp-instagram-subtitle">{sectionTitle}</span>
              <h4 className="tp-instagram-title">{instagramUsername}</h4>
            </div>
            <div className="tp-instagram-content">
              <p>
                {description}
              </p>
              <a className="tp-btn-white background-black" href={instagramLink}>
                {buttonText}
                <span>
                  <Leaf />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .instagram-center-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-position: center;
          background-size: cover;
          margin: 0 auto;
          display: block;
        }
      `}</style>
    </>
  );
}