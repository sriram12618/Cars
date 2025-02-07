import React, { useState } from 'react';
import { Search, Car, Shield, DollarSign, ThumbsUp, ChevronRight, ShoppingCart, X } from 'lucide-react';
import Contact from './pages/Contact';

const carBrands = [
  "All Brands",
  "Jaguar",
  "Mercedes-Benz",
  "Audi",
  "Mahindra Thar",
  "Suzuki Jimny",
  "Hindustan Ambassador",
  "Nissan Sunny",
  "Porsche",
  "Ferrari",
  "Mahindra Bolero",
  "Mahindra Scorpio",
  "Rolls-Royce"
];

const featuredCars = [
  {
    id: 1,
    name: "2024 Tesla Model 3",
    price: 3499000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    mileage: "New",
    location: "Mumbai, India"
  },
  {
    id: 2,
    name: "2023 BMW M4 Competition",
    price: 6490000,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80",
    mileage: "1,200 km",
    location: "Delhi, India"
  },
  {
    id: 3,
    name: "2024 Mercedes-Benz EQS",
    price: 8590000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    mileage: "New",
    location: "Bangalore, India"
  }
];

const formatIndianPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  return formatter.format(price);
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<typeof featuredCars>([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (car: typeof featuredCars[0]) => {
    setCartItems([...cartItems, car]);
    setIsCartOpen(true);
  };

  const removeFromCart = (carId: number) => {
    setCartItems(cartItems.filter(item => item.id !== carId));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            {/* Hero Section with Car Brands Background */}
            <div className="relative h-[600px] overflow-hidden">
              <div className="absolute inset-0 bg-brands"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-700/95"></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl animate-fadeInUp">
                  <h1 className="text-5xl font-bold mb-6">Find Your Dream Car in India</h1>
                  <p className="text-xl mb-8">Explore a wide range of premium cars from top manufacturers at the best prices.</p>
                  
                  {/* Search Section */}
                  <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 sm:flex-row animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <div className="flex-1">
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {carBrands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Search by model or keyword"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Shield, title: "Verified Dealers", desc: "All our dealers are thoroughly vetted and certified across India." },
                  { icon: DollarSign, title: "Best Prices", desc: "Competitive prices with easy EMI options available." },
                  { icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "7-day return policy with full refund guarantee." }
                ].map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex items-start gap-4 transform hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Cars */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Featured Cars</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredCars.map((car, index) => (
                  <div 
                    key={car.id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative h-48">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-4">
                        {formatIndianPrice(car.price)}
                      </p>
                      <div className="flex justify-between text-gray-600 mb-4">
                        <span>{car.mileage}</span>
                        <span>{car.location}</span>
                      </div>
                      <button
                        onClick={() => addToCart(car)}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= checkoutStep ? 'bg-blue-600 text-white' : 'bg-gray-200'} transition-colors duration-300`}>
                  {step}
                </div>
                <span className="text-sm mt-1">
                  {step === 1 ? 'Cart' : step === 2 ? 'Details' : 'Payment'}
                </span>
              </div>
            ))}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-blue-600 font-bold">{formatIndianPrice(item.price)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-xl">{formatIndianPrice(totalPrice)}</span>
            </div>
            <button 
              onClick={() => setCheckoutStep(prev => Math.min(prev + 1, 3))}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {checkoutStep === 3 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm animate-bounce">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Car className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">CarSales India</span>
            </div>
            <div className="flex gap-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-8 h-8" />
              <span className="text-xl font-bold">CarSales India</span>
            </div>
            <div className="flex gap-8">
              <button onClick={() => setCurrentPage('home')} className="hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;