import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Package } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  farmer: string;
  location: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  rating: number;
  availability: string;
  organic?: boolean;
  onContact?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  name,
  farmer,
  location,
  price,
  unit,
  quantity,
  image,
  rating,
  availability,
  organic = false,
  onContact,
  onAddToCart
}: ProductCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-custom-md hover:shadow-custom-lg transition-smooth overflow-hidden border border-border">
      {/* Product Image */}
      <div className="relative h-48 bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {organic && (
          <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
            Organic
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{farmer} • {location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{quantity} {unit} available</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Available {availability}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">₹{price}</span>
            <span className="text-sm text-muted-foreground">/{unit}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onContact}
          >
            Contact Farmer
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}