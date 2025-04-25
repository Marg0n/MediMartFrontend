"use client";
import { useEffect, useState } from 'react';
import { useUser } from "@/contexts/UserContext";
// Define interfaces for better type safety (adjust based on your actual API response)
interface ProductOrderItem {
  _id?: string; // Optional if your backend includes it here
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  products: ProductOrderItem[];
  user: { _id: string; /* other user fields if needed */ };
  totalPrice: number;
  shippingStatus: string;
  paymentStatus: string;
  transactionId: string;
  isDeleted: boolean;
  city: string;
  shippingAddress: string;
  prescriptionUrl?: string;
  createdAt: string; // Assuming backend provides creation date
  // Add any other relevant fields from your backend order schema
}

// Assume UserContextType is defined correctly in your context file
// import { UserContextType } from '@/contexts/UserContext'; // Example import

const OrderPage = () => {
  // Use context - handle potential null value if UserContext allows it
  const userContext = useUser(); // No 'as UserContextType' needed if context provides default value or handles null
  const user = userContext?.user; // Safely access user

  // State for orders, loading status, and errors
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if the user ID is available
    if (!user?._id) {
      setIsLoading(false); // Stop loading if no user logged in
      setOrders([]); // Ensure orders are empty
      return; // Exit early
    }

    const fetchUserOrders = async () => {
      setIsLoading(true);
      setError(null); // Reset error before fetching

      try {
        // --- Option 1: Ideal - Fetch only user's orders from backend ---
        // const response = await fetch(`https://medi-mart-backend-eight.vercel.app/api/orders/user/${user._id}`);
        // Replace with your actual endpoint if it exists

        // --- Option 2: Fallback - Fetch all and filter (as in original code) ---
        const response = await fetch('https://medi-mart-backend-eight.vercel.app/api/orders');

        if (!response.ok) {
          // Throw an error if response status is not 2xx
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        // Basic validation of the expected response structure
        if (!result?.data?.data || !Array.isArray(result.data.data)) {
            console.error("Unexpected API response structure:", result);
            throw new Error("Received invalid data format for orders.");
        }

        // Filter orders for the current user (if using Option 2)
        const userOrders = result.data.data.filter(
          (order: Order) => order.user?._id === user._id
        );

        // If using Option 1, you might just use:
        // const userOrders = result.data.data;

        setOrders(userOrders);

      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || "An unknown error occurred while fetching orders.");
        setOrders([]); // Clear orders on error
      } finally {
        setIsLoading(false); // Ensure loading is set to false in all cases
      }
    };

    fetchUserOrders();

    // Dependency array: Run effect when user._id changes
  }, [user?._id]);


  // --- Removed handleOrder ---
  // Order creation should happen elsewhere (e.g., Checkout Page)
  // based on user actions, not automatically on viewing the order list.


  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Orders
      </h2>

      {/* Loading State */}
      {isLoading && (
        <p className="text-center text-gray-600 text-lg">Loading your orders...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-600 bg-red-100 p-4 rounded-md">
          Error: {error}
        </p>
      )}

      {/* No Orders State */}
      {!isLoading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          You haven't placed any orders yet.
        </p>
      )}

      {/* Orders Table - Display when loaded, no error, and orders exist */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-lg mt-4">
          {/* Table Updated to show Order Summary */}
          <table className="w-full text-left text-white bg-gradient-to-r from-teal-600 to-emerald-500 rounded-xl">
            <thead className="text-sm uppercase tracking-wider bg-black/10">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date Placed</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Shipping Status</th>
                <th className="px-6 py-4">Payment Status</th>
                {/* Add Action column if needed, e.g., View Details */}
                 <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-white/30 hover:bg-black/10 transition">
                  <td className="px-6 py-4 font-medium">{order.transactionId || order._id.slice(-8)}</td> {/* Show Transaction ID or part of DB ID */}
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td> {/* Format date */}
                  <td className="px-6 py-4 font-semibold text-lime-200">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">{order.products.length}</td> {/* Show number of unique products */}
                  <td className="px-6 py-4">{order.shippingStatus}</td>
                  <td className="px-6 py-4">{order.paymentStatus}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert(`Viewing details for order: ${order.transactionId || order._id}`)} // Replace with actual modal/navigation logic
                      className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Removed the confusing "Place Order" button from the bottom */}
    </div>
  );
};

export default OrderPage;