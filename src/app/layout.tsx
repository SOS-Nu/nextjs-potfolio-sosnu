import { AppContextProvider } from "@/components/context/app.context";
import "@/styles/global.scss";
import I18nProvider from "@/components/I18nProvider";
import AppHeader from "@/components/layout/app.header";
import AppFooter from "@/components/layout/app.footer";

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
