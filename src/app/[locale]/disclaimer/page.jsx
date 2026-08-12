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

const DISCLAIMER_FALLBACK = {
  en: {
    metaTitle: 'Disclaimer | Mukti Hospital, Cumilla',
    metaDescription:
      'Read the official disclaimer for Mukti Hospital, Cumilla. Information on this website is for general guidance only and is not a substitute for professional medical advice.',
  },
  bn: {
    metaTitle: 'ডিসক্লেইমার | মুক্তি হসপিটাল, কুমিল্লা',
    metaDescription:
      'মুক্তি হসপিটাল, কুমিল্লার অফিসিয়াল ডিসক্লেইমার। এই ওয়েবসাইটের তথ্য শুধুমাত্র সাধারণ নির্দেশনার জন্য, এটি পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।',
  },
};

export async function generateMetadata({ searchParams }) {
  const locale = searchParams?.lng || 'en';
  const fallback = DISCLAIMER_FALLBACK[locale] || DISCLAIMER_FALLBACK.en;

  try {
    const response = await fetch('https://api.muktihospital.com/api/page', {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    const disclaimerPage = data.pages.find((page) => page.slug === 'disclaimer');
    const t = disclaimerPage?.translations?.[locale] || {};

    return {
      title: (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle,
      description: (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription,
    };
  } catch (err) {
    return { title: fallback.metaTitle, description: fallback.metaDescription };
  }
}
