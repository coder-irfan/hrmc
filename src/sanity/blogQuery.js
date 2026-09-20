import { client } from "../sanityClient";

export const getLatestBlogs = async () => {
  const query = `*[_type == "blog"] | order(publishedAt desc)[0...8] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    body
  }`;
  return await client.fetch(query);
};
