// manifest.ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Le Van Nguyen Portfolio | levannguyen.pro",
    short_name: "Le Van Nguyen",
    description:
      "Trang web cá nhân của Lê Văn Nguyên (SOS Nu) Portfolio. Lê Văn Nguyên là ai? Sos nu là ai? Khám phá các dự án và thông tin về tôi tại đây.",
    icons: [
      {
        src: "/logo_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#0d1224",
    background_color: "#ffffff",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
  };
}
