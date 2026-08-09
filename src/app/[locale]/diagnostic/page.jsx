import { fetchDynamicData } from "@/app/api/dynamicData,";
import { fetchPathologyTests, fetchPathologyCategories } from "@/app/api/diagnostic";
import { fetchPageBySlug } from "@/app/api/cmsPage";
import DiagnosticContent from "@/app/Component/Shared/DiagnosticContent/DiagnosticContent";

export const revalidate = 300;

// Fallback meta (used until the "diagnostic" page is set from the dashboard)
const DEFAULT_META = {
  en: {
    metaTitle: "Diagnostic Tests & Prices | Mukti Hospital, Cumilla",
    metaDescription:
      "View the full diagnostic test list and prices at Mukti Hospital, Cumilla. Pathology, X-ray, ultrasound, CT scan & more. Request a callback to book your test.",
  },
  bn: {
    metaTitle: "ডায়াগনস্টিক টেস্ট ও মূল্য তালিকা | মুক্তি হসপিটাল, কুমিল্লা",
    metaDescription:
      "মুক্তি হসপিটাল, কুমিল্লার সম্পূর্ণ ডায়াগনস্টিক টেস্ট তালিকা ও মূল্য দেখুন। প্যাথলজি, এক্স-রে, আল্ট্রাসনোগ্রাম, সিটি স্ক্যানসহ সব টেস্ট। কলব্যাক রিকোয়েস্ট করুন।",
  },
};

// Dashboard-controlled meta with hardcoded fallback (same pattern as appointment/about)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const fallback = DEFAULT_META[locale] || DEFAULT_META.en;

  const page = await fetchPageBySlug("diagnostic", locale);
  const t = page?.translations?.[locale] || page?.translations?.en || {};

  const title = (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle;
  const description = (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription;

  return {
    title,
    description,
    keywords: "diagnostic, test, price, pathology, X-ray, ultrasound, CT scan, Mukti Hospital, Cumilla",
    robots: "index, follow",
    openGraph: { title, description, siteName: "Mukti Hospital" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Group tests by their categoryName, ordered by the category list from the API
function groupTestsByCategory(tests, categories) {
  const safeTests = Array.isArray(tests) ? tests : [];
  const catList = Array.isArray(categories) ? categories : [];

  // Bucket tests under each category name
  const buckets = new Map();
  for (const test of safeTests) {
    const cat = (test.categoryName || "Others").trim();
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat).push({
      name: test.testName,
      price: test.amount ?? test.standardCharge ?? 0,
    });
  }

  const ordered = [];
  const seen = new Set();
  for (const c of catList) {
    const name = (c.name || "").trim();
    if (name && buckets.has(name)) {
      ordered.push({ categoryName: name, tests: buckets.get(name) });
      seen.add(name);
    }
  }
  for (const [name, testsInCat] of buckets) {
    if (!seen.has(name)) ordered.push({ categoryName: name, tests: testsInCat });
  }

  return ordered;
}

const Diagnostic = async () => {
  const [dynamicData, tests, categoriesRes] = await Promise.all([
    fetchDynamicData(),
    fetchPathologyTests(),
    fetchPathologyCategories(),
  ]);

  const whyChooseUsSection = dynamicData?.whyChooseUsSection || {};
  const categories = categoriesRes?.categories || [];
  const testCategories = groupTestsByCategory(tests, categories);

  return (
    <DiagnosticContent
      dynamicData={dynamicData}
      whyChooseUsSection={whyChooseUsSection}
      testCategories={testCategories}
    />
  );
};

export default Diagnostic; 
