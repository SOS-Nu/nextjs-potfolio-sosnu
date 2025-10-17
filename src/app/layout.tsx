// file: app/layout.tsx
import { AppContextProvider } from "@/components/context/app.context";
import "@/styles/global.scss";
import I18nProvider from "@/components/I18nProvider";
import AppHeader from "@/components/layout/app.header";
import AppFooter from "@/components/layout/app.footer";
import { Metadata } from "next";

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
    "sos nu",
    "portfolio",
    "developer",
    "lập trình viên",
  ],
  openGraph: {
    title: "Le Van Nguyen Portfolio | levannguyen.pro",
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
const ThemeScript = () => {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-bs-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Thêm suppressHydrationWarning
    <html lang="vi" suppressHydrationWarning={true}>
      <body>
        {/* Thêm ThemeScript */}
        <ThemeScript />
        <AppContextProvider>
          <I18nProvider>
            <AppHeader />
            {children}
            <AppFooter />
          </I18nProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
