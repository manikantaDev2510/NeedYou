import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import uploadImage from "../utils/UploadImage.js";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError";

import SummaryApi from "../common/SummaryApi.js";

export default function UploadSubCategoryModel({ close, fetchData }) {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  });

  const allCategory = useSelector(state => state.product.allCategory);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setSubCategoryData(prev => ({
        ...prev,
        image: response.data.data.url
      }));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Remove selected category
  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat._id !== categoryId)
    }));
  };

  // Submit form
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData?.();
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-4 rounded shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Add Sub Category</h2>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="grid gap-4" onSubmit={handleSubmitSubCategory}>

          {/* Name Input */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="w-full bg-indigo-50 p-2 border rounded outline-none border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="Enter sub-category name"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <label>Image</label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="border w-full sm:w-32 h-32 flex items-center justify-center bg-gray-50 rounded">
                {subCategoryData.image ? (
                  <img src={subCategoryData.image} alt="SubCategory" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage" className="cursor-pointer border-indigo-200 border roundedborder-indigo-200 hover:bg-indigo-100 px-4 py-2 rounded font-medium transition">
                Upload Image
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Category Selector */}
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {subCategoryData.category.map(cat => (
                <span key={cat._id} className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded shadow">
                  {cat.name}
                  <IoClose
                    size={16}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleRemoveCategorySelected(cat._id)}
                  />
                </span>
              ))}
            </div>
            <select
              className="w-full p-2 rounded outline-none bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              onChange={(e) => {
                const selectedId = e.target.value;
                const found = allCategory.find(c => c._id === selectedId);
                if (found && !subCategoryData.category.find(c => c._id === found._id)) {
                  setSubCategoryData(prev => ({
                    ...prev,
                    category: [...prev.category, found]
                  }));
                }
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white font-semibold transition ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-gray-300 cursor-not-allowed"
              }`}
            disabled={!(subCategoryData.name && subCategoryData.image && subCategoryData.category.length)}
          >
            Submit
          </button>

        </form>
      </div>
    </section>
  );
};