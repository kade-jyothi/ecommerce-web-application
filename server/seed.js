const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

// Sample products data
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 199.99,
    category: 'electronics',
    brand: 'AudioTech',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', alt: 'Wireless Headphones' }
    ],
    stock: 50,
    sku: 'WH-001',
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    specifications: {
      weight: 250,
      color: 'Black',
      material: 'Plastic, Metal'
    },
    featured: true
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 5-day battery life.',
    price: 299.99,
    category: 'electronics',
    brand: 'TechGear',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', alt: 'Smart Watch' }
    ],
    stock: 30,
    sku: 'SW-002',
    tags: ['smartwatch', 'fitness', 'gps'],
    specifications: {
      weight: 45,
      color: 'Silver',
      material: 'Aluminum, Glass'
    },
    featured: true
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt, perfect for everyday wear.',
    price: 29.99,
    category: 'clothing',
    brand: 'EcoWear',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', alt: 'Cotton T-Shirt' }
    ],
    stock: 100,
    sku: 'CT-003',
    tags: ['organic', 'cotton', 'sustainable'],
    specifications: {
      color: 'White',
      size: 'Medium',
      material: '100% Organic Cotton'
    },
    featured: false
  },
  {
    name: 'JavaScript: The Complete Guide',
    description: 'Comprehensive guide to modern JavaScript programming for beginners and advanced developers.',
    price: 49.99,
    category: 'books',
    brand: 'TechBooks',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop', alt: 'JavaScript Book' }
    ],
    stock: 75,
    sku: 'JB-004',
    tags: ['programming', 'javascript', 'web development'],
    specifications: {
      weight: 500,
      material: 'Paper'
    },
    featured: true
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick, non-slip yoga mat with alignment markers for perfect poses.',
    price: 39.99,
    category: 'sports',
    brand: 'FitGear',
    thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', alt: 'Yoga Mat' }
    ],
    stock: 60,
    sku: 'YM-005',
    tags: ['yoga', 'fitness', 'exercise'],
    specifications: {
      weight: 1200,
      color: 'Purple',
      material: 'TPE, Rubber'
    },
    featured: false
  },
  {
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 handmade ceramic plant pots with drainage holes, perfect for indoor plants.',
    price: 34.99,
    category: 'home',
    brand: 'HomeDecor',
    thumbnail: 'https://images.unsplash.com/photo-1484154218962-a197222ede58?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1484154218962-a197222ede58?w=400&h=300&fit=crop', alt: 'Plant Pots' }
    ],
    stock: 40,
    sku: 'PP-006',
    tags: ['ceramic', 'plants', 'decor'],
    specifications: {
      weight: 2000,
      color: 'Terracotta',
      material: 'Ceramic'
    },
    featured: false
  },
  {
    name: 'Building Blocks Set',
    description: 'Educational building blocks set for creative play and cognitive development.',
    price: 24.99,
    category: 'toys',
    brand: 'EduPlay',
    thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', alt: 'Building Blocks' }
    ],
    stock: 80,
    sku: 'BB-007',
    tags: ['educational', 'creative', 'blocks'],
    specifications: {
      weight: 800,
      color: 'Multicolor',
      material: 'Plastic'
    },
    featured: true
  },
  {
    name: 'Face Serum Vitamin C',
    description: 'Brightening vitamin C serum for radiant skin and anti-aging benefits.',
    price: 44.99,
    category: 'beauty',
    brand: 'GlowSkin',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-274cbbb4063e?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1596462502278-274cbbb4063e?w=400&h=300&fit=crop', alt: 'Face Serum' }
    ],
    stock: 55,
    sku: 'FS-008',
    tags: ['skincare', 'vitamin c', 'anti-aging'],
    specifications: {
      weight: 30,
      color: 'Clear',
      material: 'Liquid'
    },
    featured: false
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with USB charging port and multiple compartments.',
    price: 59.99,
    category: 'electronics',
    brand: 'TravelPro',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', alt: 'Laptop Backpack' }
    ],
    stock: 45,
    sku: 'LB-009',
    tags: ['backpack', 'laptop', 'travel'],
    specifications: {
      weight: 600,
      color: 'Black',
      material: 'Nylon, Polyester'
    },
    featured: false
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 89.99,
    category: 'sports',
    brand: 'SpeedRun',
    thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', alt: 'Running Shoes' }
    ],
    stock: 70,
    sku: 'RS-010',
    tags: ['running', 'shoes', 'athletic'],
    specifications: {
      weight: 280,
      color: 'Blue',
      size: '10',
      material: 'Mesh, Rubber'
    },
    featured: true
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@shophub.com',
  password: 'admin123',
  role: 'admin'
};

// Seed database function
const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const user = new User(adminUser);
    await user.save();
    console.log('Admin user created');

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products created`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
