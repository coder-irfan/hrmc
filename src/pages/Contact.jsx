import { lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";
import QuickContact from "../components/QuickContact";

// Direct / Lazy imports
const Contact = lazy(() => import("../components/Contact"));
const Location = lazy(() => import("../components/Location"));

const ContactPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <Contact getDirection={getDirection} />
    <QuickContact />
    <Location />
  </>
);

export default ContactPage;
