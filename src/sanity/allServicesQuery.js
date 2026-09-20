import { client } from "../sanityClient";

// Fetch ALL services for /services page
export const getAllServices = async () => {
  const query = `*[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    image,
    description
  }`;
  return await client.fetch(query);
};
