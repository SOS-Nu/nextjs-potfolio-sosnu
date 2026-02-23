// file: app/layout.tsx
import { AppContextProvider } from "@/components/context/app.context";
import AppFooter from "@/components/layout/app.footer";
import AppHeader from "@/components/layout/app.header";
import StoreInitializer from "@/components/layout/StoreInitializer";
import localStorageKey from "@/constants/localStorageKey";
import LanguageProvider from "@/Providers/LanguageProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";
import "@/styles/global.scss";
import { LayoutConfig } from "@/types/LayoutState";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  // Metadata của bạn giữ nguyên
  title: {
    template: "%s | Le Van Nguyen",
    default: "Le Van Nguyen Portfolio | SOS Nu",
  },
  description:
    "Portfolio của Lê Văn Nguyên (levannguyen.pro). Lê Văn Nguyên là ai? Sos nu là ai? Khám phá các dự án lập trình và thông tin về tôi tại đây.",
  keywords: [
    "levannguyen.pro",
    "le van nguyen",
    "lê văn nguyên",
    "sos nu",
    "sosnu",
    "portfolio",
    "developer",
    "lập trình viên",
  ],
  openGraph: {
    title: "Le Van Nguyen Portfolio | SOS Nu",
    description: "Khám phá các dự án và thông tin về Lê Văn Nguyên.",
    url: "https://levannguyen.pro",
    siteName: "Le Van Nguyen Portfolio",
    images: [
      {
        url: "https://raw.githubusercontent.com/SOS-Nu/nextjs-potfolio-sosnu/refs/heads/master/public/levannguyen.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

// Script để chặn nháy theme

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- SERVER SIDE LOGIC ---

  const cookieStore = await cookies();

  // Logic lấy dữ liệu giữ nguyên, chỉ thay đổi cách gọi hàm bên trên
  const langCookie = cookieStore.get(localStorageKey.LANGUAGE);
  const initialLang = langCookie ? Number(langCookie.value) : 1;

  const configCookie = cookieStore.get(localStorageKey.LAYOUT_CONFIG);
  let initialConfig: LayoutConfig | null = null;
  if (configCookie) {
    try {
      initialConfig = JSON.parse(configCookie.value);
    } catch (e) {
      console.error("Parse config error:", e);
    }
  }
  const serverTheme = initialConfig?.theme || "dark";
  return (
    // THAY ĐỔI 1: Gán language động và theme ngay từ Server
    <html
      lang={initialLang === 1 ? "vi" : "en"}
      data-bs-theme={serverTheme}
      suppressHydrationWarning={true}
    >
      <body>
        <ReduxProvider>
          <StoreInitializer
            language={initialLang}
            layoutConfig={initialConfig}
          />

          <AppContextProvider>
            <LanguageProvider initialLanguage={initialLang}>
              <AppHeader />
              {children}
              <AppFooter />
            </LanguageProvider>
          </AppContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
