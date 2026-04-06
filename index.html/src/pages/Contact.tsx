import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
      toast.success('Message sent successfully! We will get back to you soon.');
      
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@accio.com',
      description: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (234) 567-890',
      description: 'Mon-Fri, 9am-6pm EST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Premium Street, New York',
      description: 'NY 10001, USA',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Fri: 9AM - 6PM',
      description: 'Saturday: 10AM - 4PM',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">Get in Touch</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or feedback? We'd love to hear from you. Reach out to us 
              and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <info.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-secondary mb-1">
                    {info.title}
                  </h3>
                  <p className="font-medium text-secondary mb-1">{info.content}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-secondary">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll respond shortly
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="h-full min-h-[400px] bg-muted relative flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-secondary mb-2">
                    Our Location
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    123 Premium Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <Check className="w-4 h-4" />
                    <span>Open for visits during business hours</span>
                  </div>
                </div>
                {/* Decorative Map Grid */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(to right, #000 1px, transparent 1px),
                      linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">FAQ</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.',
              },
              {
                q: 'Do you offer international shipping?',
                a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.',
              },
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy for unopened products. Contact us for return instructions.',
              },
              {
                q: 'Are your products organic?',
                a: 'Many of our products are certified organic. Look for the organic badge on product pages.',
              },
              {
                q: 'How should I store dried fruits?',
                a: 'Store in a cool, dry place away from direct sunlight. Refrigeration can extend shelf life.',
              },
              {
                q: 'Do you offer bulk discounts?',
                a: 'Yes, we offer discounts on bulk orders. Contact us for wholesale pricing.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-secondary mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
