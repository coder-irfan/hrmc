import Breadcrumb from "../components/Breadcrumb";
import SinglePageBlog from "../components/SinglePageBlog";

const SingleBlog = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <SinglePageBlog getDirection={getDirection} />
  </>
);

export default SingleBlog;
