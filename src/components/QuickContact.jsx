import { useTranslation } from "react-i18next";
import { LucideMapPin, LucideMail, LucidePhone } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

function QuickContact({ getDirection }) {
  const { t } = useTranslation();

  const contactCards = [
    {
      id: "phone",
      title: t("quickContactPhoneTitle"),
      icon: LucidePhone,
      content: (
        <div className="space-y-1 text-center">
          <p className="font-body text-sm sm:text-base text-colors-textLightGray hover:text-colors-primary-600 transition-colors">
            <a href="tel:+93786601801">
              <bdi>+93 (0) 78 660 1801</bdi>
            </a>
          </p>
          <p className="font-body text-sm sm:text-base text-colors-textLightGray hover:text-colors-primary-600 transition-colors">
            <a href="tel:+93796064444">
              <bdi>+93 (0) 79 606 4444</bdi>
            </a>
          </p>
        </div>
      ),
    },
    {
      id: "email",
      title: t("quickContactEmailTitle"),
      icon: LucideMail,
      content: (
        <div className="space-y-1 dir-ltr text-center">
          <p className="font-body text-sm sm:text-base text-colors-textLightGray hover:text-colors-primary-600 transition-colors">
            <a href="mailto:info@hrmc.com">info@hrmc.com</a>
          </p>
          <p className="font-body text-sm sm:text-base text-colors-textLightGray hover:text-colors-primary-600 transition-colors">
            <a href="mailto:support@hrmc.com">support@hrmc.com</a>
          </p>
        </div>
      ),
    },
    {
      id: "address",
      title: t("quickContactAddressTitle"),
      icon: LucideMapPin,
      content: (
        <p className="font-body text-sm sm:text-base text-colors-textLightGray leading-relaxed text-center max-w-[220px]">
          {t("hospitalAddress")}
        </p>
      ),
    },
  ];

  const socialLinks = [
    { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
    { href: "https://t.me", label: "Telegram", Icon: FaTelegramPlane },
    { href: "https://whatsapp.com", label: "WhatsApp", Icon: FaWhatsapp },
  ];

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Left Content Area (3 Cards + Social Bar) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-6 order-2 lg:order-1">
            {/* Top 3 Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 pt-6">
              {contactCards.map(({ id, title, icon: Icon, content }) => (
                <div
                  key={id}
                  className="relative bg-colors-bg rounded-xl p-6 lg:p-10 pt-10 lg:pt-16 border border-colors-textLightGray/15 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  {/* Floating Top Badge Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-colors-primary-500 border-2 border-dashed border-colors-primary-100 text-colors-textLightColor flex items-center justify-center shadow-md">
                    <Icon className="w-5 lg:w-7 h-5 lg:h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-title font-bold text-h4 text-colors-textDarkColor mb-3">
                    {title}
                  </h3>

                  {/* Dynamic Content */}
                  {content}
                </div>
              ))}
            </div>

            {/* Bottom Social Media Bar */}
            <div className="bg-colors-primary-100 border border-colors-primary-100 rounded-xl p-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-title font-medium text-description text-colors-textDarkColor text-center sm:text-start">
                {t("quickContactSocialFollow")}
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, Icon }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-colors-primary-500 text-colors-textLightColor flex items-center justify-center hover:bg-colors-accent-500 transition-colors shadow-xs"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Callout Card */}
          <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2 bg-colors-primary-500 rounded-xl p-5 sm:p-10 text-colors-textLightColor flex flex-col items-center justify-center text-center shadow-md min-h-[180px] lg:min-h-full relative overflow-hidden">
            {/* Subtle background overlay effect */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-xl" />

            <div className="relative z-10 space-y-2 lg:space-y-4">
              <h2 className="font-title font-extrabold text-h2 leading-snug">
                {t("quickContactBannerTitle")}
              </h2>
              <p className="font-title font-bold text-h3 text-colors-textLightColor">
                {t("quickContactBannerSub")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickContact;
