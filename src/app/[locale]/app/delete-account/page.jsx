import DeleteAccountForm from "./DeleteAccountForm";

export const metadata = {
  title: "অ্যাকাউন্ট মুছে ফেলার অনুরোধ — মুক্তি হাসপাতাল",
  description: "মুক্তি হাসপাতাল অ্যাপের অ্যাকাউন্ট ও ডেটা মুছে ফেলার অনুরোধ ফর্ম।",
};

const PHONE = "+8801601666893";
const WHATSAPP = "https://wa.me/8801609291934";

export default function DeleteAccountPage() {
  return (
    <div className="mukti-policy">
      {/* ===== PAGE HEAD ===== */}
      <header className="head">
        <span className="tag">অ্যাকাউন্ট ও ডেটা</span>
        <h1>অ্যাকাউন্ট মুছে ফেলার অনুরোধ</h1>
        <p>মুক্তি হাসপাতাল অ্যাপ</p>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="wrap">
        <div className="card">
          <p className="lead">
            আপনি চাইলে আপনার মুক্তি হাসপাতাল অ্যাপ অ্যাকাউন্ট এবং এর সাথে সংরক্ষিত তথ্য
            স্থায়ীভাবে মুছে ফেলার অনুরোধ করতে পারেন। নিচের ফর্মটি পূরণ করুন — আমরা অনুরোধ পাওয়ার
            পর যাচাই করে সাধারণত ৭ কর্মদিবসের মধ্যে অ্যাকাউন্ট মুছে ফেলব।
          </p>

          <h2>কীভাবে অনুরোধ করবেন</h2>
          <p>দুইভাবে অনুরোধ পাঠাতে পারেন — যেটি আপনার জন্য সহজ:</p>
          <ul>
            <li>
              <strong>অ্যাপ থেকে সরাসরি:</strong> অ্যাপের{" "}
              <strong>সেটিংস → অ্যাকাউন্ট মুছে ফেলুন</strong> অপশন থেকে।
            </li>
            <li>
              <strong>এই পেজ থেকে:</strong> নিচের ফর্মটি পূরণ করে WhatsApp বা ইমেইলে অনুরোধ
              পাঠান।
            </li>
          </ul>

          <h2>অনুরোধ ফর্ম</h2>
          <DeleteAccountForm />

          <h2>যোগাযোগ</h2>
          <div className="contact-box">
            <p>
              <strong>মুক্তি হাসপাতাল (প্রা.) লিমিটেড</strong>
            </p>
            <p>
              ফোন: <a href={`tel:${PHONE}`}>+৮৮০ ১৬০১ ৬৬৬-৮৯৩</a>
            </p>
            <p>
              WhatsApp: <a href={WHATSAPP}>+৮৮০ ১৬০৯ ২৯১৯৩৪</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
