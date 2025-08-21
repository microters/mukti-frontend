
import ClientStaticPage from '@/app/Component/ClientStaticPage/ClientStaticPage';
import React from 'react';

export default async function TermsAndConditions({ searchParams }) {
  const locale = searchParams?.lng || 'en';

  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return <div>Error fetching Terms and Conditions data</div>;
  }

  const data = await response.json();
  const termsAndConditionsPage = data.pages.find((page) => page.slug === 'terms-and-condition');

  if (!termsAndConditionsPage) {
    return <div>Terms and Conditions not found</div>;
  }

  return (
    <ClientStaticPage page={termsAndConditionsPage} locale={locale} />
  );
}

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      title: 'Terms and Conditions',
      description: 'Terms and Conditions page',
    };
  }

  const data = await response.json();
  const termsAndConditionsPage = data.pages.find((page) => page.slug === 'terms-and-condition');

  return {
    title: termsAndConditionsPage?.translations[locale]?.metaTitle || 'Terms and Conditions',
    description: termsAndConditionsPage?.translations[locale]?.metaDescription || 'Terms and Conditions description',
  };
}