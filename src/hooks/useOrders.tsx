import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useOrders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get orders for current user (buyer or farmer)
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('user_id', user.id)
        .single();

      if (!profile) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          products (
            name,
            category,
            unit,
            image_url
          ),
          buyer:profiles!orders_buyer_id_fkey (
            full_name,
            phone,
            city,
            state
          ),
          farmer:profiles!orders_farmer_id_fkey (
            full_name,
            farm_name,
            phone,
            city,
            state
          )
        `)
        .or(
          profile.role === 'farmer' 
            ? `farmer_id.eq.${profile.id}`
            : `buyer_id.eq.${profile.id}`
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Get product details to get farmer_id and calculate total
      const { data: product } = await supabase
        .from('products')
        .select('farmer_id, price')
        .eq('id', orderData.product_id)
        .single();

      if (!product) throw new Error('Product not found');

      const totalAmount = product.price * orderData.quantity;

      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          buyer_id: profile.id,
          farmer_id: product.farmer_id,
          unit_price: product.price,
          total_amount: totalAmount,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order placed",
        description: "Your order has been successfully placed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order updated",
        description: "The order has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    orders,
    isLoading,
    createOrder: createOrderMutation.mutate,
    updateOrder: updateOrderMutation.mutate,
    isCreating: createOrderMutation.isPending,
    isUpdating: updateOrderMutation.isPending,
  };
}