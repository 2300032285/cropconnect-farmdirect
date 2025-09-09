import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useOrders } from '@/hooks/useOrders';
import { Loader2 } from 'lucide-react';

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
}

export function OrderForm({ open, onOpenChange, product }: OrderFormProps) {
  const { createOrder, isCreating } = useOrders();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: product?.minimum_order || 1,
      delivery_address: '',
      delivery_date: '',
      notes: '',
    },
  });

  const quantity = watch('quantity');
  const unitPrice = product?.price || 0;
  const totalAmount = quantity * unitPrice;

  const onSubmit = async (data: any) => {
    if (!product) return;

    const orderData = {
      product_id: product.id,
      quantity: parseInt(data.quantity),
      delivery_address: data.delivery_address,
      delivery_date: data.delivery_date || null,
      notes: data.notes || null,
    };

    createOrder(orderData);
    onOpenChange(false);
    reset();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription>
            Order {product.name} from {product.profiles?.farm_name || product.profiles?.full_name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">{product.name}</h4>
            <div className="text-sm text-muted-foreground">
              <p>Price: ₹{product.price} per {product.unit}</p>
              <p>Available: {product.quantity_available} {product.unit}</p>
              <p>Minimum Order: {product.minimum_order} {product.unit}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity ({product.unit}) *</Label>
            <Input
              id="quantity"
              type="number"
              min={product.minimum_order}
              max={product.quantity_available}
              {...register('quantity', { 
                required: 'Quantity is required',
                min: { value: product.minimum_order, message: `Minimum order is ${product.minimum_order}` },
                max: { value: product.quantity_available, message: `Maximum available is ${product.quantity_available}` }
              })}
            />
            {errors.quantity && (
              <span className="text-sm text-destructive">{String(errors.quantity.message)}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_address">Delivery Address *</Label>
            <Textarea
              id="delivery_address"
              {...register('delivery_address', { required: 'Delivery address is required' })}
              placeholder="Enter your complete delivery address"
              rows={3}
            />
            {errors.delivery_address && (
              <span className="text-sm text-destructive">{String(errors.delivery_address.message)}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_date">Preferred Delivery Date</Label>
            <Input
              id="delivery_date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('delivery_date')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any special requirements or instructions"
              rows={2}
            />
          </div>

          {/* Order Summary */}
          <div className="bg-primary/5 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{quantity} {product.unit}</span>
              </div>
              <div className="flex justify-between">
                <span>Unit Price:</span>
                <span>₹{unitPrice}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
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
              disabled={isCreating}
            >
              {isCreating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Place Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}