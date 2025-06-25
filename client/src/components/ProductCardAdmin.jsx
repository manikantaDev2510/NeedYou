import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

import EditProductAdmin from './EditProductAdmin';

import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';

import SummaryApi from '../common/SummaryApi.js';

export default function ProductCardAdmin({ data, fetchProductData }) {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchProductData && fetchProductData();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-40 sm:w-44 p-3 bg-white rounded shadow hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-full h-24 flex items-center justify-center overflow-hidden">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Name */}
      <p className="mt-2 text-sm font-medium line-clamp-2 text-center">{data?.name}</p>

      {/* Product Unit */}
      <p className="text-xs text-slate-400 text-center">{data?.unit}</p>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={() => setEditOpen(true)}
          className="border border-green-600 bg-green-100 text-green-700 text-xs px-2 py-1 rounded hover:bg-green-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="border border-red-600 bg-red-100 text-red-600 text-xs px-2 py-1 rounded hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <EditProductAdmin
          data={data}
          close={() => setEditOpen(false)}
          fetchProductData={fetchProductData}
        />
      )}

      {/* Delete Confirmation Modal */}
      {openDelete && (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md p-4 w-full max-w-sm shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">Confirm Deletion</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to permanently delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="border border-red-500 bg-red-100 text-red-500 px-3 py-1 rounded hover:bg-red-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="border border-green-500 bg-green-100 text-green-500 px-3 py-1 rounded hover:bg-green-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};