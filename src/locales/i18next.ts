import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import vi from "./vi/translation.json";

// 1. Chỉ export resources và config, KHÔNG init cứng ở đây
export const languageResources = {
  en: { translation: en },
  vi: { translation: vi },
};

export const i18nConfig = {
  resources: languageResources,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: [],
    caches: [],
  },
};

// 2. Export một instance mặc định (cho các file không phải React component dùng nếu cần)
// Nhưng lưu ý: Trong LanguageProvider ta sẽ không dùng trực tiếp cái này theo cách cũ.
i18n.use(initReactI18next).init({
  ...i18nConfig,
  lng: "vi", // Giá trị placeholder, sẽ bị override
});

export default i18n;
