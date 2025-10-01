'use client';
import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import * as prismic from "@prismicio/client";
import { GallerySlice } from "./model";
// Default shape images (keep as fallbacks)
import shape_1 from '../../public/assets/img/home-03/gallery/gal-shape-1.png';
import shape_d_1 from '../../public/assets/img/home-03/gallery/gal-shape-dark-1.png';
import shape_2 from '../../public/assets/img/home-03/gallery/gal-shape-2.png';
import shape_d_2 from '../../public/assets/img/home-03/gallery/gal-shape-dark-2.png';

export interface GalleryProps {
  slice: GallerySlice;
}

const imgStyle: CSSProperties = { height: "auto" };

export default function Gallery({ slice }: GalleryProps) {
  const imageSource = slice.primary?.repeatable_zone || slice.items || [];
  const galleryImages = imageSource
    .filter((item: any) => prismic.isFilled.image(item.gallery_image))
    .map((item: any) => ({
      image: item.gallery_image,
      caption: item.image_caption || ""
    }));

  if (galleryImages.length === 0) {
    return (
      <div className="tp-gallery-area fix p-relative">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center py-5">
                <p>No gallery images available. Please add images in Prismic CMS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loopedImages = [...galleryImages, ...galleryImages];
  if (loopedImages.length < 12) {
    while (loopedImages.length < 12) {
      loopedImages.push(...galleryImages);
    }
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="tp-gallery-area fix p-relative">
        <div className="tp-gallery-shape-1">
          <Image className="img-1" src={shape_1} alt="shape" style={imgStyle} />
          <Image className="img-2" src={shape_d_1} alt="shape" style={imgStyle} />
        </div>
        <div className="tp-gallery-shape-2">
          <Image className="img-1" src={shape_2} alt="shape" style={imgStyle} />
          <Image className="img-2" src={shape_d_2} alt="shape" style={imgStyle} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {slice.primary.section_title && (
                <div className="text-center mb-4">
                  <h3>{slice.primary.section_title}</h3>
                </div>
              )}
              <div className="tp-gallery-slider-wrap">
                <div className="swiper-container tp-gallery-slider-active">
                  <Marquee 
                    className="tp-gallery-titming" 
                    speed={70} 
                    direction='left'
                    pauseOnHover={true}
                    gradient={false}
                  >
                    {loopedImages.map((item, index) => (
                      <div 
                        key={index} 
                        className="tp-gallery-item" 
                        style={{ marginRight: '30px', display: 'inline-block' }}
                      >
                        <img
                          src={item.image.url || ''}
                          alt={item.caption || item.image.alt || `Gallery image ${index + 1}`}
                          style={{ 
                            width: '500px', 
                            height: '900px',
                            display: 'block',
                            border: 'none',
                            outline: 'none',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}