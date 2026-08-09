import { fetchDynamicData } from "@/app/api/dynamicData,";
import { fetchPathologyTests, fetchPathologyCategories } from "@/app/api/diagnostic";
import DiagnosticContent from "@/app/Component/Shared/DiagnosticContent/DiagnosticContent";

export const revalidate = 300;

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
