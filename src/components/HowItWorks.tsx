import { useEffect, useRef, useState } from 'react';
import { MessageSquare, FileImage, Sparkles } from 'lucide-react';
import tellVibeImage from '@/assets/tell-your-vibe.jpg';
import moodBoardImage from '@/assets/mood-board-plan.jpg';
import magicMomentImage from '@/assets/magic-moment.jpg';

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us your vibe",
    description: "30-second sketch",
    detail: "Share your favorite colors, that scene from a movie, or just the feeling you want to create.",
    image: tellVibeImage
  },
  {
    icon: FileImage,
    title: "We send a one-page plan",
    description: "mood board + range",
    detail: "A beautiful mood board showing exactly how we'll bring your vision to life, with transparent pricing.",
    image: moodBoardImage
  },
  {
    icon: Sparkles,
    title: "We set it up. You make the memory.",
    description: "Arrive to magic",
    detail: "Show up to a perfectly curated scene. We handle everything from setup to cleanup.",
    image: magicMomentImage
  }
];

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate steps one by one
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 300);
          });
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
    <section id="how-it-works" ref={ref} className="py-24 bg-blush/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="animate-fade-up">
            <h2 className="text-headline mb-6 text-charcoal">
              How It Works
            </h2>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <p className="text-subhead text-charcoal/70 max-w-2xl mx-auto">
              Three simple steps to your perfect moment
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(index);
              const isHovered = hoveredStep === index;
              
              return (
                <div
                  key={step.title}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step number with connecting dots */}
                  <div className="text-center mb-8 relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold text-ivory mb-4 relative z-10 transition-all duration-300 ${
                      isHovered ? 'bg-emerald scale-110' : 'bg-champagne'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Connecting dots for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5">
                        <div className="flex items-center justify-center h-full">
                          {Array.from({ length: 12 }).map((_, dotIndex) => (
                            <div
                              key={dotIndex}
                              className={`w-1 h-1 bg-champagne/40 rounded-full mx-1 transition-all duration-300`}
                              style={{
                                animationDelay: `${(index * 300) + (dotIndex * 50)}ms`,
                                opacity: isVisible ? 1 : 0
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Card */}
                  <div className={`card-glass overflow-hidden transition-all duration-500 ${
                    isHovered ? 'shadow-elegant scale-[1.02]' : ''
                  } light-catch`}>
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={step.image}
                        alt=""
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent"></div>
                      
                      {/* Icon overlay */}
                      <div className={`absolute top-6 left-6 w-14 h-14 bg-champagne/90 glass rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'scale-110 rotate-6' : ''
                      }`}>
                        <Icon className="w-7 h-7 text-emerald" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-champagne font-medium mb-4 text-sm uppercase tracking-wider">
                        {step.description}
                      </p>
                      
                      <p className="text-body text-charcoal/70 leading-relaxed">
                        {step.detail}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 flex items-center gap-2">
                        {steps.map((_, stepIndex) => (
                          <div
                            key={stepIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              stepIndex === index
                                ? 'bg-emerald w-8'
                                : stepIndex < index
                                ? 'bg-champagne'
                                : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Summary text */}
        <div className={`text-center mt-16 transition-all duration-700 ${
          visibleSteps.length === steps.length ? 'animate-fade-up' : 'opacity-0'
        }`}>
          <p className="text-subhead text-charcoal/60 max-w-2xl mx-auto">
            From vision to reality in three effortless steps. 
            <span className="text-emerald font-medium"> Your only job is to show up and enjoy the magic.</span>
          </p>
        </div>
      </div>
    </section>
  );
}