import { useState, useEffect, useRef } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import { Globe, Phone, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

function Header({ getDirection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);

  const { lang = "en" } = useParams();
  const { t, i18n } = useTranslation();

  const isRTL = getDirection ? getDirection() === "rtl" : false;

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: t("home"), path: `/${lang}`, end: true },
    { name: t("about"), path: `/${lang}/about` },
    { name: t("services"), path: `/${lang}/services` },
    { name: t("doctors"), path: `/${lang}/doctors` },
    { name: t("gallery"), path: `/${lang}/gallery` },
    { name: t("blog"), path: `/${lang}/blog` },
    { name: t("contact"), path: `/${lang}/contact` },
  ];

  const languages = [
    { code: "en", label: "English", countryCode: "US" },
    { code: "fa", label: "دری", countryCode: "AF" },
    { code: "ps", label: "پشتو", countryCode: "AF" },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsGlobeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] py-3 px-4 sm:px-6 xl:px-24">
      <div className="max-w-[88rem] mx-auto relative px-4 sm:px-6 xl:px-12 h-14 lg:h-20 flex items-center justify-between bg-white border border-gray-100 shadow-sm rounded-xl">
        {/* MOBILE CALL ICON (Left) */}
        <div className="md:hidden flex items-center">
          <a
            href="tel:+937786601801"
            className="w-8 h-8 rounded-full bg-colors-primaryColor flex items-center justify-center text-colors-textLightColor"
            aria-label="Call Us"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>
        </div>

        <div className="flex items-center justify-center md:justify-start">
          <NavLink to={`/${lang}`}>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </NavLink>
        </div>

        {/* CENTER / DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-semibold">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav-link" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* MOBILE HAMBURGER BUTTON (Right) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="w-8 h-8 rounded-full bg-colors-primaryColor flex items-center justify-center p-2"
            aria-label="Open menu"
          >
            <img
              src="/images/textalign-right.svg"
              alt="Menu"
              className="w-5 h-5 filter brightness-0 invert"
            />
          </button>
        </div>

        {/* LEFT SECTION (Desktop Call Block) */}
        <div className="hidden xl:flex items-center gap-3">
          <a
            href="tel:+937786601801"
            className="w-10 h-10 rounded-full bg-colors-secondaryColor flex items-center justify-center text-colors-textLightColor hover:opacity-90 transition-opacity"
            aria-label="Call Us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <div className="flex flex-col text-start">
            <span className="text-xs text-colors-textLightGray font-normal">
              {t("callUs")}
            </span>
            <a
              href="tel:+937786601801"
              className="text-sm font-bold text-colors-textDarkGray hover:text-colors-primaryColor transition-colors"
            >
              <bdi>+93 77 86 60 1801</bdi>
            </a>
          </div>
        </div>

        <div
          className={`hidden flex items-center sm:gap-4 absolute start-14 sm:start-16 md:start-36 xl:start-auto xl:end-[230px] ${isRTL ? "xl:end-[210px]" : ""} bg-colors-primaryColor p-2 rounded-full`}
        >
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex text-colors-textLightColor items-center gap-2 cursor-pointer uppercase"
              onClick={() => setIsGlobeOpen(!isGlobeOpen)}
              aria-expanded={isGlobeOpen}
              aria-label="Change language"
            >
              <Globe className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>

            {isGlobeOpen && (
              <div className="absolute start-0 mt-5 me-4 md:me-0 w-36 bg-colors-bg rounded-md shadow-[0_0_0.3rem] shadow-colors-textDarkGray z-10 p-2 text-sm md:text-base">
                <ul className="">
                  {languages.map((lang) => (
                    <li
                      className="px-3 py-2 hover:bg-colors-primaryColorDark hover:text-colors-textLightColor hover:rounded-md cursor-pointer flex items-center gap-3 transition-all duration-200"
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        const currentPath = location.pathname;
                        const updatedPath = currentPath.replace(
                          /^\/[a-zA-Z]{2}/,
                          `/${lang.code}`,
                        );
                        navigate(
                          `${updatedPath}${location.search}${location.hash}`,
                        );
                        setIsGlobeOpen(false);
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={lang?.countryCode || "US"}
                        svg
                        className="text-xl"
                      />

                      <span className="">{lang.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY & MENU (70% Width) */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[80%] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-textLightGray mb-6">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-colors-primaryColor text-colors-textLightColor flex items-center justify-center p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col gap-2 text-start">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-lg font-semibold  ${
                      isActive
                        ? "text-colors-primaryColor"
                        : "text-colors-textDarkGray hover:text-colors-primaryColor"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer inside drawer */}
        <div className="p-6 border-t border-gray-100 bg-colors-secondBg">
          <div className="flex items-center gap-3">
            <a
              href="tel:+937786601801"
              className="w-8 h-8 rounded-full bg-colors-secondaryColor flex items-center justify-center text-colors-textLightColor"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>
            <div className="flex flex-col text-start">
              <span className="text-xs text-colors-textLightGray font-normal">
                {t("callUs")}
              </span>
              <a
                href="tel:+937786601801"
                className="text-sm font-bold text-colors-textDarkGray hover:text-colors-primaryColor transition-colors"
              >
                <bdi>+93 77 86 60 1801</bdi>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}

export default Header;
