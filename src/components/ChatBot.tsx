import { useEffect } from "react";
import shopConfig from "@/config/shopConfig";

/**
 * ChatBot — Botpress Webchat launcher.
 *
 * Rendered once at the app root, so the widget stays alive across all client-side
 * route changes (single-page app). Script injection is fully driven by
 * shopConfig.ts → chatbot so deploying for another studio requires no code edits.
 *
 * The launcher uses Botpress's default bottom-right position. The rotating
 * social buttons stack lives on the bottom-left (see SocialButtonSwitcher),
 * so the two never overlap.
 */
export const ChatBot = () => {
  useEffect(() => {
    const { enabled, injectScriptUrl, configScriptUrl } = shopConfig.chatbot;
    if (!enabled || typeof window === "undefined") return;

    // Idempotency guard — prevents double injection (StrictMode / HMR)
    if (document.querySelector(`script[src="${injectScriptUrl}"]`)) return;

    // Load Botpress loader first, then the bot config script (calls window.botpress.init).
    // Chaining on `onload` guarantees window.botpress exists before init runs.
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`ChatBot: failed to load ${src}`));
        document.body.appendChild(script);
      });

    (async () => {
      try {
        await loadScript(injectScriptUrl);
        await loadScript(configScriptUrl);
      } catch (err) {
        console.error("[ChatBot]", err);
      }
    })();
  }, []);

  return null;
};