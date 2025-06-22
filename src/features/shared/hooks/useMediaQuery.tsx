import { useEffect, useState } from "react";

export const useMediaQuery = (query?: string): boolean => {
  const getMatches = (mediaQuery?: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined" && mediaQuery) {
      return window.matchMedia(mediaQuery).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    if (!query) {
      return;
    }

    const matchMedia = window.matchMedia(query);

    const handleChange = (): void => {
      setMatches(getMatches(query));
    };

    // Initial check
    handleChange();

    // Listen for changes
    if (matchMedia.addEventListener) {
      matchMedia.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      matchMedia.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        matchMedia.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};
