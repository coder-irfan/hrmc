import Breadcrumb from "../components/Breadcrumb";
import Blogs from "../components/Blogs";

const BlogsPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <Blogs getDirection={getDirection} />
  </>
);

export default BlogsPage;
