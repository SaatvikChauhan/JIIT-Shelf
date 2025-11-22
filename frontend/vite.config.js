import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "JIIT Shelf",
        short_name: "JIIT Shelf",
        description: "A study material hub for JIIT students",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a10",
        theme_color: "#6366f1",
        orientation: "portrait",

        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],

        screenshots: [
          {
            src: "/screenshots/home-wide.png",
            sizes: "1897x869",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/home-narrow.jpg",
            sizes: "540x1072",
            type: "image/jpg",
            form_factor: "narrow",
          },
        ],
      },

      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,ico}"],
      },

      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
    }),
  ],
});
