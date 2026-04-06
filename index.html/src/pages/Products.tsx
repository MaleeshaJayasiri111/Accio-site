import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp, useCart } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShoppingCart, Search, Filter, X, Check, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';

export default function Products() {
  const [searchParams] = useSearchParams();
  const { state } = useApp();
  const { addToCart } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(state.products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [state.products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...state.products];

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return products;
  }, [state.products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = () => {
    if (selectedProduct && selectedWeight) {
      addToCart({
        product: selectedProduct,
        quantity,
        weight: selectedWeight,
      });
      toast.success(`${selectedProduct.name} added to cart!`);
      setSelectedProduct(null);
      setQuantity(1);
      setSelectedWeight('');
    }
  };

  const categoryDisplayNames: Record<string, string> = {
    'all': 'All Products',
    'nuts': 'Healthy Nuts',
    'dates': 'Premium Dates',
    'dried-fruits': 'Dried Fruits',
    'mixed': 'Mixed Selections',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">Our Collection</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Premium Dried Fruits & Nuts
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium dried fruits, nuts, and dates 
            sourced from the finest orchards around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {categoryDisplayNames[cat] || cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
              >
                {/* Image */}
                <Link to={`/products/${product.id}`} className="relative aspect-square overflow-hidden block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.stock < 50 && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="destructive">Low Stock</Badge>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {categoryDisplayNames[product.category] || product.category}
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-display text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="font-display text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedWeight(product.weights[0]);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-secondary mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add to Cart</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex gap-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-display font-bold text-lg">{selectedProduct.name}</h3>
                  <p className="text-primary font-bold">${selectedProduct.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Weight Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Weight</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.weights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedWeight === weight
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Button */}
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedWeight}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
  );
}
