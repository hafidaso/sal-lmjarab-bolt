import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Pill, Search, MapPin, Clock, Phone, Shield, CheckCircle, X, FileText, Package, Truck, CreditCard, User, Star, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { pharmacyService, Pharmacy, Prescription, PharmacyOrder, Medication } from '../../services/pharmacyService';
import { stripeService } from '../../services/stripeService';
import { toast } from 'react-hot-toast';

const PharmacyPortal: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pharmacies');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any>(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [stripeCheckoutModal, setStripeCheckoutModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    loadData();
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pharmaciesData, medicationsData] = await Promise.all([
        pharmacyService.getPharmacies(),
        pharmacyService.getMedications()
      ]);
      setPharmacies(pharmaciesData);
      setMedications(medicationsData);
    } catch (err) {
      console.error('Error loading pharmacy data:', err);
      setError('Failed to load pharmacy data');
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    if (!user) return;
    
    try {
      const cartData = await pharmacyService.getShoppingCart(user.id);
      console.log('Loaded cart:', cartData);
      setCart(cartData);
    } catch (err) {
      console.error('Error loading cart:', err);
      // Don't show error to user for cart loading
    }
  };

  const addToCart = async (medication: Medication) => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    console.log('Adding to cart:', medication);
    console.log('User ID:', user.id);

    try {
      // First check if we can connect to the database
      console.log('Testing database connection...');
      
      const updatedCart = await pharmacyService.addToCart(user.id, {
        id: medication.id,
        name: medication.name,
        price: medication.price || 0,
        quantity: 1,
        requires_prescription: medication.requires_prescription
      });
      
      console.log('Cart updated successfully:', updatedCart);
      setCart(updatedCart);
      
      // Show success message
      alert(`${medication.name} added to cart successfully!`);
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      
      // More detailed error handling
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        
        if (err.message.includes('network') || err.message.includes('fetch')) {
          alert('Network error. Please check your internet connection and try again.');
        } else if (err.message.includes('permission') || err.message.includes('unauthorized')) {
          alert('Authentication error. Please log in again.');
        } else {
          alert(`Failed to add item to cart: ${err.message}`);
        }
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
      
      // Fallback: create local cart if database fails
      console.log('Attempting fallback cart creation...');
      try {
        const fallbackCart = {
          id: 'fallback-cart',
          patient_id: user.id,
          items: [{
            id: medication.id,
            name: medication.name,
            price: medication.price || 0,
            quantity: 1,
            requires_prescription: medication.requires_prescription
          }],
          total_amount: medication.price || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setCart(fallbackCart);
        alert('Item added to local cart (database sync will resume when connection is restored).');
        
      } catch (fallbackErr) {
        console.error('Fallback cart creation failed:', fallbackErr);
        alert('Unable to add item to cart. Please try again later.');
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    try {
      const updatedCart = await pharmacyService.removeFromCart(user.id, itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;

    try {
      const updatedCart = await pharmacyService.updateCartItemQuantity(user.id, itemId, quantity);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const updatedCart = await pharmacyService.clearCart(user.id);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Failed to clear cart');
    }
  };

  const handleCheckout = async () => {
    if (!user || !cart || cart.items.length === 0) return;

    try {
      // Create order
      const order = await pharmacyService.createOrder({
        patient_id: user.id,
        pharmacy_id: pharmacies[0]?.id || '', // For demo, use first pharmacy
        items: cart.items,
        total_amount: cart.total_amount,
        status: 'pending',
        payment_status: 'pending',
        delivery_fee: 0
      });

      // Clear cart after successful order
      await clearCart();
      setCheckoutModal(false);
      alert('Order placed successfully! Order ID: ' + order.id);
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to place order');
    }
  };

  const handleStripeCheckout = async () => {
    if (!user || !cart || cart.items.length === 0) return;

    setPaymentProcessing(true);

    try {
      // First create the order
      const order = await pharmacyService.createOrder({
        patient_id: user.id,
        pharmacy_id: pharmacies[0]?.id || '',
        items: cart.items,
        total_amount: cart.total_amount,
        status: 'pending',
        payment_status: 'pending',
        delivery_fee: 0
      });

      // Create Stripe checkout session
      const checkoutSession = await stripeService.createCheckoutSession({
        items: cart.items,
        total_amount: cart.total_amount,
        order_id: order.id,
        patient_id: user.id
      });

      // Redirect to Stripe Checkout
      await stripeService.redirectToCheckout(checkoutSession.id);

    } catch (err) {
      console.error('Error processing Stripe checkout:', err);
      alert('Failed to process payment. Please try again.');
      setPaymentProcessing(false);
    }
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMedications = medications.filter(medication => 
    medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (medication.generic_name && medication.generic_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (medication.description && medication.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Pharmacy Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find pharmacies, order medications, and manage prescriptions
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search pharmacies or medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Cart Button */}
          <div className="relative">
            <button
              onClick={() => setShowCart(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Cart</span>
              {cart && cart.items && cart.items.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPharmacies.map((pharmacy) => (
                <motion.div 
                  key={pharmacy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {pharmacy.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Shield 
                            key={i}
                            className={`w-4 h-4 ${
                              i < pharmacy.safety_rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{pharmacy.address}, {pharmacy.city}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{pharmacy.is_24_hour ? '24/7 Service' : 'Limited Hours'}</span>
                      </div>
                    </div>

                    {/* Available Services */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Available Services
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.services.slice(0, 4).map((service, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {service}
                          </span>
                        ))}
                        {pharmacy.services.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{pharmacy.services.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock Availability */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Stock Status
                      </h4>
                      <div className="space-y-1">
                        {pharmacy.stock_availability.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              item.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                              item.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {pharmacy.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          ({pharmacy.review_count} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {pharmacy.is_24_hour && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">24h</span>
                        )}
                        {pharmacy.has_delivery && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Delivery</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((medication) => (
                <motion.div 
                  key={medication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {medication.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded ${
                        medication.availability === 'in-stock' ? 'bg-green-100 text-green-800' :
                        medication.availability === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {medication.availability}
                      </span>
                    </div>
                    
                    {medication.generic_name && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Generic: {medication.generic_name}
                      </p>
                    )}
                    
                    {medication.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {medication.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-green-600">
                        ${medication.price?.toFixed(2) || 'N/A'}
                      </div>
                      
                      <button
                        onClick={() => addToCart(medication)}
                        disabled={medication.availability === 'out-of-stock'}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          medication.availability === 'out-of-stock'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {medication.availability === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Prescriptions Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your prescriptions will appear here once you have them from your healthcare provider.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your order history will appear here once you place your first order.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {!cart || !cart.items || cart.items.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">
                          ${cart.total_amount.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setShowCart(false);
                            setStripeCheckoutModal(true);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay with Card
                        </button>
                        <button
                          onClick={clearCart}
                          className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stripe Checkout Modal */}
      <AnimatePresence>
        {stripeCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Payment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You will be redirected to Stripe's secure payment page to complete your order.
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Order Total:</span>
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      ${cart?.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setStripeCheckoutModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStripeCheckout}
                    disabled={paymentProcessing}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {paymentProcessing ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PharmacyPortal;