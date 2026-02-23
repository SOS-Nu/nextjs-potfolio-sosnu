"use client";

import { useAppSelector } from "@/redux/store";
import { createInstance } from "i18next"; // 👈 Import createInstance
import { useEffect, useState } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { i18nConfig } from "../locales/i18next"; // Import config ta vừa tách

interface Props {
  children: React.ReactNode;
  initialLanguage: number;
}

export default function LanguageProvider({ children, initialLanguage }: Props) {
  // Logic mapping
  const getLangCode = (id: number) => (id === 1 ? "vi" : "en");
  const serverLangCode = getLangCode(initialLanguage);

  // --- BEST PRACTICE: KHỞI TẠO INSTANCE ---
  // Sử dụng useState với hàm khởi tạo.
  // Hàm này chạy ĐỒNG BỘ ngay lần đầu component mount.
  // Đảm bảo instance được tạo ra đã mang đúng ngôn ngữ Server gửi xuống.
  const [i18nInstance] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      ...i18nConfig, // Kế thừa config chung (resources, etc.)
      lng: serverLangCode, // 👈 QUAN TRỌNG: Set đúng ngôn ngữ ngay từ đầu
    });
    return instance;
  });

  // --- LOGIC CLIENT (REDUX SYNC) ---
  const reduxLangId = useAppSelector((state) => state.app.language);
  const reduxLangCode = getLangCode(reduxLangId);

  // Chỉ đổi ngôn ngữ khi Redux thay đổi (User thao tác)
  useEffect(() => {
    if (i18nInstance.language !== reduxLangCode) {
      i18nInstance.changeLanguage(reduxLangCode);
    }
  }, [reduxLangCode, i18nInstance]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
