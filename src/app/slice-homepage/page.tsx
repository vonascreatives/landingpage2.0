import { Suspense } from "react";
import SliceZone from "../../components/SliceZone";
import { getHomepageData } from "../../lib/prismic-helpers";

// Loading component
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

// Async component to fetch Prismic data
async function HomepageWithSlices() {
  const homepageData = await getHomepageData();
  
  if (!homepageData || !homepageData.data.slices) {
    return (
      <div className="tp-hero-3-area tp-hero-3-ptb fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-hero-3-content-box text-center p-relative">
                <div className="tp-hero-3-title">
                  <span>No content found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return <SliceZone slices={homepageData.data.slices} />;
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