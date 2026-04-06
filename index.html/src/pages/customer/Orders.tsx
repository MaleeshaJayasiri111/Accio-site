import { useAuth, useApp } from '@/store/AppContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import type { Order } from '@/types';

export default function Orders() {
  const { user } = useAuth();
  const { state } = useApp();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Get user's orders
  const userOrders = state.orders.filter((o) => o.customerId === user?.id);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">My Orders</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary">
            Order History
          </h1>
          <p className="text-muted-foreground mt-2">
            View and track all your orders
          </p>
        </div>

        {/* Orders List */}
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="p-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="font-display font-bold text-lg">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="font-display text-xl font-bold text-primary">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {expandedOrder === order.id && (
                  <CardContent className="border-t bg-muted/30 p-6">
                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{item.productName}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.weight} × {item.quantity}
                              </div>
                            </div>
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Shipping Address</h4>
                        <p className="text-sm text-muted-foreground">
                          {order.shippingAddress}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>Free</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total</span>
                            <span className="text-primary">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Order Status</h4>
                      <div className="flex items-center gap-2">
                        {['pending', 'processing', 'shipped', 'delivered'].map(
                          (status, index) => {
                            const isActive =
                              ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                                order.status
                              ) >= index;
                            return (
                              <div key={status} className="flex items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                {index < 3 && (
                                  <div
                                    className={`w-12 h-1 ${
                                      isActive ? 'bg-primary' : 'bg-muted'
                                    }`}
                                  />
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Pending</span>
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-secondary mb-2">
                No Orders Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button>Start Shopping</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
