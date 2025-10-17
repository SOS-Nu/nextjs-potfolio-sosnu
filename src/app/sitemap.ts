// sitemap.ts
import { MetadataRoute } from "next";

// Thay thế 'https://levannguyen.pro' bằng tên miền chính thức của bạn
const BASE_URL = "https://levannguyen.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`, // Trang chủ
      lastModified: new Date(),
      changeFrequency: "monthly", // Tần suất thay đổi: hàng tháng
      priority: 1, // Mức độ ưu tiên cao nhất
    },
    {
      url: `${BASE_URL}/project`, // Trang dự án
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`, // Trang giới thiệu
      lastModified: new Date(),
      changeFrequency: "yearly", // Trang này ít thay đổi hơn
      priority: 0.5,
    },
  ];
}
