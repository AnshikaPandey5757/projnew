import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageWrapper from "../components/layout/PageWrapper";

import HeroSection from "../components/hero/HeroSectionFixed";
import DiscoveryFeed from "../components/discovery/DiscoveryFeed";
import TrustScoreWidget from "../components/trust/TrustScoreWidget";
import AIConditionReport from "../components/ai/AIConditionReport";
import HowItWorks from "../components/workflow/HowItWorks";
import AgreementPreview from "../components/agreement/AgreementPreview";
import Testimonials from "../components/community/Testimonials";

const Home = () => {
  return (
    <PageWrapper>
      <Navbar />

      <HeroSection />

      <DiscoveryFeed />

      <TrustScoreWidget />

      <AIConditionReport />

      <HowItWorks />

      <AgreementPreview />

      <Testimonials />

      <Footer />
    </PageWrapper>
  );
};

export default Home;