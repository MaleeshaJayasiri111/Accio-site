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
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';

export default function AdminProducts() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'nuts',
    weights: ['250g', '500g', '1kg'],
    benefits: [],
  });

  // Filter products
  const filteredProducts = state.products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'nuts',
      weights: ['250g', '500g', '1kg'],
      benefits: [],
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      toast.success('Product deleted successfully');
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: { ...editingProduct, ...formData } as Product,
      });
      toast.success('Product updated successfully');
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        stock: formData.stock || 0,
        category: formData.category || 'nuts',
        image: '/images/products/almonds.jpg',
        weights: formData.weights || ['250g', '500g', '1kg'],
        benefits: formData.benefits || [],
      };
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      toast.success('Product added successfully');
    }
    setIsDialogOpen(false);
  };

  const categoryDisplayNames: Record<string, string> = {
    'nuts': 'Nuts',
    'dates': 'Dates',
    'dried-fruits': 'Dried Fruits',
    'mixed': 'Mixed',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge className="mb-2 bg-primary/20 text-primary-foreground">Products</Badge>
          <h1 className="font-display text-3xl font-bold text-secondary">Manage Products</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.weights.join(', ')}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {categoryDisplayNames[product.category] || product.category}
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.stock > 50 ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {product.stock > 50 ? 'In Stock' : 'Low Stock'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Product Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="nuts">Nuts</option>
                <option value="dates">Dates</option>
                <option value="dried-fruits">Dried Fruits</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price <span className="text-destructive">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Stock</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Weights */}
            <div>
              <label className="text-sm font-medium mb-2 block">Available Weights</label>
              <div className="flex flex-wrap gap-2">
                {['250g', '500g', '1kg'].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => {
                      const weights = formData.weights || [];
                      if (weights.includes(weight)) {
                        setFormData({
                          ...formData,
                          weights: weights.filter((w) => w !== weight),
                        });
                      } else {
                        setFormData({
                          ...formData,
                          weights: [...weights, weight],
                        });
                      }
                    }}
                    className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                      formData.weights?.includes(weight)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload Placeholder */}
            <div>
              <label className="text-sm font-medium mb-2 block">Product Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Image upload functionality would be implemented here
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave} className="flex-1">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
