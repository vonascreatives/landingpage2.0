"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "../hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "../plugins";
import { useGSAP } from "@gsap/react";

import Wrapper from "../layouts/wrapper";
import HeaderFive from "../layouts/headers/header-five";
import SliceZone from "../components/SliceZone";
import GalleryOne from "../components/gallery/gallery-one";
import AboutThree from "../components/about/about-three";
import BrandThree from "../components/brand/brand-three";
import ProjectFour from "../components/project/project-four";
import CounterOne from "../components/counter/counter-one";
import ServiceFour from "../components/service/service-four";
import InstagramArea from "../components/instagram/instagram-area";
import ContactOne from "../components/contact/contact-one";
import { textInvert } from "../utils/text-invert";
import { fadeAnimation, revelAnimationOne } from "../utils/title-animation";
import { projectThreeAnimation } from "../utils/project-anim";
import { ctaAnimation } from "../utils/cta-anim";
import { instagramAnim } from "../utils/instagram-anim";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

interface HomepageClientProps {
  homepageData: any;
}

export default function HomepageClient({ homepageData }: HomepageClientProps) {
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
            {/* Prismic hero area start */}
            {homepageData?.data?.slices ? (
              <SliceZone slices={homepageData.data.slices} />
            ) : (
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
            )}
            {/* Prismic hero area end */}

            {/* gallery area start */}
            <GalleryOne />
            {/* gallery area end */}

            {/* about area start */}
            <AboutThree />
            {/* about area end */}

            {/* brand area start */}
            <BrandThree />
            {/* brand area end */}

            {/* project area start */}
            <ProjectFour />
            {/* project area end */}

            {/* counter area start */}
            <CounterOne />
            {/* counter area end */}

            {/* service area start */}
            <ServiceFour />
            {/* service area end */}

            {/* instagram area start */}
            <InstagramArea />
            {/* instagram area end */}

            {/* contact area start */}
            <ContactOne />
            {/* contact area end */}
          </main>
        </div>
      </div>
    </Wrapper>
  );
}