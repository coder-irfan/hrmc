import { useTranslation } from "react-i18next";

function WhyUs({ getDirection }) {
  const { t } = useTranslation();

  return (
    <section
      id="why-us"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-8 pt-4 lg:pb-16 lg:pt-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Image Column: Grid 6 (Desktop Left / Mobile Top) */}
        <div className="lg:col-span-6 order-1 flex justify-center items-center">
          <img
            src="/images/hand-shake.webp"
            alt={t("whyUs.title")}
            loading="lazy"
            className="rounded-xl w-full max-w-lg lg:max-w-none h-64 sm:h-96 lg:h-[400px] object-cover shadow-lg"
          />
        </div>

        {/* Text Content Column: Grid 6 (Desktop Right / Mobile Bottom) */}
        <div className="lg:col-span-6 order-2 space-y-4 lg:space-y-6 text-center lg:text-start">
          {/* Title Only */}
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-colors-textDarkColor leading-tight">
            {t("whyUs.title")}
          </h2>

          {/* Detailed Description */}
          <div className="space-y-4 text-colors-textDarkGray text-base lg:text-lg leading-relaxed text-justify font-body">
            <p>{t("whyUs.description_p1")}</p>
            <p>{t("whyUs.description_p2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
