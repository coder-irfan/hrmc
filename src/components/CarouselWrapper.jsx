import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  EffectFade,
} from "swiper/modules";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function CarouselWrapper({
  items = [],
  renderItem,
  getDirection,
  // Customization Props & Defaults
  slidesPerView = 1,
  spaceBetween = 14,
  breakpoints = null,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnMouseEnter = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
  effect = "slide", // 'slide' or 'fade'
  className = "",
  slideClassName = "",
}) {
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  // Unique key generated per instance for Swiper custom navigation binding
  const uniqueId = React.useId().replace(/:/g, "");
  const prevElClass = `swiper-prev-${uniqueId}`;
  const nextElClass = `swiper-next-${uniqueId}`;
  const pagElClass = `swiper-pag-${uniqueId}`;

  // Fallback responsive breakpoints if none provided
  const defaultBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 8 },
    640: { slidesPerView: Math.min(2, slidesPerView), spaceBetween: 10 },
    1024: { slidesPerView: Math.min(3, slidesPerView), spaceBetween: 12 },
    1280: { slidesPerView: slidesPerView, spaceBetween: spaceBetween },
  };

  return (
    <div className={`relative group w-full ${className}`}>
      {/* Swiper Instance */}
      <Swiper
        key={isRTL ? "swiper-rtl" : "swiper-ltr"}
        dir={isRTL ? "rtl" : "ltr"}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        effect={effect}
        loop={items.length > 1 ? loop : false}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints || defaultBreakpoints}
        autoplay={
          autoplay && items.length > 1
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: pauseOnMouseEnter,
              }
            : false
        }
        navigation={{
          prevEl: `.${prevElClass}`,
          nextEl: `.${nextElClass}`,
        }}
        pagination={
          showPagination
            ? {
                el: `.${pagElClass}`,
                clickable: true,
                bulletActiveClass: "!bg-colors-primary-500 !w-8 !rounded-full",
              }
            : false
        }
        className="w-full "
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={item._id || item.id || index}
            className={slideClassName}
          >
            {renderItem ? renderItem(item, index) : null}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      {showNavigation && items.length > 1 && (
        <>
          {/* Previous Button (Start side) */}
          <button
            aria-label="Previous Slide"
            className={`${prevElClass} absolute top-1/2 -translate-y-1/2 -start-2 lg:-start-5 z-20 w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-colors-bg/90 hover:bg-colors-primary-500 text-colors-textDarkColor hover:text-colors-textLightColor shadow-sm hover:shadow-md border border-colors-primary-100 flex items-center justify-center transition-all duration-300 transform disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {isRTL ? (
              <LucideChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            ) : (
              <LucideChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
          </button>

          {/* Next Button (End side) */}
          <button
            aria-label="Next Slide"
            className={`${nextElClass} absolute top-1/2 -translate-y-1/2 -end-2 lg:-end-5 z-20 w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-colors-bg/90 hover:bg-colors-primary-500 text-colors-textDarkColor hover:text-colors-textLightColor shadow-sm hover:shadow-md border border-colors-primary-100 flex items-center justify-center transition-all duration-300 transform disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {isRTL ? (
              <LucideChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            ) : (
              <LucideChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
          </button>
        </>
      )}

      {/* Custom Pagination Container */}
      {showPagination && items.length > 1 && (
        <div
          className={`${pagElClass} absolute -bottom-10 inset-x-0 z-10 flex items-center justify-center gap-1.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-colors-primary-200 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:cursor-pointer`}
        />
      )}
    </div>
  );
}
