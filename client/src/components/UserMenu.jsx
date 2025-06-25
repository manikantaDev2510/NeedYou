import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineExternalLink } from 'react-icons/hi';

import Divider from './Divider.jsx';

import SummaryApi from '../common/SummaryApi.js';

import { logout } from '../store/userSlice.js';

import AxiosToastError from '../utils/AxiosToastError.js';
import isAdmin from '../utils/isAdmin.js';
import Axios from '../utils/Axios.js';

export default function UserMenu({ close }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout Logic
  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });

      if (response.data.success) {
        close && close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Helper to close menu
  const handleClose = () => {
    close && close();
  };

  return (
    <div className='w-full max-w-xs bg-white rounded shadow p-3'>
      {/* User Info */}
      <div className='font-semibold text-gray-700 mb-1'>My Account</div>
      <div className='text-sm flex items-center gap-2 mb-2'>
        <span className='max-w-[12rem] truncate'>
          {user.name || user.mobile}
          {user.role === 'ADMIN' && (
            <span className='ml-1 text-red-500'>(Admin)</span>
          )}
        </span>
        <Link
          to='/dashboard/profile'
          onClick={handleClose}
          className='text-gray-500 hover:text-blue-500 transition'
        >
          <HiOutlineExternalLink size={16} />
        </Link>
      </div>

      <Divider />

      {/* Menu Links */}
      <div className='grid text-sm gap-1 mt-2'>
        {isAdmin(user.role) && (
          <>
            <Link
              to='/dashboard/category'
              onClick={handleClose}
              className='block px-2 py-1 rounded hover:bg-orange-100 transition'
            >
              Category
            </Link>
            <Link
              to='/dashboard/subcategory'
              onClick={handleClose}
              className='block px-2 py-1 rounded hover:bg-orange-100 transition'
            >
              Sub Category
            </Link>
            <Link
              to='/dashboard/upload-product'
              onClick={handleClose}
              className='block px-2 py-1 rounded hover:bg-orange-100 transition'
            >
              Upload Product
            </Link>
            <Link
              to='/dashboard/product'
              onClick={handleClose}
              className='block px-2 py-1 rounded hover:bg-orange-100 transition'
            >
              Product
            </Link>
          </>
        )}

        <Link
          to='/dashboard/myorders'
          onClick={handleClose}
          className='block px-2 py-1 rounded hover:bg-orange-100 transition'
        >
          My Orders
        </Link>
        <Link
          to='/dashboard/address'
          onClick={handleClose}
          className='block px-2 py-1 rounded hover:bg-orange-100 transition'
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className='text-left block w-full px-2 py-1 rounded hover:bg-orange-100 transition'
        >
          Log Out
        </button>
      </div>
    </div>
  );
};