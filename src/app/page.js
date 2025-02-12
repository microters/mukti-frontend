import Image from "next/image";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Hero from "./Component/home/Hero";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
