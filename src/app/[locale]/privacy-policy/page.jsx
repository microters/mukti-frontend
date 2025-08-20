import ClientPrivacyPolicy from '@/app/Component/PrivacyPolicy/ClientPrivacyPolicy';
import React from 'react';

export default async function PrivacyPolicy({ searchParams }) {
  const locale = searchParams?.lng || 'en';

  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return <div>Error fetching Privacy Policy data</div>;
  }

  const data = await response.json();
  const privacyPolicyPage = data.pages.find((page) => page.slug === 'privacy-policy');

  if (!privacyPolicyPage) {
    return <div>Privacy Policy not found</div>;
  }

  return (
    <ClientPrivacyPolicy page={privacyPolicyPage} locale={locale} />
  );
}

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const response = await fetch('http://api.muktihospital.com/api/page', {
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      title: 'Privacy Policy',
      description: 'Privacy Policy page',
    };
  }

  const data = await response.json();
  const privacyPolicyPage = data.pages.find((page) => page.slug === 'privacy-policy');

  return {
    title: privacyPolicyPage?.translations[locale]?.metaTitle || 'Privacy Policy',
    description: privacyPolicyPage?.translations[locale]?.metaDescription || 'Privacy Policy description',
  };
}