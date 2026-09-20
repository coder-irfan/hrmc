import { client } from "../sanityClient";

export const getHomeServices = async () => {
  const query = `*[_type == "service"] | order(_createdAt desc)[0...7] {
    _id,
    title,
    "slug": slug.current,
    image,
    description
  }`;
  return await client.fetch(query);
};
