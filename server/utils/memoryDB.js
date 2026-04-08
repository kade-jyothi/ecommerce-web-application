// Simple in-memory database for demonstration purposes
// This replaces MongoDB when MongoDB is not available

let users = [];
let products = [];
let orders = [];
let carts = [];
let nextId = 1;

// Helper functions
const generateId = () => (nextId++).toString();
const findById = (collection, id) => collection.find(item => item._id.toString() === id);
const findByEmail = (collection, email) => collection.find(item => item.email === email);

// User operations
const userOperations = {
  create: async (userData) => {
    const user = {
      _id: generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      role: userData.role || 'user'
    };
    users.push(user);
    return user;
  },
  
  findByEmail: async (email) => {
    return findByEmail(users, email);
  },
  
  findById: async (id) => {
    return findById(users, id);
  },
  
  updateById: async (id, updateData) => {
    const index = users.findIndex(user => user._id.toString() === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateData, updatedAt: new Date() };
      return users[index];
    }
    return null;
  },
  
  deleteById: async (id) => {
    const index = users.findIndex(user => user._id.toString() === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  },
  
  find: async (filter = {}) => {
    let result = [...users];
    
    if (filter.search) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    
    if (filter.role) {
      result = result.filter(user => user.role === filter.role);
    }
    
    return result;
  },
  
  count: async (filter = {}) => {
    const result = await userOperations.find(filter);
    return result.length;
  }
};

// Product operations
const productOperations = {
  create: async (productData) => {
    const product = {
      _id: generateId(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: { average: 0, count: 0 },
      isActive: productData.isActive !== false,
      featured: productData.featured || false
    };
    products.push(product);
    return product;
  },
  
  findById: async (id) => {
    return findById(products, id);
  },
  
  updateById: async (id, updateData) => {
    const index = products.findIndex(product => product._id.toString() === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updateData, updatedAt: new Date() };
      return products[index];
    }
    return null;
  },
  
  deleteById: async (id) => {
    const index = products.findIndex(product => product._id.toString() === id);
    if (index !== -1) {
      products.splice(index, 1);
      return true;
    }
    return false;
  },
  
  find: async (filter = {}) => {
    let result = [...products];
    
    if (filter.category) {
      result = result.filter(product => product.category === filter.category);
    }
    
    if (filter.search) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    
    if (filter.minPrice) {
      result = result.filter(product => product.price >= parseFloat(filter.minPrice));
    }
    
    if (filter.maxPrice) {
      result = result.filter(product => product.price <= parseFloat(filter.maxPrice));
    }
    
    if (filter.featured) {
      result = result.filter(product => product.featured);
    }
    
    if (filter.isActive !== false) {
      result = result.filter(product => product.isActive);
    }
    
    // Sorting
    if (filter.sort) {
      const sortField = filter.sort.startsWith('-') ? filter.sort.substring(1) : filter.sort;
      const sortOrder = filter.sort.startsWith('-') ? -1 : 1;
      
      result.sort((a, b) => {
        if (sortField === 'price' || sortField === 'createdAt') {
          return sortOrder * (new Date(a[sortField]) - new Date(b[sortField]));
        }
        return sortOrder * a[sortField].localeCompare(b[sortField]);
      });
    }
    
    // Pagination
    const page = parseInt(filter.page) || 1;
    const limit = parseInt(filter.limit) || 10;
    const skip = (page - 1) * limit;
    
    return {
      products: result.slice(skip, skip + limit),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
        totalProducts: result.length,
        productsPerPage: limit
      }
    };
  },
  
  getFeatured: async () => {
    return products.filter(product => product.featured && product.isActive);
  },
  
  getCategories: async () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  }
};

// Order operations
const orderOperations = {
  create: async (orderData) => {
    const order = {
      _id: generateId(),
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderStatus: 'pending',
      paymentStatus: 'pending'
    };
    orders.push(order);
    return order;
  },
  
  findById: async (id) => {
    return findById(orders, id);
  },
  
  updateById: async (id, updateData) => {
    const index = orders.findIndex(order => order._id.toString() === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updateData, updatedAt: new Date() };
      return orders[index];
    }
    return null;
  },
  
  findByUser: async (userId, filter = {}) => {
    let result = orders.filter(order => order.user.toString() === userId);
    
    if (filter.status) {
      result = result.filter(order => order.orderStatus === filter.status);
    }
    
    // Sorting and pagination
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const page = parseInt(filter.page) || 1;
    const limit = parseInt(filter.limit) || 10;
    const skip = (page - 1) * limit;
    
    return {
      orders: result.slice(skip, skip + limit),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
        totalOrders: result.length,
        ordersPerPage: limit
      }
    };
  },
  
  find: async (filter = {}) => {
    let result = [...orders];
    
    if (filter.status) {
      result = result.filter(order => order.orderStatus === filter.status);
    }
    
    if (filter.startDate) {
      result = result.filter(order => new Date(order.createdAt) >= new Date(filter.startDate));
    }
    
    if (filter.endDate) {
      result = result.filter(order => new Date(order.createdAt) <= new Date(filter.endDate));
    }
    
    // Sorting and pagination
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const page = parseInt(filter.page) || 1;
    const limit = parseInt(filter.limit) || 10;
    const skip = (page - 1) * limit;
    
    return {
      orders: result.slice(skip, skip + limit),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
        totalOrders: result.length,
        ordersPerPage: limit
      }
    };
  },
  
  getStats: async () => {
    const stats = orders.reduce((acc, order) => {
      const status = order.orderStatus;
      if (!acc[status]) {
        acc[status] = { _id: status, count: 0, total: 0 };
      }
      acc[status].count++;
      acc[status].total += order.total;
      return acc;
    }, {});
    
    return Object.values(stats);
  }
};

// Cart operations
const cartOperations = {
  create: async (cartData) => {
    const cart = {
      _id: generateId(),
      ...cartData,
      items: cartData.items || [],
      subtotal: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Calculate subtotal
    cart.subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    carts.push(cart);
    return cart;
  },
  
  findByUser: async (userId) => {
    return carts.find(cart => cart.user.toString() === userId);
  },
  
  updateById: async (id, updateData) => {
    const index = carts.findIndex(cart => cart._id.toString() === id);
    if (index !== -1) {
      carts[index] = { ...carts[index], ...updateData, updatedAt: new Date() };
      
      // Recalculate subtotal
      if (updateData.items) {
        carts[index].subtotal = updateData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
      
      return carts[index];
    }
    return null;
  }
};

// Initialize sample data
const initializeSampleData = async () => {
  // Create admin user
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await userOperations.create({
    name: 'Admin User',
    email: 'admin@shophub.com',
    password: hashedPassword,
    role: 'admin'
  });
  
  // Create sample products
  const sampleProducts = [
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
      price: 199.99,
      category: 'electronics',
      brand: 'AudioTech',
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      stock: 50,
      sku: 'WH-001',
      tags: ['wireless', 'bluetooth', 'noise-cancelling'],
      featured: true
    },
    {
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 5-day battery life.',
      price: 299.99,
      category: 'electronics',
      brand: 'TechGear',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      stock: 30,
      sku: 'SW-002',
      tags: ['smartwatch', 'fitness', 'gps'],
      featured: true
    },
    {
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt, perfect for everyday wear.',
      price: 29.99,
      category: 'clothing',
      brand: 'EcoWear',
      thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      stock: 100,
      sku: 'CT-003',
      tags: ['organic', 'cotton', 'sustainable'],
      featured: false
    },
    {
      name: 'JavaScript: The Complete Guide',
      description: 'Comprehensive guide to modern JavaScript programming for beginners and advanced developers.',
      price: 49.99,
      category: 'books',
      brand: 'TechBooks',
      thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
      stock: 75,
      sku: 'JB-004',
      tags: ['programming', 'javascript', 'web development'],
      featured: true
    },
    {
      name: 'Yoga Mat Premium',
      description: 'Extra thick, non-slip yoga mat with alignment markers for perfect poses.',
      price: 39.99,
      category: 'sports',
      brand: 'FitGear',
      thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
      stock: 60,
      sku: 'YM-005',
      tags: ['yoga', 'fitness', 'exercise'],
      featured: false
    }
  ];
  
  for (const productData of sampleProducts) {
    await productOperations.create(productData);
  }
  
  console.log('Sample data initialized successfully');
};

module.exports = {
  userOperations,
  productOperations,
  orderOperations,
  cartOperations,
  initializeSampleData
};
