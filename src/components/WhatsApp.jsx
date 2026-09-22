import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Distance from the very bottom of the document
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);

      // Show after scrolling 300px down, BUT hide if within 300px of the footer/bottom
      const isPastHero = scrollY > 300;
      const isNearFooter = distanceFromBottom < 700;

      if (isPastHero && !isNearFooter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-5 lg:right-8 lg:bottom-8 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping-slow"></span>
      <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-30 animate-ping-slower"></span>

      <a
        href="https://wa.me/937786601801?text=Hello%20I%20want%20more%20information%20about%20Burjezamin"
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-3 md:p-4 rounded-full shadow-lg text-colors-textLightColor bg-[#25d366] hover:bg-[#20b456] transition-all duration-300 flex items-center justify-center"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

export default WhatsApp;
