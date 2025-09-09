import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

const categories = [
  'vegetables',
  'fruits',
  'grains',
  'herbs',
  'dairy',
  'livestock',
] as const;

const units = ['kg', 'lbs', 'tons', 'pieces', 'liters', 'gallons'];

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
}

export function ProductForm({ open, onOpenChange, product }: ProductFormProps) {
  const { createProduct, updateProduct, isCreating, isUpdating } = useProducts();
  const [category, setCategory] = useState(product?.category || '');
  const [unit, setUnit] = useState(product?.unit || 'kg');
  const [organic, setOrganic] = useState(product?.organic || false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      quantity_available: product?.quantity_available || '',
      minimum_order: product?.minimum_order || 1,
      location: product?.location || '',
      harvest_date: product?.harvest_date || '',
      expiry_date: product?.expiry_date || '',
    },
  });

  const onSubmit = async (data: any) => {
    const productData = {
      ...data,
      category,
      unit,
      organic,
      price: parseFloat(data.price),
      quantity_available: parseInt(data.quantity_available),
      minimum_order: parseInt(data.minimum_order),
    };

    if (product) {
      updateProduct({ id: product.id, updates: productData });
    } else {
      createProduct(productData);
    }
    
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {product ? 'Update your product details.' : 'Create a new product listing for your farm.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Product name is required' })}
                placeholder="Fresh Tomatoes"
              />
              {errors.name && (
                <span className="text-sm text-destructive">{String(errors.name.message)}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required' })}
                placeholder="25.00"
              />
              {errors.price && (
                <span className="text-sm text-destructive">{String(errors.price.message)}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Unit *</Label>
              <Select value={unit} onValueChange={setUnit} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity_available">Available Quantity *</Label>
              <Input
                id="quantity_available"
                type="number"
                {...register('quantity_available', { required: 'Quantity is required' })}
                placeholder="100"
              />
              {errors.quantity_available && (
                <span className="text-sm text-destructive">{String(errors.quantity_available.message)}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimum_order">Minimum Order</Label>
              <Input
                id="minimum_order"
                type="number"
                {...register('minimum_order')}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvest_date">Harvest Date</Label>
              <Input
                id="harvest_date"
                type="date"
                {...register('harvest_date')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                {...register('expiry_date')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="Farm location or nearest city"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your product quality, farming practices, etc."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="organic"
              checked={organic}
              onCheckedChange={setOrganic}
            />
            <Label htmlFor="organic">Organic Certified</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating || !category}
            >
              {(isCreating || isUpdating) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}