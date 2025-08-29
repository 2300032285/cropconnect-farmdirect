import { Shield, Truck, Phone, TrendingUp, Users, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fair Trade Guarantee",
    description: "Transparent pricing ensures farmers get fair value for their hard work while buyers get competitive rates."
  },
  {
    icon: Truck,
    title: "Direct Delivery",
    description: "Connect directly with farmers for fresh delivery. No middlemen, no delays, just farm-to-table freshness."
  },
  {
    icon: Phone,
    title: "Easy Communication",
    description: "Built-in chat and call features make it simple to discuss quantities, quality, and delivery schedules."
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Real-time price trends and demand forecasts help both farmers and buyers make informed decisions."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a growing community of farmers and buyers building sustainable agricultural relationships."
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rating and review system ensures quality standards while building trust between all parties."
  }
];

export function Features() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose CropConnect?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing agriculture by creating direct connections between 
            farmers and buyers, ensuring everyone benefits from fair, transparent trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg shadow-custom-sm hover:shadow-custom-md transition-smooth border border-border"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}