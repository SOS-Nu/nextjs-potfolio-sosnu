import localStorageKey from "@/constants/localStorageKey";
import { RootState } from "@/redux/store";
import { setCookie } from "@/utils/cookieUtils";
import { Middleware, UnknownAction } from "@reduxjs/toolkit";

export const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action); // Cho action chạy qua reducer để update state trước

  // Lấy state mới nhất sau khi reducer đã xử lý
  const state = store.getState() as RootState;

  // Kiểm tra nếu action thuộc về nhóm 'app' (ví dụ: app/setLanguage, app/setLayoutConfig)
  if ((action as UnknownAction).type.startsWith("app/")) {
    // --- XỬ LÝ LANGUAGE ---
    const langValue = state.app.language.toString();

    // 1. Lưu Cookie (Cho Server Rendering)
    setCookie(localStorageKey.LANGUAGE, langValue);

    // 2. Lưu LocalStorage (Cho Client Persistence)
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKey.LANGUAGE, langValue);
    }

    // --- XỬ LÝ LAYOUT CONFIG ---
    const configValue = JSON.stringify(state.app.layoutConfig);

    // 1. Lưu Cookie
    setCookie(localStorageKey.LAYOUT_CONFIG, configValue);

    // 2. Lưu LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKey.LAYOUT_CONFIG, configValue);

      // BONUS: Lưu thêm key riêng cho Theme để các script đơn giản dễ đọc (nếu cần)
      localStorage.setItem("theme", state.app.layoutConfig.theme);
    }

    console.log("✅ Đã đồng bộ State xuống Cookie & LocalStorage");
  }

  return result;
};
