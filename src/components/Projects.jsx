import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ChevronDown, ChevronUp, LucideChevronsRight } from "lucide-react";
import { client, urlFor } from "../sanityClient";

function DoneProjects({ getDirection, limit }) {
  const isRTL = getDirection() === "rtl";
  const { t, i18n } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Show 6 projects initially
  const [showAll, setShowAll] = useState(false);

  const currentLang =
    i18n.language && i18n.language.startsWith("fa") ? "fa" : "en";

  useEffect(() => {
    const query = limit
      ? `*[_type == "project"] | order(_createdAt desc)[0...${limit}] {
          _id,
          _createdAt,
          slug,
          title,
          description,
          image
        }`
      : `*[_type == "project"] | order(_createdAt desc) {
          _id,
          _createdAt,
          slug,
          title,
          description,
          image
        }`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, [limit]);

  // Determine displayed list length (First 6 or All)
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      dir={getDirection()}
      id="projects"
      className="px-6 py-16 md:px-8 lg:px-16 lg:py-24 space-y-6 lg:space-y-10 bg-colors-bg"
    >
      {/* Section Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div
          className={`inline-block tracking-wider ${
            isRTL ? "border-r-4" : "border-l-4"
          } border-colors-primaryColorDarkesh`}
        >
          <p className="mx-4 font-medium md:text-lg lg:text-xl text-colors-textDarkColor">
            {t("projectsSection")}
          </p>
        </div>

        <h2 className="text-h2 font-semibold leading-tight text-colors-textDarkColor">
          {t("projectsTitle")}{" "}
          <span className="text-colors-primaryColorDark">
            {t("projectsHighlight")}
          </span>
        </h2>

        <p className="text-sm md:text-base text-colors-textDarkGray max-w-2xl mx-auto">
          {t("projectsDescription")}
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="min-h-[20vh] flex items-center justify-center bg-colors-bg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-colors-primaryColorDark border-t-transparent rounded-full animate-spin" />
            <p className="text-colors-textDarkGray font-medium text-sm">
              {t("loadingProjects")}
            </p>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-colors-textDarkGray font-medium">
          {t("noProjectsFound")}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => {
              const projectTitle =
                project.title?.[currentLang] || project.title?.en || "";
              const projectDesc =
                project.description?.[currentLang] ||
                project.description?.en ||
                "";
              const imageUrl = project.image
                ? urlFor(project.image)
                    .width(1200)
                    .quality(80)
                    .auto("format")
                    .url()
                : "";

              const projectSlug = project.slug?.current || "#";

              return (
                <div
                  key={project._id}
                  className="group cursor-pointer border border-colors-textDarkGray/20 rounded-xl overflow-hidden bg-colors-bg shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Link
                    to={`/${currentLang}/projects/${projectSlug}`}
                    className="block relative overflow-hidden"
                  >
                    {imageUrl && (
                      <ProjectImage
                        src={imageUrl}
                        alt={projectTitle}
                        className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    <span className="absolute top-3 left-3 bg-colors-textDarkGray/80 text-colors-textLightColor text-xs px-3 py-1 rounded-full">
                      {t("projectCount")} {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>

                  <div className="p-6 space-y-3">
                    <Link to={`/${currentLang}/projects/${projectSlug}`}>
                      <h3 className="text-h3 font-semibold text-colors-textDarkColor group-hover:text-colors-primaryColorDark transition-colors">
                        {projectTitle}
                      </h3>
                    </Link>

                    <p className="text-sm text-colors-textDarkGray line-clamp-3 leading-relaxed">
                      {projectDesc}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs lg:text-sm text-colors-textDarkGray/80">
                        {t("completedProject")}
                      </span>

                      <Link
                        to={`/${currentLang}/projects/${projectSlug}`}
                        className="text-sm font-semibold text-colors-secondTextColor group-hover:translate-x-1 transition-transform flex items-center gap-1"
                      >
                        {t("seeDetails")}{" "}
                        <LucideChevronsRight
                          className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More / See Less Button Logic */}
          {projects.length > 6 && (
            <div className="flex justify-center pt-6">
              <button onClick={() => setShowAll(!showAll)} className="button">
                <span>{showAll ? t("showLess") : t("showMore")}</span>
                {showAll ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default DoneProjects;

function ProjectImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Skeleton Loading State */}
      {!loaded && (
        <div className="absolute inset-0 bg-colors-textDarkGray/50 animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
