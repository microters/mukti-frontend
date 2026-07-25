"use client";

import { useState } from "react";

const WA_NUMBER = "8801609291934";
const MAIL_TO = "support@muktihospital.com";

export default function DeleteAccountForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  // Validates the form and returns the trimmed values, or null when invalid.
  function collect() {
    const trimmedPhone = phone.trim();
    if (trimmedPhone.length < 6) {
      setError("অনুগ্রহ করে আপনার অ্যাকাউন্টের মোবাইল নাম্বারটি দিন।");
      return null;
    }
    setError("");
    return { name: name.trim(), phone: trimmedPhone, reason: reason.trim() };
  }

  function buildText(data) {
    let text = "অ্যাকাউন্ট মুছে ফেলার অনুরোধ (মুক্তি হাসপাতাল অ্যাপ)\n\n";
    text += "নাম: " + (data.name || "—") + "\n";
    text += "মোবাইল নাম্বার: " + data.phone + "\n";
    if (data.reason) text += "কারণ: " + data.reason + "\n";
    text += "\nআমি আমার অ্যাকাউন্ট ও সব তথ্য স্থায়ীভাবে মুছে ফেলতে চাই।";
    return text;
  }

  function sendWhatsApp() {
    const data = collect();
    if (!data) return;
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildText(data));
    window.open(url, "_blank");
  }

  function sendEmail() {
    const data = collect();
    if (!data) return;
    const subject = "অ্যাকাউন্ট মুছে ফেলার অনুরোধ — " + data.phone;
    window.location.href =
      "mailto:" +
      MAIL_TO +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(buildText(data));
  }

  return (
    <div className="form">
      <label>
        আপনার নাম
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: ফরহাদ হোসেন"
        />
      </label>

      <label>
        অ্যাকাউন্টের মোবাইল নাম্বার <span className="rq">*</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="যেমন: 01XXXXXXXXX"
        />
      </label>

      <label>
        কারণ (ঐচ্ছিক)
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="অ্যাকাউন্ট মুছতে চাওয়ার কারণ, যদি জানাতে চান"
        />
      </label>

      <div className="what">
        <b>যা যা মুছে ফেলা হবে:</b>
        <span>
          আপনার নাম, মোবাইল নাম্বার, প্রোফাইল ছবি ও স্বাস্থ্য সংক্রান্ত তথ্য (লিঙ্গ, জন্ম তারিখ,
          রক্তের গ্রুপ ইত্যাদি) এবং অ্যাপয়েন্টমেন্টের রেকর্ড। অনুরোধ নিশ্চিত হলে এই তথ্য
          স্থায়ীভাবে মুছে ফেলা হবে।
        </span>
      </div>

      <button type="button" className="btn btn-wa" onClick={sendWhatsApp}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm5.8 14.2c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.1.2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5z" />
        </svg>
        WhatsApp-এ অনুরোধ পাঠান
      </button>

      <button type="button" className="btn btn-mail" onClick={sendEmail}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        ইমেইলে অনুরোধ পাঠান
      </button>

      <p className="note">{error}</p>
    </div>
  );
}
