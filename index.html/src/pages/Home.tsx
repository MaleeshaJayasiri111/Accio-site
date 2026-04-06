import { Link } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Award,
  Shield,
  Percent,
  Truck,
  Star,
  Quote,
  Check,
  Leaf,
  Heart,
  Globe,
} from 'lucide-react';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-warm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground hover:bg-primary/30">
              Premium Quality Guaranteed
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary leading-tight mb-6">
              Nature's{' '}
              <span className="text-primary">Golden</span>{' '}
              Bounty
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Premium dried fruits, sourced from the world's finest orchards and delivered to your door with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="btn-primary gap-2">
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">14+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src="/images/hero/hero-main.jpg"
                alt="Premium Dried Fruits"
                className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 z-20 animate-pulse-glow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-secondary">100% Organic</div>
                  <div className="text-sm text-muted-foreground">Certified Quality</div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary/20 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Award,
      title: 'Top Selections',
      description: 'Handpicked products from the finest sources.',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe, easy transactions with full protection.',
    },
    {
      icon: Percent,
      title: 'Special Offers',
      description: 'Exclusive deals and discounts daily.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Fresh products delivered to your doorstep.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/about/palm-tree.jpg"
                alt="Date Palm Tree"
                className="rounded-3xl shadow-xl w-full"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-4 bg-primary text-primary-foreground rounded-2xl p-6 z-20 shadow-xl">
              <div className="font-display text-5xl font-bold">14</div>
              <div className="text-sm opacity-90">Years in the Industry</div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-primary/30 rounded-3xl" />
          </div>

          {/* Content */}
          <div>
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">Quality You Deserve</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
              Healthy & Premium Products, Every Day
            </h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-medium">Quality Goods</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-medium">Healthy Options</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Experience the finest quality dates, nuts, and dried fruits, carefully sourced from trusted suppliers 
              around the world. Our commitment is to deliver fresh, premium products directly to your doorstep, 
              ensuring you enjoy the best in healthy and delicious food.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-secondary">Fresh & High-Quality</div>
                <div className="text-sm text-muted-foreground">Healthy products delivered to your doorstep</div>
              </div>
            </div>
            <Link to="/about">
              <Button className="btn-primary gap-2">
                Discover More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const { state } = useApp();
  const categories = state.products.reduce((acc, product) => {
    const category = acc.find((c) => c.name === product.category);
    if (!category) {
      acc.push({
        name: product.category,
        image: product.image,
        count: 1,
      });
    } else {
      category.count++;
    }
    return acc;
  }, [] as { name: string; image: string; count: number }[]);

  const categoryDisplayNames: Record<string, string> = {
    'nuts': 'Healthy Nuts',
    'dates': 'Premium Dates',
    'dried-fruits': 'Dried Fruits',
    'mixed': 'Mixed Selections',
  };

  const categoryDescriptions: Record<string, string> = {
    'nuts': 'Enjoy the best, freshest nuts in every pack.',
    'dates': 'Fresh, delicious dates from our finest suppliers.',
    'dried-fruits': 'Tasty, nutritious dried fruits for every snack.',
    'mixed': 'Wholesome mixed selections for a healthy lifestyle.',
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">Explore Our Product Range</Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
            Browse Our Premium Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.name}`}
              className="group relative overflow-hidden rounded-2xl bg-muted aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-1">
                  {categoryDisplayNames[category.name] || category.name}
                </h3>
                <p className="text-sm text-white/70">{categoryDescriptions[category.name]}</p>
                <div className="mt-3 text-sm text-primary font-medium">
                  {category.count} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Products Section
function FeaturedProductsSection() {
  const { state } = useApp();
  const featuredProducts = state.products.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">Checkout Our Products</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
              Discover the Newest Products
            </h2>
          </div>
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">New</Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const reasons = [
    { icon: Award, title: 'Top Quality', description: 'Premium selection from best sources' },
    { icon: Truck, title: 'Fast Delivery', description: 'Quick shipping worldwide' },
    { icon: Heart, title: 'Fresh Products', description: 'Always fresh and nutritious' },
    { icon: Percent, title: 'Best Prices', description: 'Competitive pricing guaranteed' },
  ];

  return (
    <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/products/mixed-fruits.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">Why Choose Accio</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why You Should Choose Our Products
            </h2>
            <p className="text-secondary-foreground/70 mb-8">
              We take pride in delivering only the finest quality dried fruits and nuts. 
              Our commitment to excellence ensures you get the best products every time.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                    <reason.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">{reason.title}</h3>
                    <p className="text-sm text-secondary-foreground/70">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero/hero-small.jpg"
              alt="Premium Packaging"
              className="rounded-3xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">Worldwide</div>
                  <div className="text-sm opacity-90">Delivery Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const { state } = useApp();
  const testimonials = state.messages.length > 0 
    ? state.messages.slice(0, 3).map((m) => ({
        id: m.id,
        name: m.name,
        location: 'Customer',
        rating: 5,
        comment: m.message,
      }))
    : [
        {
          id: '1',
          name: 'Sarah Johnson',
          location: 'New York, USA',
          rating: 5,
          comment: 'The quality of Accio\'s dried fruits is exceptional! Their organic dates and almonds are my favorites. Each order guarantees freshness and deliciousness.',
        },
        {
          id: '2',
          name: 'Mohammed Ali',
          location: 'Dubai, UAE',
          rating: 5,
          comment: 'Accio consistently delivers the freshest dates and nuts. Their variety is outstanding, and the quality always exceeds my expectations.',
        },
        {
          id: '3',
          name: 'Emma Williams',
          location: 'London, UK',
          rating: 5,
          comment: 'I\'ve been ordering from Accio for over a year now. Their mixed dried fruit selection is perfect for my family. Fast delivery every time!',
        },
      ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">Our Feedbacks</Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Our Customers Say About Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why customers choose us for premium, fresh dates, nuts, and dried fruits 
            that meet their quality expectations every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-muted/50 rounded-2xl p-6 relative"
            >
              <Quote className="w-10 h-10 text-primary/30 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">{testimonial.comment}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-secondary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Accio for their daily dose of healthy, 
            delicious dried fruits and nuts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
