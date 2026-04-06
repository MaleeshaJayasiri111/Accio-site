import { Badge } from '@/components/ui/badge';
import { Check, Target, Eye, Award, Users, Globe, Leaf } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product undergoes rigorous testing.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source responsibly and support sustainable farming practices.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We listen and continuously improve.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We deliver premium products to customers worldwide.',
    },
  ];

  const milestones = [
    { year: '2010', title: 'Founded', description: 'Accio was established with a vision to deliver premium dried fruits.' },
    { year: '2015', title: 'Global Expansion', description: 'Started international shipping to over 20 countries.' },
    { year: '2018', title: 'Organic Certification', description: 'Achieved organic certification for our entire product line.' },
    { year: '2022', title: '50K+ Customers', description: 'Reached milestone of 50,000 happy customers worldwide.' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as a leading premium dried fruits supplier.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">About Accio</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              Our Story of Passion & Quality
            </h1>
            <p className="text-lg text-muted-foreground">
              For over 14 years, Accio has been dedicated to bringing the world's finest dried fruits, 
              nuts, and dates to your doorstep. Our journey is built on a foundation of quality, 
              trust, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-muted/50 rounded-3xl p-8 md:p-12">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide the highest quality dried fruits, nuts, and dates sourced from the world's 
                best orchards, delivered with exceptional service. We aim to promote healthy snacking 
                habits while supporting sustainable farming practices and local communities.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Source only the finest quality products',
                  'Support sustainable and ethical farming',
                  'Deliver exceptional customer experience',
                  'Promote healthy lifestyle choices',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-12">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Our Vision
              </h2>
              <p className="text-secondary-foreground/80 leading-relaxed">
                To become the world's most trusted brand for premium dried fruits and nuts, 
                recognized for our unwavering commitment to quality, sustainability, and 
                customer satisfaction. We envision a world where healthy snacking is accessible 
                to everyone.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Global leader in premium dried fruits',
                  'Pioneer in sustainable food sourcing',
                  'Trusted by millions of customers',
                  'Inspiring healthier lifestyles worldwide',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">Our Journey</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
              Company History
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm inline-block">
                      <div className="font-display text-3xl font-bold text-primary mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-display text-xl font-bold text-secondary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">What We Stand For</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-2xl p-6 text-center hover:bg-muted transition-colors group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-secondary mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground">Quality Assurance</Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Our Commitment to Excellence
              </h2>
              <p className="text-secondary-foreground/80 mb-8">
                Every product that bears the Accio name goes through a rigorous quality control process. 
                From sourcing to packaging, we ensure that only the best reaches your hands.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Sourcing Excellence',
                    description: 'We partner with trusted farmers and suppliers who share our commitment to quality.',
                  },
                  {
                    title: 'Rigorous Testing',
                    description: 'Every batch undergoes comprehensive testing for quality, freshness, and safety.',
                  },
                  {
                    title: 'Certified Facilities',
                    description: 'Our processing facilities meet international food safety standards.',
                  },
                  {
                    title: 'Freshness Guaranteed',
                    description: 'We use advanced packaging to preserve freshness and extend shelf life.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-secondary-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/products/mixed-fruits.jpg"
                alt="Quality Products"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="font-display text-4xl font-bold">100%</div>
                <div className="text-sm opacity-90">Quality Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Delivery */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">Worldwide Service</Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
              Global Delivery Capability
            </h2>
            <p className="text-muted-foreground mb-8">
              No matter where you are in the world, Accio can deliver premium dried fruits and nuts 
              to your doorstep. Our extensive logistics network ensures fast, reliable delivery 
              to over 50 countries.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '50+', label: 'Countries Served' },
                { value: '24-72h', label: 'Delivery Time' },
                { value: '99%', label: 'On-Time Delivery' },
                { value: '24/7', label: 'Customer Support' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="font-display text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
