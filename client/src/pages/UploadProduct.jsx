// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { IoClose } from "react-icons/io5";

// import uploadImage from "../utils/UploadImage";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";
// import successAlert from "../utils/SuccessAlert";

// import Loading from "../components/Loading";
// import ViewImage from "../components/ViewImage";
// import AddFieldComponent from "../components/AddFieldComponent";

// export default function UploadProduct() {
//   const [formData, setFormData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     stock: "",
//     price: "",
//     discount: "",
//     description: "",
//     more_details: {},
//   });

//   const [imageLoading, setImageLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [openAddField, setOpenAddField] = useState(false);
//   const [newField, setNewField] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const allCategory = useSelector(state => state.product.allCategory);
//   const allSubCategory = useSelector(state => state.product.allSubCategory);

//   const isFormValid = Object.values(formData).every(val => val);

//   // 🔄 Form field change
//   const handleChange = ({ target: { name, value } }) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // 📤 Upload image
//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageLoading(true);
//     try {
//       const { data: imageRes } = await uploadImage(file);
//       setFormData(prev => ({
//         ...prev,
//         image: [...prev.image, imageRes.data.url],
//       }));
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setImageLoading(false);
//     }
//   };

//   // ❌ Delete image
//   const handleDeleteImage = (index) => {
//     const updatedImages = [...formData.image];
//     updatedImages.splice(index, 1);
//     setFormData(prev => ({ ...prev, image: updatedImages }));
//   };

//   // ➕ Add category
//   const handleAddCategory = (id) => {
//     const cat = allCategory.find(c => c._id === id);
//     if (cat) {
//       setFormData(prev => ({ ...prev, category: [...prev.category, cat] }));
//       setSelectedCategory("");
//     }
//   };

//   // ❌ Remove category
//   const handleRemoveCategory = (index) => {
//     const updated = [...formData.category];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, category: updated }));
//   };

//   // ➕ Add subcategory
//   const handleAddSubCategory = (id) => {
//     const sub = allSubCategory.find(s => s._id === id);
//     if (sub) {
//       setFormData(prev => ({ ...prev, subCategory: [...prev.subCategory, sub] }));
//       setSelectedSubCategory("");
//     }
//   };

//   // ❌ Remove subcategory
//   const handleRemoveSubCategory = (index) => {
//     const updated = [...formData.subCategory];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, subCategory: updated }));
//   };

//   // ➕ Add dynamic field
//   const handleAddField = () => {
//     if (newField.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         more_details: { ...prev.more_details, [newField]: "" },
//       }));
//     }
//     setNewField("");
//     setOpenAddField(false);
//   };

//   // ✅ Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: formData,
//       });

//       if (response.data.success) {
//         successAlert(response.data.message);
//         setFormData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//         });
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className="p-4">
//       {/* Header */}
//       <div className="mb-4 p-4 bg-white shadow-md rounded flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-gray-800">Upload Product</h2>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="grid gap-6">

//         {/* Basic Inputs */}
//         {["name", "unit", "stock", "price", "discount",].map((field) => (
//           <div key={field} className="grid gap-1">
//             <label htmlFor={field} className="font-medium capitalize text-gray-700">{field}</label>
//             <input
//               id={field}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               type={["stock", "price", "discount"].includes(field) ? "number" : "text"}
//               className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//               placeholder={`Enter product ${field}`}
//               required
//             />
//           </div>
//         ))}

//         {/* Description */}
//         <div className="grid gap-1">
//           <label htmlFor="description" className="font-medium text-gray-700">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows="3"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter product description"
//             className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//             required
//           />
//         </div>

//         {/* Upload Image */}
//         <div className="grid gap-1">
//           <label className="font-medium text-gray-700">Images</label>
//           <label
//             htmlFor="productImage"
//             className="h-24 border bg-indigo-50 rounded flex flex-col justify-center items-center cursor-pointer"
//           >
//             {imageLoading ? (
//               <Loading />
//             ) : (
//               <>
//                 <FaCloudUploadAlt size={28} className="text-primary-200" />
//                 <span className="text-sm text-gray-500">Upload Image</span>
//               </>
//             )}
//             <input
//               id="productImage"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleUploadImage}
//             />
//           </label>

//           {/* Image Preview */}
//           <div className="flex flex-wrap gap-3 mt-2 max-h-40 overflow-y-auto">
//             {formData.image.map((img, i) => (
//               <div key={img + i} className="relative w-20 h-20 border bg-white rounded overflow-hidden group">
//                 <img
//                   src={img}
//                   alt="preview"
//                   onClick={() => setPreviewImage(img)}
//                   className="w-full h-full object-contain cursor-pointer"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteImage(i)}
//                   className="absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded hidden group-hover:block"
//                 >
//                   <MdDelete size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Category Selection */}
//         <div className="grid gap-1">
//           <label className="font-medium text-gray-700">Category</label>
//           <select
//             value={selectedCategory}
//             onChange={(e) => handleAddCategory(e.target.value)}
//             className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//           >
//             <option value="">Select Category</option>
//             {allCategory.map(cat => (
//               <option key={cat._id} value={cat._id}>{cat.name}</option>
//             ))}
//           </select>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {formData.category.map((cat, idx) => (
//               <span key={cat._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
//                 {cat.name}
//                 <IoClose
//                   onClick={() => handleRemoveCategory(idx)}
//                   className="cursor-pointer hover:text-red-600"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* SubCategory Selection */}
//         <div className="grid gap-1">
//           <label className="font-medium text-gray-700">Sub Category</label>
//           <select
//             value={selectedSubCategory}
//             onChange={(e) => handleAddSubCategory(e.target.value)}
//             className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//           >
//             <option value="">Select Sub Category</option>
//             {allSubCategory.map(sub => (
//               <option key={sub._id} value={sub._id}>{sub.name}</option>
//             ))}
//           </select>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {formData.subCategory.map((sub, idx) => (
//               <span key={sub._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
//                 {sub.name}
//                 <IoClose
//                   onClick={() => handleRemoveSubCategory(idx)}
//                   className="cursor-pointer hover:text-red-600"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>


//         {/* Dynamic Fields */}
//         {Object.entries(formData.more_details).map(([key, value]) => (
//           <div key={key} className="grid gap-1">
//             <label htmlFor={key} className="font-medium text-gray-700 capitalize">{key}</label>
//             <input
//               id={key}
//               type="text"
//               value={value}
//               onChange={(e) =>
//                 setFormData(prev => ({
//                   ...prev,
//                   more_details: { ...prev.more_details, [key]: e.target.value },
//                 }))
//               }
//               className="p-2 border rounded bg-blue-50 outline-none focus:border-primary-200"
//               required
//             />
//           </div>
//         ))}

//         {/* Add Field Button */}
//         <div
//           onClick={() => setOpenAddField(true)}
//           className="w-fit px-3 py-1 border border-primary-200 rounded cursor-pointer hover:bg-primary-100 hover:text-black font-medium"
//         >
//           + Add Field
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!isFormValid}
//           className={`py-2 rounded text-white font-semibold transition ${isFormValid
//             ? "bg-green-700 hover:bg-green-600"
//             : "bg-gray-400 cursor-not-allowed"
//             }`}
//         >
//           Submit
//         </button>
//       </form>

//       {/* Image View Modal */}
//       {previewImage && <ViewImage url={previewImage} close={() => setPreviewImage("")} />}

//       {/* Add Field Modal */}
//       {openAddField && (
//         <AddFieldComponent
//           value={newField}
//           onChange={(e) => setNewField(e.target.value)}
//           submit={handleAddField}
//           close={() => setOpenAddField(false)}
//         />
//       )}
//     </section>
//   );
// }


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";

export default function UploadProduct() {
  const [formData, setFormData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    // ✅ New fields:
    type: "",
    shelfLife: "",
    countryOfOrigin: "",
    fssaiLicense: "",
    customerCareDetails: "",
    returnPolicy: "",
    expiryDate: "",
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [newField, setNewField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const isFormValid = Object.values(formData).every((val) => val !== "" && val !== null && val !== undefined) && formData.image.length > 0;

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const { data: imageRes } = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: [...prev.image, imageRes.data.url] }));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...formData.image];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, image: updatedImages }));
  };
  const handleAddCategory = (id) => {
    const cat = allCategory.find((c) => c._id === id);
    if (cat) {
      setFormData((prev) => ({ ...prev, category: [...prev.category, cat] }));
      setSelectedCategory("");
    }
  };
  const handleRemoveCategory = (index) => {
    const updated = [...formData.category];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, category: updated }));
  };
  const handleAddSubCategory = (id) => {
    const sub = allSubCategory.find((s) => s._id === id);
    if (sub) {
      setFormData((prev) => ({ ...prev, subCategory: [...prev.subCategory, sub] }));
      setSelectedSubCategory("");
    }
  };
  const handleRemoveSubCategory = (index) => {
    const updated = [...formData.subCategory];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, subCategory: updated }));
  };
  const handleAddField = () => {
    if (newField.trim()) {
      setFormData((prev) => ({ ...prev, more_details: { ...prev.more_details, [newField]: "" } }));
    }
    setNewField("");
    setOpenAddField(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data: formData });
      if (response.data.success) {
        successAlert(response.data.message);
        setFormData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
          type: "",
          shelfLife: "",
          countryOfOrigin: "",
          fssaiLicense: "",
          customerCareDetails: "",
          returnPolicy: "",
          expiryDate: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="p-4">
      <div className="mb-4 p-4 bg-white shadow-md rounded flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Upload Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {[
          "name",
          "unit",
          "stock",
          "price",
          "discount",
          "type",
          "shelfLife",
          "countryOfOrigin",
          "fssaiLicense",
          "customerCareDetails",
          "returnPolicy", "expiryDate"
        ].map((field) => (
          <div key={field} className="grid gap-1">
            <label htmlFor={field} className="font-medium capitalize text-gray-700">{field}</label>
            <input
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              type={["stock", "price", "discount"].includes(field) ? "number" : "text"}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}

        <div className="grid gap-1">
          <label htmlFor="description" className="font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            required
          />
        </div>

        <div className="grid gap-1">
          <label className="font-medium text-gray-700">Images</label>
          <label
            htmlFor="productImage"
            className="h-24 border bg-indigo-50 rounded flex flex-col justify-center items-center cursor-pointer"
          >
            {imageLoading ? (
              <Loading />
            ) : (
              <>
                <FaCloudUploadAlt size={28} className="text-primary-200" />
                <span className="text-sm text-gray-500">Upload Image</span>
              </>
            )}
            <input
              id="productImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
          <div className="flex flex-wrap gap-3 mt-2 max-h-40 overflow-y-auto">
            {formData.image.map((img, i) => (
              <div key={img + i} className="relative w-20 h-20 border bg-white rounded overflow-hidden group">
                <img
                  src={img}
                  alt="preview"
                  onClick={() => setPreviewImage(img)}
                  className="w-full h-full object-contain cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(i)}
                  className="absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded hidden group-hover:block"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-1">
          <label className="font-medium text-gray-700">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleAddCategory(e.target.value)}
            className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            <option value="">Select Category</option>
            {allCategory.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.category.map((cat, idx) => (
              <span key={cat._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
                {cat.name}
                <IoClose onClick={() => handleRemoveCategory(idx)} className="cursor-pointer hover:text-red-600" />
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-1">
          <label className="font-medium text-gray-700">Sub Category</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => handleAddSubCategory(e.target.value)}
            className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            <option value="">Select Sub Category</option>
            {allSubCategory.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.subCategory.map((sub, idx) => (
              <span key={sub._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
                {sub.name}
                <IoClose onClick={() => handleRemoveSubCategory(idx)} className="cursor-pointer hover:text-red-600" />
              </span>
            ))}
          </div>
        </div>

        {Object.entries(formData.more_details).map(([key, value]) => (
          <div key={key} className="grid gap-1">
            <label htmlFor={key} className="font-medium text-gray-700 capitalize">{key}</label>
            <input
              id={key}
              type="text"
              value={value}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, more_details: { ...prev.more_details, [key]: e.target.value } }))
              }
              className="p-2 border rounded bg-blue-50 outline-none focus:border-primary-200"
              required
            />
          </div>
        ))}

        <div
          onClick={() => setOpenAddField(true)}
          className="w-fit px-3 py-1 border border-primary-200 rounded cursor-pointer hover:bg-primary-100 hover:text-black font-medium"
        >
          + Add Field
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`py-2 rounded text-white font-semibold transition ${isFormValid
            ? "bg-green-700 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Submit
        </button>
      </form>

      {previewImage && <ViewImage url={previewImage} close={() => setPreviewImage("")} />}
      {openAddField && (
        <AddFieldComponent
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
}
