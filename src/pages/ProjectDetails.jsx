import { lazy } from "react";
import Breadcrumb from "../components/Breadcrumb";

// Lazy imports
const ProjectDetails = lazy(() => import("../components/ProjectDetails"));

const ProjectDetailsPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <ProjectDetails getDirection={getDirection} />
  </>
);

export default ProjectDetailsPage;
