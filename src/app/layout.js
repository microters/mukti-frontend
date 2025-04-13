import "./globals.css";
// import { AuthProvider } from "./utils/AuthContext";

export const metadata = {
  title: "Mukti Hospital",
  description: "Quality healthcare at your service.",
};

export default function RootLayout({ children, params }) {
  const locale = params?.locale || "en"; // Get locale if using [locale] segment

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
