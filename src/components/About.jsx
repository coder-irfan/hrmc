import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "./Button";

function About({ getDirection }) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  return (
    <section
      id="about-us"
      dir={getDirection ? getDirection() : "ltr"}
      className="pb-14 md:pb-20 xl:pb-28 px-4 sm:px-6 xl:px-24"
    >
      <div className="bg-colors-primary-50 px-4 pt-8 pb-4 md:pb-6 md:p-6 lg:p-8 rounded-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Text Content Column: Grid 5 */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 lg:space-y-6 text-center lg:text-start">
            {/* Title & Subtitle Only */}
            <div className="space-y-2">
              <p className="text-colors-primaryColorDark font-semibold text-h4 tracking-wider">
                {t("aboutShort.subtitle")}
              </p>
              <h2 className="font-bold text-h2 text-colors-textDarkColor leading-tight">
                {t("aboutShort.title")}
              </h2>
            </div>

            {/* Description (4-5 Lines) */}
            <p className="text-colors-textDarkGray text-description text-justify">
              {t("aboutShort.description")}
            </p>

            {/* Action Buttons */}
            <div className="lg:pt-2 flex flex-wrap items-center justify-center lg:justify-start">
              <Button
                variant="primary"
                icon={isRTL ? FaArrowLeft : FaArrowRight}
                text={t("aboutShort.read_more")}
                to={`/${lang || "fa"}/about`}
              />
            </div>
          </div>

          {/* Image Column: Grid 7 */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex justify-center items-center">
            <img
              src="images/about-image.webp"
              alt={t("aboutShort.title")}
              loading="lazy"
              className="rounded-xl w-full max-w-md lg:max-w-none h-48 sm:h-96 lg:h-[420px] object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
