import i18n from "../i18n";

/**
 * Extracts the correct localized string based on current i18next language.
 * Fallback order: Active Language -> English ('en') -> Empty String
 *
 * @param {Object|string} field - The Sanity field
 * @returns {string} - Clean string to render directly in JSX
 */
export const getLocalized = (field) => {
  if (!field) return "";

  // If it's already a plain string (like doctor's name), return it directly
  if (typeof field === "string") return field;

  const currentLang = i18n.language || "en";

  // Return active language string, or fallback to English if missing
  return field[currentLang] || field["en"] || "";
};
