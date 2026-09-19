import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FolderCheck,
  ArrowLeft,
  ArrowRight,
  Send,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { client, urlFor } from "../sanityClient";

function ProjectDetails({ getDirection }) {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = getDirection ? getDirection() === "rtl" : i18n.dir() === "rtl";

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const currentLang =
    i18n.language && i18n.language.startsWith("fa") ? "fa" : "en";

  useEffect(() => {
    window.scrollTo(0, 0);

    // GROQ query to fetch project by slug
    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      description,
      image,
      gallery
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-colors-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-colors-primaryColorDark border-t-transparent rounded-full animate-spin" />
          <p className="text-colors-textDarkGray font-medium text-sm">
            {t("loadingProjects")}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-colors-bg px-4 text-center">
        <h2 className="text-h3 font-bold text-colors-textDarkColor mb-2">
          {t("noProjectsFound")}
        </h2>
        <Link
          to={`/${currentLang}/projects`}
          className="button inline-flex items-center gap-2"
        >
          {isRTL ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          <span>{t("backToProjects")}</span>
        </Link>
      </div>
    );
  }

  const projectTitle = project.title?.[currentLang] || project.title?.en || "";
  const projectDesc =
    project.description?.[currentLang] || project.description?.en || "";

  // Combine main image + gallery into one array for the lightbox viewer
  const allImages = [];
  if (project.image) allImages.push(project.image);
  if (project.gallery && Array.isArray(project.gallery)) {
    allImages.push(...project.gallery);
  }

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      dir={getDirection ? getDirection() : i18n.dir()}
      className="overflow-hidden bg-colors-bg px-6 py-8 md:px-8 lg:px-16 lg:py-16 space-y-6 lg:space-y-10"
    >
      {/* Container */}
      <section className="space-y-8">
        {/* 2-Column Details Layout */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-10 bg-colors-primaryColorDark/5 rounded-lg lg:rounded-2xl p-3 md:p-6">
            {project.image && (
              <div className="space-y-2">
                <div className="relative group rounded-lg lg:rounded-xl overflow-hidden bg-colors-primaryColorDark/5 shadow-2xl border border-colors-textDarkGray/10 w-full h-[300px] md:h-[380px] lg:h-[450px]">
                  <img
                    src={urlFor(project.image)
                      .width(1600)
                      .quality(85)
                      .auto("format")
                      .url()}
                    alt={projectTitle}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="absolute bottom-4 end-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-3 rounded-md lg:rounded-xl shadow-lg transition-all opacity-90 hover:scale-105 flex items-center gap-2 text-xs font-semibold z-10"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>{t("viewFullImage")}</span>
                  </button>
                </div>

                {/* Gallery Grid */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="">
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                      {project.gallery.map((galleryImg, idx) => {
                        const imgUrl = urlFor(galleryImg)
                          .width(500)
                          .quality(80)
                          .auto("format")
                          .url();

                        const imageGlobalIndex = idx + (project.image ? 1 : 0);

                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setLightboxIndex(imageGlobalIndex)}
                            className="relative group cursor-pointer w-full h-16 md:h-28 rounded-md lg:rounded-lg overflow-hidden bg-colors-primaryColorDark/5 shadow-md"
                          >
                            <img
                              src={imgUrl}
                              alt={`${projectTitle} - ${idx + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="w-6 h-6 text-white" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description Block */}
            <div className="space-y-4">
              <h2 className="text-h1 font-extrabold text-colors-textDarkColor leading-tight">
                {projectTitle}
              </h2>
              <p className="text-colors-textDarkGray text-description leading-relaxed whitespace-pre-line font-normal">
                {projectDesc}
              </p>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              {/* Meta Stats Card */}
              <div className="bg-colors-primaryColorDark/5 rounded-lg lg:rounded-2xl p-3 lg:p-6 space-y-4">
                <h3 className="text-h4 font-bold text-colors-textDarkColor border-b border-colors-textDarkGray/15 pb-3">
                  {t("projectDetails")}
                </h3>

                <div className="space-y-4 text-xs md:text-sm">
                  {/* Date */}
                  <div className="flex items-center gap-3 border-b border-colors-textDarkGray/10 pb-3">
                    <div className="p-2.5 bg-colors-primaryColorDark/10 text-colors-primaryColorDark rounded-xl">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="block text-xs text-colors-textDarkGray font-medium">
                        {t("completionDate")}
                      </span>
                      <span className="font-semibold text-colors-textDarkColor">
                        {new Date(project._createdAt).toLocaleDateString(
                          currentLang === "fa" ? "fa-AF" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 border-b border-colors-textDarkGray/10 pb-3">
                    <div className="p-2.5 bg-colors-primaryColorDark/10 text-colors-primaryColorDark rounded-xl">
                      <FolderCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="block text-xs text-colors-textDarkGray font-medium">
                        {t("status")}
                      </span>
                      <span className="font-semibold text-colors-textDarkColor">
                        {t("completed")}
                      </span>
                    </div>
                  </div>

                  {/* Quality Standard Badge */}
                  <div className="flex items-center gap-3 border-b border-colors-textDarkGray/10 pb-3">
                    <div className="p-2.5 bg-colors-primaryColorDark/10 text-colors-primaryColorDark rounded-xl">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="block text-xs text-colors-textDarkGray font-medium">
                        {t("qualityGuarantee")}
                      </span>
                      <span className="font-semibold text-colors-textDarkColor">
                        {t("certifiedEngineering")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call To Action Box */}
                <div className="space-y-3">
                  <p className="text-xs text-colors-textDarkGray leading-relaxed">
                    {t("interestedInSimilar")}
                  </p>
                  <Link
                    to={`/${currentLang}/contact`}
                    className="w-full button"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t("requestQuote")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed -top-10 end-0 start-0 bottom-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 end-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute start-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute end-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 rtl:rotate-180" />
                </button>
              </>
            )}

            {/* Main Lightbox Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              src={urlFor(allImages[lightboxIndex])
                .width(1920)
                .quality(90)
                .auto("format")
                .url()}
              alt="Project media expanded"
              className="w-full max-w-[500px] lg:max-w-[600px] h-full max-h-[500px] lg:max-h-[600px] object-cover bg-colors-textDarkGray rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectDetails;
