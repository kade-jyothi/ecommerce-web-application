import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { productsAPI } from '../services/api';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const { data: featuredProducts, isLoading, error } = useQuery(
    'featuredProducts',
    productsAPI.getFeaturedProducts,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7db1664?w=400&h=300&fit=crop', count: 245 },
    { name: 'Clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', count: 189 },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', count: 423 },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', count: 156 },
  ];

  const features = [
    {
      title: 'Free Shipping',
      description: 'On orders over $100',
      icon: 'truck',
    },
    {
      title: 'Secure Payment',
      description: '100% secure transactions',
      icon: 'shield',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated customer service',
      icon: 'headphones',
    },
    {
      title: 'Easy Returns',
      description: '30-day return policy',
      icon: 'refresh-cw',
    },
  ];

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.thumbnail || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'}
            alt={product.name}
            className="w-full h-48 object-cover object-center group-hover:opacity-75"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
          <Link to={`/products/${product._id}`} className="hover:text-primary-600">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating?.average || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({product.rating?.count || 0})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <button className="bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 transition-colors">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 mb-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Shop the latest trends with unbeatable prices and quality service
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm">{category.count} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load featured products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.data?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-primary-600 text-2xl">
                  {feature.icon === 'truck' && 'truck'}
                  {feature.icon === 'shield' && 'shield'}
                  {feature.icon === 'headphones' && 'headphones'}
                  {feature.icon === 'refresh-cw' && 'refresh-cw'}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for exclusive offers and new product updates</p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
