import { AllSlices } from "../../prismicio";
import HeroBanner from "../../slices/HeroBanner";
import Gallery from "../../slices/Gallery";
import About from "../../slices/About";
import ProjectFourSlice from '../../slices/ProjectFour';
import CounterOneSlice from '../../slices/CounterOne';
import ServiceFourSlice from '../../slices/ServiceFour';


interface SliceZoneProps {
  slices: AllSlices[];
}

export default function SliceZone({ slices }: SliceZoneProps) {
  return (
    <>
      {slices.map((slice, index) => {
        switch (slice.slice_type) {
          case "hero_section": 
            return <HeroBanner key={index} slice={slice} />;
          case "gallery": 
            return <Gallery key={index} slice={slice} />;
          case "about":
            return <About key={index} slice={slice} />;
          case "project_four":
            return <ProjectFourSlice key={index} slice={slice} />;
          case "counter_one":
            return <CounterOneSlice key={index} slice={slice} />;
          case "service_four":
            return <ServiceFourSlice key={index} slice={slice} />;
          default:
            const unknownSlice = slice as { slice_type: string };
            console.warn(`Unknown slice type: ${unknownSlice.slice_type}`);
            return (
              <div key={index} style={{ padding: '20px', background: '#f0f0f0' }}>
                Unknown slice type: {unknownSlice.slice_type}
              </div>
            );
        }
      })}
    </>
  );
}