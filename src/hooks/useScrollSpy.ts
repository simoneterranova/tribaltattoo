import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  updateUrl?: boolean;
}

export const useScrollSpy = ({
  sectionIds,
  offset = 120,
  updateUrl = true,
}: ScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      let current = "";
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          // Check if we're in this section's range
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            current = id;
            break;
          }
        }
      }

      // If we're at the very top, set to first section
      if (window.scrollY < 100) {
        current = sectionIds[0];
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
        
        // Update URL hash without scrolling
        if (updateUrl) {
          const newUrl = current ? `#${current}` : window.location.pathname;
          window.history.replaceState(null, "", newUrl);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttle for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    
    return () => window.removeEventListener("scroll", scrollListener);
  }, [sectionIds, offset, updateUrl, activeSection]);

  return activeSection;
};
