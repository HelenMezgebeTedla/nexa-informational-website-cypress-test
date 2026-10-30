import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ImpactMission from "./components/ImpactMission";
import Product from "./components/Product";
import Users from "./components/Users";
import WhyZamline from "./components/WhyZamline";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ImpactMission />
        <Product />
        <Users />
        <WhyZamline />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
