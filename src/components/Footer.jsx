import { Phone, LocationEdit, MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedTracks from "./AnimatedTrucks";
import { NavLink, useParams } from "react-router-dom";

function Footer({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();

  return (
    <>
      <footer
        id="contact"
        dir={getDirection()}
        className="pt-10 pb-6 md:pt-14 md:pb-4 lg:pt-14 lg:pb-6 xl:pt-16 space-y-4 md:space-y-6 lg:space-y-6"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col lg:flex-row justify-center lg:justify-between gap-8 lg:gap-10 pb-8">
          <div className="space-y-5 lg:space-y-5 max-w-md lg:max-w-xs flex flex-col items-start justify-start ">
            <img
              src="/images/logo-blue-english.webp"
              alt="logo"
              className="w-44 lg:w-52 object-contain"
            />
            <p className="text-sm lg:text-base">{t("footerDesc")}</p>
          </div>

          <div className="flex gap-16 sm:gap-28 md:gap-36 lg:gap-10 xl:gap-28">
            <div className="space-y-2 lg:space-y-5">
              <h3 className="text-h3 font-bold text-colors-textDarkGray">
                {t("company")}
              </h3>
              <ul className="space-y-2 lg:space-y-3 text-sm xl:text-base">
                <li className="">
                  <NavLink to={`/${lang}/about`} className="hover-link">
                    {t("aboutUs")}
                  </NavLink>
                </li>
                <li className="">
                  <a href="#testimonial" className="hover-link">
                    {t("ourClients")}
                  </a>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/projects`} className="hover-link">
                    {t("projectsLink")}
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/services`} className="hover-link">
                    {t("servicesLink")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="space-y-2 lg:space-y-5">
              <h3 className="text-h3 font-bold text-colors-textDarkGray">
                {t("contactLink")}
              </h3>
              <ul className="space-y-2 lg:space-y-3 text-sm xl:text-base">
                <li className="">
                  <NavLink to={`/${lang}/contact`} className="hover-link">
                    {t("contactUsLink")}
                  </NavLink>
                </li>
                <li className="">
                  <a href="#newsletter" className="hover-link">
                    {t("newsletter")}
                  </a>
                </li>
                <li className="">
                  <a href="#location" className="hover-link">
                    {t("locationLink")}
                  </a>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/contact`} className="hover-link">
                    {t("information")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 sm:gap-28 md:gap-36 lg:gap-10 xl:gap-28">
            <div className="space-y-2 lg:space-y-5">
              <h3 className="text-h3 font-bold text-colors-textDarkGray">
                {t("support")}
              </h3>
              <ul className="space-y-2 lg:space-y-3 text-sm xl:text-base">
                <li className="">
                  <a href="#faq" className="hover-link">
                    {t("faqs")}
                  </a>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/contact`} className="hover-link">
                    {t("helpCenter")}
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/about`} className="hover-link">
                    {t("moreInfo")}
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to={`/${lang}/about`} className="hover-link">
                    {t("privacy")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="space-y-2 lg:space-y-5">
              <h3 className="text-h3 font-bold text-colors-textDarkGray">
                {t("contactInfo")}
              </h3>
              <ul className="space-y-2 lg:space-y-4 text-sm xl:text-base max-w-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-colors-primaryColorDark" />
                  <a
                    href="tel:+93711580580"
                    className="text-sm md:text-base hover:text-colors-primaryColorDark transition-colors duration-300"
                  >
                    <bdi>+93 711 580 580</bdi>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="w-5 h-5 text-colors-primaryColorDark" />
                  <a
                    href="mailto:info@burjezamincc.com"
                    className="text-sm md:text-base hover:text-colors-primaryColorDark transition-colors duration-300"
                  >
                    info@burjezamincc.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <LocationEdit className="w-5 h-5 text-colors-primaryColorDark" />
                  {t("clientLocation")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <AnimatedTracks />

        <div className="px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between text-xs sm:text-sm md:text-base gap-2">
          <p className="flex items-center gap-2">
            {t("developedBy")}
            <span className="text-colors-primaryColorDark hover:text-colors-primaryColorLightesh transition duration-200 underline font-medium">
              <a href="https://designmasters.tech" target="_blank" className="">
                <img
                  src="/images/design-masters-logo.png"
                  alt="logo"
                  className="w-6 md:w-7 object-contain"
                  title="Design Masters"
                />
              </a>
            </span>
          </p>
          <p className="">
            {t("allRights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
