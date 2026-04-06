import { Link } from 'react-router-dom';
import { useAuth, useApp, useCart } from '@/store/AppContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingBag,
  MessageSquare,
  User,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { state } = useApp();
  const { cart } = useCart();

  // Get user's orders
  const userOrders = state.orders.filter((o) => o.customerId === user?.id);
  
  // Get recent orders (last 3)
  const recentOrders = userOrders.slice(0, 3);

  // Get cart items count
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const stats = [
    {
      title: 'Total Orders',
      value: userOrders.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Cart Items',
      value: cartItemsCount,
      icon: ShoppingBag,
      color: 'bg-primary',
    },
    {
      title: 'Messages',
      value: state.messages.filter((m) => m.email === user?.email).length,
      icon: MessageSquare,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">Customer Dashboard</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary">
            Welcome back, {user?.fullName.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your account activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="font-display text-3xl font-bold text-secondary mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Recent Orders</CardTitle>
                <Link to="/orders">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                      >
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-primary">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                          <Badge
                            variant={
                              order.status === 'delivered'
                                ? 'default'
                                : order.status === 'pending'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <Link to="/products">
                      <Button className="mt-4">Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link to="/products">
                    <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                      <ShoppingBag className="w-6 h-6" />
                      <span className="text-xs">Shop Now</span>
                    </Button>
                  </Link>
                  <Link to="/orders">
                    <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                      <Package className="w-6 h-6" />
                      <span className="text-xs">My Orders</span>
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                      <User className="w-6 h-6" />
                      <span className="text-xs">Profile</span>
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-xs">Support</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Full Name</div>
                      <div className="font-medium">{user?.fullName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{user?.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">{user?.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Country</div>
                      <div className="font-medium">{user?.country}</div>
                    </div>
                  </div>
                </div>
                <Link to="/profile">
                  <Button variant="outline" className="w-full mt-6">
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <MessageSquare className="w-10 h-10 mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Our customer support team is available 24/7 to assist you with any questions.
                </p>
                <Link to="/contact">
                  <Button variant="secondary" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
