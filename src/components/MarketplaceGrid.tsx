import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Package, Loader2 } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: any;
  onOrder: (product: any) => void;
}

function ProductCard({ product, onOrder }: ProductCardProps) {
  const { toast } = useToast();

  const handleContact = () => {
    toast({
      title: "Contact Feature",
      description: "Contact functionality will be available soon. For now, you can place an order directly.",
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-custom-md hover:shadow-custom-lg transition-smooth overflow-hidden border border-border">
      <div className="relative h-48 bg-muted">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.organic && (
          <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
            Organic
          </Badge>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">4.5</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{product.profiles?.farm_name || product.profiles?.full_name || "Farm"} • {product.location || `${product.profiles?.city}, ${product.profiles?.state}` || "India"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{product.quantity_available} {product.unit} available</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Fresh harvest</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleContact}
          >
            Contact Farmer
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onOrder(product)}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MarketplaceGrid() {
  const { products, isLoading } = useProducts();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderFormOpen, setOrderFormOpen] = useState(false);

  const handleOrder = (product: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place an order.",
        variant: "destructive",
      });
      return;
    }
    setSelectedProduct(product);
    setOrderFormOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fresh Produce Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover fresh, quality produce directly from farmers across India. 
            Build relationships, ensure quality, and support local agriculture.
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={handleOrder}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>

      <OrderForm
        open={orderFormOpen}
        onOpenChange={setOrderFormOpen}
        product={selectedProduct}
      />
    </section>
  );
}