import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Handshake, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

interface HeroProps {
  onRoleSelect?: (role: 'farmer' | 'buyer') => void;
}

export function Hero({ onRoleSelect }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-earth">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Connect <span className="text-accent">Farmers</span> & <span className="text-accent">Buyers</span> Directly
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Eliminate middlemen. Get fair prices. Build lasting relationships in the agricultural marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onRoleSelect?.('farmer')}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Join as Farmer
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="buyer" 
              size="lg"
              onClick={() => onRoleSelect?.('buyer')}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Browse as Buyer
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-primary-foreground">
              <Users className="h-8 w-8 mb-2 text-accent" />
              <div className="text-2xl font-bold">Growing</div>
              <div className="text-sm opacity-90">Active Farmers</div>
            </div>
            <div className="flex flex-col items-center text-primary-foreground">
              <Handshake className="h-8 w-8 mb-2 text-accent" />
              <div className="text-2xl font-bold">Daily</div>
              <div className="text-sm opacity-90">Fresh Deals</div>
            </div>
            <div className="flex flex-col items-center text-primary-foreground">
              <TrendingUp className="h-8 w-8 mb-2 text-accent" />
              <div className="text-2xl font-bold">Fair</div>
              <div className="text-sm opacity-90">Market Prices</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}