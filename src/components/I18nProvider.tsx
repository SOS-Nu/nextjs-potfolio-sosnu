// file: src/components/I18nProvider.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n as I18nInstanceType } from "i18next"; // Import kiểu dữ liệu

export default function I18nProvider({ children }: { children: ReactNode }) {
  // 1. Tạo state để giữ instance của i18n
  const [i18n, setI18n] = useState<I18nInstanceType | null>(null);

  useEffect(() => {
    // 2. Chỉ import file "@/i18n" khi component đã ở client
    import("@/i18n").then((module) => {
      // module.default chính là `initI18n` mà bạn đã export
      setI18n(module.default);
    });
  }, []); // Mảng rỗng đảm bảo chỉ chạy 1 LẦN ở client

  // 3. Nếu i18n chưa được khởi tạo (đang ở server, hoặc client đang tải)
  // Trả về children để trang không bị trắng
  if (!i18n) {
    return <>{children}</>;
  }

  // 4. Khi đã ở client và i18n đã tải xong, mới render Provider
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
