
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

const TERMS_FALLBACK = {
  en: {
    metaTitle: 'Terms & Conditions | Mukti Hospital, Cumilla',
    metaDescription:
      "Read the terms and conditions for using Mukti Hospital's website and mobile app, Cumilla — covering appointments, user accounts, and acceptable use of our services.",
  },
  bn: {
    metaTitle: 'শর্তাবলী | মুক্তি হসপিটাল, কুমিল্লা',
    metaDescription:
      'মুক্তি হসপিটাল, কুমিল্লার ওয়েবসাইট ও মোবাইল অ্যাপ ব্যবহারের শর্তাবলী পড়ুন — অ্যাপয়েন্টমেন্ট, ইউজার অ্যাকাউন্ট এবং সেবার সঠিক ব্যবহার সম্পর্কে।',
  },
};

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const fallback = TERMS_FALLBACK[locale] || TERMS_FALLBACK.en;

  try {
    const response = await fetch('https://api.muktihospital.com/api/page', {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    const termsAndConditionsPage = data.pages.find((page) => page.slug === 'terms-and-condition');
    const t = termsAndConditionsPage?.translations?.[locale] || {};

    return {
      title: (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle,
      description: (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription,
    };
  } catch (err) {
    return { title: fallback.metaTitle, description: fallback.metaDescription };
  }
}