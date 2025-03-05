import I18nProvider from "./Component/I18nProvider";
import "./globals.css";
import { useEffect, useState } from "react";




export default function RootLayout({ children }) {
  const { i18n, t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
