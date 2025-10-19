"use client";

import { useEffect, useState, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18nInstance, { i18nPromise } from "@/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    i18nPromise.then(() => {
      setIsInitialized(true);
    });
  }, []);

  // Nếu i18n chưa SẴN SÀNG...
  if (!isInitialized) {
    // THAY VÌ return <AppLoader /> hoặc null...
    // HÃY return chính children, nhưng cho nó "tàng hình"
    // 'visibility: hidden' giữ nguyên bố cục và chiều cao của trang
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  // Khi i18n đã SẴN SÀNG, render Provider và children bình thường
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
