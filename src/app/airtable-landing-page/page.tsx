"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderFive from "@/layouts/headers/header-five";
import HeroBannerFour from "@/components/hero-banner/hero-banner-four";
import ProjectTwo from "@/components/project/project-two";
import CounterOne from "@/components/counter/counter-one";
import AboutThree from "@/components/about/about-three";
import ServiceFour from "@/components/service/service-four";
import ContactOne from "@/components/contact/contact-one";
import FooterFour from "@/layouts/footers/footer-four";
import { panelOneAnimation } from "@/utils/panel-animation";
import { textInvert } from "@/utils/text-invert";
import { fadeAnimation, revelAnimationOne } from "@/utils/title-animation";
import { projectThreeAnimation } from "@/utils/project-anim";
import { ctaAnimation } from "@/utils/cta-anim";

const AirtableTemplatePage = () => {
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
      panelOneAnimation();
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
            {/* hero area start */}
            <HeroBannerFour />
            {/* hero area end */}

            {/* pinned section start */}
            <ProjectTwo />
            {/* pinned section end */}

            {/* funfact section start */}
            <CounterOne />
            {/* funfact section end */}

            {/* about area start */}
            <AboutThree />
            {/* about area end */}

            {/* service area start */}
            <ServiceFour />
            {/* service area end */}

            {/* contact area start */}
            <ContactOne />
            {/* contact area end */}
          </main>

          {/* footer area */}
          <FooterFour />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default AirtableTemplatePage;
