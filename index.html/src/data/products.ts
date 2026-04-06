import type { Product, Category, Testimonial, User, Order, Message } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Almonds',
    description: 'Handpicked premium almonds sourced from California. These nutrient-rich nuts are perfect for snacking, baking, or adding to your favorite dishes. Our almonds are carefully selected and packed to ensure maximum freshness.',
    price: 24.99,
    image: '/images/products/almonds.jpg',
    category: 'nuts',
    stock: 500,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Rich in Vitamin E and antioxidants',
      'High in healthy fats and protein',
      'Supports heart health',
      'Great for brain function'
    ],
    nutritionalInfo: {
      calories: 579,
      protein: 21.2,
      fat: 49.9,
      carbs: 21.6,
      fiber: 12.5
    }
  },
  {
    id: '2',
    name: 'Premium Cashews',
    description: 'Creamy, buttery cashews carefully sourced from India. These premium nuts offer a delightful taste and texture, perfect for snacking or culinary creations.',
    price: 29.99,
    image: '/images/products/cashews.jpg',
    category: 'nuts',
    stock: 400,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Excellent source of healthy fats',
      'Rich in magnesium and copper',
      'Supports bone health',
      'Boosts immune system'
    ],
    nutritionalInfo: {
      calories: 553,
      protein: 18.2,
      fat: 43.9,
      carbs: 30.2,
      fiber: 3.3
    }
  },
  {
    id: '3',
    name: 'Premium Pistachios',
    description: 'Delicious, crunchy pistachios with their signature green color. Sourced from the finest orchards, these nuts are roasted to perfection.',
    price: 34.99,
    image: '/images/products/pistachios.jpg',
    category: 'nuts',
    stock: 350,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'High in protein and fiber',
      'Rich in antioxidants',
      'Supports eye health',
      'Promotes healthy gut'
    ],
    nutritionalInfo: {
      calories: 560,
      protein: 20.2,
      fat: 45.4,
      carbs: 27.2,
      fiber: 10.6
    }
  },
  {
    id: '4',
    name: 'Medjool Dates',
    description: 'Nature\'s candy - premium Medjool dates known for their large size, sweet taste, and soft texture. Perfect for snacking or natural sweetening.',
    price: 19.99,
    image: '/images/products/dates.jpg',
    category: 'dates',
    stock: 600,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Natural energy booster',
      'High in fiber',
      'Rich in potassium',
      'Supports digestive health'
    ],
    nutritionalInfo: {
      calories: 282,
      protein: 2.5,
      fat: 0.4,
      carbs: 75,
      fiber: 8
    }
  },
  {
    id: '5',
    name: 'Mixed Raisins',
    description: 'A delightful mix of golden and black raisins, carefully dried to preserve their natural sweetness. Perfect for baking, cereals, or snacking.',
    price: 14.99,
    image: '/images/products/raisins.jpg',
    category: 'dried-fruits',
    stock: 700,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Rich in iron',
      'Natural source of energy',
      'Supports bone health',
      'Contains antioxidants'
    ],
    nutritionalInfo: {
      calories: 299,
      protein: 3.1,
      fat: 0.5,
      carbs: 79.2,
      fiber: 3.7
    }
  },
  {
    id: '6',
    name: 'Premium Walnuts',
    description: 'Brain-boosting walnuts with their distinctive shape and rich flavor. These premium nuts are packed with omega-3 fatty acids.',
    price: 27.99,
    image: '/images/products/walnuts.jpg',
    category: 'nuts',
    stock: 450,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Excellent source of Omega-3',
      'Supports brain health',
      'Anti-inflammatory properties',
      'Rich in antioxidants'
    ],
    nutritionalInfo: {
      calories: 654,
      protein: 15.2,
      fat: 65.2,
      carbs: 13.7,
      fiber: 6.7
    }
  },
  {
    id: '7',
    name: 'Mixed Dried Fruits',
    description: 'A premium assortment of the finest dried fruits including apricots, figs, mango, and berries. The perfect healthy snack mix.',
    price: 32.99,
    image: '/images/products/mixed-fruits.jpg',
    category: 'mixed',
    stock: 300,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'Variety of nutrients',
      'Natural energy source',
      'Rich in vitamins',
      'Perfect for gifting'
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 3.5,
      fat: 1.2,
      carbs: 78,
      fiber: 7.5
    }
  },
  {
    id: '8',
    name: 'Dried Apricots',
    description: 'Sweet and tangy dried apricots with their beautiful orange color. These fiber-rich fruits are perfect for snacking or baking.',
    price: 18.99,
    image: '/images/products/apricots.jpg',
    category: 'dried-fruits',
    stock: 550,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'High in Vitamin A',
      'Rich in fiber',
      'Supports eye health',
      'Good for skin'
    ],
    nutritionalInfo: {
      calories: 241,
      protein: 3.4,
      fat: 0.5,
      carbs: 62.6,
      fiber: 7.3
    }
  },
  {
    id: '9',
    name: 'Dried Figs',
    description: 'Premium dried figs with their unique texture and natural sweetness. A Mediterranean delicacy packed with nutrients.',
    price: 22.99,
    image: '/images/products/figs.jpg',
    category: 'dried-fruits',
    stock: 400,
    weights: ['250g', '500g', '1kg'],
    benefits: [
      'High in calcium',
      'Rich in fiber',
      'Supports bone health',
      'Natural laxative'
    ],
    nutritionalInfo: {
      calories: 249,
      protein: 3.3,
      fat: 0.9,
      carbs: 63.9,
      fiber: 9.8
    }
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Premium Dates',
    description: 'Fresh, delicious dates from our finest suppliers.',
    image: '/images/products/dates.jpg'
  },
  {
    id: '2',
    name: 'Healthy Nuts',
    description: 'Enjoy the best, freshest nuts in every pack.',
    image: '/images/products/almonds.jpg'
  },
  {
    id: '3',
    name: 'Dried Fruits',
    description: 'Tasty, nutritious dried fruits for every snack.',
    image: '/images/products/apricots.jpg'
  },
  {
    id: '4',
    name: 'Mixed Selections',
    description: 'Wholesome mixed selections for a healthy lifestyle.',
    image: '/images/products/mixed-fruits.jpg'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'The quality of Accio\'s dried fruits is exceptional! Their organic dates and almonds are my favorites. Each order guarantees freshness and deliciousness. They are the best choice for anyone seeking quality snacks!'
  },
  {
    id: '2',
    name: 'Mohammed Ali',
    location: 'Dubai, UAE',
    rating: 5,
    comment: 'Accio consistently delivers the freshest dates and nuts. Their variety is outstanding, and the quality always exceeds my expectations. Highly recommended for anyone looking for premium dried fruits!'
  },
  {
    id: '3',
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 5,
    comment: 'I\'ve been ordering from Accio for over a year now. Their mixed dried fruit selection is perfect for my family. Fast delivery and excellent customer service every time!'
  },
  {
    id: '4',
    name: 'Raj Patel',
    location: 'Mumbai, India',
    rating: 5,
    comment: 'The pistachios and cashews from Accio are simply the best I\'ve ever tasted. The packaging is beautiful, making them perfect for gifting. Will definitely order again!'
  }
];

export const initialUsers: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    country: 'USA',
    address: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+44 789 012 345',
    country: 'UK',
    address: '45 High Street, London, UK',
    createdAt: '2024-02-20'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        productId: '1',
        productName: 'Premium Almonds',
        quantity: 2,
        weight: '500g',
        price: 24.99
      },
      {
        productId: '4',
        productName: 'Medjool Dates',
        quantity: 1,
        weight: '1kg',
        price: 19.99
      }
    ],
    totalAmount: 69.97,
    status: 'delivered',
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05'
  },
  {
    id: 'ORD-002',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      {
        productId: '7',
        productName: 'Mixed Dried Fruits',
        quantity: 1,
        weight: '500g',
        price: 32.99
      }
    ],
    totalAmount: 32.99,
    status: 'processing',
    shippingAddress: '45 High Street, London, UK',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10'
  }
];

export const initialMessages: Message[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice@example.com',
    message: 'Hi, I would like to know if you offer bulk discounts for corporate orders?',
    createdAt: '2024-03-08',
    isRead: true,
    reply: 'Yes, we do offer bulk discounts! Please contact us at wholesale@accio.com for more details.'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    message: 'Do you ship to Australia? I\'m interested in your mixed dried fruits.',
    createdAt: '2024-03-12',
    isRead: false
  }
];
