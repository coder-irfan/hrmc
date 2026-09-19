import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import {
  FaHospitalUser,
  FaCalendarCheck,
  FaClock,
  FaAward,
} from "react-icons/fa";

function Hero({ getDirection }) {
  const { t } = useTranslation();
  const isRTL = getDirection() === "rtl";
  const { lang = "en" } = useParams();

  return (
    <section
      dir={getDirection()}
      id="home"
      className="relative px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="bg-colors-primary-50 relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 px-4 sm:px-6 md:px-10 lg:px-16 rounded-b-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
          {/* Content Column (Text & Details) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Main Title with Heart Overlay Graphic */}
            <div className="relative inline-block">
              <h1 className="font-title text-colors-textDarkColor text-h1 font-bold leading-tight">
                {t("hero.title_part1", "Comprehensive Care &")}{" "}
                <br className="hidden sm:inline" />
                <span className="relative z-10 text-colors-primary-500">
                  {t("hero.title_highlight", "Modern Healthcare")}

                  {/* Decorative Heart Background Image */}
                  <img
                    src="/images/heart-outline.webp"
                    alt="Heart Graphic"
                    className={`absolute -bottom-2 sm:-bottom-4 ${
                      isRTL ? "-left-6 sm:-left-10" : "-right-6 sm:-right-10"
                    } w-16 sm:w-24 md:w-28 opacity-20 pointer-events-none -z-10 object-contain`}
                  />
                </span>
              </h1>
            </div>

            {/* Description Text */}
            <p className="font-body text-colors-textDarkGray text-description max-w-2xl leading-relaxed">
              {t(
                "hero.description",
                "HRMC Hospital provides world-class medical treatments, advanced diagnostic services, and compassionate patient care with modern infrastructure.",
              )}
            </p>

            {/* Highlight Cards / Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-colors-bg border border-colors-primary-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-colors-primary-50 text-colors-primary-500">
                  <FaClock className="text-lg" />
                </div>
                <div>
                  <h4 className="font-title text-sm font-bold text-colors-textDarkColor">
                    {t("hero.stat1_title", "24/7 Support")}
                  </h4>
                  <p className="font-body text-xs text-colors-textLightGray">
                    {t("hero.stat1_desc", "Emergency & Care")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-colors-bg border border-colors-primary-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-colors-primary-50 text-colors-primary-500">
                  <FaAward className="text-lg" />
                </div>
                <div>
                  <h4 className="font-title text-sm font-bold text-colors-textDarkColor">
                    {t("hero.stat2_title", "Modern Care")}
                  </h4>
                  <p className="font-body text-xs text-colors-textLightGray">
                    {t("hero.stat2_desc", "Advanced Tech")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Media Column (Hospital Image & Background Shape) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Primary Dark/Main Curved Shape Behind Hospital Image */}
            <div className="absolute w-[85%] sm:w-[80%] h-[95%] bg-colors-primary-500 rounded-3xl sm:rounded-[2.5rem] transform rotate-3 scale-105 shadow-xl -z-10" />

            {/* Main Hospital Image Box */}
            <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-colors-bg shadow-2xl">
              <img
                src="/images/hospital.jpg"
                alt="HRMC Hospital"
                className="w-full h-[320px] sm:h-[400px] md:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Quality Badge Overlay (Accredited / Trusted Facility Badge) */}
            <div
              className={`absolute bottom-4 ${
                isRTL ? "right-2 sm:-right-4" : "left-2 sm:-left-4"
              } bg-colors-bg p-3.5 sm:p-4 rounded-2xl shadow-xl border border-colors-primary-100 flex items-center gap-3 z-20`}
            >
              <div className="p-3 rounded-xl bg-colors-primary-50 text-colors-primary-500">
                <FaHospitalUser className="text-xl sm:text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-title text-sm sm:text-base font-bold text-colors-textDarkColor">
                  {t("hero.badge_title", "Certified Facility")}
                </span>
                <span className="font-body text-xs text-colors-textLightGray">
                  {t("hero.badge_subtitle", "High Quality Standards")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button Bar (Overlapping Bottom Border) */}
      <div className="relative z-30 max-w-[85rem] 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 -mt-10 sm:-mt-12">
        <div className="bg-colors-bg rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-colors-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 px-2">
            <div className="p-3 rounded-xl bg-colors-primary-50 text-colors-primary-500">
              <FaCalendarCheck className="text-xl" />
            </div>
            <div>
              <h3 className="font-title text-base font-bold text-colors-textDarkColor">
                {t("hero.cta_bar_title", "Need Medical Assistance?")}
              </h3>
              <p className="font-body text-xs sm:text-sm text-colors-textLightGray">
                {t(
                  "hero.cta_bar_desc",
                  "Book an appointment or visit HRMC Hospital today.",
                )}
              </p>
            </div>
          </div>

          <Link
            to={`/${lang}/appointments`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-colors-primary-500 hover:bg-colors-primary-600 text-colors-textLightColor font-body text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <span>{t("hero.book_appointment", "Book Appointment")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
