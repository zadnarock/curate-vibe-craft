export function Footer() {
  return (
    <footer className="py-12 bg-charcoal text-ivory">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <h3 className="font-display text-2xl font-bold mb-4">
            Ready to make magic happen?
          </h3>
          <p className="text-ivory/70 max-w-md mx-auto">
            Every unforgettable moment starts with a single message. 
            Let's create yours.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <a 
            href="mailto:hello@curate.events" 
            className="text-champagne hover:text-ivory transition-colors"
          >
            hello@curate.events
          </a>
          <span className="hidden sm:block text-ivory/30">•</span>
          <a 
            href="https://wa.me/1234567890" 
            className="text-champagne hover:text-ivory transition-colors"
          >
            WhatsApp
          </a>
        </div>
        
        <div className="pt-8 border-t border-ivory/10">
          <p className="text-sm text-ivory/50">
            © 2024 Curate. Crafting memories with care.
          </p>
        </div>
      </div>
    </footer>
  );
}