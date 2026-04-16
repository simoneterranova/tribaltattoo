import { useState } from "react";
import whatsappIcon from "@/assets/whatsapp_icon.png";

/**
 * WhatsAppButton - Floating chat button
 * 
 * Fixed position in bottom-right corner
 * Opens WhatsApp chat with the shop's phone number
 * - Mobile: Opens WhatsApp app directly
 * - Desktop: Opens WhatsApp Web
 * 
 * z-index: 90 (above navbar z-60, below toasts z-100)
 */
export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Format phone number for WhatsApp (remove spaces, keep +)
  const phoneNumber = "+393388398005"; // Gran Babar phone from shopConfig
  
  // Default message (optional - can be customized)
  const defaultMessage = encodeURIComponent(
    "Ciao! Vorrei avere informazioni sui vostri servizi."
  );
  
  // WhatsApp link - works on both mobile (app) and desktop (web)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contattaci su WhatsApp"
      style={{
        // Ensure it stays above content but below toasts
        // Positioned to not overlap cookie banner (bottom-6 vs cookie banner's bottom-0)
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      {/* WhatsApp icon - pure display without background */}
      <div className="relative">
        {/* Icon image */}
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-16 h-16 object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
        />
        
        {/* Subtle glow effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full animate-pulse opacity-40 blur-xl"
            style={{
              background: "#25D366",
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
        Scrivici su WhatsApp
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
