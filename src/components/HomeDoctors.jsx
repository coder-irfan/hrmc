import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import CarouselWrapper from "./CarouselWrapper";
import { getAllDoctors } from "../sanity/doctorQuery";
import { urlFor } from "../sanityClient";

export default function HomeDoctors({ getDirection }) {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        if (isMounted) {
          setDoctors(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doctors from Sanity:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchDoctors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive breakpoints matching carousel logic
  const doctorCarouselBreakpoints = {
    320: { slidesPerView: 1.2, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 12 },
    768: { slidesPerView: 3, spaceBetween: 14 },
    1024: { slidesPerView: 4, spaceBetween: 16 },
    1280: { slidesPerView: 5, spaceBetween: 20 },
  };

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="py-16 lg:py-24 px-4 sm:px-6 xl:px-24 bg-colors-bg"
    >
      <div className="mx-auto space-y-8 lg:space-y-12">
        {/* Section Header */}
        <SectionHeading title={t("homeDoctorsTitle")} />

        {/* Loading Skeleton State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-full h-96 rounded-[200px] md:rounded-[120px] bg-colors-textLightGray/50 animate-pulse
                ${i > 0 ? "hidden sm:block" : ""}`}
              />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          /* Empty State */
          <div className="text-center py-8 lg:py-12 bg-colors-secondBg rounded-xl border border-dashed border-colors-primary-200">
            <p className="font-body text-description text-colors-textDarkGray">
              {t("noDoctors")}
            </p>
          </div>
        ) : (
          /* Swiper Carousel Instance showing all doctors */
          <CarouselWrapper
            items={doctors}
            getDirection={getDirection}
            breakpoints={doctorCarouselBreakpoints}
            autoplay={true}
            autoplayDelay={4000}
            showNavigation={true}
            showPagination={true}
            renderItem={(doctor) => {
              const doctorName = doctor?.name || "";
              const specializationText =
                doctor?.specialization?.[lang] ||
                doctor?.specialization?.en ||
                "";
              const imageUrl = doctor?.image
                ? urlFor(doctor.image).width(600).height(800).url()
                : "/images/doctor-placeholder.jpg";

              return (
                <div className="relative w-full h-96 rounded-[200px] md:rounded-[120px] overflow-hidden border-2 border-colors-primary-200/50 shadow-sm hover:shadow-md transition-all duration-500">
                  {/* Doctor Full Photograph */}
                  <img
                    src={imageUrl}
                    alt={doctorName}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Dark Fade Gradient Overlay at the Bottom */}
                  <div className="absolute inset-x-0 bottom-0 pt-28 pb-8 px-4 bg-gradient-to-t from-colors-primary-500/80 via-colors-primary-500/60 to-transparent text-center flex flex-col justify-end items-center space-y-1">
                    {/* Doctor Name */}
                    <h3 className="font-title text-h4 md:text-h5 font-bold text-colors-textLightColor leading-snug drop-shadow-sm">
                      {doctorName}
                    </h3>

                    {/* Specialization Field */}
                    <p className="font-body text-xs md:text-sm font-bold text-colors-textLightColor/70 drop-shadow-xs">
                      {specializationText}
                    </p>
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
