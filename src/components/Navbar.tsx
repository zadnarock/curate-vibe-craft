import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled 
        ? "bg-charcoal/90 glass text-ivory" 
        : "bg-transparent text-charcoal"
    )}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-display text-xl font-bold">
            Curate
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="hover:text-champagne transition-colors duration-200 relative group">
              How it works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-champagne transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#waitlist" className="hover:text-champagne transition-colors duration-200 relative group">
              Join waitlist
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-champagne transition-all duration-200 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}