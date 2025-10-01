import { AllSlices } from "../../prismicio";
import HeroBanner from "../../slices/HeroBanner";

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
          default:
            console.warn(`Unknown slice type: ${slice.slice_type}`);
            return (
              <div key={index} style={{ padding: '20px', background: '#f0f0f0' }}>
                Unknown slice type: {slice.slice_type}
              </div>
            );
        }
      })}
    </>
  );
}