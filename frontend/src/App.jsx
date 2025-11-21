import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Subjects from "./pages/Subjects";
import Material from "./pages/Material";
import SGEstimator from "./pages/SGEstimator";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";

import useGaPageView from "./useGaPageView.js";

const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === "light") {
    root.style.setProperty(
      "--app-gradient",
      "radial-gradient(125% 125% at 50% 10%, hsla(0,0%,98%,1) 60%, rgba(99,102,241,1) 100%)"
    );

    root.style.setProperty("--background", "hsla(0, 0%, 98%, 1)");
    root.style.setProperty("--foreground", "hsla(240, 10%, 4%, 1)");
    root.style.setProperty("--accent", "rgba(99, 102, 241, 1)");
    root.style.setProperty("--border", "hsla(0, 0%, 0%, 0.08)");
    root.style.setProperty("--background-2", "#f5f5f7");
    root.style.setProperty("--background-2-new", "hsla(240, 10%, 4%, 0.05)");
    root.style.setProperty("--background-3", "rgba(0,0,0,0.03)");
    root.style.setProperty("--border-2", "rgba(0,0,0,0.08)");
    root.style.setProperty("--border-3", "rgba(0,0,0,0.15)");
    root.style.setProperty("--hover", "rgba(0,0,0,0.05)");
  } else {
    root.style.setProperty(
      "--app-gradient",
      "radial-gradient(125% 125% at 50% 10%, hsla(240,10%,4%,1) 60%, rgba(99,102,241,1) 100%)"
    );

    root.style.setProperty("--background", "hsla(240, 10%, 4%, 1)");
    root.style.setProperty("--foreground", "hsla(0, 0%, 98%, 1)");
    root.style.setProperty("--accent", "rgba(99, 102, 241, 1)");
    root.style.setProperty("--border", "hsla(0, 0%, 98%, 0.2)");
    root.style.setProperty("--background-2", "#1a1b1f");
    root.style.setProperty("--background-2-new", "#1a1b1f");
    root.style.setProperty("--background-3", "rgba(255,255,255,0.03)");
    root.style.setProperty("--border-2", "rgba(255,255,255,0.08)");
    root.style.setProperty("--border-3", "rgba(255,255,255,0.15)");
    root.style.setProperty("--hover", "rgba(255,255,255,0.05)");
  }

  localStorage.setItem("theme", theme);
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useGaPageView();
  
  return (
    <div className="relative min-h-screen w-full">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--background-2)",
            color: "var(--foreground)",
            border: "1px solid var(--border-2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "0.9rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.75rem",
          },

          success: {
            iconTheme: {
              primary: "var(--accent)",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
            },
          },
        }}
      />

      <div
        className="absolute inset-0 -z-10 w-full h-full [transition:background_300ms]"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(125% 125% at 50% 10%, hsla(240,10%,4%,1) 60%, rgba(99,102,241,1) 100%)"
              : "radial-gradient(125% 125% at 50% 10%, hsla(0,0%,98%,1) 60%, rgba(99,102,241,1) 100%)",
        }}
      />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subjects/:sem" element={<Subjects />} />
        <Route path="/material/:folderId" element={<Material />} />
        <Route path="/sgestimator" element={<SGEstimator />} />
        <Route path="/chat/:room" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
