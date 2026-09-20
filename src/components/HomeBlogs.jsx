import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import {
  LucideArrowRight,
  LucideArrowLeft,
  LucideCalendar,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import CarouselWrapper from "./CarouselWrapper";
import { getLatestBlogs } from "../sanity/blogsQuery";
import { urlFor } from "../sanityClient";

export default function HomeBlogs({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const data = await getLatestBlogs();
        if (isMounted) {
          setBlogs(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching latest blogs from Sanity:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Custom Swiper Breakpoints
  // Shows 3 cards on desktop, and 1.25 slides on mobile (~1 and ~1/3 of the second card)
  const blogCarouselBreakpoints = {
    320: { slidesPerView: 1.25, spaceBetween: 12 },
    640: { slidesPerView: 2, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  };

  // Helper to format publishedAt date based on language locale
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(
        lang === "fa" ? "fa-AF" : lang === "ps" ? "ps-AF" : "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      ).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="py-16 lg:py-24 px-4 sm:px-6 xl:px-24 bg-colors-secondBg"
    >
      <div className="mx-auto space-y-8 lg:space-y-12">
        {/* Section Header */}
        <SectionHeader title={t("homeBlogsTitle")} />

        {/* Loading Skeleton State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-2xl bg-colors-bg p-1.5 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-48 rounded-xl bg-colors-primary-100/50" />
                <div className="space-y-3 p-3">
                  <div className="h-6 bg-colors-primary-100/50 rounded w-3/4" />
                  <div className="h-4 bg-colors-primary-100/50 rounded w-full" />
                  <div className="h-4 bg-colors-primary-100/50 rounded w-2/3" />
                </div>
                <div className="h-10 bg-colors-primary-100/50 rounded-lg m-3" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-colors-bg rounded-2xl border border-dashed border-colors-primary-200">
            <p className="font-body text-description text-colors-textDarkGray">
              {t("noBlogs")}
            </p>
          </div>
        ) : (
          /* Swiper Carousel Instance */
          <CarouselWrapper
            items={blogs}
            getDirection={getDirection}
            breakpoints={blogCarouselBreakpoints}
            autoplay={true}
            autoplayDelay={5000}
            showNavigation={true}
            showPagination={true}
            renderItem={(blog) => {
              const blogTitle = blog?.title?.[lang] || blog?.title?.en || "";
              const blogBody = blog?.body?.[lang] || blog?.body?.en || "";
              const imageUrl = blog?.mainImage
                ? urlFor(blog.mainImage).width(800).height(500).url()
                : "/images/blog-placeholder.jpg";

              return (
                <div className="h-full bg-colors-bg rounded-2xl p-1.5 sm:p-2 border border-colors-primary-100/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  {/* Top Image */}
                  <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-colors-secondBg">
                    <img
                      src={imageUrl}
                      alt={blogTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Content Parent Div */}
                  <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow space-y-4 text-start">
                    {/* Title + 2 Line Description */}
                    <div className="space-y-2">
                      <h3 className="font-title text-h4 font-bold text-colors-textDarkColor line-clamp-2 leading-snug group-hover:text-colors-primary-500 transition-colors">
                        {blogTitle}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-colors-textLightGray line-clamp-2 leading-relaxed">
                        {blogBody}
                      </p>
                    </div>

                    {/* Footer Child Div: Button + Published Date */}
                    <div className="pt-3 border-t border-colors-primary-100/50 flex items-center justify-between gap-2">
                      <Link
                        to={`/${lang}/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-semibold text-colors-primary-500 hover:text-colors-primary-600 transition-colors"
                      >
                        <span>{t("readMore", "Read More")}</span>
                        {isRTL ? (
                          <LucideArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <LucideArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </Link>

                      <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-colors-textLightGray font-medium">
                        <LucideCalendar className="w-3.5 h-3.5 text-colors-primary-500 shrink-0" />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </section>
  );
}
