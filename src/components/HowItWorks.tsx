import { useEffect, useRef, useState } from 'react';
import { MessageSquare, FileImage, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us your vibe",
    description: "30-second sketch"
  },
  {
    icon: FileImage,
    title: "We send a one-page plan",
    description: "mood board + range"
  },
  {
    icon: Sparkles,
    title: "We set it up. You make the memory.",
    description: "Arrive to magic"
  }
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setLineProgress(100);
          }, 800);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-headline mb-6 text-charcoal">
              How It Works
            </h2>
          </div>
          
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <p className="text-subhead text-charcoal/70 max-w-2xl mx-auto">
              Three simple steps to your perfect moment
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 hidden md:block">
              <div 
                className="h-full bg-champagne transition-all duration-1000 ease-out"
                style={{ width: `${lineProgress}%` }}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`text-center transition-all duration-700 ${
                      isVisible ? 'animate-fade-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${400 + index * 200}ms` }}
                  >
                    <div className="relative">
                      {/* Step circle */}
                      <div className="w-20 h-20 bg-champagne rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-soft">
                        <Icon className="w-10 h-10 text-emerald" />
                      </div>
                      
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald text-ivory rounded-full flex items-center justify-center text-sm font-bold z-20">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-body text-charcoal/60">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}