import { useEffect, useRef, useState } from 'react';
import { Palette, Users, Clock } from 'lucide-react';

const values = [
  {
    icon: Palette,
    title: "Personal, not templated",
    description: "we design from your cues."
  },
  {
    icon: Clock,
    title: "Set-up to clean-up",
    description: "arrive to a finished scene; we handle teardown."
  },
  {
    icon: Users,
    title: "Discreet & on-time",
    description: "we're invisible until reveal."
  }
];

export function PromiseSection() {
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
    <section ref={ref} className="py-24 bg-blush/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-headline mb-6 text-charcoal">
              Your taste. Our craft.
            </h2>
          </div>
          
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <p className="text-subhead text-charcoal/70 max-w-2xl mx-auto">
              Share a few clues—mood, colors, favorite film—and we sketch a scene that feels like you.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`transition-all duration-700 ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${400 + index * 150}ms` }}
              >
                <div className="card-glass text-center group hover:shadow-elegant transition-all duration-300">
                  <div className="w-16 h-16 bg-champagne/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-champagne/30 transition-colors">
                    <Icon className="w-8 h-8 text-emerald" />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-body text-charcoal/60">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}