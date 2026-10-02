import{t as e}from"./sanityClient-Do6h_eZY.js";var t=async()=>await e.fetch(`*[_type == "doctor"] | order(_createdAt asc) {
    _id,
    name,
    specialization,
    image
  }`);export{t};