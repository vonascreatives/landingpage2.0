'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import * as prismic from "@prismicio/client";
import { CounterOneSlice } from "./model";
import CounterItem from '../../src/components/counter/counter-item';

// Default images (fallback)
import marque_1 from '@/assets/img/home-05/marque/marque-1.jpg';
import marque_2 from '@/assets/img/home-05/marque/marque-2.jpg';
import marque_3 from '@/assets/img/home-05/marque/marque-3.jpg';
import marque_4 from '@/assets/img/home-05/marque/marque-4.jpg';
import marque_5 from '@/assets/img/home-05/marque/marque-5.jpg';
import marque_6 from '@/assets/img/home-05/marque/marque-6.jpg';
import marque_7 from '@/assets/img/home-05/marque/marque-7.jpg';
import marque_8 from '@/assets/img/home-05/marque/marque-8.jpg';
import marque_9 from '@/assets/img/home-05/marque/marque-9.jpg';

export interface CounterOneProps {
  slice: CounterOneSlice;
}

const defaultImages = [
  marque_1, marque_2, marque_3, marque_4, marque_5,
  marque_6, marque_7, marque_8, marque_9
];

const defaultCounters = [
  { value: 235, label: "Projects Finished", suffix: "+", min: 0 },
  { value: 12, label: "Years of Experience", suffix: "+", min: 0 },
  { value: 140, label: "Clients Worldwide", suffix: "+", min: 0 }
];

function MarqueImage({ src, alt = "marque-img" }: { 
  src: StaticImageData | string, 
  alt?: string 
}) {
  return (
    <Image 
      src={src} 
      alt={alt} 
      style={{ height: 'auto' }}
      width={400}
      height={300}
    />
  );
}

function PrismicMarqueImage({ 
  imageField, 
  alt = "marque-img" 
}: { 
  imageField: prismic.ImageField | null | undefined, 
  alt?: string 
}) {
  if (!imageField || !prismic.isFilled.image(imageField)) {
    return null;
  }

  return (
    <Image
      src={imageField.url}
      alt={imageField.alt || alt}
      width={imageField.dimensions?.width || 400}
      height={imageField.dimensions?.height || 300}
      style={{ height: 'auto' }}
    />
  );
}

export default function CounterOne({ slice }: CounterOneProps) {
  const enableBackgroundImages = slice.primary?.enable_background_images !== false;
  const backgroundStyle = slice.primary?.background_style || "default";
  const sectionSpacing = slice.primary?.section_spacing || "default";
  const customImages = slice.primary?.custom_background_images || [];

  const useCustomImages = backgroundStyle === "custom" && customImages.length > 0;
  const backgroundImages = useCustomImages ? customImages : defaultImages;

  const counterItems = slice.primary?.counter_items || [];
  const counterData = counterItems.length > 0 
    ? counterItems.map((item: any, index: number) => ({
        value: item.counter_value || defaultCounters[index]?.value || 0,
        label: item.counter_label || defaultCounters[index]?.label || "Counter",
        suffix: item.counter_suffix || defaultCounters[index]?.suffix || "",
        min: item.counter_min_value || defaultCounters[index]?.min || 0
      }))
    : defaultCounters;

  const spacingClass = {
    default: '',
    large: 'pt-160 pb-160',
    compact: 'pt-80 pb-80'
  }[sectionSpacing];

  return (
    <div 
      className={`slide-funfact-height slide-funfact p-relative d-flex align-items-center justify-content-center ${spacingClass}`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {(enableBackgroundImages && backgroundStyle !== "none") && (
        <div className="img-marq slide-funfact-overlay">
          <div className="middle-shadow">
            <span></span>
          </div>
          
          <div className="slide-img-left">
            <div className="box">
              {useCustomImages ? (
                backgroundImages.map((imgItem: any, i: number) => (
                  <PrismicMarqueImage 
                    key={`left-1-${i}`}
                    imageField={imgItem.background_image}
                    alt={imgItem.image_alt_text || `Background image ${i + 1}`}
                  />
                ))
              ) : (
                defaultImages.map((img, i) => (
                  <MarqueImage key={`left-1-${i}`} src={img} />
                ))
              )}
            </div>
            <div className="box">
              {useCustomImages ? (
                backgroundImages.map((imgItem: any, i: number) => (
                  <PrismicMarqueImage 
                    key={`left-2-${i}`}
                    imageField={imgItem.background_image}
                    alt={imgItem.image_alt_text || `Background image ${i + 1}`}
                  />
                ))
              ) : (
                defaultImages.map((img, i) => (
                  <MarqueImage key={`left-2-${i}`} src={img} />
                ))
              )}
            </div>
          </div>

          <div className="slide-img-right">
            <div className="box">
              {useCustomImages ? (
                backgroundImages.map((imgItem: any, i: number) => (
                  <PrismicMarqueImage 
                    key={`right-1-${i}`}
                    imageField={imgItem.background_image}
                    alt={imgItem.image_alt_text || `Background image ${i + 1}`}
                  />
                ))
              ) : (
                defaultImages.map((img, i) => (
                  <MarqueImage key={`right-1-${i}`} src={img} />
                ))
              )}
            </div>
            <div className="box">
              {useCustomImages ? (
                backgroundImages.map((imgItem: any, i: number) => (
                  <PrismicMarqueImage 
                    key={`right-2-${i}`}
                    imageField={imgItem.background_image}
                    alt={imgItem.image_alt_text || `Background image ${i + 1}`}
                  />
                ))
              ) : (
                defaultImages.map((img, i) => (
                  <MarqueImage key={`right-2-${i}`} src={img} />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="slide-funfact-wrap">
        <div>
          <div className="container">
            <div className="row">
              {counterData.map((counter, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-4 mb-30">
                  <div className="slide-funfact-item text-center">
                    <h4>
                      <CounterItem min={counter.min} max={counter.value} />
                      {counter.suffix}
                    </h4>
                    <span>{counter.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}