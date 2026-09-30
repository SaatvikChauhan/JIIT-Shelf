import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Subjects from "./pages/Subjects";
import Material from "./pages/Material";
import SGEstimator from "./pages/SGEstimator";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import ReportBug from "./pages/ReportBug.jsx";
import Stats from "./pages/Stats.jsx";
import ContributeMaterial from "./pages/ContributeMaterial.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import useCustomAnalytics from "./useCustomAnalytics.js";
import useGaPageView from "./useGaPageView.js";
import { readStorage, writeStorage } from "./lib/storage.js";

export default function App() {
  const [theme, setTheme] = useState(() => readStorage("theme") === "light" ? "light" : "dark");
  const location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage("theme", theme);
  }, [theme]);
  useEffect(() => {
    if (location.hash === "#find-material") {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("find-material")?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, location.key]);
  useGaPageView();
  useCustomAnalytics();

  return <div className="app-shell">
    <Toaster position="top-center" toastOptions={{
      style: { background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "14px" },
      success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
      error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
    }} />
    <Navbar theme={theme} onToggleTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/subjects/:branch/:sem" element={<Subjects />} />
      <Route path="/material/:folderId" element={<Material />} />
      <Route path="/sgestimator" element={<SGEstimator />} />
      <Route path="/chat/:room" element={<ChatPage />} />
      <Route path="/report-bug" element={<ReportBug />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/contribute" element={<ContributeMaterial />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
    {!location.pathname.startsWith("/chat/") && <Footer />}
  </div>;
}
