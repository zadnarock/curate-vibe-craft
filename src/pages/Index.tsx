import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PainSection } from '@/components/PainSection';
import { PromiseSection } from '@/components/PromiseSection';
import { HowItWorks } from '@/components/HowItWorks';
import { WaitlistForm } from '@/components/WaitlistForm';
import { WhyDifferent } from '@/components/WhyDifferent';
import { SignatureRail } from '@/components/SignatureRail';
import { TrustRow } from '@/components/TrustRow';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main>
        <Hero />
        <PainSection />
        <PromiseSection />
        <HowItWorks />
        <WaitlistForm />
        <WhyDifferent />
        <SignatureRail />
        <TrustRow />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;