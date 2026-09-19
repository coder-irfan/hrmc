import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "hb4frq5b",
  dataset: "production",
  useCdn: true, // `true` gives fast, cached responses for public data
  apiVersion: "2026-01-01", // Use current API version
});

// Helper function to easily convert Sanity image references to real image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
