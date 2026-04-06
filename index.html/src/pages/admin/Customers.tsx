import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Eye,
  Trash2,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Package,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCustomers() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof state.users[0] | null>(null);

  // Filter customers
  const filteredCustomers = state.users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      dispatch({ type: 'DELETE_USER', payload: id });
      toast.success('Customer deleted successfully');
    }
  };

  // Get customer orders
  const getCustomerOrders = (customerId: string) => {
    return state.orders.filter((o) => o.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Badge className="mb-2 bg-primary/20 text-primary-foreground">Customers</Badge>
        <h1 className="font-display text-3xl font-bold text-secondary">Manage Customers</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-display font-bold text-primary">
                        {customer.fullName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{customer.fullName}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{customer.phone}</div>
                </TableCell>
                <TableCell>{customer.country}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getCustomerOrders(customer.id).length} orders
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(customer.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Customer Details</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">
                    {selectedCustomer.fullName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{selectedCustomer.fullName}</h3>
                  <p className="text-muted-foreground">Customer since {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{selectedCustomer.country}</span>
                </div>
              </div>

              {/* Orders */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order History
                </h4>
                {getCustomerOrders(selectedCustomer.id).length > 0 ? (
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.id).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${order.totalAmount.toFixed(2)}</div>
                          <Badge variant="outline" className="capitalize text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
