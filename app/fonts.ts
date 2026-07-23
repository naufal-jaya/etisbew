import localFont from "next/font/local";

export const inter = localFont({
  src: "../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const playfair = localFont({
  src: [
    {
      path: "../public/fonts/playfair-display-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/playfair-display-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display-latin-600-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/playfair-display-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display-latin-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});
