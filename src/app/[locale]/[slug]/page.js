import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // always fresh fetch

// ✅ SEO Metadata Injected into <head>
export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_T;
  const { slug, locale } = params;

  if (!baseUrl) return {};

  const fetchUrl = `${baseUrl}/api/page?search=${slug}`;

  try {
    const res = await fetch(fetchUrl, { cache: "no-store" });
    if (!res.ok) return {};

    const data = await res.json();
    const page = data.pages?.find((p) => p.slug === slug);
    const translation = page?.translations?.[locale];

    return {
      title: translation?.metaTitle || page?.name || "Untitled Page",
      description: translation?.metaDescription || "",
    };
  } catch (error) {
    console.error("❌ Metadata fetch error:", error);
    return {};
  }
}

// ✅ Actual Page Renderer
export default async function PageBySlug({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_T;
  const { slug, locale } = params;

  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_BACKEND_URL_T not set");
    return notFound();
  }

  const fetchUrl = `${baseUrl}/api/page?search=${slug}`;

  try {
    const res = await fetch(fetchUrl, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Non-OK response:", res.status, text.slice(0, 200));
      return notFound();
    }

    const data = await res.json();
    const page = data.pages?.find((p) => p.slug === slug);
    const translation = page?.translations?.[locale];

    if (!translation) {
      console.warn(`⚠️ No translation for locale "${locale}"`);
      return notFound();
    }

    return (
      <div className="max-w-7xl mx-auto p-6 mt-10">
        <h1 className="text-3xl font-bold mb-4">{translation.metaTitle}</h1>

        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: translation.content }}
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Error rendering page:", error);
    return notFound();
  }
}
