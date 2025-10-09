import { Suspense } from "react";
import SliceZone from "../../components/SliceZone";
import { getHomepageData } from "../../lib/prismic-helpers";
import ThemeSetting from "../../components/theme-setting";

function SliceZoneLoading() {
  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-3-content-box text-center p-relative">
              <div className="tp-hero-3-circle-shape">
                <span></span>
              </div>
              <div className="tp-hero-3-title tp_reveal_anim">
                <span className="tp-reveal-line">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function HomepageWithSlices() {
  
  const homepageData = await getHomepageData();
  
  if (!homepageData) {
    return (
      <div className="tp-hero-3-area tp-hero-3-ptb fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-hero-3-content-box text-center p-relative">
                <div className="tp-hero-3-title">
                  <span>No Prismic data found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!homepageData.data.slices) {
    return (
      <div className="tp-hero-3-area tp-hero-3-ptb fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-hero-3-content-box text-center p-relative">
                <div className="tp-hero-3-title">
                  <span>No slices found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <SliceZone slices={homepageData.data.slices} />
      <ThemeSetting />
    </>
  );
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<SliceZoneLoading />}>
        <HomepageWithSlices />
      </Suspense>
    </main>
  );
}