import { lazy } from "react";

// Directly loaded above-the-fold components
import Hero from "../components/Hero";
import About from "../components/About";
import Divider from "../components/Divider";

// Lazy loaded heavy components below the fold
const HomeServices = lazy(() => import("../components/HomeServices"));
const HomeBlogs = lazy(() => import("../components/HomeBlogs"));
const HomeDoctors = lazy(() => import("../components/HomeDoctors"));
const HomeBeforeAfter = lazy(() => import("../components/HomeBeforeAfter"));

const Home = ({ getDirection }) => (
  <>
    {/* Hero Section */}
    <Hero getDirection={getDirection} />

    <HomeServices getDirection={getDirection} />

    <About getDirection={getDirection} />

    <HomeDoctors getDirection={getDirection} />

    <Divider />

    <HomeBeforeAfter getDirection={getDirection} />

    <HomeBlogs getDirection={getDirection} />
  </>
);

export default Home;
