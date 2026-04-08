import React from 'react';
import { useQuery } from 'react-query';
import { ordersAPI, usersAPI, productsAPI } from '../../services/api';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const { data: orderStats } = useQuery('orderStats', ordersAPI.getOrderStats);
  const { data: userStats } = useQuery('userStats', usersAPI.getUserStats);
  const { data: productsData } = useQuery('products', productsAPI.getProducts);

  const recentOrders = [];
  const topProducts = productsData?.data?.products?.slice(0, 5) || [];

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your e-commerce store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${(orderStats?.data?.totalRevenue || 0).toFixed(2)}`}
          icon={DollarSign}
          color="green"
          trend={12}
        />
        <StatCard
          title="Total Orders"
          value={orderStats?.data?.totalOrders || 0}
          icon={ShoppingCart}
          color="blue"
          trend={8}
        />
        <StatCard
          title="Total Users"
          value={userStats?.data?.totalUsers || 0}
          icon={Users}
          color="purple"
          trend={15}
        />
        <StatCard
          title="Total Products"
          value={productsData?.data?.pagination?.totalProducts || 0}
          icon={Package}
          color="orange"
          trend={5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 capitalize">{order.orderStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          {topProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product._id} className="flex items-center gap-4">
                  <img
                    src={product.thumbnail || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{product.rating?.average || 0} stars</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Status Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status Overview</h2>
        
        {orderStats?.data?.stats?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {orderStats.data.stats.map((stat) => (
              <div key={stat._id} className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-600 capitalize">{stat._id}</p>
                <p className="text-sm font-medium text-gray-900">
                  ${stat.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No order data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
