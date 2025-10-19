// file: app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // Chuyển 'rules' thành một MẢNG các đối tượng
    rules: [
      // Quy tắc 1: Áp dụng cho tất cả các bot (bao gồm Google, Bing...)
      {
        userAgent: "*",
        allow: "/", // Cho phép truy cập tất cả
        // disallow: '/private/',
        // // Bỏ comment và thêm các trang bạn không muốn Google index
      },

      // === chặn các bot AI training ===
      // không cho phép chúng thu thập dữ liệu để huấn luyện mô hình.

      // // Chặn bot của OpenAI (ChatGPT)
      // {
      //   userAgent: "GPTBot",
      //   disallow: "/",
      // },
      // // Chặn bot AI của Google (Vertex AI, Gemini, ...)
      // {
      //   userAgent: "Google-Extended",
      //   disallow: "/",
      // },
      // // Chặn bot của Anthropic (Claude)
      // {
      //   userAgent: "ClaudeBot",
      //   disallow: "/",
      // },
      // // Chặn bot Common Crawl (dùng cho nhiều mô hình AI)
      // {
      //   userAgent: "CCBot",
      //   disallow: "/",
      // },
      // // Chặn bot của Apple
      // {
      //   userAgent: "Applebot-Extended",
      //   disallow: "/",
      // },
      // // Chặn bot của Meta (Facebook/Instagram)
      // {
      //   userAgent: "meta-externalagent",
      //   disallow: "/",
      // },
      // // Chặn bot của ByteDance (TikTok)
      // {
      //   userAgent: "Bytespider",
      //   disallow: "/",
      // },
      // // Chặn bot của Amazon
      // {
      //   userAgent: "Amazonbot",
      //   disallow: "/",
      // },
    ],

    // Cập nhật đường dẫn đến sitemap của bạn
    sitemap: "https://levannguyen.pro/sitemap.xml",
  };
}
