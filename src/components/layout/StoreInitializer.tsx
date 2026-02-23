"use client";

import { setLanguage, setLayoutConfig } from "@/redux/slices/appSlice";
import { useAppDispatch } from "@/redux/store";
import { LayoutConfig } from "@/types/LayoutState";
import { useRef } from "react";

interface Props {
  language: number;
  layoutConfig: LayoutConfig | null;
}

export default function StoreInitializer({ language, layoutConfig }: Props) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    // Dispatch để cập nhật State
    dispatch(setLanguage(language));
    if (layoutConfig) dispatch(setLayoutConfig(layoutConfig));

    // ⚠️ THÊM ĐOẠN NÀY: Nếu chưa có cookie thì ghi luôn giá trị hiện tại vào
    if (
      typeof document !== "undefined" &&
      !document.cookie.includes("language")
    ) {
      // Import hàm setCookie vào đây để dùng trực tiếp hoặc
      // dispatch action để middleware tự bắt (cách dưới hay hơn)
    }

    initialized.current = true;
  }
  return null;
}
