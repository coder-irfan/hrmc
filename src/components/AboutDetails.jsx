import { useTranslation } from "react-i18next";

function AboutDetails({ getDirection }) {
  const { t } = useTranslation();

  return (
    <section
      id="about-page"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-8 pt-4 lg:pb-16 lg:pt-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Content Column: Grid 6 */}
        <div className="lg:col-span-6 order-2 lg:order-1 space-y-4 lg:space-y-6 text-center lg:text-start">
          {/* Title Only */}
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-colors-textDarkColor leading-tight">
            {t("aboutPage.title")}
          </h1>

          {/* Comprehensive Detailed Description */}
          <div className="space-y-4 text-colors-textDarkGray text-base lg:text-lg leading-relaxed text-justify font-body">
            <p>{t("aboutPage.description_p1")}</p>
            <p>{t("aboutPage.description_p2")}</p>
          </div>
        </div>

        {/* Image Column: Grid 6 */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center">
          <img
            src="/images/doctors-operating.webp"
            alt={t("aboutPage.title")}
            loading="lazy"
            className="rounded-xl w-full max-w-lg lg:max-w-none h-64 sm:h-96 lg:h-[400px] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutDetails;
