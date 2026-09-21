import { useState, useRef, useCallback } from "react";
import { LucideGripVertical } from "lucide-react";
import { urlFor } from "../sanityClient";

export function BeforeAfterSlider({ item, lang, isRTL }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const titleText = item?.title?.[lang] || item?.title?.en || "";

  const beforeUrl = item?.beforeImage
    ? urlFor(item.beforeImage).width(800).height(600).url()
    : "/images/placeholder-before.jpg";

  const afterUrl = item?.afterImage
    ? urlFor(item.afterImage).width(800).height(600).url()
    : "/images/placeholder-after.jpg";

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      /* "swiper-no-swiping" prevents Swiper Carousel from dragging when interacting with this card */
      className="swiper-no-swiping group relative w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden border border-colors-primary-200/50 shadow-sm hover:shadow-xl transition-all duration-300 select-none bg-colors-primary-100 cursor-ew-resize"
    >
      {/* After Image (Full background layer) */}
      <img
        src={afterUrl}
        alt={`${titleText} After`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped Layer) */}
      <div
        className="absolute inset-y-0 overflow-hidden pointer-events-none"
        style={{
          width: isRTL ? `${100 - sliderPosition}%` : `${sliderPosition}%`,
          left: isRTL ? "auto" : 0,
          right: isRTL ? 0 : "auto",
        }}
      >
        {/* FIXED: Using inset-0, w-full, h-full, object-cover with fixed outer width prevents squishing */}
        <div
          className="absolute inset-y-0 start-0 overflow-hidden pointer-events-none"
          style={{
            width: `${sliderPosition}%`,
          }}
        >
          <img
            src={beforeUrl}
            alt={`${titleText} Before`}
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.getBoundingClientRect().width}px`
                : "100%",
            }}
          />
        </div>
      </div>

      {/* Visual Labels */}
      <span className="absolute top-3 start-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 pointer-events-none uppercase tracking-wider">
        {isRTL ? "بعد" : "Before"}
      </span>
      <span className="absolute top-3 end-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 pointer-events-none uppercase tracking-wider">
        {isRTL ? "قبل" : "After"}
      </span>

      {/* Drag Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 start-1/2 w-8 h-8 rounded-full bg-colors-primary-500 text-colors-textLightColor shadow-lg flex items-center justify-center border-2 border-white pointer-events-auto cursor-ew-resize">
          <LucideGripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Frosted Glass Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-colors-primary-300/30 backdrop-blur-sm border-t border-colors-bg/20 flex items-center justify-center text-colors-textLightColor transition-all duration-300 group-hover:bg-colors-primary-600/30 z-30 pointer-events-none">
        <h3 className="font-title text-h4 md:text-h3 font-semibold truncate leading-snug text-center">
          {titleText}
        </h3>
      </div>
    </div>
  );
}
