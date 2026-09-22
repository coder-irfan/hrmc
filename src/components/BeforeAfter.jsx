import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { getAllBeforeAfter } from "../sanity/beforeAfterQuery";

export default function BeforeAfter({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCases = async () => {
      try {
        const data = await getAllBeforeAfter();
        if (isMounted) {
          setItems(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Error fetching all Before & After cases from Sanity:",
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

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-8 pt-4 lg:pb-16 lg:pt-10"
    >
      <div className="mx-auto space-y-8 lg:space-y-12 px-4 sm:px-6 xl:px-12 py-8 lg:py-14 bg-colors-primary-50 rounded-xl">
        {/* Section Header */}
        <SectionHeading title={t("allBeforeAfterTitle")} />

        {/* Loading Skeleton Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
          /* 3-Column Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <BeforeAfterSlider
                key={item._id}
                item={item}
                lang={lang}
                isRTL={isRTL}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
