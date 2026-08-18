import { fetchContactPage } from "@/app/api/contactPage";
import ContactContent from "./ContactContent";

export const revalidate = 300;

const DEFAULT_META = {
  en: {
    metaTitle: "Contact Mukti Hospital, Cumilla | Address, Phone & Directions",
    metaDescription:
      "Contact Mukti Hospital, Cumilla — find our address, phone number, email, opening hours, and map directions. Reach out for appointments, queries, or any assistance.",
  },
  bn: {
    metaTitle: "যোগাযোগ | মুক্তি হসপিটাল, কুমিল্লা — ঠিকানা ও ফোন",
    metaDescription:
      "মুক্তি হসপিটাল, কুমিল্লার সাথে যোগাযোগ করুন — ঠিকানা, ফোন নম্বর, ইমেইল, খোলার সময় ও ম্যাপে দিকনির্দেশনা। অ্যাপয়েন্টমেন্ট বা যেকোনো সহায়তার জন্য যোগাযোগ করুন।",
  },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const fallback = DEFAULT_META[locale] || DEFAULT_META.en;

  const data = await fetchContactPage();
  const t = data?.translations?.[locale] || {};

  const title = (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle;
  const description = (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription;

  return {
    title,
    description,
    keywords: "contact, Mukti Hospital, Cumilla, address, phone, email, directions, hospital",
    robots: "index, follow",
    openGraph: { title, description, siteName: "Mukti Hospital" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const ContactPage = async ({ params }) => {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;

  const data = await fetchContactPage();
  const content = data?.translations?.[locale] || data?.translations?.en || {};

  return <ContactContent content={content} />;
};

export default ContactPage;