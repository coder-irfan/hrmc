import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LucideChevronRight, LucideHome } from "lucide-react";
import { useTranslation } from "react-i18next";
import { client } from "../sanityClient";

const Breadcrumb = ({ getDirection }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { lang = "en" } = useParams();

  // Split path into array segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Filter out language parameter
  const breadcrumbSegments = pathnames.filter((segment) => segment !== lang);

  // State to store localized dynamic titles fetched from Sanity
  const [sanityTitles, setSanityTitles] = useState({});

  useEffect(() => {
    let isMounted = true;

    // Detect if the current route has a dynamic Sanity slug (last segment)
    const lastSegment = breadcrumbSegments[breadcrumbSegments.length - 1];

    if (lastSegment && breadcrumbSegments.length > 1) {
      // Query Sanity across your schemas for a document matching the slug
      const query = `*[_type in ["service", "blog"] && slug.current == $slug][0]{
        "title": title
      }`;

      client
        .fetch(query, { slug: lastSegment })
        .then((data) => {
          if (isMounted && data?.title) {
            const localizedTitle =
              data.title?.[lang] || data.title?.en || lastSegment;

            setSanityTitles((prev) => ({
              ...prev,
              [lastSegment]: localizedTitle,
            }));
          }
        })
        .catch((err) =>
          console.error("Error fetching breadcrumb title from Sanity:", err),
        );
    }

    return () => {
      isMounted = false;
    };
  }, [location.pathname, lang]);

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="mt-14 lg:mt-20 py-4 lg:py-6 px-4 sm:px-6 xl:px-24"
    >
      <div className="w-full mx-auto flex items-center justify-start bg-colors-primary-700 py-4 sm:py-6 px-5 sm:px-6 md:px-8 rounded-xl justify-start">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-h5 font-medium text-colors-textDarkGray">
            {/* Home Link */}
            <li className="inline-flex items-center">
              <Link
                to={`/${lang}`}
                className="inline-flex items-center text-colors-textLightColor/60 hover:text-colors-primary-50 transition-colors duration-200 gap-1"
              >
                <LucideHome className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t("home")}</span>
              </Link>
            </li>
            {/* Dynamic Path Iteration */}
            {breadcrumbSegments.map((value, index) => {
              const routeTo = `/${lang}/${breadcrumbSegments
                .slice(0, index + 1)
                .join("/")}`;

              const isLast = index === breadcrumbSegments.length - 1;

              // 1. Sanity dynamic title -> 2. Localized i18n -> 3. Formatted slug
              const displayLabel =
                sanityTitles[value] ||
                (t(value) !== value ? t(value) : value.replace(/-/g, " "));

              return (
                <li
                  key={routeTo}
                  className="inline-flex items-center gap-1.5 sm:gap-2"
                >
                  <LucideChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-colors-textLightColor/40 rtl:rotate-180" />
                  {isLast ? (
                    <span className="text-colors-textLightColor font-semibold capitalize break-words">
                      {displayLabel}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-colors-textLightColor/60 hover:text-colors-primary-50 transition-colors duration-200 capitalize"
                    >
                      {displayLabel}
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
