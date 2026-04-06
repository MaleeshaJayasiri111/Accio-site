import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to our newsletter!');
  };

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const customerLinks = [
    { label: 'My Account', path: '/dashboard' },
    { label: 'My Orders', path: '/orders' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Stay Updated!
              </h3>
              <p className="text-secondary-foreground/70">
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-2xl font-bold">Accio</span>
            </Link>
            <p className="text-secondary-foreground/70 mb-6">
              Your trusted supplier of premium dried fruits, nuts, and dates worldwide. 
              Quality you deserve, delivered with care.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Area */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Customer Area</h4>
            <ul className="space-y-3">
              {customerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/70">
                  123 Premium Street,<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+1234567890" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@accio.com" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  info@accio.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Accio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
