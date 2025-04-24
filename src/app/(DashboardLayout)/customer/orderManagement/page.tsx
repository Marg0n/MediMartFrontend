"use client"
import React from 'react';
import { format, parseISO } from 'date-fns';
import { FiArrowUp, FiArrowDown, FiEdit2, FiPrinter, FiMoreHorizontal } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  notes?: string;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

interface OrderTableProps {
  orders: Order[];
  sort: SortState;
  onSort: (field: string) => void;
  loading?: boolean;
}

const OrderManagement: React.FC<OrderTableProps> = ({ orders, sort, onSort, loading = false }) => {
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

  const renderStatus = (status: OrderStatus) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800' },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
      delivered: { bg: 'bg-green-100', text: 'text-green-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' }
    };

    const { bg, text } = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { field: 'orderNumber', label: 'Order Number' },
                { field: 'customer.name', label: 'Customer' },
                { field: 'createdAt', label: 'Date' },
                { field: 'status', label: 'Status' },
                { field: 'total', label: 'Total' }
              ].map(({ field, label }) => (
                <th
                  key={field}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort(field)}
                >
                  <div className="flex items-center">
                    {label}
                    {sort?.field === field && (
                      sort?.direction === 'asc' ? 
                        <FiArrowUp className="ml-1 h-4 w-4" /> : 
                        <FiArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {orders?.map((order) => (
                <React.Fragment key={order.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(parseISO(order.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end">
                        <button className="text-gray-400 hover:text-gray-500 mr-2">
                          <FiPrinter className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500 mr-2">
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <FiMoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>

                  <AnimatePresence>
                    {expandedOrderId === order.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="rounded-md bg-white shadow-sm p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                                <p className="text-sm text-gray-800 mb-1">{order.customer.name}</p>
                                <p className="text-sm text-gray-600 mb-1">{order.customer.email}</p>
                                <p className="text-sm text-gray-600 mb-1">{order.customer.phone}</p>
                                <p className="text-sm text-gray-600">
                                  {order.customer.address.street}, {order.customer.address.city},{' '}
                                  {order.customer.address.state} {order.customer.address.zipCode}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Order Details</h4>
                                <p className="text-sm text-gray-600 mb-1">
                                  <span className="text-gray-500">Payment Method:</span> {order.paymentMethod}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                  <span className="text-gray-500">Order Date:</span>{' '}
                                  {format(parseISO(order.createdAt), 'MMM dd, yyyy')}
                                </p>
                                {order.notes && (
                                  <p className="text-sm text-gray-600">
                                    <span className="text-gray-500">Notes:</span> {order.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Product
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Quantity
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Unit Price
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {order.items.map((item) => (
                                    <tr key={item.id}>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {item.productName}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {item.quantity}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        ${item.unitPrice.toFixed(2)}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        ${item.totalPrice.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              <div className="mt-4 flex justify-end">
                                <div className="w-full max-w-xs">
                                  <div className="flex justify-between py-1 text-sm text-gray-600">
                                    <div>Subtotal</div>
                                    <div className="font-medium">${order.subtotal.toFixed(2)}</div>
                                  </div>
                                  <div className="flex justify-between py-1 text-sm text-gray-600">
                                    <div>Tax</div>
                                    <div className="font-medium">${order.tax.toFixed(2)}</div>
                                  </div>
                                  <div className="flex justify-between py-1 text-sm text-gray-600">
                                    <div>Shipping</div>
                                    <div className="font-medium">${order.shippingCost.toFixed(2)}</div>
                                  </div>
                                  <div className="flex justify-between py-2 text-base font-medium text-gray-900 border-t border-gray-200 mt-1">
                                    <div>Total</div>
                                    <div>${order.total.toFixed(2)}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;