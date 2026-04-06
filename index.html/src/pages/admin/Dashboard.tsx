import { useApp } from '@/store/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Package,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock chart data
const chartData = [
  { name: 'Jan', orders: 45, revenue: 4200 },
  { name: 'Feb', orders: 52, revenue: 5100 },
  { name: 'Mar', orders: 48, revenue: 4800 },
  { name: 'Apr', orders: 61, revenue: 6200 },
  { name: 'May', orders: 55, revenue: 5800 },
  { name: 'Jun', orders: 67, revenue: 7100 },
  { name: 'Jul', orders: 72, revenue: 7800 },
];

export default function AdminDashboard() {
  const { state } = useApp();

  // Calculate stats
  const totalCustomers = state.users.length;
  const totalProducts = state.products.length;
  const totalOrders = state.orders.length;
  // const totalMessages = state.messages.length;
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = state.orders.filter((o) => o.status === 'pending').length;
  const unreadMessages = state.messages.filter((m) => !m.isRead).length;

  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: totalProducts,
      change: '+5%',
      trend: 'up',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+18%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+24%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-primary',
    },
  ];

  // Recent orders
  const recentOrders = state.orders.slice(0, 5);

  // Recent messages
  const recentMessages = state.messages.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge className="mb-2 bg-primary/20 text-primary-foreground">Overview</Badge>
        <h1 className="font-display text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="font-display text-2xl font-bold text-secondary mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-green-500">{stat.change}</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue & Orders Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f7c35f"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-xl">Recent Orders</CardTitle>
            <Badge variant="secondary">{pendingOrders} Pending</Badge>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customerName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${order.totalAmount.toFixed(2)}</div>
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'default'
                            : order.status === 'pending'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="capitalize text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No orders yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Messages
            </CardTitle>
            <Badge variant="destructive">{unreadMessages} Unread</Badge>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      message.isRead ? 'bg-muted/50' : 'bg-primary/10'
                    }`}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-primary">
                        {message.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{message.name}</div>
                        {!message.isRead && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.message}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No messages yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
