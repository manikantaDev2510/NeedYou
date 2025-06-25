import React, { useEffect, useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import EditSubCategory from '../components/EditSubCategory';
import DisplayTable from '../components/DisplayTable';
import ViewImage from '../components/ViewImage';
import ConfirmBox from '../components/ConfirmBox';

import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';

import { createColumnHelper } from '@tanstack/react-table';
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import toast from 'react-hot-toast';

export default function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [editData, setEditData] = useState({});
  const [deleteTarget, setDeleteTarget] = useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const columnHelper = createColumnHelper();

  // Fetch all sub-categories
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      if (response.data.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Handle Delete
  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteTarget
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategories();
        setOpenConfirmDelete(false);
        setDeleteTarget({});
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Table Columns
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-10 h-10 rounded cursor-pointer object-cover'
            onClick={() => setSelectedImageURL(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <div className='flex flex-wrap gap-1'>
          {row.original.category.map((cat) => (
            <span key={cat._id} className='bg-gray-100 px-2 py-1 rounded shadow text-sm'>
              {cat.name}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-3'>
          <button
            onClick={() => {
              setEditData(row.original);
              setOpenEditModal(true);
            }}
            className='p-2 bg-green-100 rounded-full hover:text-green-600 transition'
          >
            <HiPencil size={18} />
          </button>
          <button
            onClick={() => {
              setDeleteTarget(row.original);
              setOpenConfirmDelete(true);
            }}
            className='p-2 bg-red-100 text-red-500 rounded-full hover:text-red-600 transition'
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <section className='px-4 py-3'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 bg-white p-4 shadow rounded'>
        <h2 className='text-lg font-semibold text-gray-800'>Sub Categories</h2>
        <button
          onClick={() => setOpenAddModal(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition'
        >
          + Add Sub Category
        </button>
      </div>

      {/* Table Section */}
      <div className='overflow-auto rounded shadow'>
        <DisplayTable
          data={subCategories}
          column={columns}
          loading={loading}
        />
      </div>

      {/* Modals */}
      {openAddModal && (
        <UploadSubCategoryModel
          close={() => setOpenAddModal(false)}
          fetchData={fetchSubCategories}
        />
      )}

      {openEditModal && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEditModal(false)}
          fetchData={fetchSubCategories}
        />
      )}

      {selectedImageURL && (
        <ViewImage url={selectedImageURL} close={() => setSelectedImageURL('')} />
      )}

      {openConfirmDelete && (
        <ConfirmBox
          cancel={() => setOpenConfirmDelete(false)}
          close={() => setOpenConfirmDelete(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};