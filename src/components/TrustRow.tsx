import { Shield, DollarSign, Lock } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    text: "Consent-led photos"
  },
  {
    icon: DollarSign,
    text: "Transparent pricing ranges"
  },
  {
    icon: Lock,
    text: "We don't sell data"
  }
];

export function TrustRow() {
  return (
    <section className="py-16 bg-background border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald" />
                </div>
                <span className="text-body text-charcoal/70 font-medium">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}