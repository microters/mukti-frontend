"use client";

import { useTranslation } from "react-i18next";

const PHONE = "+8801601666893";
const WHATSAPP = "https://wa.me/8801609291934";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <div className="mukti-policy">
      {/* ===== PAGE HEAD ===== */}
      <header className="head">
        <span className="tag">{t("privacyPolicy.lastUpdated")}</span>
        <h1>{t("privacyPolicy.title")}</h1>
        <p>{t("privacyPolicy.subtitle")}</p>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="wrap">
        <div className="card">
          <p className="lead">{t("privacyPolicy.leadText")}</p>

          <h2>{t("privacyPolicy.sec1Title")}</h2>
          <p>{t("privacyPolicy.sec1Desc")}</p>

          <h3>{t("privacyPolicy.sec1SubA")}</h3>
          <ul>
            <li>
              <strong>{t("privacyPolicy.sec1AccTitle")}</strong>{" "}
              {t("privacyPolicy.sec1AccDesc")}
            </li>
            <li>
              <strong>{t("privacyPolicy.sec1ProfTitle")}</strong>{" "}
              {t("privacyPolicy.sec1ProfDesc")}
            </li>
            <li>
              <strong>{t("privacyPolicy.sec1HealthTitle")}</strong>{" "}
              {t("privacyPolicy.sec1HealthDesc")}
            </li>
            <li>
              <strong>{t("privacyPolicy.sec1ApptTitle")}</strong>{" "}
              {t("privacyPolicy.sec1ApptDesc")}
            </li>
            <li>
              <strong>{t("privacyPolicy.sec1FamilyTitle")}</strong>{" "}
              {t("privacyPolicy.sec1FamilyDesc1")}{" "}
              <strong>{t("privacyPolicy.sec1FamilyDesc2")}</strong>{" "}
              {t("privacyPolicy.sec1FamilyDesc3")}
            </li>
          </ul>

          <h3>{t("privacyPolicy.sec1SubB")}</h3>
          <ul>
            <li>{t("privacyPolicy.sec1AutoDesc")}</li>
          </ul>

          <h2>{t("privacyPolicy.sec2Title")}</h2>
          <ul>
            <li>{t("privacyPolicy.sec2Point1")}</li>
            <li>{t("privacyPolicy.sec2Point2")}</li>
            <li>{t("privacyPolicy.sec2Point3")}</li>
            <li>{t("privacyPolicy.sec2Point4")}</li>
            <li>{t("privacyPolicy.sec2Point5")}</li>
          </ul>

          <h2>{t("privacyPolicy.sec3Title")}</h2>
          <p>
            {t("privacyPolicy.sec3Desc1")}{" "}
            <strong>{t("privacyPolicy.sec3Desc2")}</strong>
            {t("privacyPolicy.sec3Desc3")}
          </p>
          <ul>
            <li>{t("privacyPolicy.sec3Point1")}</li>
            <li>{t("privacyPolicy.sec3Point2")}</li>
            <li>{t("privacyPolicy.sec3Point3")}</li>
          </ul>

          <h2>{t("privacyPolicy.sec4Title")}</h2>
          <p>{t("privacyPolicy.sec4Desc")}</p>

          <h2>{t("privacyPolicy.sec5Title")}</h2>
          <ul>
            <li>{t("privacyPolicy.sec5Point1")}</li>
            <li>{t("privacyPolicy.sec5Point2")}</li>
            <li>{t("privacyPolicy.sec5Point3")}</li>
          </ul>

          <h2>{t("privacyPolicy.sec6Title")}</h2>
          <ul>
            <li>
              <strong>{t("privacyPolicy.sec6RetentionTitle")}</strong>{" "}
              {t("privacyPolicy.sec6RetentionDesc")}
            </li>
            <li>
              <strong>{t("privacyPolicy.sec6DeletionTitle")}</strong>{" "}
              {t("privacyPolicy.sec6DeletionDesc")}
              <ul>
                <li>
                  <strong>{t("privacyPolicy.sec6DelApp")}</strong>{" "}
                  {t("privacyPolicy.sec6DelAppDesc")}
                </li>
                <li>
                  <strong>{t("privacyPolicy.sec6DelWeb")}</strong>{" "}
                  {t("privacyPolicy.sec6DelWebDesc")}
                  {" ("}
                  <a
                    href="https://muktihospital.com/app/delete-account/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://muktihospital.com/app/delete-account/
                  </a>
                  {")"}
                </li>
              </ul>
            </li>
            <li>
              <strong>{t("privacyPolicy.sec6TimeframeTitle")}</strong>{" "}
              {t("privacyPolicy.sec6TimeframeDesc")}
            </li>
          </ul>

          <h2>{t("privacyPolicy.sec7Title")}</h2>
          <p>{t("privacyPolicy.sec7Desc")}</p>

          <h2>{t("privacyPolicy.sec8Title")}</h2>
          <p>{t("privacyPolicy.sec8Desc")}</p>

          <h2>{t("privacyPolicy.sec9Title")}</h2>
          <p>{t("privacyPolicy.sec9Desc")}</p>
          <div className="contact-box">
            <p>
              <strong>{t("privacyPolicy.companyName")}</strong>
            </p>
            <p>{t("privacyPolicy.address")}</p>
            <p>
              {t("privacyPolicy.phoneLabel")}{" "}
              <a href={`tel:${PHONE}`}>
                {t("privacyPolicy.phoneDisplay")}
              </a>
            </p>
            <p>
              {t("privacyPolicy.whatsappLabel")}{" "}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                {t("privacyPolicy.whatsappDisplay")}
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}