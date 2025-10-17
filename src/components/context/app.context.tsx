"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  theme: ThemeContextType;
  setTheme: (v: ThemeContextType) => void;
}

type ThemeContextType = "light" | "dark";

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeContextType>(() => {
    const initialTheme =
      (localStorage.getItem("theme") as ThemeContextType) || "dark";
    return initialTheme;
  });

  // useEffect này sẽ chạy mỗi khi `theme` thay đổi
  useEffect(() => {
    // 1. Cập nhật thuộc tính trên thẻ <html>
    document.documentElement.setAttribute("data-bs-theme", theme);
    // 2. Lưu vào localStorage
    localStorage.setItem("theme", theme);
  }, [theme]); // Thêm `theme` vào dependency array

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(AppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <AppContext.Provider>"
    );
  }

  return currentAppContext;
};
