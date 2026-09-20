import { Link } from "react-router-dom";

function Button({
  variant = "primary",
  text,
  icon: Icon,
  to,
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-body font-semibold text-description transition-all duration-300 ease-in-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  // Padding & Sizing variants
  const sizeStyles = "px-3.5 py-2 sm:px-5 sm:py-2.5";

  // Variant Styles based on your Tailwind configuration
  const variants = {
    // 1. Text + Icon + BG Color (Primary with circular icon background)
    primary:
      "bg-colors-primaryColor text-colors-textLightColor hover:bg-colors-primary-700 shadow-md hover:shadow-lg",

    // 2. Text + Icon + No BG (Ghost)
    ghost:
      "bg-transparent text-colors-primaryColor hover:text-colors-primary-700",

    // 3. Text + BG Color + No Icon (Simple Filled)
    simple:
      "bg-colors-primaryColor text-colors-textLightColor hover:bg-colors-primaryColorDark shadow-md hover:shadow-lg",

    // 4. Text + Border + Icon + No BG Color (Outline)
    outline:
      "bg-transparent border-2 border-colors-primaryColor text-colors-primaryColor hover:bg-colors-primaryColor hover:text-colors-textLightColor",
  };

  // Combine classes dynamically
  const skipSize = ["ghost"].includes(variant);
  const buttonClasses = `${baseStyles} ${skipSize ? "" : sizeStyles} ${variants[variant] || variants.primary} ${className}`;

  // Content Structure
  const content = (
    <>
      <span>{text}</span>

      {/* Render Icon if provided (Variant 3 ignores icon automatically if not passed) */}
      {Icon && (
        <span
          className={`flex items-center justify-center transition-colors ${variant !== "ghost" ? "text-colors-textLightColor" : "text-colors-primaryColor"}`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </span>
      )}
    </>
  );

  // Render as React Router Link
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {content}
      </Link>
    );
  }

  // Render as Standard HTML Anchor Link
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    );
  }

  // Standard Button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
