import { lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Direct / Lazy imports
const Contact = lazy(() => import("../components/Contact"));
const Location = lazy(() => import("../components/Location"));
const NewsLetter = lazy(() => import("../components/NewsLetter"));

const ContactPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <div className="bg-contact-bg bg-contain bg-no-repeat bg-right-top bg-colors-secondBg">
      <Contact getDirection={getDirection} />
    </div>
    <Location />
    <div className="bg-colors-secondBg">
      <NewsLetter />
    </div>
  </>
);

export default ContactPage;
