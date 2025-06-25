import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { useGlobalContext } from '../provider/GlobalProvider';
import EditAddressDetails from '../components/EditAddressDetails.jsx';
import AddAddress from '../components/AddAddress.jsx';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList);
  const { fetchAddress } = useGlobalContext();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Disable (Remove) Address
  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: { _id: id }
      });

      if (response.data.success) {
        toast.success("Address removed");
        if (fetchAddress) fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='px-4 py-3'>
      {/* Header */}
      <div className='bg-white shadow rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Address</h2>
        <button
          onClick={() => setOpenAddModal(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition'
        >
          + Add Address
        </button>
      </div>

      {/* Address List */}
      <div className='grid gap-4'>
        {addressList
          .filter(address => address.status) // Only show enabled addresses
          .map((address) => (
            <div
              key={address._id}
              className='bg-white border rounded shadow p-4 flex flex-col sm:flex-row justify-between gap-4'
            >
              <div className='flex-1 text-sm'>
                <p className='font-medium'>{address.address_line}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country} - {address.pincode}</p>
                <p>Mobile: {address.mobile}</p>
              </div>

              <div className='flex gap-2 sm:flex-col justify-center items-center'>
                <button
                  onClick={() => {
                    setEditData(address);
                    setOpenEditModal(true);
                  }}
                  className='p-2 bg-green-100 rounded-full hover:bg-green-600 hover:text-white transition'
                >
                  <MdEdit size={18} />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className='p-2 bg-red-100 rounded-full hover:bg-red-600 hover:text-white transition'
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}

        {/* Add address box */}
        <div
          onClick={() => setOpenAddModal(true)}
          className='h-16 border-2 border-dashed border-blue-300 rounded flex justify-center items-center cursor-pointer hover:bg-blue-50 transition'
        >
          <span className='text-sm text-blue-500'>+ Add Address</span>
        </div>
      </div>

      {/* Modals */}
      {openAddModal && (
        <AddAddress close={() => setOpenAddModal(false)} />
      )}

      {openEditModal && (
        <EditAddressDetails
          data={editData}
          close={() => setOpenEditModal(false)}
        />
      )}
    </section>
  );
};

export default Address;
