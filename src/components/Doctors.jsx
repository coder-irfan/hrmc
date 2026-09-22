import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { getAllDoctors } from "../sanity/doctorQuery";
import { urlFor } from "../sanityClient";

export default function Doctors({ getDirection }) {
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

  return (
    <section
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pb-8 pt-4 lg:pb-16 lg:pt-10"
    >
      <div className="mx-auto space-y-8 lg:space-y-12 px-4 sm:px-6 xl:px-12 py-8 lg:py-14 bg-colors-primary-50 rounded-xl">
        {/* Section Header */}
        <SectionHeading title={t("allDoctorsTitle")} />

        {/* Loading Skeleton Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-64 md:h-96 rounded-lg md:rounded-xl bg-colors-textLightGray/50 animate-pulse"
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
          /* Responsive CSS Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            {doctors.map((doctor) => {
              const doctorName = doctor?.name || "";
              const specializationText =
                doctor?.specialization?.[lang] ||
                doctor?.specialization?.en ||
                "";
              const imageUrl = doctor?.image
                ? urlFor(doctor.image).width(600).height(800).url()
                : "/images/doctor-placeholder.jpg";

              return (
                <div
                  key={doctor._id}
                  className="relative w-full h-64 md:h-96 rounded-lg md:rounded-xl overflow-hidden border-2 border-colors-primary-200/50 shadow-sm hover:shadow-md transition-all duration-500"
                >
                  {/* Doctor Full Photograph */}
                  <img
                    src={imageUrl}
                    alt={doctorName}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />

                  {/* Dark Fade Gradient Overlay at the Bottom */}
                  <div className="absolute inset-x-0 bottom-0 pt-14 md:pt-28 pb-8 px-4 bg-gradient-to-t from-colors-primary-500/80 via-colors-primary-500/60 to-transparent text-center flex flex-col justify-end items-center space-y-1">
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
            })}
          </div>
        )}
      </div>
    </section>
  );
}
