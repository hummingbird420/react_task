import { useEffect, useState, useCallback } from "react";

function useWindowWidth(screenSize) {
  const [onSmallScreen, setOnSmallScreen] = useState(false);

  const checkScreenSize = useCallback(() => {
    setOnSmallScreen(window.innerWidth < screenSize);
  }, [screenSize]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  return onSmallScreen;
}

export default useWindowWidth;
