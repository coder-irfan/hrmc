import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "../sanityClient";
import Button from "./Button";

export default function SinglePageService({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en", slug } = useParams();
  const dir = getDirection ? getDirection() : "ltr";

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchServiceDetail = async () => {
      try {
        const query = `*[_type == "service" && slug.current == $slug][0]{
          _id,
          title,
          image,
          description
        }`;

        const data = await client.fetch(query, { slug });
        if (isMounted) {
          setService(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching single service from Sanity:", error);
        if (isMounted) setLoading(false);
      }
    };

    if (slug) {
      fetchServiceDetail();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Resolve localized text strings
  const title = service?.title?.[lang] || service?.title?.en || "";
  const description =
    service?.description?.[lang] || service?.description?.en || "";
  const imageUrl = service?.image
    ? urlFor(service.image).width(1200).height(900).url()
    : "/images/dental-clinic.jpg";

  return (
    <section
      dir={dir}
      className="pt-4 pb-10 px-4 sm:px-6 xl:px-24 text-colors-textDarkColor"
    >
      <div className="">
        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="w-full h-52 sm:h-96 lg:h-[450px] rounded-xl bg-colors-textLightGray/50 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 md:h-12 w-3/4 bg-colors-textLightGray/50 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-colors-textLightGray/50 rounded animate-pulse" />
            </div>
          </div>
        ) : !service ? (
          /* Empty / Not Found State */
          <div className="text-center py-10 bg-colors-primary-50 rounded-xl border border-dashed border-colors-primary-200">
            <h2 className="font-title text-h2 font-bold text-colors-textDarkColor mb-2">
              {t("serviceNotFound")}
            </h2>
            <p className="font-body text-description text-colors-textLightGray mb-6">
              {t("serviceNotFoundDesc")}
            </p>
            <Button
              variant="outline"
              text={t("viewAllServices")}
              to={`/${lang}/services`}
            />
          </div>
        ) : (
          /* Main Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Content Column */}
            <div className="space-y-4 md:space-y-6 text-start order-2 lg:order-1">
              <div className="space-y-2">
                <h1 className="font-title text-h2 font-bold text-colors-textDarkColor leading-snug">
                  {title}
                </h1>

                {/* Decorative Brand Accent Divider */}
                <div className="w-20 lg:w-32 h-1 bg-colors-primary-500 rounded-full" />
              </div>
              {/* Full Description */}
              <div className="font-body text-description text-colors-textDarkGray leading-relaxed whitespace-pre-line text-justify">
                {description}
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full h-52 sm:h-96 lg:h-[450px] rounded-xl overflow-hidden border border-colors-primary-100 shadow-sm bg-colors-secondBg">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
