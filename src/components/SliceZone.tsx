import { AllSlices } from "../../prismicio";
import HeroBanner from "../../slices/HeroBanner";
import Gallery from "../../slices/Gallery";

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