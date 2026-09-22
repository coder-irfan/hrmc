import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import CarouselWrapper from "./CarouselWrapper";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { getHomeBeforeAfter } from "../sanity/beforeAfterQuery";

export default function HomeBeforeAfter({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCases = async () => {
      try {
        const data = await getHomeBeforeAfter();
        if (isMounted) {
          setItems(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Error fetching Before & After cases from Sanity:",
          error,
        );
        if (isMounted) setLoading(false);
      }
    };

    fetchCases();
    return () => {
      isMounted = false;
    };
  }, []);

  const carouselBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 12 },
    640: { slidesPerView: 2, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    1280: { slidesPerView: 3, spaceBetween: 24 },
  };

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pt-10 pb-16 pt-20 lg:pb-24"
    >
      <div className="mx-auto space-y-8 lg:space-y-12 py-8 lg:py-14 px-4 sm:px-6 xl:px-12 bg-colors-primary-50 rounded-xl">
        {/* Section Header */}
        <SectionHeading title={t("beforeAfterTitle")} />

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full h-64 sm:h-72 lg:h-80 rounded-xl bg-colors-textLightGray/40 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-colors-bg rounded-xl border border-dashed border-colors-primary-200">
            <p className="font-body text-description text-colors-textDarkGray">
              {t("noBeforeAfter")}
            </p>
          </div>
        ) : (
          /* Carousel with 8 max items */
          <CarouselWrapper
            items={items}
            getDirection={getDirection}
            breakpoints={carouselBreakpoints}
            autoplay={false}
            showNavigation={true}
            showPagination={true}
            renderItem={(item) => (
              <BeforeAfterSlider item={item} lang={lang} isRTL={isRTL} />
            )}
          />
        )}
      </div>
    </section>
  );
}
