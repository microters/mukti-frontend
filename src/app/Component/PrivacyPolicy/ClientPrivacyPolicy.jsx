// app/Component/PrivacyPolicy/ClientPrivacyPolicy.js
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const ClientPrivacyPolicy = ({ page, locale }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || locale || 'en';

  // Sync i18n language with passed locale
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }

  // Get translation with fallback to empty object, similar to BlogCard
  const translation = page.translations?.[currentLanguage] || page.translations?.en || {};
  const content = translation.content || 'No content available for this language.';

  // Clean up unnecessary HTML tags
  const cleanContent = content
    .replace(/<p><br><\/p>/g, '') // Remove empty <p><br></p>
    .replace(/<li><p><br><\/p><\/li>/g, ''); // Remove empty <li><p><br></p></li>

  // Debugging: Log translation data to check 'bn' content
  console.log('Current Language:', currentLanguage);
  console.log('Translation Data:', translation);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{page.name || 'Privacy Policy'}</h1>
      <div className="privacy-policy-content" dangerouslySetInnerHTML={{ __html: cleanContent }} />
    </div>
  );
};

export default ClientPrivacyPolicy;