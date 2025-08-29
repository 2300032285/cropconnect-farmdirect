import { ProductCard } from "./ProductCard";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    farmer: "Rajesh Kumar",
    location: "Punjab",
    price: 45,
    unit: "kg",
    quantity: 500,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
    rating: 4.8,
    availability: "today",
    organic: true
  },
  {
    id: "2",
    name: "Fresh Wheat",
    farmer: "Priya Sharma",
    location: "Haryana",
    price: 22,
    unit: "kg",
    quantity: 2000,
    image: "https://images.unsplash.com/photo-1574323566094-1877bb5ee611?w=400",
    rating: 4.6,
    availability: "in 2 days",
    organic: false
  },
  {
    id: "3",
    name: "Basmati Rice",
    farmer: "Sunil Patel",
    location: "Gujarat",
    price: 85,
    unit: "kg",
    quantity: 1500,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    rating: 4.9,
    availability: "today",
    organic: true
  },
  {
    id: "4",
    name: "Fresh Onions",
    farmer: "Meera Devi",
    location: "Maharashtra",
    price: 28,
    unit: "kg",
    quantity: 800,
    image: "https://images.unsplash.com/photo-1508313880080-c4bce1d99b6d?w=400",
    rating: 4.4,
    availability: "today",
    organic: false
  },
  {
    id: "5",
    name: "Organic Mangoes",
    farmer: "Ravi Reddy",
    location: "Andhra Pradesh",
    price: 120,
    unit: "kg",
    quantity: 300,
    image: "https://images.unsplash.com/photo-1553279768-865429ffd9d1?w=400",
    rating: 5.0,
    availability: "in 1 day",
    organic: true
  },
  {
    id: "6",
    name: "Fresh Potatoes",
    farmer: "Amit Singh",
    location: "Uttar Pradesh",
    price: 18,
    unit: "kg",
    quantity: 1200,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
    rating: 4.3,
    availability: "today",
    organic: false
  }
];

export function MarketplaceGrid() {
  const { toast } = useToast();

  const handleContact = (farmer: string) => {
    toast({
      title: "Contact Request Sent",
      description: `Your contact request has been sent to ${farmer}. They will reach out to you soon.`,
    });
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
    });
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onContact={() => handleContact(product.farmer)}
              onAddToCart={() => handleAddToCart(product.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}