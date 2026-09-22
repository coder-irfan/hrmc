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
    if (!rect.width) return;

    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    e.stopPropagation();
    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    e.stopPropagation();
    handleMove(e.clientX);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);

    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      /* "swiper-no-swiping" prevents Swiper Carousel from dragging when interacting with this card */
      className="swiper-no-swiping group relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden border border-colors-primary-200/50 shadow-sm hover:shadow-xl transition-all duration-300 select-none bg-colors-primary-100 cursor-ew-resize"
    >
      {/* After Image (Full background layer) */}
      <img
        src={afterUrl}
        alt={`${titleText} After`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image: always card-sized, then visually clipped from the right. */}
      <img
        src={beforeUrl}
        alt={`${titleText} Before`}
        className="absolute inset-0 w-full h-full max-w-none object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Visual Labels */}
      <span className="absolute top-3 start-3 bg-colors-textDarkColor/30 backdrop-blur-md text-colors-textLightColor text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md z-10 pointer-events-none tracking-wider">
        {isRTL ? "بعد" : "Before"}
      </span>
      <span className="absolute top-3 end-3 bg-colors-textDarkColor/30 backdrop-blur-md text-colors-textLightColor text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md z-10 pointer-events-none tracking-wider">
        {isRTL ? "قبل" : "After"}
      </span>

      {/* Drag Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
        }}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 ${isRTL ? "translate-x-1/2 " : ""} start-1/2 w-8 h-8 rounded-full bg-colors-primary-500 text-colors-textLightColor shadow-lg flex items-center justify-center border-2 border-white pointer-events-auto cursor-ew-resize`}
        >
          <LucideGripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Frosted Glass Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-colors-primary-300/30 backdrop-blur-sm border-t border-colors-bg/20 flex items-center justify-center text-colors-textLightColor z-30 pointer-events-none">
        <h3 className="font-title text-h4 md:text-h3 font-semibold truncate leading-snug text-center">
          {titleText}
        </h3>
      </div>
    </div>
  );
}
