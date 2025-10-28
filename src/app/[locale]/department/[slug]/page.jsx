import { fetchDepartmentBySlug } from '@/app/api/department';
import { fetchDoctors } from '@/app/api/doctor';
import SingleTreatment from '@/app/Component/SingleDepartment/SingleDepartment';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// ✅ SEO Metadata Setup
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  const department = await fetchDepartmentBySlug(slug);
  if (!department) return {};

  const t = department.translations?.[locale] || {};

  return {
    title: t.metaTitle || t.name || 'Department',
    description: t.metaDescription || '',
    openGraph: {
      title: t.metaTitle || t.name,
      description: t.metaDescription || '',
    },
  };
}

// ✅ Actual Page Render
export default async function DepartmentPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  const department = await fetchDepartmentBySlug(slug);
  const doctors = await fetchDoctors();

  if (!department) return notFound();

  return (
    <div>
      <SingleTreatment
        key={department.id}
        department={department}
        doctors={doctors}
      />
    </div>
  );
}
