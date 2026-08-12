
import ClientStaticPage from '@/app/Component/ClientStaticPage/ClientStaticPage';
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
    <ClientStaticPage page={privacyPolicyPage} locale={locale} />
  );
}

const PRIVACY_FALLBACK = {
  en: {
    metaTitle: 'Privacy Policy | Mukti Hospital, Cumilla',
    metaDescription:
      'Learn how Mukti Hospital, Cumilla collects, uses, and protects your personal and health information across our website and mobile app. Your privacy is our priority.',
  },
  bn: {
    metaTitle: 'প্রাইভেসি পলিসি | মুক্তি হসপিটাল, কুমিল্লা',
    metaDescription:
      'মুক্তি হসপিটাল, কুমিল্লা কীভাবে আপনার ব্যক্তিগত ও স্বাস্থ্য তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করে জানুন। আপনার গোপনীয়তাই আমাদের অগ্রাধিকার।',
  },
};

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const fallback = PRIVACY_FALLBACK[locale] || PRIVACY_FALLBACK.en;

  try {
    const response = await fetch('https://api.muktihospital.com/api/page', {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    const privacyPolicyPage = data.pages.find((page) => page.slug === 'privacy-policy');
    const t = privacyPolicyPage?.translations?.[locale] || {};

    return {
      title: (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle,
      description: (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription,
    };
  } catch (err) {
    return { title: fallback.metaTitle, description: fallback.metaDescription };
  }
}