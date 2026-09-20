import { lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Lazy imports
const SinglePageService = lazy(() => import("../components/SinglePageService"));

const SingleServicePage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <SinglePageService getDirection={getDirection} />
  </>
);

export default SingleServicePage;
