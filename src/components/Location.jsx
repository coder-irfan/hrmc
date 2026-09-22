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
      className="px-4 sm:px-6 xl:px-24 pt-4 pb-10 lg:pt-8 lg:pb-16"
    >
      <div className="mx-auto space-y-6 lg:space-y-10">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6573.288617194262!2d69.16485784293835!3d34.53723857990291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16ea4c1a90225%3A0xd23076f1989907e9!2sSherpur%2C%20Kabul%2C%20Afghanistan!5e0!3m2!1sen!2sjp!4v1790039261669!5m2!1sen!2sjp"
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
