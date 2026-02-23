// src/components/context/app.context.tsx
"use client";
import { useAppSelector } from "@/redux/store";
import { createContext, useContext, useEffect, useMemo } from "react";

// Định nghĩa rõ ràng các thuộc tính trong context
interface IAppContext {
  theme: string;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useAppSelector((state) => state.app.layoutConfig.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // Dùng useMemo để tránh re-render không cần thiết cho các component tiêu thụ context
  const value = useMemo(() => ({ theme }), [theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
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
