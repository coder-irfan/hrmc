import { client } from "../sanityClient";

export const getAllDoctors = async () => {
  const query = `*[_type == "doctor"] | order(_createdAt asc) {
    _id,
    name,
    specialization,
    image
  }`;
  return await client.fetch(query);
};
