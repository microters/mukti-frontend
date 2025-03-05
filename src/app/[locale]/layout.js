export default function LocaleLayout({ children, params }) {
    return (
      <html lang={params.locale}>
        <body>{children}</body>
      </html>
    );
  }
  