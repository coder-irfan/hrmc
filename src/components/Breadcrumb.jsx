import { Link, useLocation, useParams } from "react-router-dom";
import { LucideChevronRight, LucideHome } from "lucide-react";
import { useTranslation } from "react-i18next";

const Breadcrumb = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { lang = "en" } = useParams();

  // Split path into array segments: e.g. "/en/about/team" -> ["en", "about", "team"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Filter out the language parameter from displayed crumbs (e.g., skip "en" or "fa")
  const breadcrumbSegments = pathnames.filter((segment) => segment !== lang);

  return (
    <section className="bg-colors-primaryColorLightesh relative w-full min-h-[150px] lg:min-h-[250px] flex items-center justify-center pt-20 pb-14 lg:pt-24 lg:pb-14 textLightColor overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-0" />

      <img
        src="/images/shape-1.webp"
        alt="line"
        loading="lazy"
        decoding="async"
        className="absolute top-0 w-56 lg:w-auto end-0"
      />

      <img
        src="/images/shape-1.webp"
        alt="line"
        loading="lazy"
        decoding="async"
        className="absolute top-0 start-0 w-56 lg:w-auto"
      />

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        {/* Dynamic Main Title */}

        {/* Breadcrumb Navigation Trail */}
        <nav
          aria-label="Breadcrumb"
          className="flex justify-center items-center"
        >
          <ol className="inline-flex items-center text-xs lg:text-h3 font-medium text-colors-textLightColor/70 bg-colors-bg/10 backdrop-blur-md px-5 py-4 rounded-full border border-colors-bg/20 shadow-lg">
            {/* Home Icon Link */}
            <li className="inline-flex items-center">
              <Link
                to={`/${lang}`}
                className="inline-flex items-center text-colors-textLightColor/80 hover:text-colors-textLightColor transition-colors duration-200 gap-1.5"
              >
                <LucideHome className="w-4 h-4" />
                <span>{t("home")}</span>
              </Link>
            </li>

            {/* Dynamic Path Iteration */}
            {breadcrumbSegments.map((value, index) => {
              // Reconstruct full path for each crumb link
              const routeTo = `/${lang}/${breadcrumbSegments
                .slice(0, index + 1)
                .join("/")}`;

              const isLast = index === breadcrumbSegments.length - 1;

              // Translate route if key exists, otherwise format name
              const label =
                t(value) !== value ? t(value) : value.replace(/-/g, " ");

              return (
                <li key={routeTo} className="inline-flex items-center">
                  <LucideChevronRight className="w-4 h-4 text-colors-textLightColor/60 mx-1 rtl:rotate-180" />
                  {isLast ? (
                    <span className="text-colors-secondTextColor font-semibold capitalize">
                      {label}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-colors-textLightColor/70 hover:text-colors-textLightColor transition-colors capitalize"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
