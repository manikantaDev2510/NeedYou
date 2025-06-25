import React from 'react';
import { IoClose } from 'react-icons/io5';

export default function ConfirmBox({ cancel, confirm, close }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-5 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Permanent Delete</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-700 mb-6">Are you sure you want to permanently delete this item?</p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={cancel}
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};