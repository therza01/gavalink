import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Routes where the ElevenLabs voice widget should be visible
const VOICE_WIDGET_ROUTES = ["/", "/citizen"];

export const VoiceWidgetController = () => {
  const location = useLocation();

  useEffect(() => {
    const widget = document.querySelector("elevenlabs-convai");
    if (!widget) return;

    const shouldShow = VOICE_WIDGET_ROUTES.some(route => 
      route === "/" ? location.pathname === "/" : location.pathname.startsWith(route)
    );

    if (shouldShow) {
      (widget as HTMLElement).style.display = "block";
    } else {
      (widget as HTMLElement).style.display = "none";
    }
  }, [location.pathname]);

  return null;
};
