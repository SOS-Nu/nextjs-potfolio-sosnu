// robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Áp dụng cho tất cả các robot
      allow: "/", // Cho phép truy cập vào tất cả các trang
      // disallow: '/private/', // Bỏ comment và thêm các trang bạn không muốn Google index
    },
    // Cập nhật đường dẫn đến sitemap của bạn
    sitemap: "https://levannguyen.pro/sitemap.xml",
  };
}
