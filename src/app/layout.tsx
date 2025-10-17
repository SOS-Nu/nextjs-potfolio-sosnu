import { AppContextProvider } from "@/components/context/app.context";
import "@/styles/global.scss";
import I18nProvider from "@/components/I18nProvider";
import AppHeader from "@/components/layout/app.header";
import AppFooter from "@/components/layout/app.footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Le Van Nguyen", // Tạo template cho các trang con
    default: "Le Van Nguyen Portfolio | SOS Nu", // Title mặc định cho trang chủ
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
    url: "https://levannguyen.pro", // Thay bằng tên miền của bạn
    siteName: "Le Van Nguyen Portfolio",
    images: [
      {
        url: "https://levannguyen.pro/og-image.png", // Thay bằng link ảnh thumbnail của bạn
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
