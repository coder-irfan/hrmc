import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  LucideArrowRight,
  LucideArrowLeft,
  LucideCalendar,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import CarouselWrapper from "./CarouselWrapper";
import { getLatestBlogs } from "../sanity/blogQuery";
import { urlFor } from "../sanityClient";
import Button from "./Button";

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
    320: { slidesPerView: 1.1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 12 },
    1024: { slidesPerView: 3, spaceBetween: 14 },
  };

  // Helper to format publishedAt date based on language locale
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
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-10 lg:pb-16"
    >
      <div className="mx-auto space-y-6 lg:space-y-10 py-8 lg:py-14 px-4 sm:px-6 xl:px-12 bg-colors-primary-50 rounded-xl bg-colors-primary-50">
        {/* Section Header */}
        <SectionHeading title={t("homeBlogsTitle")} />

        {/* Loading Skeleton State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-96 lg:h-[420px] rounded-xl bg-colors-textLightGray/50 p-1.5 animate-pulse flex flex-col justify-between ${
                  i > 0 ? "hidden sm:block" : ""
                }`}
              >
                <div className="w-full h-48 lg:h-64 rounded-xl bg-colors-textLightGray/50" />
                <div className="space-y-2 lg:h-space-y-4 p-2 lg:h-p-3">
                  <div className="h-6 bg-colors-textLightGray/50 rounded w-3/4" />
                  <div className="h-4 bg-colors-textLightGray/50 rounded w-full" />
                  <div className="h-4 bg-colors-textLightGray/50 rounded w-2/3" />
                </div>
                <div className="h-8 lg:h-10 bg-colors-textLightGray/50 rounded-lg m-3" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-8 lg:py-12 bg-colors-bg rounded-xl border border-dashed border-colors-primary-200">
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
            autoplayDelay={4000}
            showNavigation={true}
            showPagination={true}
            renderItem={(blog) => {
              const blogTitle = blog?.title?.[lang] || blog?.title?.en || "";
              const blogBody = blog?.body?.[lang] || blog?.body?.en || "";
              const imageUrl = blog?.mainImage
                ? urlFor(blog.mainImage).width(800).height(500).url()
                : "/images/blog-placeholder.jpg";

              return (
                <div className="h-full bg-colors-bg rounded-xl p-2 sm:p-2.5 border border-colors-primary-100/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  {/* Top Image */}
                  <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden bg-colors-primary-50">
                    <img
                      src={imageUrl}
                      alt={blogTitle}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Bottom Content Parent Div */}
                  <div className="pt-3 pb-1.5 px-3 sm:pt-5 sm:px-5 sm:pb-3.5 flex flex-col justify-between flex-grow space-y-4 lg:space-y-6 text-start">
                    {/* Title + 2 Line Description */}
                    <div className="space-y-2">
                      <h3 className="font-title text-h4 font-bold text-colors-textDarkColor line-clamp-1 leading-snug hover:text-colors-primary-500 transition-colors">
                        {blogTitle}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-colors-textLightGray line-clamp-2 leading-relaxed">
                        {blogBody}
                      </p>
                    </div>

                    {/* Footer Child Div: Button + Published Date */}
                    <div className="pt-4 lg:pt-6 border-t border-colors-primary-100/50 flex items-center justify-between gap-2">
                      <Button
                        variant="ghost"
                        icon={isRTL ? LucideArrowLeft : LucideArrowRight}
                        text={t("readMore")}
                        to={`/${lang}/blog/${blog.slug}`}
                        className=""
                      />

                      <div className="inline-flex items-center gap-1 text-xs md:text-sm text-colors-textLightGray font-medium">
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
