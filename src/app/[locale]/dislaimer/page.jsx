import ClientStaticPage from '@/app/Component/ClientStaticPage/ClientStaticPage';
import React from 'react';

export default async function Disclaimer({ searchParams }) {
  const locale = searchParams?.lng || 'en';

  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return <div>Error fetching Disclaimer data</div>;
  }

  const data = await response.json();
  const disclaimerPage = data.pages.find((page) => page.slug === 'disclaimer');

  if (!disclaimerPage) {
    return <div>Disclaimer not found</div>;
  }

  return (
    <ClientStaticPage page={disclaimerPage} locale={locale} />
  );
}

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      title: 'Disclaimer',
      description: 'Disclaimer page',
    };
  }

  const data = await response.json();
  const disclaimerPage = data.pages.find((page) => page.slug === 'disclaimer');

  return {
    title: disclaimerPage?.translations[locale]?.metaTitle || 'Disclaimer',
    description: disclaimerPage?.translations[locale]?.metaDescription || 'Disclaimer description',
  };
}
