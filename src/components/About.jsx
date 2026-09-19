import { useTranslation } from "react-i18next";
import { LucideDownload } from "lucide-react";

function About({ getDirection }) {
  const { t } = useTranslation();
  const isRTL = getDirection() === "rtl";

  return (
    <>
      <section
        id="about-us"
        dir={getDirection()}
        className="py-14 md:py-20 xl:py-28 px-1 md:px-6 lg:px-16"
      >
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 bg-colors-secondBg p-6 md:p-10 lg:p-10 xl:p-8
          rounded-2xl relative"
        >
          <img
            src="/images/hat.webp"
            alt="hat"
            loading="lazy"
            decoding="async"
            className="absolute -top-8 w-20 end-0 md:w-20 md:-top-12 xl:-top-16 lg:end-6 lg:w-28"
          />
          <div
            className={`max-w-[500px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-xl mx-auto space-y-4 lg:space-y-6 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <div className="space-y-2">
              <div
                className={`inline-block tracking-wider ${isRTL ? "border-r-4" : "border-l-4"} border-colors-primaryColorDarkesh`}
              >
                <p className="mx-4 font-medium md:text-lg lg:text-xl">
                  {t("aboutTag")}
                </p>
              </div>

              <h2 className="font-bold  text-h2 md:leading-[1.3]">
                {t("aboutTitle")}
                <span className="text-colors-primaryColorDark">
                  {" "}
                  {t("aboutName")}
                </span>
              </h2>
            </div>

            <p
              className={`text-colors-textDarkGray text-center md:text-justify text-description ${isRTL ? "md:pr-0" : "md:pr-10"}`}
            >
              {t("aboutDescription")}
            </p>

            <div className="lg:pt-4 flex items-center justify-center md:justify-start">
              <a
                href="/BEZ Company Profile 02.pdf"
                download="BEZ Company Profile 02.pdf"
                className="button"
              >
                <LucideDownload className="w-4 h-4" />
                <span>{t("downloadProfile")}</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-4 md:gap-x-6 xl:gap-x-8">
            <img
              src="/images/about-us.jpg"
              alt="burj zamin building"
              loading="lazy"
              decoding="async"
              className="rounded-lg w-[500px] sm:h-96 xl:h-auto lg:w-auto object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
