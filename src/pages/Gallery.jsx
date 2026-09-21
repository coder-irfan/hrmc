import Breadcrumb from "../components/Breadcrumb";
import BeforeAfter from "../components/BeforeAfter";

const BeforeAfterGallery = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <BeforeAfter getDirection={getDirection} />
  </>
);

export default BeforeAfterGallery;
