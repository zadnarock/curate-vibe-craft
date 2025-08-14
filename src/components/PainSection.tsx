import { useEffect, useRef, useState } from 'react';

export function PainSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-headline mb-8 text-charcoal">
            Another year, another last-minute plan?
          </h2>
        </div>
        
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-subhead text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            You know the feeling. Hours of scrolling, too many tabs, pressure to make it perfect. 
            The most special moments deserve more than stressful, generic planning.
          </p>
        </div>
      </div>
    </section>
  );
}