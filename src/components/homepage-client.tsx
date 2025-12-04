"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "../hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "../plugins";
import { useGSAP } from "@gsap/react";

import Wrapper from "../layouts/wrapper";
import HeaderFive from "../layouts/headers/header-five";
import SliceZone from "../components/SliceZone";
import AboutThree from "../components/about/about-three";
import BrandThree from "../components/brand/brand-three";
import ProjectFour from "../components/project/project-four";
import CounterOne from "../components/counter/counter-one";
import ServiceFour from "../components/service/service-four";
import InstagramArea from "../components/instagram/instagram-area";
import ContactOne from "../components/contact/contact-one";
import BrandListSection from "../components/brand-list-section";
import { textInvert } from "../utils/text-invert";
import { fadeAnimation, revelAnimationOne } from "../utils/title-animation";
import { projectThreeAnimation } from "../utils/project-anim";
import { ctaAnimation } from "../utils/cta-anim";
import { instagramAnim } from "../utils/instagram-anim";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

interface HomepageClientProps {
  homepageData: any;
  allPages?: any[];
}

export default function HomepageClient({ homepageData, allPages = [] }: HomepageClientProps) {
  useScrollSmooth();
  
  useEffect(() => {
    document.body.classList.add("tp-smooth-scroll");
    return () => {
      document.body.classList.remove("tp-smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      revelAnimationOne();
      projectThreeAnimation();
      ctaAnimation();
      textInvert();
      instagramAnim();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderFive />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Prismic content slices start */}
            {homepageData?.data?.slices ? (
              <>
                {/* Render hero and other slices (excluding counter_one, service_four, project_four, instagram_area, and contact_one) */}
                {homepageData.data.slices.map((slice: any, index: number) => {
                  // Only render hero, gallery, about and other slices, but NOT counter_one, service_four, project_four, instagram_area, or contact_one
                  if (slice.slice_type !== 'project_four' && 
                      slice.slice_type !== 'counter_one' && 
                      slice.slice_type !== 'service_four' &&
                      slice.slice_type !== 'instagram_area' &&
                      slice.slice_type !== 'contact_one') {
                    return <SliceZone key={index} slices={[slice]} />;
                  }
                  return null;
                })}
                
                {/* brand area start */}
                <BrandThree />
                {/* brand area end */}
                
                {/* Render ProjectFour slice after BrandThree */}
                {homepageData.data.slices
                  .filter((slice: any) => slice.slice_type === 'project_four')
                  .map((slice: any, index: number) => (
                    <SliceZone key={`project-${index}`} slices={[slice]} />
                  ))
                }
              </>
            ) : (
              <>
                <div className="tp-hero-3-area tp-hero-3-ptb fix">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="tp-hero-3-content-box text-center p-relative">
                          <div className="tp-hero-3-title">
                            <span>Loading hero content...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* brand area start */}
                <BrandThree />
                {/* brand area end */}
              </>
            )}
            {/* Prismic content slices end */}

            {/* Render CounterOne, ServiceFour, InstagramArea, and ContactOne slices after ProjectFour */}
            {homepageData?.data?.slices && (
              <>
                {homepageData.data.slices
                  .filter((slice: any) => slice.slice_type === 'counter_one')
                  .map((slice: any, index: number) => (
                    <SliceZone key={`counter-${index}`} slices={[slice]} />
                  ))
                }
                {homepageData.data.slices
                  .filter((slice: any) => slice.slice_type === 'service_four')
                  .map((slice: any, index: number) => (
                    <SliceZone key={`service-${index}`} slices={[slice]} />
                  ))
                }
                {homepageData.data.slices
                  .filter((slice: any) => slice.slice_type === 'instagram_area')
                  .map((slice: any, index: number) => (
                    <SliceZone key={`instagram-${index}`} slices={[slice]} />
                  ))
                }
                {homepageData.data.slices
                  .filter((slice: any) => slice.slice_type === 'contact_one')
                  .map((slice: any, index: number) => (
                    <SliceZone key={`contact-${index}`} slices={[slice]} />
                  ))
                }
              </>
            )}

            {/* Brand Pages List - Removed as requested */}
            {/* {allPages && allPages.length > 0 && (
              <BrandListSection pages={allPages} />
            )} */}

            {/* Static fallbacks if no Prismic slices configured */}
            {(!homepageData?.data?.slices ||
              !homepageData.data.slices.some((slice: any) => slice.slice_type === 'instagram_area')) && (
              <>
                {/* instagram area start */}
                <InstagramArea />
                {/* instagram area end */}
              </>
            )}

            {(!homepageData?.data?.slices || 
              !homepageData.data.slices.some((slice: any) => slice.slice_type === 'contact_one')) && (
              <>
                {/* contact area start */}
                <ContactOne />
                {/* contact area end */}
              </>
            )}
          </main>
        </div>
      </div>
    </Wrapper>
  );
}