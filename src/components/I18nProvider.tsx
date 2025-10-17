// src/components/I18nProvider.tsx

"use client"; // BẮT BUỘC để chạy trong trình duyệt

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import initI18n from "@/i18n"; // Import file config i18n đã export i18n instance

// Vì bạn đã gọi .use(initReactI18next) trong i18n.ts, bạn chỉ cần dùng I18nextProvider
// Nếu bạn chưa gọi initReactI18next, bạn sẽ cần gọi nó ở đây.

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Đảm bảo i18n đã được khởi tạo
  // Mặc dù i18n.ts đã được import, việc này đảm bảo i18n instance luôn sẵn sàng
  useEffect(() => {
    initI18n;
  }, []);

  return (
    // Dùng I18nextProvider để cung cấp i18n instance cho toàn bộ Client Components
    <I18nextProvider
      //@ts-ignore
      i18n={initI18n}
    >
      {children}
    </I18nextProvider>
  );
}
