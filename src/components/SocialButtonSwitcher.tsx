import { useState, useEffect } from "react";
import { InstagramButton } from "./InstagramButton";
import { WhatsAppButton } from "./WhatsAppButton";
import { FacebookButton } from "./FacebookButton";
import { YouTubeButton } from "./YouTubeButton";
import { TikTokButton } from "./TikTokButton";

/**
 * SocialButtonSwitcher - Cycles through all social media buttons
 * 
 * Shows each button for 5 seconds, then switches with a smooth fade transition
 * Cycles through: Instagram → WhatsApp → Facebook → YouTube → TikTok
 * Fixed position in bottom-right corner
 * 
 * z-index: 90 (above navbar z-60, below toasts z-100)
 */
export const SocialButtonSwitcher = () => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of all social buttons
  const socialButtons = [
    InstagramButton,
    WhatsAppButton,
    FacebookButton,
    YouTubeButton,
    TikTokButton,
  ];

  useEffect(() => {
    // Switch buttons every 5 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade out animation before switching
      setTimeout(() => {
        setCurrentButtonIndex((prev) => (prev + 1) % socialButtons.length);
        setIsTransitioning(false);
      }, 300); // Match this with CSS transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [socialButtons.length]);

  // Get the current button component
  const CurrentButton = socialButtons[currentButtonIndex];

  return (
    <div
      className="fixed bottom-6 right-6 z-[90] transition-opacity duration-300"
      style={{
        opacity: isTransitioning ? 0 : 1,
      }}
    >
      <CurrentButton />
    </div>
  );
};
