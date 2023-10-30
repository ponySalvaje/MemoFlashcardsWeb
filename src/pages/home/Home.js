import BenefitsSection from "../../sections/benefits/BenefitsSection";
import PlansSection from "../../sections/plans/PlansSection";
import WhyUsSection from "../../sections/why-us/WhyUsSection";
import "./Home.css";

function Home() {
  return (
    <div>
      <section id="hero"></section>
      <WhyUsSection />
      <BenefitsSection />
      <PlansSection />
    </div>
  );
}

export default Home;
