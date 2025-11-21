import { registerSW } from "virtual:pwa-register";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./styles/style.css";
import "./styles/responsive.css";
import App from "./App.jsx";

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
