import Breadcrumb from "../components/Breadcrumb";
import Doctors from "../components/Doctors";

const DoctorsPage = ({ getDirection }) => (
  <>
    <Breadcrumb getDirection={getDirection} />
    <Doctors getDirection={getDirection} />
  </>
);

export default DoctorsPage;
