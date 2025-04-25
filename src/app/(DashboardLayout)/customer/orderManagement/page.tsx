"use client";

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Orders
      </h2>

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
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat for each order */}
            <tr className="border-b border-white/30 hover:bg-black/10 transition">
              <td className="px-6 py-4">1.1</td>
              <td className="px-6 py-4 font-medium">Medicine Name</td>
              <td className="px-6 py-4">Category</td>
              <td className="px-6 py-4">$20.00</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4 font-semibold text-lime-200">$40.00</td>
              <td className="px-6 py-4">
                <button className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 font-semibold">
                  View Order
                </button>
              </td>
            </tr>
            {/* End of each order */}
          </tbody>
        </table>
      </div>

      {/* Place Order Button */}
      <div className="mt-6 text-center">
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-semibold">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
