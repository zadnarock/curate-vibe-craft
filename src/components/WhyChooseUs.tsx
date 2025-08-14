import { useEffect, useRef, useState } from 'react';
import { Heart, Camera, Shield, Users, Star, CheckCircle } from 'lucide-react';
import personalizedImage from '@/assets/personalized-touch.jpg';
import highEndImage from '@/assets/high-end-finishes.jpg';
import setupServiceImage from '@/assets/setup-service.jpg';

const reasons = [
  {
    icon: Heart,
    text: "Tailored to you (mood, colors, tiny personal details)",
    image: personalizedImage
  },
  {
    icon: Star,
    text: "High-end finishes (linens, florals, lighting that photograph beautifully)",
    image: highEndImage
  },
  {
    icon: CheckCircle,
    text: "Set-up to clean-up included",
    image: setupServiceImage
  },
  {
    icon: Users,
    text: "Trusted vendor network; no last-minute scrambling",
    image: personalizedImage
  },
  {
    icon: Camera,
    text: "Consent-first photography & private by default",
    image: highEndImage
  },
  {
    icon: Shield,
    text: "Transparent pricing ranges",
    image: setupServiceImage
  }
];

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
            <p className="text-subhead text-charcoal/70 max-w-2xl mx-auto">
              Every detail crafted to perfection, every moment designed to last
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? 'animate-fade-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${200 + index * 150}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-glass group cursor-pointer overflow-hidden hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] light-catch">
                    {/* Image with overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
                      <img
                        src={reason.image}
                        alt=""
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredIndex === index ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
                      
                      {/* Floating icon */}
                      <div className={`absolute top-4 right-4 w-12 h-12 bg-champagne/90 glass rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        hoveredIndex === index ? 'scale-110 rotate-12' : 'scale-100'
                      }`}>
                        <Icon className="w-6 h-6 text-charcoal" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <p className="text-body text-charcoal/80 leading-relaxed group-hover:text-charcoal transition-colors">
                        {reason.text}
                      </p>
                      
                      {/* Animated underline */}
                      <div className={`mt-4 h-0.5 bg-champagne transition-all duration-300 ${
                        hoveredIndex === index ? 'w-12' : 'w-0'
                      }`}></div>
                    </div>
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