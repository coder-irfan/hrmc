import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getAllServices } from "../sanity/allServicesQuery";
import { urlFor } from "../sanityClient";
import SectionHeading from "./SectionHeading";

export default function Services({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const isRTL = getDirection() === "rtl";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        if (isMounted) {
          setServices(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching all services:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Utility function: Chunks the array into repeating groups of 7 (3 + 4 pattern)
  const renderGridGroups = () => {
    const chunks = [];
    for (let i = 0; i < services.length; i += 7) {
      chunks.push(services.slice(i, i + 7));
    }

    return chunks.map((group, groupIdx) => {
      const topRow = group.slice(0, 3);
      const bottomRow = group.slice(3, 7);

      return (
        <div key={groupIdx} className="space-y-2 md:space-y-4">
          {/* Top Row: Max 3 Items */}
          {topRow.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
              {topRow.map((service, index) => (
                <div
                  key={service._id}
                  className={
                    index === 2 && topRow.length === 3
                      ? "col-span-2 sm:col-span-1"
                      : "col-span-1"
                  }
                >
                  <ServiceCard service={service} lang={lang} isRTL={isRTL} />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Row: Max 4 Items */}
          {bottomRow.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              {bottomRow.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  lang={lang}
                  isRTL={isRTL}
                />
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <section
      dir={getDirection()}
      className="pt-12 pb-20 lg:pt-20 lg:pb-24 px-4 sm:px-6 xl:px-24 bg-colors-primary-50"
    >
      <div className="mx-auto space-y-6 lg:space-y-10">
        {/* Page Title & Header */}
        <SectionHeading title={t("allServicesTitle")} />

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 md:h-64 rounded-xl bg-colors-secondBg animate-pulse"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 md:h-64 rounded-xl bg-colors-secondBg animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : services.length === 0 ? (
          /* Empty State Message */
          <div className="text-center py-6 lg:py-12 bg-colors-primary-50 rounded-xl border border-dashed border-colors-primary-200">
            <p className="font-body text-description text-colors-textDarkGray">
              {t("noServices")}
            </p>
          </div>
        ) : (
          /* Repeating Chunked Grid */
          <div className="space-y-2 md:space-y-4">{renderGridGroups()}</div>
        )}
      </div>
    </section>
  );
}

// Reuseable Service Card Component
function ServiceCard({ service, lang }) {
  const serviceTitle = service?.title?.[lang] || service?.title?.en || "";
  const imageUrl = service?.image
    ? urlFor(service.image).width(600).height(450).url()
    : "/images/dental-clinic.jpg";

  return (
    <Link
      to={`/${lang}/services/${service.slug}`}
      className="group relative h-44 md:h-64 rounded-xl overflow-hidden border border-colors-primary-200/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 block bg-colors-primary-100"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={serviceTitle}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Frosted Glass Overlay on the Bottom with Title */}
      <div className="absolute inset-x-0 bottom-0 p-2 md:p-2 bg-colors-primary-300/30 backdrop-blur-sm border-t border-colors-bg/20 flex items-center justify-center text-colors-textLightColor transition-all duration-300 group-hover:bg-colors-primary-600/30">
        <h3 className="font-title text-h4 md:text-h3 font-semibold truncate leading-snug">
          {serviceTitle}
        </h3>
      </div>
    </Link>
  );
}
