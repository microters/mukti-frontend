import { Anek_Bangla, Hind_Siliguri } from "next/font/google";

// Fonts are loaded only on this route, not site-wide.
const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-anek-bangla",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind-siliguri",
});

// Put the Play Store link here when the app goes live.
// Example: "https://play.google.com/store/apps/details?id=com.microters.muktihospital"
const PLAY_URL = "#download";
const PHONE = "+8801601666893";

export const metadata = {
  title: "মুক্তি হাসপাতাল — ১ মিনিটেই ডাক্তার অ্যাপয়েন্টমেন্ট",
  description:
    "মুক্তি হাসপাতাল (প্রা.) লিমিটেড, কুমিল্লা। অ্যাপ দিয়ে ঘরে বসেই ৩০+ ডাক্তারের সিরিয়াল নিন ১ মিনিটে, ২৪ ঘণ্টা অ্যাম্বুলেন্স, টেস্টে ১০% ছাড়।",
};

export default function Page() {
  return (
    <div className={`mukti-landing ${anekBangla.variable} ${hindSiliguri.variable}`}>
      {/* ===== HERO ===== */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" /> কুমিল্লার আস্থার স্বাস্থ্যসেবা
            </div>
            <h1>
              ঘরে বসেই <span className="hl">১ মিনিটে</span> ডাক্তারের সিরিয়াল নিন
            </h1>
            <p className="lead">
              মুক্তি হাসপাতালের অ্যাপ দিয়ে ৩০+ বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট, ২৪ ঘণ্টা
              অ্যাম্বুলেন্স আর টেস্টের রিপোর্ট — সব এক জায়গায়। লাইনে দাঁড়ানোর দিন শেষ।
            </p>

            <div className="hero-cta">
              <a className="btn-store" href={PLAY_URL}>
                <svg viewBox="0 0 24 24">
                  <path fill="#0F9D6E" d="M3 20.5V3.5c0-.4.2-.7.5-.9L14 12 3.5 21.4c-.3-.2-.5-.5-.5-.9z" />
                  <path fill="#2E2C8E" d="M16.8 15.2L5.3 21.6 14 12l2.8 3.2z" />
                  <path fill="#F0564B" d="M20.6 10.8c.6.3.9.9.9 1.2s-.3.9-.9 1.2l-2.5 1.4L15 12l3.1-2.6 2.5 1.4z" />
                  <path fill="#F5A623" d="M5.3 2.4l11.5 6.4L14 12 5.3 2.4z" />
                </svg>
                <span>
                  <small>এখান থেকে নিন</small>
                  <b>Google Play</b>
                </span>
              </a>

              <a className="btn-call" href={`tel:${PHONE}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.3-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.3c0-.6-.4-1-1-1z" />
                </svg>
                কল করুন
              </a>
            </div>

            <svg className="ecg" viewBox="0 0 600 40" preserveAspectRatio="none">
              <path d="M0 20 H120 l14 -14 l16 30 l14 -30 l12 28 l10 -14 H320 l14 -14 l16 30 l14 -30 l12 28 l10 -14 H600" />
            </svg>
          </div>

          {/* ---- phone mockup ---- */}
          <div className="phone-wrap">
            <div className="phone" aria-hidden="true">
              <div className="screen">
                <div className="app-head">
                  <div className="row">
                    <span className="app-logo">মুক্তি হাসপাতাল</span>
                    <span className="app-av" />
                  </div>
                </div>

                <div className="app-cta">
                  <span className="ci">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F9D6E">
                      <path d="M7 2v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 8v9H5v-9h14z" />
                    </svg>
                  </span>
                  <span>
                    <b>অ্যাপ থেকে অ্যাপয়েন্টমেন্ট</b>
                    <small>১ মিনিটেই সিরিয়াল</small>
                  </span>
                </div>

                <div className="app-sec">আজ চেম্বারে আছেন</div>
                <div className="doc-row">
                  <div className="doc">
                    <div className="pic" />
                    <div className="ln" />
                    <div className="ln s" />
                    <span className="tag">আজ আছেন</span>
                  </div>
                  <div className="doc">
                    <div className="pic" />
                    <div className="ln" />
                    <div className="ln s" />
                    <span className="tag">আজ আছেন</span>
                  </div>
                </div>

                <div className="app-sec">বিভাগ</div>
                <div className="doc-row">
                  <div className="doc" style={{ textAlign: "center" }}>
                    <div className="pic" style={{ margin: "0 auto 8px" }} />
                    <div className="ln" style={{ width: "70%", margin: "4px auto" }} />
                  </div>
                  <div className="doc" style={{ textAlign: "center" }}>
                    <div className="pic" style={{ margin: "0 auto 8px" }} />
                    <div className="ln" style={{ width: "70%", margin: "4px auto" }} />
                  </div>
                  <div className="doc" style={{ textAlign: "center" }}>
                    <div className="pic" style={{ margin: "0 auto 8px" }} />
                    <div className="ln" style={{ width: "70%", margin: "4px auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="wrap">
          <div className="stats-card">
            <div className="stat">
              <div className="n">
                ৩০<span className="u">+</span>
              </div>
              <div className="l">বিশেষজ্ঞ ডাক্তার</div>
            </div>
            <div className="stat">
              <div className="n">
                ২৪<span className="u">/৭</span>
              </div>
              <div className="l">জরুরি ও অ্যাম্বুলেন্স</div>
            </div>
            <div className="stat">
              <div className="n">
                ১<span className="u"> মিনিট</span>
              </div>
              <div className="l">সিরিয়াল নিতে সময়</div>
            </div>
            <div className="stat">
              <div className="n">
                ১০<span className="u">%</span>
              </div>
              <div className="l">টেস্টে অ্যাপ ছাড়</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="band" id="features">
        <div className="wrap">
          <p className="sec-eyebrow">অ্যাপে যা যা পাবেন</p>
          <h2 className="sec-title">একটি অ্যাপেই পুরো হাসপাতাল</h2>
          <p className="sec-sub">
            রেজিস্ট্রেশন থেকে রিপোর্ট — প্রতিটি ধাপ সহজ, বাংলায়, আপনার হাতের মুঠোয়।
          </p>

          <div className="feat-grid">
            <div className="feat">
              <div className="ic ic-blue">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-2V2h-2v2H9V2H7v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 15H5V10h14v9zm-7-7h5v5h-5v-5z" />
                </svg>
              </div>
              <h3>১ মিনিটে অ্যাপয়েন্টমেন্ট</h3>
              <p>
                ডাক্তার বা বিভাগ বেছে নিন, নাম-নাম্বার দিন — সিরিয়াল নিশ্চিত হবে SMS-এ। লাইনে
                দাঁড়ানো লাগবে না।
              </p>
            </div>

            <div className="feat">
              <div className="ic ic-green">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <h3>টেস্টের রিপোর্ট অ্যাপে</h3>
              <p>
                প্যাথলজি টেস্টের রিপোর্ট ঘরে বসেই দেখুন ও শেয়ার করুন — বারবার হাসপাতালে আসতে
                হবে না।
              </p>
            </div>

            <div className="feat">
              <div className="ic ic-coral">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.3-1C8.7 8.4 8.5 7.2 8.5 6c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </div>
              <h3>সরাসরি যোগাযোগ</h3>
              <p>
                ঝামেলা ছাড়াই কল, imo বা WhatsApp-এ যোগাযোগ করে সিরিয়াল নিন — যেভাবে আপনার
                সুবিধা।
              </p>
            </div>

            <div className="feat">
              <div className="ic ic-blue">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h3>পরিবারের সবার জন্য</h3>
              <p>
                একটি অ্যাকাউন্টেই পরিবারের সদস্য যোগ করুন — বাবা, মা, সন্তান সবার সিরিয়াল এক
                জায়গা থেকে।
              </p>
            </div>

            <div className="feat">
              <div className="ic ic-green">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z" />
                </svg>
              </div>
              <h3>নিরাপদ ও বিশ্বস্ত</h3>
              <p>
                আপনার তথ্য থাকে সুরক্ষিত, মোবাইল OTP দিয়ে যাচাই করা অ্যাকাউন্টে। শুধু আপনিই দেখতে
                পান।
              </p>
            </div>

            <div className="feat">
              <div className="ic ic-coral">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2H6a2 2 0 00-2 2v16l4-4h10a2 2 0 002-2V4a2 2 0 00-2-2zm-1 9h-4v3h-2v-3H7V9h4V6h2v3h4v2z" />
                </svg>
              </div>
              <h3>স্বাস্থ্য পরামর্শ</h3>
              <p>
                হাসপাতালের নতুন ঘোষণা ও স্বাস্থ্য বিষয়ক লেখা সরাসরি অ্যাপের নোটিফিকেশনে পেয়ে
                যান।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="band steps-band" id="how">
        <div className="wrap">
          <p className="sec-eyebrow">যেভাবে কাজ করে</p>
          <h2 className="sec-title">তিন ধাপেই অ্যাপয়েন্টমেন্ট</h2>
          <p className="sec-sub">
            প্রথমবার? চিন্তা নেই — পুরো প্রক্রিয়া বাংলায়, মাত্র কয়েক ট্যাপে।
          </p>

          <div className="steps">
            <div className="step">
              <div className="num" />
              <h3>অ্যাপ ডাউনলোড করুন</h3>
              <p>
                Google Play থেকে অ্যাপ নামিয়ে মোবাইল নাম্বার দিন। OTP দিয়ে যাচাই — ব্যস,
                অ্যাকাউন্ট তৈরি।
              </p>
            </div>
            <div className="step">
              <div className="num" />
              <h3>ডাক্তার বেছে নিন</h3>
              <p>
                বিভাগ বা লক্ষণ অনুযায়ী ডাক্তার খুঁজুন, অথবা সরাসরি নাম দিয়ে সার্চ করে
                অ্যাপয়েন্টমেন্ট দিন।
              </p>
            </div>
            <div className="step">
              <div className="num" />
              <h3>সিরিয়াল পেয়ে যান</h3>
              <p>
                আপনার সিরিয়াল ও সময় SMS-এ চলে আসবে। নির্দিষ্ট সময়ে হাসপাতালে গেলেই হলো।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISCOUNT PROMO ===== */}
      <section className="wrap" style={{ paddingBottom: "10px" }}>
        <div className="promo">
          <div>
            <h2>অ্যাপে টেস্ট বুক করলে ১০% ছাড়</h2>
            <p>
              যেকোনো প্যাথলজি বা ডায়াগনস্টিক টেস্ট অ্যাপ থেকে বুক করলেই পাচ্ছেন সরাসরি ১০% ছাড়
              — প্রতিবার।
            </p>
          </div>
          <div className="badge">
            <div>
              <b>১০%</b>
              <span>ছাড়</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY ===== */}
      <section className="band" id="emergency" style={{ paddingTop: "44px" }}>
        <div className="wrap">
          <div className="emg">
            <span className="ei">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                <path d="M13 3h-2v8H3v2h8v8h2v-8h8v-2h-8V3z" />
              </svg>
            </span>
            <div>
              <h3>জরুরি সেবা ও অ্যাম্বুলেন্স</h3>
              <p>২৪ ঘণ্টা খোলা। যেকোনো জরুরি মুহূর্তে এক কলেই অ্যাম্বুলেন্স ও চিকিৎসা সেবা।</p>
            </div>
            <a className="call" href={`tel:${PHONE}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.3-1C8.7 8.4 8.5 7.2 8.5 6c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              এখনই কল করুন
            </a>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD ===== */}
      <section className="wrap" id="download" style={{ scrollMarginTop: "80px" }}>
        <div className="dl">
          <h2>আজই মুক্তি হাসপাতাল অ্যাপ নামান</h2>
          <p>
            কুমিল্লার হাজারো মানুষের মতো আপনিও ঘরে বসে স্বাস্থ্যসেবা নিন। ডাউনলোড সম্পূর্ণ ফ্রি।
          </p>
          <a className="btn-store" href={PLAY_URL} style={{ display: "inline-flex" }}>
            <svg viewBox="0 0 24 24">
              <path fill="#0F9D6E" d="M3 20.5V3.5c0-.4.2-.7.5-.9L14 12 3.5 21.4c-.3-.2-.5-.5-.5-.9z" />
              <path fill="#fff" opacity=".9" d="M16.8 15.2L5.3 21.6 14 12l2.8 3.2z" />
              <path fill="#F0564B" d="M20.6 10.8c.6.3.9.9.9 1.2s-.3.9-.9 1.2l-2.5 1.4L15 12l3.1-2.6 2.5 1.4z" />
              <path fill="#F5A623" d="M5.3 2.4l11.5 6.4L14 12 5.3 2.4z" />
            </svg>
            <span>
              <small style={{ color: "#54666D" }}>এখান থেকে নিন</small>
              <b>Google Play</b>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
