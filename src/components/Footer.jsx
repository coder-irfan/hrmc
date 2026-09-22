import { useTranslation } from "react-i18next";
import {
  LucideMapPin,
  LucideMail,
  LucidePhone,
  LucideChevronRight,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

function Footer({ getDirection }) {
  const { lang = "en" } = useParams();
  const { t } = useTranslation();

  // Links styling adjusted for dark blue background (light text with accent/primary hover)
  const navLinkClasses =
    "group flex items-center gap-2 text-colors-textLightColor/80 hover:textLightColor transition-colors duration-200";

  // Social buttons styled for dark background
  const socialLinkClasses =
    "p-2 rounded-full bg-white/10 text-colors-textLightColor hover:bg-colors-accent-500 hover:textLightColor transition-all duration-200";

  const pagesLinks = [
    { to: `/${lang}`, label: t("home") },
    { to: `/${lang}/about`, label: t("about") },
    { to: `/${lang}/services`, label: t("services") },
    { to: `/${lang}/doctors`, label: t("doctors") },
  ];

  const quickLinks = [
    { to: `/${lang}/gallery`, label: t("gallery") },
    { to: `/${lang}/blog`, label: t("blog") },
    { to: `/${lang}/contact`, label: t("contact") },
    { to: `/${lang}/contact#location`, label: t("contactLocation") },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", Icon: FaFacebook },
    { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
    { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
    { href: "https://youtube.com", label: "YouTube", Icon: FaYoutube },
  ];

  return (
    <footer
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 mb-4"
    >
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 xl:px-20 pb-6 pt-12 lg:pt-24 lg:pb-12 bg-colors-primary-700 rounded-xl space-y-6 lg:space-y-10 border border-white/10 shadow-xs">
        <div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-16 lg:gap-10">
            {/* Section 1: Navigation Links (Pages & Hospital Services) */}
            <div className="order-2 lg:order-1 flex justify-around lg:justify-center gap-4 lg:gap-10">
              {/* Pages Column */}
              <div className="space-y-5 xl:space-y-8">
                <h3 className="text-colors-textLightColor font-title font-bold text-h3">
                  {t("footerPagesTitle")}
                </h3>

                <ul className="space-y-3 xl:space-y-6 font-body font-medium">
                  {pagesLinks.map((link, idx) => (
                    <li key={idx}>
                      <NavLink to={link.to} className={navLinkClasses}>
                        <LucideChevronRight className="w-4 h-4 text-colors-accent-500 shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        <span>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links Column */}
              <div className="space-y-5 xl:space-y-8">
                <h3 className="text-colors-textLightColor font-title font-bold text-h3">
                  {t("footerQuickLinksTitle")}
                </h3>

                <ul className="space-y-3 xl:space-y-6 font-body font-medium">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <NavLink to={link.to} className={navLinkClasses}>
                        <LucideChevronRight className="w-4 h-4 text-colors-accent-500 shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        <span>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2: Branding, Brief & Social Media Icons */}
            <div className="order-1 lg:order-2 max-w-80 flex flex-col items-center justify-center self-center lg:self-auto text-center space-y-4 lg:space-y-6">
              <div className="flex items-center justify-center md:justify-start">
                <NavLink to={`/${lang}`}>
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-16 md:h-24 w-auto object-contain brightness-0 invert"
                  />
                </NavLink>
              </div>

              <p className="text-colors-textLightColor/80 font-body text-description leading-relaxed">
                {t("footerDescription")}
              </p>

              <div className="flex items-center gap-4">
                {socialLinks.map(({ href, label, Icon }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={socialLinkClasses}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Section 3: Address & Contact Info */}
            <div className="order-3 flex flex-col justify-around sm:flex-row lg:flex-col gap-6 lg:gap-16 self-center sm:self-auto">
              {/* Address */}
              <div className="max-w-56 sm:max-w-72 flex flex-col items-center lg:items-start justify-center text-center lg:text-start gap-2">
                <h3 className="text-colors-textLightColor font-title font-bold text-h3">
                  {t("addressTitle")}
                </h3>

                <div className="flex items-center gap-2 sm:gap-3">
                  <LucideMapPin className="w-5 h-5 text-colors-accent-500 shrink-0 mt-1" />
                  <p className="text-colors-textLightColor/80 font-body text-h4 md:text-h5">
                    {t("hospitalAddress")}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="max-w-56 sm:max-w-72 flex flex-col items-center justify-center text-center lg:items-start lg:text-start gap-2">
                <h3 className="text-colors-textLightColor font-title font-bold text-h3">
                  {t("contactFooterTitle")}
                </h3>

                <div className="space-y-2 flex flex-col justify-center items-center lg:items-start lg:justify-start">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <LucideMail className="w-5 h-5 text-colors-accent-500 shrink-0" />
                    <a
                      href="mailto:info@hrmc.af"
                      className="text-colors-textLightColor/80 hover:textLightColor font-body text-h4 md:text-h5 transition-colors"
                    >
                      info@hrmc.af
                    </a>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <LucidePhone className="w-5 h-5 text-colors-accent-500 shrink-0" />
                    <a
                      href="tel:+937786601801"
                      className="text-colors-textLightColor/80 hover:textLightColor font-body text-h4 md:text-h5 transition-colors"
                    >
                      <bdi>+93 (0) 77 86 60 1801</bdi>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-[0.075rem] border-0 bg-white/10" />

        {/* Copyright & Developer Credits */}
        <div className="flex items-center justify-center font-body text-colors-textLightColor/70 text-sm lg:text-base">
          <p>
            {t("developedBy")}{" "}
            <a
              href="https://coder-irfan-portfolio.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-colors-accent-500 hover:textLightColor underline transition-colors"
            >
              Coder Irfan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
