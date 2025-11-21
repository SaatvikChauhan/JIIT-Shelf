import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-ELGNR8GWY5";

export default function useGaPageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof gtag !== "undefined") {
      gtag("config", GA_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
