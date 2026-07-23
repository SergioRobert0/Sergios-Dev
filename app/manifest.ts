import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sérgio Roberto Loyola | Portfólio",
    short_name: "Sérgio Loyola",
    description: "Portfólio e currículo online de Sérgio Roberto Loyola.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F3",
    theme_color: "#E4571B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
