// Mock data for frontend demo/testing

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    featured: true,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag with laptop compartment',
    price: 179.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 25,
    featured: true,
    rating: 4.3
  },
  {
    id: 4,
    name: 'Running Sneakers',
    description: 'Lightweight performance running shoes with superior cushioning',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Footwear',
    stock: 100,
    featured: true,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Minimalist Backpack',
    description: 'Sleek design with water-resistant fabric and multiple compartments',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 45,
    featured: false,
    rating: 4.4
  },
  {
    id: 6,
    name: 'Wireless Keyboard',
    description: 'Mechanical keyboard with RGB backlight and ergonomic design',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    stock: 60,
    featured: true,
    rating: 4.7
  },
  {
    id: 7,
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24 hours, hot for 12 hours',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Lifestyle',
    stock: 80,
    featured: false,
    rating: 4.5
  },
  {
    id: 8,
    name: 'Sunglasses Collection',
    description: 'UV protection polarized lenses with classic aviator style',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Accessories',
    stock: 40,
    featured: true,
    rating: 4.2
  },
  {
    id: 9,
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip mat with carrying strap',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 70,
    featured: false,
    rating: 4.6
  },
  {
    id: 10,
    name: 'Portable Bluetooth Speaker',
    description: '360-degree sound with waterproof design and 20-hour battery',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 55,
    featured: true,
    rating: 4.4
  },
  {
    id: 11,
    name: 'Classic Denim Jacket',
    description: 'Timeless style with premium denim fabric and comfortable fit',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Clothing',
    stock: 35,
    featured: false,
    rating: 4.3
  },
  {
    id: 12,
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee machine with thermal carafe',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home',
    stock: 20,
    featured: true,
    rating: 4.7
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    email: 'demo@ecommerce.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'USER'
  },
  {
    id: 2,
    email: 'admin@ecommerce.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN'
  }
];

export const MOCK_CART = {
  items: [
    {
      id: 1,
      productId: 1,
      productName: 'Premium Wireless Headphones',
      price: 299.99,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
      id: 2,
      productId: 4,
      productName: 'Running Sneakers',
      price: 129.99,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    }
  ],
  total: 559.97
};

export const MOCK_ORDERS = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    date: new Date('2024-11-01'),
    status: 'DELIVERED',
    total: 429.98,
    items: [
      {
        productName: 'Smart Watch Pro',
        quantity: 1,
        price: 399.99
      },
      {
        productName: 'Yoga Mat Premium',
        quantity: 1,
        price: 49.99
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    date: new Date('2024-11-02'),
    status: 'SHIPPED',
    total: 559.97,
    items: [
      {
        productName: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99
      },
      {
        productName: 'Running Sneakers',
        quantity: 2,
        price: 129.99
      }
    ]
  }
];
