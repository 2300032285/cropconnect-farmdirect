import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import { OrderForm } from '@/components/orders/OrderForm';
import { MapPin, Calendar, Package, ShoppingCart, Search } from 'lucide-react';

export function MarketplaceProducts() {
  const { products, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    'all',
    'vegetables',
    'fruits',
    'grains',
    'herbs',
    'dairy',
    'livestock',
  ];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleOrderClick = (product: any) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No products are currently available in the marketplace'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-custom-sm hover:shadow-custom-md transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>by {product.profiles?.farm_name || product.profiles?.full_name}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-muted-foreground">per {product.unit}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{product.quantity_available} {product.unit} available</span>
                  </div>
                  
                  {product.profiles?.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{product.profiles.city}, {product.profiles?.state}</span>
                    </div>
                  )}
                  
                  {product.harvest_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Harvested: {new Date(product.harvest_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.organic && (
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Organic
                    </Badge>
                  )}
                  <Badge variant="outline">
                    Min. order: {product.minimum_order} {product.unit}
                  </Badge>
                </div>

                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </CardContent>
              
              <CardFooter>
                <Button
                  onClick={() => handleOrderClick(product)}
                  className="w-full"
                  disabled={product.quantity_available === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.quantity_available === 0 ? 'Out of Stock' : 'Order Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        product={selectedProduct}
      />
    </div>
  );
}