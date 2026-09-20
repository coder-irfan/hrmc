import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaHospitalUser } from "react-icons/fa";
import Button from "./Button";

function Hero({ getDirection }) {
  const { t } = useTranslation();
  const isRTL = getDirection() === "rtl";
  const { lang = "en" } = useParams();

  return (
    <section
      dir={getDirection()}
      id="home"
      className="relative px-4 sm:px-6 xl:px-24"
    >
      <div className="bg-colors-primary-50 relative pt-28 md:pt-36 lg:pt-36 px-4 sm:px-6 lg:px-16 rounded-b-xl">
        <img
          src="/images/heart.jpg"
          alt="Heart Graphic"
          className={`absolute top-0 start-0 w-16 sm:w-24 md:w-[300px] opacity-10 pointer-events-none z-10 object-contain ${isRTL ? "" : "transform -scale-x-100"}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start relative">
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6 lg:space-y-14 lg:pt-12">
            <div className="relative inline-block">
              <h1 className="font-title text-colors-textDarkColor font-black leading-tight">
                <span className="text-h1">
                  {t("hero.title_part1")} <br className="hidden sm:inline" />
                </span>

                <span className="relative z-10 text-colors-primary-500 text-h1Second">
                  {t("hero.title_highlight")}
                </span>
              </h1>
            </div>

            <p className="font-body text-largeDescription max-w-xl">
              {t("hero.description")}
            </p>

            <Button
              variant="primary"
              icon={FaCalendarAlt}
              text={t("hero.book_appointment")}
              to={`/${lang}/contact`}
              className="!md:px-6 !md:py-0 md:text-xl md:hidden"
            />
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full ">
              <img
                src={`${isRTL ? "/images/hero-image-fa.png" : "/images/hero-image-en.png"}`}
                alt="HRMC Hospital"
                className="w-full h-[300px] lg:h-[550px] object-contain"
              />
            </div>

            <div className="sm:hidden absolute bottom-10 start-2 md:-start-12 bg-colors-bg/5 backdrop-blur-md px-4 py-3 md:px-5 md:py-4 rounded-xl shadow-xl flex lg:flex items-center gap-4 z-20">
              <div className="text-colors-primary-500">
                <FaHospitalUser className="text-xl sm:text-2xl" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-title text-h5 font-bold text-colors-textDarkColor">
                  {t("hero.badge_title")}
                </span>
                <span className="font-body text-xs text-colors-textLightGray">
                  {t("hero.badge_subtitle")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f7f7] p-4 rounded-xl absolute -bottom-2 -start-2 z-10 hidden md:flex">
          <Button
            variant="primary"
            icon={FaCalendarAlt}
            text={t("hero.book_appointment")}
            to={`/${lang}/contact`}
            className="w-full sm:w-auto !px-4 !py-3 !md:px-6 !md:py-0 md:text-xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
