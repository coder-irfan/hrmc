import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getHomeServices } from "../sanity/servicesQuery";
import { urlFor } from "../sanityClient";
import SectionHeading from "./SectionHeading";

function HomeServices({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const isRTL = getDirection() === "rtl";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const data = await getHomeServices();
        if (isMounted) {
          const shuffled = [...data]
            .sort(() => 0.5 - Math.random())
            .slice(0, 7);
          setServices(shuffled);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching services from Sanity:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Split items into Top Row (3 items) and Bottom Row (4 items)
  const topServices = services.slice(0, 3);
  const bottomServices = services.slice(3, 7);

  return (
    <section
      dir={getDirection()}
      className="py-16 lg:py-28 px-4 sm:px-6 xl:px-24"
    >
      <div className="mx-auto space-y-6 lg:space-y-10">
        <SectionHeading title={t("homeServiceTitle")} />

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-44 md:h-64 rounded-xl bg-colors-textLightGray/50 animate-pulse ${
                    i === 2 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 md:h-64 rounded-xl bg-colors-textLightGray/50 animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : services.length === 0 ? (
          /* EMPTY STATE MESSAGE */
          <div className="text-center py-6 lg:py-12 bg-colors-primary-50 rounded-xl border border-dashed border-colors-primary-200">
            <p className="font-body text-description text-colors-textDarkGray">
              {t("noServices")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top Row: 3 Grid Items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
              {topServices.map((service, index) => (
                <div
                  key={service._id}
                  className={
                    index === 2 ? "col-span-2 sm:col-span-1" : "col-span-1"
                  }
                >
                  <ServiceCard service={service} lang={lang} isRTL={isRTL} />
                </div>
              ))}
            </div>

            {/* Bottom Row: 4 Grid Items */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              {bottomServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  lang={lang}
                  isRTL={isRTL}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Single Service Card matching the design layout (Blurred bottom overlay + localized title)
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

export default HomeServices;
