import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="" 
          className="w-full h-full object-cover animate-breathe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60"></div>
      </div>
      
      {/* Bokeh particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-champagne rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-700 delay-150 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <h1 className="text-hero mb-6 text-charcoal">
            Unforgettable moments,{' '}
            <span className="text-emerald">effortlessly</span>{' '}
            composed.
          </h1>
        </div>
        
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-subhead text-charcoal/80 mb-12 max-w-3xl mx-auto">
            Tell us the vibe. We plan, design, and set it up. You just show up to the magic.
          </p>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <Button 
            onClick={scrollToWaitlist}
            className="btn-hero group relative overflow-hidden"
          >
            <span className="relative z-10">Join the Waitlist</span>
            <div className="absolute inset-0 bg-champagne/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button>
          
          <Button 
            onClick={scrollToHowItWorks}
            variant="ghost"
            className="btn-ghost group"
          >
            <span>See how it works</span>
            <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-charcoal/60 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
}