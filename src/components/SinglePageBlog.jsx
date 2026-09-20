import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LucideCalendar } from "lucide-react";
import { client, urlFor } from "../sanityClient";
import Button from "./Button";

export default function SinglePageBlog({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en", slug } = useParams();
  const dir = getDirection ? getDirection() : "ltr";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchBlogDetail = async () => {
      try {
        const query = `*[_type == "blog" && slug.current == $slug][0]{
          _id,
          title,
          mainImage,
          publishedAt,
          body
        }`;

        const data = await client.fetch(query, { slug });
        if (isMounted) {
          setBlog(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching single blog from Sanity:", error);
        if (isMounted) setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetail();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Resolve localized text strings based on blog schema fields
  const title = blog?.title?.[lang] || blog?.title?.en || "";
  const body = blog?.body?.[lang] || blog?.body?.en || "";
  const imageUrl = blog?.mainImage
    ? urlFor(blog.mainImage).width(1200).height(900).url()
    : "/images/blog-placeholder.jpg";

  // Helper to format publishedAt date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(
        lang === "fa" ? "fa-AF" : lang === "ps" ? "fa-AF" : "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      ).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <section
      dir={dir}
      className="pt-4 lg:pt-10 pb-10 lg:pb-16 px-4 sm:px-6 xl:px-24 text-colors-textDarkColor"
    >
      <div>
        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="w-full h-52 sm:h-96 lg:h-[450px] rounded-xl bg-colors-textLightGray/50 animate-pulse order-2 lg:order-1" />
            <div className="space-y-4">
              <div className="h-8 md:h-12 w-3/4 bg-colors-textLightGray/50 rounded-lg animate-pulse" />
              <div className="h-4 w-1/3 bg-colors-textLightGray/50 rounded animate-pulse" />
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
        ) : !blog ? (
          /* Empty / Not Found State */
          <div className="text-center py-10 bg-colors-primary-50 rounded-xl border border-dashed border-colors-primary-200">
            <h2 className="font-title text-h2 font-bold text-colors-textDarkColor mb-2">
              {t("blogNotFound")}
            </h2>
            <p className="font-body text-description text-colors-textLightGray mb-6">
              {t("blogNotFoundDesc")}
            </p>
            <Button
              variant="outline"
              text={t("viewAllBlogs")}
              to={`/${lang}/blog`}
            />
          </div>
        ) : (
          /* Main Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Content Column */}
            <div className="space-y-4 md:space-y-6 text-start order-2 lg:order-1">
              <div className="space-y-3">
                <h1 className="font-title text-h2 font-bold text-colors-textDarkColor leading-snug">
                  {title}
                </h1>

                {/* Decorative Brand Accent Divider */}
                <div className="w-20 lg:w-32 h-1 bg-colors-primary-500 rounded-full" />
              </div>

              {/* Full Blog Content / Body */}
              <div className="font-body text-description text-colors-textDarkGray leading-relaxed whitespace-pre-line text-justify">
                {body}
              </div>
            </div>

            {/* Main Image Column */}
            <div className="w-full h-52 sm:h-96 lg:h-[450px] rounded-xl overflow-hidden border border-colors-primary-100 shadow-sm bg-colors-secondBg order-1 lg:order-2">
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
