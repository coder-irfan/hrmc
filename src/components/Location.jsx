import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";

function Location({ getDirection }) {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <section
      id="location"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-10 lg:pb-16"
    >
      <div className="mx-auto space-y-8 lg:space-y-12 py-8 lg:py-14 px-4 sm:px-6 xl:px-12 bg-colors-primary-50 rounded-xl">
        {/* Section Header */}
        <SectionHeading title={t("locationTitle")} />

        {/* Map Container */}
        <div className="relative w-full h-[300px] lg:h-[420px] overflow-hidden rounded-xl border border-colors-primary-100 shadow-xs">
          {/* Skeleton Layer */}
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex flex-col items-center justify-center gap-4">
              {/* Spinner */}
              <div className="w-8 h-8 border-4 border-colors-primary-600 border-t-transparent rounded-full animate-spin"></div>

              {/* Text */}
              <p className="text-sm md:text-base text-colors-textDarkGray/70 font-medium">
                {t("LoadingMap")}
              </p>
            </div>
          )}

          {/* Google Map iFrame */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3286.508082630121!2d69.171956!3d34.540689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDMyJzI2LjUiTiA2OcKwMTAnMTkuMCJF!5e0!3m2!1sen!2snl!4v1790673980370!5m2!1sen!2snl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={`w-full h-full border-0 transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}

export default Location;
