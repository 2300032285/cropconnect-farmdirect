import { Button } from "@/components/ui/button";
import { Tractor, ShoppingCart, ArrowRight } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: 'farmer' | 'buyer') => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <section className="py-16 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How do you want to get started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access tailored features and start connecting 
            with the agricultural community that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Farmer Card */}
          <div className="bg-card p-8 rounded-xl shadow-custom-lg border-2 border-primary/20 hover:border-primary/40 transition-smooth">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tractor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                I'm a Farmer
              </h3>
              <p className="text-muted-foreground mb-6">
                Sell your crops directly to buyers, get fair prices, track your earnings, 
                and build lasting relationships with your customers.
              </p>
              <ul className="text-sm text-muted-foreground mb-8 space-y-2">
                <li>• List your products easily</li>
                <li>• Connect with verified buyers</li>
                <li>• Track sales and earnings</li>
                <li>• Get market price insights</li>
              </ul>
              <Button 
                variant="farmer" 
                size="lg" 
                className="w-full"
                onClick={() => onRoleSelect('farmer')}
              >
                Join as Farmer
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Buyer Card */}
          <div className="bg-card p-8 rounded-xl shadow-custom-lg border-2 border-accent/20 hover:border-accent/40 transition-smooth">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                I'm a Buyer
              </h3>
              <p className="text-muted-foreground mb-6">
                Source fresh produce directly from farmers, ensure quality, 
                and build reliable supply chains for your business.
              </p>
              <ul className="text-sm text-muted-foreground mb-8 space-y-2">
                <li>• Browse fresh produce</li>
                <li>• Connect directly with farmers</li>
                <li>• Ensure product quality</li>
                <li>• Manage your supply chain</li>
              </ul>
              <Button 
                variant="buyer" 
                size="lg" 
                className="w-full"
                onClick={() => onRoleSelect('buyer')}
              >
                Browse as Buyer
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}