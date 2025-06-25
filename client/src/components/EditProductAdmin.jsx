// import React, { useState } from 'react'
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage.js';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux'
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios.js';
// import SummaryApi from '../common/SummaryApi.js';
// import AxiosToastError from '../utils/AxiosToastError.js';
// import successAlert from '../utils/SuccessAlert.js';

// export default function EditProductAdmin({ close, data: propsData, fetchProductData }) {
//   const allCategory = useSelector(state => state.product.allCategory);
//   const allSubCategory = useSelector(state => state.product.allSubCategory);

//   const [formData, setFormData] = useState({
//     _id: propsData._id,
//     name: propsData.name,
//     image: propsData.image,
//     category: propsData.category,
//     subCategory: propsData.subCategory,
//     unit: propsData.unit,
//     stock: propsData.stock,
//     price: propsData.price,
//     discount: propsData.discount,
//     description: propsData.description,
//     more_details: propsData.more_details || {},
//   });

//   const [imageLoading, setImageLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [openAddField, setOpenAddField] = useState(false);
//   const [newField, setNewField] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageLoading(true);
//     try {
//       const { data: imageRes } = await uploadImage(file);
//       setFormData(prev => ({ ...prev, image: [...prev.image, imageRes.data.url] }));
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setImageLoading(false);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     const updatedImages = [...formData.image];
//     updatedImages.splice(index, 1);
//     setFormData(prev => ({ ...prev, image: updatedImages }));
//   };

//   const handleAddCategory = (id) => {
//     const cat = allCategory.find(c => c._id === id);
//     if (cat && !formData.category.some(c => c._id === id)) {
//       setFormData(prev => ({ ...prev, category: [...prev.category, cat] }));
//     }
//     setSelectedCategory("");
//   };

//   const handleRemoveCategory = (index) => {
//     const updated = [...formData.category];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, category: updated }));
//   };

//   const handleAddSubCategory = (id) => {
//     const sub = allSubCategory.find(s => s._id === id);
//     if (sub && !formData.subCategory.some(s => s._id === id)) {
//       setFormData(prev => ({ ...prev, subCategory: [...prev.subCategory, sub] }));
//     }
//     setSelectedSubCategory("");
//   };

//   const handleRemoveSubCategory = (index) => {
//     const updated = [...formData.subCategory];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, subCategory: updated }));
//   };

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Axios({
//         ...SummaryApi.updateProductDetails,
//         data: formData
//       });
//       if (response.data.success) {
//         successAlert(response.data.message);
//         close();
//         fetchProductData();
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
//       <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>
//         <div className='p-2 bg-white shadow-md flex items-center justify-between'>
//           <h2 className='font-semibold'>Edit Product</h2>
//           <button onClick={close}><IoClose size={20} /></button>
//         </div>

//         <form className='grid gap-4 p-4' onSubmit={handleSubmit}>
//           {['name', 'unit', 'stock', 'price', 'discount'].map((field) => (
//             <div key={field} className='grid gap-1'>
//               <label className='font-medium capitalize'>{field}</label>
//               <input
//                 type={['stock', 'price', 'discount'].includes(field) ? 'number' : 'text'}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//                 required
//               />
//             </div>
//           ))}

//           <div className='grid gap-1'>
//             <label className='font-medium'>Description</label>
//             <textarea
//               name='description'
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//               required
//             />
//           </div>

//           <div className='grid gap-1'>
//             <label className="font-medium text-gray-700">Images</label>
//             <label
//               htmlFor="productImage"
//               className="h-24 border bg-indigo-50 rounded flex flex-col justify-center items-center cursor-pointer"
//             >
//               {imageLoading ? (
//                 <Loading />
//               ) : (
//                 <>
//                   <FaCloudUploadAlt size={28} className="text-primary-200" />
//                   <span className="text-sm text-gray-500">Upload Image</span>
//                 </>
//               )}
//               <input
//                 id="productImage"
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleUploadImage}
//               />
//             </label>
//             <div className='flex flex-wrap gap-2 mt-2'>
//               {formData.image.map((img, i) => (
//                 <div key={img + i} className='relative w-20 h-20 border bg-white rounded overflow-hidden group'>
//                   <img src={img} alt='preview' onClick={() => setPreviewImage(img)} className='w-full h-full object-contain cursor-pointer' />
//                   <button type='button' onClick={() => handleDeleteImage(i)} className='absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded hidden group-hover:block'><MdDelete size={16} /></button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Category Selection */}
//           <div className="grid gap-1">
//             <label className="font-medium text-gray-700">Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => handleAddCategory(e.target.value)}
//               className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//             >
//               <option value="">Select Category</option>
//               {allCategory.map(cat => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </select>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.category.map((cat, idx) => (
//                 <span key={cat._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
//                   {cat.name}
//                   <IoClose
//                     onClick={() => handleRemoveCategory(idx)}
//                     className="cursor-pointer hover:text-red-600"
//                   />
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* SubCategory Selection */}
//           <div className="grid gap-1">
//             <label className="font-medium text-gray-700">Sub Category</label>
//             <select
//               value={selectedSubCategory}
//               onChange={(e) => handleAddSubCategory(e.target.value)}
//               className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
//             >
//               <option value="">Select Sub Category</option>
//               {allSubCategory.map(sub => (
//                 <option key={sub._id} value={sub._id}>{sub.name}</option>
//               ))}
//             </select>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.subCategory.map((sub, idx) => (
//                 <span key={sub._id} className="bg-blue-100 text-sm p-1 rounded flex items-center gap-1">
//                   {sub.name}
//                   <IoClose
//                     onClick={() => handleRemoveSubCategory(idx)}
//                     className="cursor-pointer hover:text-red-600"
//                   />
//                 </span>
//               ))}
//             </div>
//           </div>

//           {Object.entries(formData.more_details).map(([key, value]) => (
//             <div key={key} className='grid gap-1'>
//               <label htmlFor={key} className='font-medium'>{key}</label>
//               <input
//                 id={key}
//                 type='text'
//                 value={value}
//                 onChange={(e) => setFormData(prev => ({ ...prev, more_details: { ...prev.more_details, [key]: e.target.value } }))}
//                 className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
//                 required
//               />
//             </div>
//           ))}

//           <div onClick={() => setOpenAddField(true)} className='w-fit px-3 py-1 border border-primary-200 rounded cursor-pointer hover:bg-primary-100 hover:text-black font-medium'>+ Add Field</div>

//           <button type='submit' className='bg-green-700 hover:bg-green-600 py-2 rounded text-white font-semibold'>Update Product</button>

//         </form>

//         {previewImage && <ViewImage url={previewImage} close={() => setPreviewImage("")} />}

//         {openAddField && (
//           <AddFieldComponent
//             value={newField}
//             onChange={(e) => setNewField(e.target.value)}
//             submit={handleAddField}
//             close={() => setOpenAddField(false)}
//           />
//         )}
//       </div>
//     </section>
//   );
// };


import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage.js';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import successAlert from '../utils/SuccessAlert.js';

export default function EditProductAdmin({ close, data: propsData, fetchProductData }) {
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory);

  const [formData, setFormData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
    type: propsData.type || "",
    shelfLife: propsData.shelfLife || "",
    countryOfOrigin: propsData.countryOfOrigin || "",
    fssaiLicense: propsData.fssaiLicense || "",
    customerCareDetails: propsData.customerCareDetails || "",
    returnPolicy: propsData.returnPolicy || "",
    expiryDate: propsData.expiryDate || "",
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [newField, setNewField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleUploadImage = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const { data: imageRes } = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: [...prev.image, imageRes.data.url] }));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };
  const handleDeleteImage = index => {
    const updatedImages = [...formData.image];
    updatedImages.splice(index, 1);
    setFormData(prev => ({ ...prev, image: updatedImages }));
  };
  const handleAddCategory = id => {
    const cat = allCategory.find(c => c._id === id);
    if (cat && !formData.category.some(c => c._id === id)) {
      setFormData(prev => ({ ...prev, category: [...prev.category, cat] }));
    }
    setSelectedCategory("");
  };
  const handleRemoveCategory = index => {
    const updated = [...formData.category];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, category: updated }));
  };
  const handleAddSubCategory = id => {
    const sub = allSubCategory.find(s => s._id === id);
    if (sub && !formData.subCategory.some(s => s._id === id)) {
      setFormData(prev => ({ ...prev, subCategory: [...prev.subCategory, sub] }));
    }
    setSelectedSubCategory("");
  };
  const handleRemoveSubCategory = index => {
    const updated = [...formData.subCategory];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, subCategory: updated }));
  };
  const handleAddField = () => {
    if (newField.trim()) {
      setFormData(prev => ({
        ...prev,
        more_details: { ...prev.more_details, [newField]: "" },
      }));
    }
    setNewField("");
    setOpenAddField(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await Axios({ ...SummaryApi.updateProductDetails, data: formData });
      if (response.data.success) {
        successAlert(response.data.message);
        close();
        fetchProductData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
      <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>
        <div className='p-2 bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Edit Product</h2>
          <button onClick={close}>
            <IoClose size={20} />
          </button>
        </div>

        <form className='grid gap-4 p-4' onSubmit={handleSubmit}>
          {['name', 'unit', 'stock', 'price', 'discount'].map(field => (
            <div key={field} className='grid gap-1'>
              <label className='font-medium capitalize'>{field}</label>
              <input
                type={['stock', 'price', 'discount'].includes(field) ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className='p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition'
                required
              />
            </div>
          ))}

          <div className='grid gap-1'>
            <label className='font-medium'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className='p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition'
              required
            />
          </div>

          {[
            { title: "Type", name: "type" },
            { title: "Shelf Life", name: "shelfLife" },
            { title: "Country Of Origin", name: "countryOfOrigin" },
            { title: "FSSAI License", name: "fssaiLicense" },
            { title: "Customer Care Details", name: "customerCareDetails" },
            { title: "Return Policy", name: "returnPolicy" },
            { title: "Expiry Date", name: "expiryDate" },
          ].map(field => (
            <div key={field.name} className='grid gap-1'>
              <label className='font-medium'>{field.title}</label>
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className='p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition'
                required
              />
            </div>
          ))}

          <div className='grid gap-1'>
            <label className='font-medium text-gray-700'>Images</label>
            <label
              htmlFor='productImage'
              className='h-24 border bg-indigo-50 rounded flex flex-col justify-center items-center cursor-pointer'
            >
              {imageLoading ? (
                <Loading />
              ) : (
                <>
                  <FaCloudUploadAlt size={28} className='text-primary-200' />
                  <span className='text-sm text-gray-500'>Upload Image</span>
                </>
              )}
              <input
                id='productImage'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleUploadImage}
              />
            </label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formData.image.map((img, i) => (
                <div key={img + i} className='relative w-20 h-20 border bg-white rounded overflow-hidden group'>
                  <img
                    src={img}
                    alt='preview'
                    onClick={() => setPreviewImage(img)}
                    className='w-full h-full object-contain cursor-pointer'
                  />
                  <button
                    type='button'
                    onClick={() => handleDeleteImage(i)}
                    className='absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded hidden group-hover:block'
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className='grid gap-1'>
            <label className='font-medium text-gray-700'>Category</label>
            <select
              value={selectedCategory}
              onChange={e => handleAddCategory(e.target.value)}
              className='p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition'
            >
              <option value=''>Select Category</option>
              {allCategory.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formData.category.map((cat, idx) => (
                <span key={cat._id} className='bg-blue-100 text-sm p-1 rounded flex items-center gap-1'>
                  {cat.name}
                  <IoClose onClick={() => handleRemoveCategory(idx)} className='cursor-pointer hover:text-red-600' />
                </span>
              ))}
            </div>
          </div>

          {/* SubCategory Selection */}
          <div className='grid gap-1'>
            <label className='font-medium text-gray-700'>Sub Category</label>
            <select
              value={selectedSubCategory}
              onChange={e => handleAddSubCategory(e.target.value)}
              className='p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition'
            >
              <option value=''>Select Sub Category</option>
              {allSubCategory.map(sub => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formData.subCategory.map((sub, idx) => (
                <span key={sub._id} className='bg-blue-100 text-sm p-1 rounded flex items-center gap-1'>
                  {sub.name}
                  <IoClose onClick={() => handleRemoveSubCategory(idx)} className='cursor-pointer hover:text-red-600' />
                </span>
              ))}
            </div>
          </div>

          {/* More Details */}
          {Object.entries(formData.more_details).map(([key, value]) => (
            <div key={key} className='grid gap-1'>
              <label htmlFor={key} className='font-medium'>{key}</label>
              <input
                id={key}
                type='text'
                value={value}
                onChange={e => setFormData(prev => ({ ...prev, more_details: { ...prev.more_details, [key]: e.target.value } }))}
                className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                required
              />
            </div>
          ))}

          <div
            onClick={() => setOpenAddField(true)}
            className='w-fit px-3 py-1 border border-primary-200 rounded cursor-pointer hover:bg-primary-100 hover:text-black font-medium'
          >
            + Add Field
          </div>

          <button
            type='submit'
            className='bg-green-700 hover:bg-green-600 py-2 rounded text-white font-semibold'
          >
            Update Product
          </button>
        </form>

        {previewImage && <ViewImage url={previewImage} close={() => setPreviewImage('')} />}
        {openAddField && (
          <AddFieldComponent
            value={newField}
            onChange={e => setNewField(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )}
      </div>
    </section>
  );
}