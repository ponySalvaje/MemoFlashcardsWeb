import BenefitsSection from "../../sections/benefits/BenefitsSection";
import FeaturesSection from "../../sections/features/FeaturesSection";
import PlansSection from "../../sections/plans/PlansSection";
import WhyUsSection from "../../sections/why-us/WhyUsSection";
import "./Home.css";

function Home() {
  return (
    <div>
      <section id="hero"></section>
      <FeaturesSection />
      <WhyUsSection />
      <BenefitsSection />
      <PlansSection />
    </div>
  );
}

export default Home;
