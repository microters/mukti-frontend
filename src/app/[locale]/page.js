import TranslationsProvider from '../Component/TranslationProvider';
import initTranslations from '@/i18n';
import Hero from '../Component/UI/HomePage/Hero/Hero';
import Features from '../Component/UI/HomePage/Features/Features';
import About from '../Component/UI/HomePage/About/About';
import Header from '../Component/Header';

const i18nNamespaces = ['home'];

export default async function Home(props) {
  // Await params to get the `locale`
  const { locale } = await props.params;

  // Fetch translations for the current locale
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      {/* Client-side components */}
      {/* <Header/> */}
      <Hero />
      <Features />
      <About />
    </TranslationsProvider>
  );
}
