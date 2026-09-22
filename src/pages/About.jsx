import Breadcrumb from "../components/Breadcrumb";
import AboutDetails from "../components/AboutDetails";
import WhyUs from "../components/WhyUs";

const AboutPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <AboutDetails getDirection={getDirection} />
    <WhyUs getDirection={getDirection} />
  </>
);

export default AboutPage;
