import { client } from "../sanityClient";

export const getHomeServices = async () => {
  const query = `*[_type == "service"] {
    _id,
    title,
    "slug": slug.current,
    image,
    description
  }`;
  return await client.fetch(query);
};
