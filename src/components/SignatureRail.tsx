import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import conceptLinens from '@/assets/concept-linens.jpg';
import conceptGlassware from '@/assets/concept-glassware.jpg';
import conceptFlorals from '@/assets/concept-florals.jpg';

const concepts = [
  {
    id: 1,
    image: conceptLinens,
    title: "Intimate Linen Dreams",
    description: "Soft textures meet warm candlelight"
  },
  {
    id: 2,
    image: conceptGlassware,
    title: "Crystal & Champagne",
    description: "Elegant glassware for special toasts"
  },
  {
    id: 3,
    image: conceptFlorals,
    title: "Garden Romance",
    description: "Fresh florals in delicate arrangements"
  },
  {
    id: 4,
    image: conceptLinens,
    title: "Minimalist Elegance",
    description: "Clean lines with thoughtful details"
  },
  {
    id: 5,
    image: conceptGlassware,
    title: "Vintage Charm",
    description: "Timeless pieces with modern flair"
  }
];

export function SignatureRail() {
  const [rollCount, setRollCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const rollIdea = () => {
    setRollCount(prev => prev + 1);
    
    if (rollCount >= 1) {
      // After 2 rolls, nudge to join waitlist
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Shuffle concepts (visual feedback)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: Math.random() * 800, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-blush/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-headline mb-6 text-charcoal">
            Signature Concepts
          </h2>
          <p className="text-subhead text-charcoal/70 max-w-2xl mx-auto mb-8">
            Every setup tells a story. Here's a glimpse into our craft.
          </p>
          
          <Button
            onClick={rollIdea}
            variant="outline"
            className="btn-ghost group light-catch"
          >
            <Shuffle className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
            {rollCount >= 2 ? 'Join waitlist for custom ideas' : 'Roll an idea'}
          </Button>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 glass hover:bg-background"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 glass hover:bg-background"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {concepts.map((concept, index) => (
              <div
                key={concept.id}
                className="flex-shrink-0 w-80 snap-center group cursor-pointer"
                style={{ transform: 'perspective(1000px)' }}
              >
                <div className="card-glass overflow-hidden group-hover:shadow-elegant transition-all duration-300 group-hover:scale-[1.02] light-catch">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={concept.image}
                      alt={concept.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-body text-charcoal/60">
                      {concept.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}