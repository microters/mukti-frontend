import I18nProvider from "./Component/I18nProvider";
import "./globals.css";
export const metadata = {
  title: "Mukti Hospital",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}