# E-Commerce Web Application

A full-featured e-commerce web application built with Node.js, Express, React, and MongoDB. This application demonstrates a complete online store with product management, shopping cart, order tracking, and role-based access control.

## Features

### Core Features
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add items, update quantities, and manage cart
- **User Authentication**: Login, registration, and profile management
- **Order Management**: Complete checkout process and order tracking
- **Role-Based Access**: Admin dashboard for product and order management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### Technical Features
- **RESTful APIs**: Complete backend API with Express.js
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **State Management**: React Context API for auth and cart management
- **Data Fetching**: React Query for server state management
- **Form Handling**: React Hook Form for form validation
- **Styling**: Tailwind CSS with custom components
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Object Data Modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **express-rate-limit** - Rate limiting

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Lucide React** - Icon library
- **React Hot Toast** - Notification system

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=5000

   # JWT
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d

   # Environment
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Seed the Database**
   ```bash
   cd server
   node seed.js
   cd ..
   ```

   This will create sample products and an admin user:
   - Email: admin@shophub.com
   - Password: admin123

## Running the Application

### Development Mode

1. **Start both frontend and backend concurrently**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend app on http://localhost:3000

2. **Or start individually**
   ```bash
   # Start backend only
   npm run server
   
   # Start frontend only (in separate terminal)
   npm run client
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user profile (protected)

#### PUT /api/auth/me
Update user profile (protected)

### Product Endpoints

#### GET /api/products
Get all products with filtering and pagination
- Query params: `page`, `limit`, `category`, `search`, `minPrice`, `maxPrice`, `sort`

#### GET /api/products/featured
Get featured products

#### GET /api/products/:id
Get single product

#### POST /api/products
Create product (admin only)

#### PUT /api/products/:id
Update product (admin only)

#### DELETE /api/products/:id
Delete product (admin only)

### Cart Endpoints

#### GET /api/cart
Get user's cart (protected)

#### POST /api/cart/add
Add item to cart (protected)
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

#### PUT /api/cart/update
Update cart item quantity (protected)

#### DELETE /api/cart/remove/:productId
Remove item from cart (protected)

#### DELETE /api/cart/clear
Clear cart (protected)

### Order Endpoints

#### GET /api/orders
Get user's orders (protected)

#### POST /api/orders
Create new order (protected)

#### GET /api/orders/:id
Get single order (protected)

#### PUT /api/orders/:id/status
Update order status (admin only)

## Project Structure

```
ecommerce/
|-- server/
|   |-- models/          # Database models
|   |-- routes/          # API routes
|   |-- middleware/      # Custom middleware
|   |-- index.js         # Server entry point
|   |-- seed.js          # Database seeding script
|-- client/
|   |-- src/
|   |   |-- components/  # React components
|   |   |-- contexts/    # React contexts
|   |   |-- pages/       # Page components
|   |   |-- services/    # API services
|   |   |-- App.js       # Main App component
|   |   |-- index.js     # Entry point
|   |-- package.json
|-- package.json
|-- README.md
```

## User Roles

### Admin Features
- Product management (CRUD operations)
- Order management and status updates
- User management
- Dashboard with statistics
- Access to admin panel at `/admin`

### User Features
- Browse and search products
- Add items to cart
- Complete checkout
- View order history
- Profile management
- Order tracking

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Advanced search with filters
- Product recommendations
- Inventory management
- Analytics dashboard
- Multi-language support
- Social login integration

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with passion for learning and showcasing full-stack development skills**
