import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import uploadImage from "../utils/UploadImage.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";

export default function EditSubCategory({ close, data, fetchData }) {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || []
  });

  const allCategory = useSelector(state => state.product.allCategory);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const { data: imageResponse } = response;

    setSubCategoryData(prev => ({
      ...prev,
      image: imageResponse.data.url
    }));
  };

  // Remove selected category
  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat._id !== categoryId)
    }));
  };

  // Handle form submit
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData && fetchData();
        close && close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-4 rounded shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-semibold">Edit Sub Category</h1>
          <button onClick={close} className="text-gray-600 hover:text-red-500">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="grid gap-4" onSubmit={handleSubmitSubCategory}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="w-full bg-indigo-50 p-2 border rounded outline-none border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="Enter sub category name"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="border w-full sm:w-36 h-36 bg-gray-100 flex items-center justify-center">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="subCategory"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No Image</span>
                )}
              </div>
              <label htmlFor="uploadImage" className="cursor-pointer border-indigo-200 border roundedborder-indigo-200 hover:bg-indigo-100 px-4 py-2 rounded font-medium transition">
                Upload Image
                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block mb-1 text-sm font-medium">Select Category</label>
            {/* Selected categories */}
            <div className="flex flex-wrap gap-2 mb-2">
              {subCategoryData.category.map(cat => (
                <div key={cat._id} className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded shadow">
                  <span className="text-sm">{cat.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategorySelected(cat._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Category dropdown */}
            <select
              className="w-full p-2 rounded outline-none bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                const categoryDetails = allCategory.find(cat => cat._id === value);
                if (categoryDetails && !subCategoryData.category.some(c => c._id === value)) {
                  setSubCategoryData(prev => ({
                    ...prev,
                    category: [...prev.category, categoryDetails]
                  }));
                }
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0}
            className={`px-4 py-2 rounded font-semibold text-white transition ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length > 0
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
