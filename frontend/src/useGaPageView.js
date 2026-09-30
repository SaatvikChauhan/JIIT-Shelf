import { useEffect } from "react";
import { useLocation } from "react-router";

const GA_ID = "G-ELGNR8GWY5";

export default function useGaPageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", GA_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
