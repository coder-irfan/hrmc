export default function SectionHeading({
  title,
  centered = true,
  className = "",
}) {
  return (
    <div
      className={`max-w-2xl space-y-2 ${
        centered ? "mx-auto text-center" : "text-start"
      } ${className}`}
    >
      {/* Downward Arrow Badge */}
      <div
        className={`inline-flex items-center justify-center w-14 h-8 md:w-16 md:h-10 rounded-full bg-colors-primary-500 shadow-sm p-2 md:p-2.5`}
      >
        <img
          src="/images/arrow-down.webp"
          alt="arrow icon"
          className="w-full h-full object-contain brightness-0 invert"
        />
      </div>

      {/* Section Title */}
      {title && (
        <h2 className="font-title text-h2 font-bold text-colors-textDarkColor leading-snug">
          {title}
        </h2>
      )}
    </div>
  );
}
