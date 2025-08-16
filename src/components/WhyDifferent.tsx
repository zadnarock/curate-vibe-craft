'use client';

import { useEffect, useRef } from 'react';
import styles from './why-different.module.css';

export function WhyDifferent() {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tiles = Array.from(section.querySelectorAll('.tile'));
    const copyElements = Array.from(section.querySelectorAll('.copy h2, .copy .sub, .copy .cta'));
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Give each tile random initial rotation
    tiles.forEach((tile) => {
      const rotation = (Math.random() - 0.5) * 6; // -3 to +3 degrees
      (tile as HTMLElement).style.setProperty('--r0', `${rotation}deg`);
    });

    // Set up random idle animation variables for each tile
    tiles.forEach((tile) => {
      const dx = (Math.random() - 0.5) * 16; // ±8px
      const dy = (Math.random() - 0.5) * 20; // ±10px
      const rot = (Math.random() - 0.5) * 4; // ±2deg
      const dur = 3 + Math.random() * 3; // 3-6s
      
      const el = tile as HTMLElement;
      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);
      el.style.setProperty('--rot', `${rot}deg`);
      el.style.setProperty('--dur', `${dur}s`);
    });

    // Stagger copy elements
    copyElements.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 0.08}s`;
    });

    // Stagger tiles
    tiles.forEach((tile, index) => {
      (tile as HTMLElement).style.transitionDelay = `${index * 0.05}s`;
    });

    // Parallax scroll handler
    const handleScroll = () => {
      if (!section.classList.contains('active')) return;
      
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) based on section visibility
      const progress = Math.max(0, Math.min(1, 
        1 - (rect.top / (viewportHeight - rect.height))
      ));
      
      tiles.forEach((tile) => {
        const depth = parseFloat((tile as HTMLElement).dataset.depth || '0.5');
        const parallaxY = (progress - 0.5) * depth * 24;
        
        (tile as HTMLElement).style.setProperty('--parallax-y', `${parallaxY}px`);
      });
    };

    // Intersection Observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('active');
          
          if (!prefersReducedMotion) {
            // Start idle animation after intro
            setTimeout(() => {
              section.classList.add('idle');
            }, 200);
            
            // Add scroll listener for parallax
            scrollHandlerRef.current = handleScroll;
            window.addEventListener('scroll', handleScroll, { passive: true });
          }
        } else {
          section.classList.remove('idle');
          
          // Remove scroll listener
          if (scrollHandlerRef.current) {
            window.removeEventListener('scroll', scrollHandlerRef.current);
            scrollHandlerRef.current = null;
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(section);

    return () => {
      observerRef.current?.disconnect();
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="why-different" 
      className={styles.why}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2>Why AmazeMe feels different</h2>
          <p className={styles.sub}>Not templates. Living memories, written for your story.</p>
          <a className={styles.cta} href="#waitlist">Join the waitlist</a>
        </div>
        
        <div id="tile-stage" aria-hidden="true">
          <div className={`${styles.tile} ${styles.note} ${styles.t1}`} data-depth="0.30"></div>
          <div className={`${styles.tile} ${styles.aqua} ${styles.t2}`} data-depth="0.42"></div>
          <div className={`${styles.tile} ${styles.mint} ${styles.t3}`} data-depth="0.54"></div>
          <div className={`${styles.tile} ${styles.gold} ${styles.t4}`} data-depth="0.66"></div>
          <div className={`${styles.tile} ${styles.note} ${styles.t5}`} data-depth="0.78"></div>
          <div className={`${styles.tile} ${styles.aqua} ${styles.t6}`} data-depth="0.90"></div>
          <div className={`${styles.tile} ${styles.mint} ${styles.t7}`} data-depth="0.36"></div>
          <div className={`${styles.tile} ${styles.gold} ${styles.t8}`} data-depth="0.48"></div>
          <div className={`${styles.tile} ${styles.ink} ${styles.t9}`} data-depth="0.60">Story</div>
          <div className={`${styles.tile} ${styles.note} ${styles.t10}`} data-depth="0.72"></div>
          <div className={`${styles.tile} ${styles.aqua} ${styles.t11}`} data-depth="0.84"></div>
          <div className={`${styles.tile} ${styles.ink} ${styles.t12}`} data-depth="0.96">Wow</div>
        </div>
      </div>
    </section>
  );
}