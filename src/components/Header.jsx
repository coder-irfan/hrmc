import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTelegram,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { PhoneCall } from "lucide-react";

import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { lang = "en" } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Language Translations */
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English", countryCode: "US" },
    { code: "fa", label: "دری", countryCode: "AF" },
  ];

  const safeLang = i18n.language || "en";

  const currentLang =
    languages.find((lang) => lang.code === safeLang) || languages[0];

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
    <>
      <header dir="ltr" className="relative font-medium">
        <div
          className={`2xl:max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-3 xl:px-16 fixed top-0 right-0 left-0 z-[60]
          transition-all duration-300
          ${
            isScrolled
              ? "backdrop-blur-md backdrop-saturate-150 shadow-sm shadow-colors-textDarkGray/10"
              : "bg-transparent"
          }`}
        >
          <div
            className={`md:hidden fixed w-screen h-screen opacity-100 inset-0 bg-colors-bg transition-all duration-700 z-20
            ${
              isOpen
                ? "translate-x-0 pointer-events-auto"
                : "translate-x-full delay-200 pointer-events-none"
            }`}
          ></div>

          <div className="flex items-center justify-between">
            <img
              src={`${
                isScrolled
                  ? "/images/logo-blue-english.webp"
                  : "/images/logo-white-english.webp"
              }`}
              alt="logo"
              className="w-32 lg:w-44 object-contain"
            />

            <div className="z-50">
              <nav
                className={`md:relative fixed top-0 right-0 h-full md:right-0 transition-all duration-700 pt-24 pr-6 md:pr-0 md:pt-0
                md:h-auto md:w-auto md:translate-x-0 ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="md:hidden absolute top-0 left-4 py-5">
                  <img
                    src="/images/logo-blue-english.webp"
                    alt="logo"
                    className="w-44 object-contain"
                  />
                </div>

                <div className="flex flex-col md:flex-row items-end gap-8">
                  <ul
                    className={`flex flex-col md:flex-row items-end md:items-center gap-4 lg:gap-6 lg:text-lg text-colors-textDarkColor ${
                      isScrolled
                        ? "md:text-colors-textDarkColor"
                        : "md:text-colors-textLightColor"
                    }`}
                  >
                    {/* HOME LINK */}
                    <li className="font-semibold">
                      <NavLink
                        to={`/${lang}`}
                        end
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `hover-link ${isActive ? "active-link" : ""}`
                        }
                      >
                        {t("home")}
                      </NavLink>
                    </li>

                    <div className="md:hidden w-screen h-[1px] -mr-6 bg-colors-textDarkColor/40"></div>

                    <li className="hidden md:flex opacity-25">|</li>

                    {/* ABOUT US LINK */}
                    <li className="font-semibold">
                      <NavLink
                        to={`/${lang}/about`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `hover-link ${isActive ? "active-link" : ""}`
                        }
                      >
                        {t("about")}
                      </NavLink>
                    </li>

                    <div className="md:hidden w-screen h-[1px] -mr-6 bg-colors-textDarkColor/40"></div>

                    <li className="hidden md:flex opacity-25">|</li>

                    {/* SERVICES LINK */}
                    <li className="font-semibold">
                      <NavLink
                        to={`/${lang}/services`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `hover-link ${isActive ? "active-link" : ""}`
                        }
                      >
                        {t("services")}
                      </NavLink>
                    </li>

                    <div className="md:hidden w-screen h-[1px] -mr-6 bg-colors-textDarkColor/40"></div>

                    <li className="hidden md:flex opacity-25">|</li>

                    {/* PROJECTS LINK */}
                    <li className="font-semibold">
                      <NavLink
                        to={`/${lang}/projects`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `hover-link ${isActive ? "active-link" : ""}`
                        }
                      >
                        {t("projects")}
                      </NavLink>
                    </li>

                    <div className="md:hidden w-screen h-[1px] -mr-6 bg-colors-textDarkColor/40"></div>

                    <li className="hidden md:flex opacity-25">|</li>

                    {/* CONTACT LINK */}
                    <li className="font-semibold">
                      <NavLink
                        to={`/${lang}/contact`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `hover-link ${isActive ? "active-link" : ""}`
                        }
                      >
                        {t("contact")}
                      </NavLink>
                    </li>

                    <div className="md:hidden w-screen h-[1px] -mr-6 bg-colors-textDarkColor/40"></div>
                  </ul>

                  {/* MOBILE CONTACT BUTTON */}
                  <div className="md:hidden text-sm z-10">
                    <NavLink
                      to={`/${lang}/contact`}
                      onClick={() => setIsOpen(false)}
                      className="button"
                    >
                      {t("contactUs")}
                      <PhoneCall className="w-5 h-5" />
                    </NavLink>
                  </div>

                  {/* SOCIAL LINKS */}
                  <div className="md:hidden flex flex-wrap justify-center items-center gap-2 lg:gap-4 text-xl md:text-2xl xl:text-3xl">
                    <a
                      href="https://www.instagram.com/burjezamin?igsh=MW8yenlqdnFlaWJlcw=="
                      className="media-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      className="media-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaYoutube />
                    </a>
                    <a
                      href="https://www.facebook.com/share/14ouu5honQm/?mibextid=LQQJ4d"
                      className="media-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://telegram.com/"
                      className="media-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTelegram />
                    </a>
                  </div>
                </div>

                {isOpen && (
                  <div
                    className="absolute top-5 right-5 sm:right-6 text-[1.4rem] md:hidden border border-colors-primaryColorDark rounded-md p-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaTimes
                      className="cursor-pointer text-colors-primaryColorDark"
                      aria-label="Close menu"
                    />
                  </div>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center gap-2 mr-10 md:mr-0 cursor-pointer hover:text-colors-textDarkGray transition-all duration-300 uppercase
                    ${
                      isScrolled
                        ? "text-colors-textDarkColor"
                        : "text-colors-textLightColor"
                    }`}
                  onClick={() => setIsGlobeOpen(!isGlobeOpen)}
                  aria-expanded={isGlobeOpen}
                  aria-label="Change language"
                >
                  <ReactCountryFlag
                    countryCode={currentLang?.countryCode || "US"}
                    svg
                    className="text-2xl"
                  />
                </button>

                {isGlobeOpen && (
                  <div
                    className="absolute right-0 mt-5 mr-4 md:mr-0 w-36 bg-colors-bg rounded-md shadow-[0_0_0.3rem] shadow-colors-textDarkGray z-10 p-2
                    text-sm md:text-base"
                  >
                    <ul className="">
                      {languages.map((lang) => (
                        <li
                          className="px-3 py-2 hover:bg-colors-primaryColorDark hover:text-colors-textLightColor hover:rounded-md cursor-pointer flex items-center gap-3 transition-all duration-200"
                          key={lang.code}
                          onClick={() => {
                            i18n.changeLanguage(lang.code);

                            // Replace current language segment in URL with new language code
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

              <div className="hidden lg:flex items-center gap-2">
                <NavLink to={`/${lang}/contact`} className="button">
                  {t("contactUs")}
                  <PhoneCall className="w-5 h-5" />
                </NavLink>
              </div>
            </div>

            {!isOpen && (
              <div
                className={`absolute top-4 right-5 sm:right-6 text-[1rem] md:hidden border rounded-md p-1 ${isScrolled ? "border-colors-primaryColorDark" : "border-colors-textLightColor"}`}
                onClick={() => setIsOpen(true)}
              >
                <FaBars
                  aria-label="Open menu"
                  className={`cursor-pointer ${isScrolled ? "text-colors-primaryColorDark" : "text-colors-textLightColor"}`}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
