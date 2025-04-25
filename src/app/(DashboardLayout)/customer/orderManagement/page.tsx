"use client"
import React, { useState } from "react";

// Example data (order items)
const initialData = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", price: "$20", quantity: 2 },
  { id: 2, name: "Napa Extra", category: "Fever", price: "$15", quantity: 1 },
  { id: 3, name: "Seclo 20mg", category: "Stomach", price: "$10", quantity: 3 },
  { id: 4, name: "Aspirin 300mg", category: "Pain Relief", price: "$18", quantity: 1 },
];

const OrderPage = () => {
  // State to handle dynamic data (order items)
  const [data, setData] = useState(initialData);

  // Calculate total price
  const calculateTotal = () => {
    return data.reduce((total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity, 0).toFixed(2);
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    alert("Order has been placed successfully!");
  };

  return (
    <div className="min-h-screen bg-white p-2">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Order</h2>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full text-left text-white bg-gradient-to-r from-teal-600 to-emerald-500 rounded-xl">
          <thead className="text-sm uppercase tracking-wider bg-black/10">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Medicine Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((med, index) => (
              <tr key={med.id} className="border-b border-white/30 hover:bg-black/10 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{med.name}</td>
                <td className="px-6 py-4">{med.category}</td>
                <td className="px-6 py-4">{med.price}</td>
                <td className="px-6 py-4">{med.quantity}</td>
                <td className="px-6 py-4 font-semibold text-lime-200">
                  ${parseFloat(med.price.replace("$", "")) * med.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Price Section */}
      <div className="mt-6 flex justify-end">
        <div className="text-2xl font-semibold">
          <span className="text-gray-800">Total: </span>
          <span className="text-green-600">${calculateTotal()}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
