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
      className="px-4 sm:px-6 xl:px-24"
    >
      <div className="relative overflow-hidden bg-divider-bg bg-cover bg-no-repeat bg-top rounded-xl p-4 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* 1. Dark Overlay (Added here inside the banner container) */}
        <div className="absolute inset-0 bg-black/50 lg:hidden" />

        <div className="hidden lg:flex absolute inset-0 bg-gradient-to-r from-white via-white/60 via-5% to-transparent z-[1]" />

        {/* Left Side: Content & Action Buttons */}
        <div className="relative z-10 space-y-5 text-center lg:text-start max-w-md">
          <div className="space-y-2">
            {/* 2. Text changed to white/light for readability */}
            <h2 className="text-h2 font-title font-bold text-colors-textLightColor lg:text-colors-textDarkGray leading-snug">
              {t("ctaHospitalTitle")}
            </h2>
            <p className="font-body text-h5 text-colors-textLightColor lg:text-colors-textDarkGray leading-relaxed">
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
              href="tel:+937786601801"
              className="w-full sm:w-auto px-6 py-3 bg-colors-bg/10 lg:bg-colors-bg hover:bg-colors-bg/80 text-white lg:text-colors-textDarkGray border border-colors-bg backdrop-blur-sm lg:backdrop-blur-none rounded-xl font-title text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <FaPhoneAlt className="w-4 h-4 text-colors-accent-500" />
              <span>{t("ctaEmergencyCall")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
