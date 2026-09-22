import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";

function CtaBanner({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();

  return (
    <section
      id="cta"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 py-6 sm:py-8"
    >
      <div className="relative overflow-hidden bg-colors-primary-50 rounded-2xl border border-colors-primary-100 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Glow / Backdrop Effect */}
        <div className="absolute bg-colors-accent-500/20 blur-3xl w-52 h-52 rounded-full -end-10 -bottom-10 pointer-events-none" />

        {/* Left Side: Content & Action Buttons */}
        <div className="relative z-10 space-y-5 text-center lg:text-start max-w-xl">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-title font-bold text-colors-textDarkColor leading-snug">
              {t("ctaHospitalTitle")}
            </h2>
            <p className="font-body text-xs sm:text-sm lg:text-base text-colors-textLightGray leading-relaxed">
              {t("ctaHospitalDescription")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <NavLink
              to={`/${lang}/contact`}
              className="w-full sm:w-auto px-6 py-3 bg-colors-accent-500 hover:bg-colors-accent-600 text-white rounded-xl font-title text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <FaCalendarCheck className="w-4 h-4" />
              <span>{t("ctaBookAppointment")}</span>
            </NavLink>

            <a
              href="tel:+93799123456"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-colors-textDarkColor border border-colors-primary-200 rounded-xl font-title text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <FaPhoneAlt className="w-4 h-4 text-colors-accent-500" />
              <span>{t("ctaEmergencyCall")}</span>
            </a>
          </div>
        </div>

        {/* Right Side: Image Floating / Positioned */}
        <div className="relative z-10 shrink-0 flex items-center justify-center">
          <img
            src="/images/ambulance.webp"
            alt={t("ctaHospitalTitle")}
            className="w-56 sm:w-64 lg:w-96 h-full object-contain drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
