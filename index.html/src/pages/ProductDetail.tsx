import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp, useCart } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const { addToCart } = useCart();
  
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage] = useState(0);

  const product = state.products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-secondary mb-4">
            Product Not Found
          </h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedWeight) {
      addToCart({
        product,
        quantity,
        weight: selectedWeight,
      });
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error('Please select a weight option');
    }
  };

  // Get related products
  const relatedProducts = state.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryDisplayNames: Record<string, string> = {
    'nuts': 'Healthy Nuts',
    'dates': 'Premium Dates',
    'dried-fruits': 'Dried Fruits',
    'mixed': 'Mixed Selections',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-secondary">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock < 50 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive">Low Stock</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {categoryDisplayNames[product.category] || product.category}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(48 reviews)</span>
            </div>

            {/* Price */}
            <div className="font-display text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Weight Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">
                Select Weight <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((weight) => (
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
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedWeight}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  handleAddToCart();
                  navigate('/products');
                }}
                disabled={!selectedWeight}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xs text-muted-foreground">Free Shipping</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xs text-muted-foreground">Secure Payment</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xs text-muted-foreground">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="benefits">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="nutrition">Nutritional Info</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="benefits" className="mt-6">
              <div className="bg-muted/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-4">Health Benefits</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-6">
              <div className="bg-muted/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-4">Nutritional Information</h3>
                {product.nutritionalInfo ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="font-display text-2xl font-bold text-primary">
                        {product.nutritionalInfo.calories}
                      </div>
                      <div className="text-sm text-muted-foreground">Calories (kcal)</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="font-display text-2xl font-bold text-primary">
                        {product.nutritionalInfo.protein}g
                      </div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="font-display text-2xl font-bold text-primary">
                        {product.nutritionalInfo.fat}g
                      </div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="font-display text-2xl font-bold text-primary">
                        {product.nutritionalInfo.carbs}g
                      </div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="font-display text-2xl font-bold text-primary">
                        {product.nutritionalInfo.fiber}g
                      </div>
                      <div className="text-sm text-muted-foreground">Fiber</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nutritional information not available.</p>
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  * Nutritional values are per 100g serving
                </p>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="bg-muted/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Free Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Free shipping on orders over $50. Standard delivery takes 3-5 business days.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Easy Returns</div>
                      <div className="text-sm text-muted-foreground">
                        Not satisfied? Return within 30 days for a full refund.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Secure Packaging</div>
                      <div className="text-sm text-muted-foreground">
                        All products are carefully packaged to ensure freshness during transit.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="font-display text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
