import { Suspense, lazy } from "react";

// Directly loaded above-the-fold components
import Hero from "../components/Hero";
import About from "../components/About";
import Divider from "../components/Divider";
import Services from "../components/Services";
import LoaderUI from "../components/Loader";

// Lazy loaded heavy components below the fold
const HomeServices = lazy(() => import("../components/HomeServices"));
const HomeBlogs = lazy(() => import("../components/HomeBlogs"));
const HomeDoctors = lazy(() => import("../components/HomeDoctors"));
const Divider2 = lazy(() => import("../components/Divider2"));
const FAQ = lazy(() => import("../components/FAQ"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));
const NewsLetter = lazy(() => import("../components/NewsLetter"));

const Home = ({ getDirection }) => (
  <>
    {/* Hero Section */}
    <Hero getDirection={getDirection} />

    <HomeServices getDirection={getDirection} />

    <HomeBlogs getDirection={getDirection} />

    <HomeDoctors getDirection={getDirection} />

    {/* About Section */}
    <About getDirection={getDirection} />

    {/* Divider 1 */}
    <div className="bg-divider-bg bg-cover bg-no-repeat bg-right relative">
      <Divider />
      <div className="absolute inset-0 bg-colors-textDarkColor/70 pointer-events-none" />
    </div>

    {/* Core Sections */}
    <Services getDirection={getDirection} />

    {/* Lazy Loaded Sections */}
    <Suspense fallback={<LoaderUI />}>
      <div className="bg-divider2-bg bg-cover bg-no-repeat bg-top relative">
        <Divider2 />
        <div className="absolute inset-0 bg-colors-textDarkColor/70 pointer-events-none" />
      </div>

      <FAQ getDirection={getDirection} />

      <div className="bg-testimonial-bg bg-contain bg-no-repeat bg-center bg-colors-secondBg">
        <Testimonial getDirection={getDirection} />
      </div>

      {/* Shows top / latest 3 projects on homepage */}
      <Projects getDirection={getDirection} limit={3} />

      <div className="bg-contact-bg bg-contain bg-no-repeat bg-right-top bg-colors-secondBg">
        <Contact getDirection={getDirection} />
      </div>

      <div className="bg-colors-bg">
        <NewsLetter />
      </div>
    </Suspense>
  </>
);

export default Home;
