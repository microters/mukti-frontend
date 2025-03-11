// Language change file
export default function LocaleHome({ params }) {
    return (
      <div>
        <h1>{params.locale === "bn" ? "বাংলা হোম পেজ" : "English Home Page"}</h1>
      </div>
    );
  }
  