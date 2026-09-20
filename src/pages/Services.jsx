// Direct imports
import Services from "../components/Services";
import WhatsApp from "../components/WhatsApp";
import Breadcrumb from "../components/Breadcrumb";

const ServicesPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <Services getDirection={getDirection} />
    <WhatsApp />
  </>
);

export default ServicesPage;
