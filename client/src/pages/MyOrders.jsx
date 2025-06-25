import React from 'react';
import { useSelector } from 'react-redux';

import NoData from '../components/NoData';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);

  console.log("Order Items:", orders);

  return (
    <section className="px-4 py-3">
      {/* Header */}
      <div className="bg-white shadow rounded p-4 mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">My Orders</h1>
        <p className="text-sm text-gray-500">Total: {orders.length}</p>
      </div>

      {/* If no orders */}
      {!orders.length && (
        <NoData />
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={`${order._id}_${index}`}
            className="bg-white shadow rounded p-4 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{order.product_details.name}</p>
                <p className="text-gray-600">Order No: {order.orderId}</p>
                <p className="text-gray-600">Payment: {order.payment_status}</p>
              </div>
            </div>
            <div className="text-right sm:text-left">
              <p className="text-gray-500">Price: ₹{order.totalAmt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
