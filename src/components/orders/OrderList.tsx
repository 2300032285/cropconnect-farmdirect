import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrders } from '@/hooks/useOrders';
import { useProfile } from '@/hooks/useProfile';
import { Package, MapPin, Calendar, Phone, User, Building } from 'lucide-react';

export function OrderList() {
  const { orders, isLoading, updateOrder } = useOrders();
  const { profile } = useProfile();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders?.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'shipped': return 'outline';
      case 'delivered': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrder({ id: orderId, updates: { status: newStatus } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {profile?.role === 'farmer' ? 'Incoming Orders' : 'My Orders'}
          </h2>
          <p className="text-muted-foreground">
            {profile?.role === 'farmer' 
              ? 'Manage orders from buyers' 
              : 'Track your order history and status'
            }
          </p>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'all' 
                  ? profile?.role === 'farmer' 
                    ? 'You haven\'t received any orders yet'
                    : 'You haven\'t placed any orders yet'
                  : `No orders with status "${statusFilter}"`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="shadow-custom-sm hover:shadow-custom-md transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {order.products?.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Order Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Quantity:</span>
                        <span>{order.quantity} {order.products?.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Unit Price:</span>
                        <span>₹{order.unit_price}</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{order.total_amount}</span>
                      </div>
                      {order.delivery_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Delivery: {new Date(order.delivery_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">
                      {profile?.role === 'farmer' ? 'Buyer Information' : 'Farmer Information'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {profile?.role === 'farmer' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{order.buyer?.full_name}</span>
                          </div>
                          {order.buyer?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{order.buyer.phone}</span>
                            </div>
                          )}
                          {order.buyer?.city && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{order.buyer.city}, {order.buyer?.state}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{order.farmer?.full_name}</span>
                          </div>
                          {order.farmer?.farm_name && (
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span>{order.farmer.farm_name}</span>
                            </div>
                          )}
                          {order.farmer?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{order.farmer.phone}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Delivery Address</h4>
                  <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                </div>

                {/* Special Instructions */}
                {order.notes && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Special Instructions</h4>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </div>
                )}

                {/* Status Update (Farmers only) */}
                {profile?.role === 'farmer' && order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <span className="text-sm font-medium">Update Status:</span>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'shipped')}
                        >
                          Mark as Shipped
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}