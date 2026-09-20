import { client } from "../sanityClient";

// Fetch ALL blogs for /blogs page
export const getAllBlogs = async () => {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    body
  }`;
  return await client.fetch(query);
};
