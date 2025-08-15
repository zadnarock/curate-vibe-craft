'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyDifferent() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    const tiles = Array.from(section.querySelectorAll('#tile-stage .tile'));
    const h2 = section.querySelector('.copy h2');
    const sub = section.querySelector('.copy .sub');
    const cta = section.querySelector('.copy .cta');
    const copyEls = [h2, sub, cta].filter(Boolean);

    // Randomize initial rotation for tiles
    tiles.forEach((tile) => {
      const rotation = (Math.random() - 0.5) * 6; // -3 to +3 degrees
      gsap.set(tile, { rotation });
    });

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startIdle = () => {
      if (prefersReducedMotion) return;
      
      tiles.forEach((tile, i) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        const xOffset = (Math.random() - 0.5) * 16; // ±8px
        const yOffset = (Math.random() - 0.5) * 20; // ±10px
        const rotateOffset = (Math.random() - 0.5) * 4; // ±2°
        const duration = 3 + Math.random() * 3; // 3-6s
        const delay = Math.random() * 2; // random phase
        
        tl.to(tile, {
          x: xOffset,
          y: yOffset,
          rotation: rotateOffset,
          duration,
          ease: 'sine.inOut',
          delay
        });
        
        idleTimelinesRef.current.push(tl);
      });
    };

    const stopIdle = () => {
      idleTimelinesRef.current.forEach(tl => tl.kill());
      idleTimelinesRef.current = [];
    };

    // Main intro timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
        onEnter: startIdle,
        onLeave: stopIdle,
        onEnterBack: startIdle,
        onLeaveBack: stopIdle
      }
    });

    // Animate copy in
    tl.to(copyEls, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.08
    });

    // Animate tiles in
    tl.to(tiles, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.05
    }, '-=0.4');

    timelineRef.current = tl;

    // Subtle parallax
    if (!prefersReducedMotion) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress - 0.5;
          tiles.forEach((el, i) => {
            const depth = 0.3 + (i % 6) * 0.12;
            gsap.to(el, {
              y: p * depth * 24,
              duration: 0.2,
              ease: 'sine.out',
              overwrite: 'auto'
            });
          });
        }
      });
    }

    return () => {
      timelineRef.current?.kill();
      stopIdle();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="why relative overflow-hidden grid place-items-center" style={{ minHeight: 'min(100vh, 880px)' }}>
      <div className="inner relative w-full max-w-6xl mx-auto px-6">
        <div className="copy relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-headline mb-6 text-charcoal opacity-0 translate-y-3">
            Why AmazeMe feels different
          </h2>
          <p className="sub text-subhead text-charcoal/70 mb-8 opacity-0 translate-y-3">
            Not templates. Living memories, written for your story.
          </p>
          <a 
            href="#waitlist" 
            className="cta btn-hero inline-block opacity-0 translate-y-3 hover:scale-105 transition-transform duration-200"
          >
            Join the waitlist
          </a>
        </div>
        
        <div id="tile-stage" className="absolute inset-0 pointer-events-none">
          {/* Testimonial tiles positioned far from center like Miro */}
          <div className="tile note t1 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ left: '2%', top: '10%', width: '200px', height: 'auto' }}>
            "AmazeMe turned our anniversary into something magical. Every detail felt personal."
            <div className="text-xs mt-2 opacity-70">- Sarah</div>
          </div>
          
          <div className="tile mint t2 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ right: '2%', top: '8%', width: '180px', height: 'auto' }}>
            "No templates, just pure creativity tailored to our story."
            <div className="text-xs mt-2 opacity-70">- Marcus</div>
          </div>
          
          <div className="tile aqua t3 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ left: '1%', top: '35%', width: '190px', height: 'auto' }}>
            "They captured our vibe perfectly - romantic but not cheesy."
            <div className="text-xs mt-2 opacity-70">- Elena</div>
          </div>
          
          <div className="tile gold t4 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ right: '1%', top: '40%', width: '170px', height: 'auto' }}>
            "From setup to cleanup, flawless execution."
            <div className="text-xs mt-2 opacity-70">- James</div>
          </div>
          
          <div className="tile note t5 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ left: '3%', top: '85%', width: '185px', height: 'auto' }}>
            "Worth every penny. Our guests are still talking about it."
            <div className="text-xs mt-2 opacity-70">- Priya</div>
          </div>
          
          <div className="tile mint t6 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ right: '3%', top: '82%', width: '175px', height: 'auto' }}>
            "Finally, someone who gets our aesthetic."
            <div className="text-xs mt-2 opacity-70">- David</div>
          </div>
          
          <div className="tile aqua t7 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ left: '18%', top: '5%', width: '165px', height: 'auto' }}>
            "Stress-free planning with stunning results."
            <div className="text-xs mt-2 opacity-70">- Lisa</div>
          </div>
          
          <div className="tile gold t8 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ right: '18%', top: '3%', width: '160px', height: 'auto' }}>
            "They made our vision come alive beautifully."
            <div className="text-xs mt-2 opacity-70">- Raj</div>
          </div>
          
          <div className="tile ink t9 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed text-white" style={{ left: '0%', top: '65%', width: '155px', height: 'auto' }}>
            "Pure magic in every detail."
            <div className="text-xs mt-2 opacity-70">- Amy</div>
          </div>
          
          <div className="tile ink t10 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed text-white" style={{ right: '0%', top: '68%', width: '170px', height: 'auto' }}>
            "Exceeded our wildest expectations."
            <div className="text-xs mt-2 opacity-70">- Chris</div>
          </div>
          
          <div className="tile note t11 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ left: '20%', top: '92%', width: '150px', height: 'auto' }}>
            "Effortlessly elegant."
            <div className="text-xs mt-2 opacity-70">- Zara</div>
          </div>
          
          <div className="tile mint t12 absolute opacity-0 translate-y-10 scale-95 p-4 text-sm leading-relaxed" style={{ right: '20%', top: '90%', width: '145px', height: 'auto' }}>
            "Our love story, beautifully told."
            <div className="text-xs mt-2 opacity-70">- Kevin</div>
          </div>
        </div>
      </div>
    </section>
  );
}