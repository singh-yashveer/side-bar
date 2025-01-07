import { useState, useLayoutEffect } from "react";

export const useMediaQuery = (breakpoint?: string): boolean => {
  const [matches, setMatches] = useState(!!breakpoint && typeof window !== "undefined" && window.matchMedia(breakpoint).matches);

  useLayoutEffect(() => {
    if (!breakpoint) return;

    const media = window.matchMedia(breakpoint);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", handleChange);
    setMatches(media.matches);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return matches;
};
