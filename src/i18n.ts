// file: @/i18n.ts (SỬA LẠI)

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const i18nInstance = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next);

// KHÔNG export default i18n
// Thay vào đó, export một promise cho biết khi nào init hoàn tất
export const i18nPromise = i18nInstance.init({
  debug: false,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    // Giữ nguyên config 'detection' của bạn
    order: ["localStorage", "cookie", "navigator"],
    lookupLocalStorage: "i18nextLng",
  },
  // Tắt Suspense đi, chúng ta sẽ tự quản lý state loading
  react: {
    useSuspense: false,
  },
});

// Export instance để Provider có thể sử dụng
export default i18nInstance;
