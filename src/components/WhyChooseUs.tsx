import { useEffect, useRef, useState } from 'react';
import { Heart, Camera, Shield, Users, Star, CheckCircle } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    text: "Tailored to you (mood, colors, tiny personal details)"
  },
  {
    icon: Star,
    text: "High-end finishes (linens, florals, lighting that photograph beautifully)"
  },
  {
    icon: CheckCircle,
    text: "Set-up to clean-up included"
  },
  {
    icon: Users,
    text: "Trusted vendor network; no last-minute scrambling"
  },
  {
    icon: Camera,
    text: "Consent-first photography & private by default"
  },
  {
    icon: Shield,
    text: "Transparent pricing ranges"
  }
];

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-headline mb-6 text-charcoal">
              Why Choose Us
            </h2>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-blush/20 transition-colors duration-200">
                    <div className="w-10 h-10 bg-champagne/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-emerald" />
                    </div>
                    <p className="text-body text-charcoal/80 leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}