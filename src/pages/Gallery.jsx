import CoreValues from "../components/CoreValues";
import Breadcrumb from "../components/Breadcrumb";
import AboutDetails from "../components/AboutDetails";

const AboutPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <AboutDetails getDirection={getDirection} />
    <CoreValues getDirection={getDirection} />
  </>
);

export default AboutPage;
