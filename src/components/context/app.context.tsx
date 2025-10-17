// file: src/components/context/app.context.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// Hàm an toàn để lấy theme, chỉ chạy localStorage ở client
const getInitialTheme = (): ThemeContextType => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeContextType;
    if (savedTheme) {
      return savedTheme;
    }
  }
  return "dark"; // Giá trị mặc định khi ở server
};

interface IAppContext {
  theme: ThemeContextType;
  setTheme: (v: ThemeContextType) => void;
}

type ThemeContextType = "light" | "dark";

// DÒNG ĐÃ SỬA LỖI GÕ PHÍM
const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Khởi tạo state bằng hàm an toàn
  const [theme, setThemeState] = useState<ThemeContextType>(getInitialTheme);

  // useEffect để cập nhật DOM và localStorage (chỉ chạy ở client)
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeContextType) => {
    setThemeState(newTheme);
  }, []);

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
