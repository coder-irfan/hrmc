import { client } from "../sanityClient";

// Fetch up to 8 Before & After items for the Home Page
export const getHomeBeforeAfter = async () => {
  const query = `*[_type == "beforeAfter"] | order(_createdAt desc)[0...8] {
    _id,
    title,
    beforeImage,
    afterImage
  }`;
  return await client.fetch(query);
};

// Fetch ALL Before & After items for the /before-after page
export const getAllBeforeAfter = async () => {
  const query = `*[_type == "beforeAfter"] | order(_createdAt desc) {
    _id,
    title,
    beforeImage,
    afterImage
  }`;
  return await client.fetch(query);
};
