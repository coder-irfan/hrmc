import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import PageSkeleton from "./components/PageSkeleton";

// Shared Layout
import Layout from "./components/Layout";

// Page Components
import Home from "./pages/Home";

// Lazy-loaded Pages
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Contact = lazy(() => import("./pages/Contact"));

// Sync Language and Direction
const LanguageSync = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) return;

    const validLangs = ["en", "fa", "ps"];
    const targetLang = validLangs.includes(lang) ? lang : "en";

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    const isRtl = ["fa", "ps"].includes(targetLang);
    document.documentElement.setAttribute("lang", targetLang);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [lang, i18n]);

  return <Outlet />;
};

// ---------------- MAIN APP ROUTER ---------------- //

function App() {
  const { i18n } = useTranslation();

  const getDirection = () => {
    const rtlLanguages = ["fa", "ps"];
    return rtlLanguages.includes(i18n.language) ? "rtl" : "ltr";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* Language Wrapper Route */}
      <Route path="/:lang" element={<LanguageSync />}>
        {/* Layout Shell Wrapper */}
        <Route element={<Layout getDirection={getDirection} />}>
          <Route
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Outlet />
              </Suspense>
            }
          ></Route>
          <Route index element={<Home getDirection={getDirection} />} />
          <Route path="about" element={<About getDirection={getDirection} />} />
          <Route
            path="services"
            element={<Services getDirection={getDirection} />}
          />
          <Route
            path="projects"
            element={<Projects getDirection={getDirection} />}
          />
          <Route
            path="projects/:slug"
            element={<ProjectDetails getDirection={getDirection} />}
          />
          <Route
            path="contact"
            element={<Contact getDirection={getDirection} />}
          />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
