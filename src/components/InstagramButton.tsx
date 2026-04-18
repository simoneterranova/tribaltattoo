import { useState } from "react";
import instagramIcon from "@/assets/instagram_logo.webp";
import shopConfig from "@/config/shopConfig";

/**
 * InstagramButton - Floating social button
 * 
 * Fixed position in bottom-right corner
 * Opens Instagram profile
 * - Mobile: Opens Instagram app directly
 * - Desktop: Opens Instagram website
 * 
 * z-index: 90 (above navbar z-60, below toasts z-100)
 */
export const InstagramButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Instagram URL from shopConfig
  const instagramUrl = shopConfig.social.instagram;

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Seguici su Instagram"
      style={{
        // Ensure it stays above content but below toasts
        // Positioned to not overlap cookie banner (bottom-6 vs cookie banner's bottom-0)
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      {/* Instagram icon - pure display without background */}
      <div className="relative">
        {/* Icon image */}
        <img
          src={instagramIcon}
          alt="Instagram"
          className="w-16 h-16 object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
        />
        
        {/* Subtle glow effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full animate-pulse opacity-40 blur-xl"
            style={{
              background: "#E4405F",
              zIndex: -1,
            }}
          />
        )}
      </div>

      {/* Tooltip on hover - desktop only */}
      <div
        className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap
                   bg-card/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-md
                   shadow-lg border border-border text-sm font-body
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   pointer-events-none"
      >
        Seguici su Instagram
        {/* Arrow pointer */}
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 -ml-1
                     w-0 h-0 border-t-[6px] border-t-transparent
                     border-b-[6px] border-b-transparent
                     border-l-[6px] border-l-border"
        />
      </div>
    </a>
  );
};
