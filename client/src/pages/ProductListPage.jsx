import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SummaryApi from '../common/SummaryApi.js';

import AxiosToastError from '../utils/AxiosToastError.js';
import { valideURLConvert } from '../utils/valideURLConvert.js';
import Axios from '../utils/Axios.js';

import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const params = useParams();
  const allSubCategories = useSelector(state => state.product.allSubCategory);

  // Extract category and subcategory details from URL
  const categoryId = params.category.split('-').slice(-1)[0];
  const subCategoryId = params.subCategory.split('-').slice(-1)[0];
  const subCategoryParts = params.subCategory?.split('-');
  const subCategoryName = subCategoryParts?.slice(0, -1)?.join(' ');

  // Fetch products based on category + subcategory
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8
        }
      });

      if (response.data.success) {
        if (response.data.page === 1) {
          setProducts(response.data.data);
        } else {
          setProducts(prev => [...prev, ...response.data.data]);
        }
        setTotalPage(response.data.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update products when params change
  useEffect(() => {
    setPage(1);  // reset page when params change
    fetchProducts();
  }, [params]);

  // Filter subcategories for the sidebar
  useEffect(() => {
    const filtered = allSubCategories.filter(sub =>
      sub.category.some(cat => cat._id === categoryId)
    );
    setSubCategories(filtered);
  }, [params, allSubCategories]);

  return (
    <section className='px-2 py-3'>
      <div className='grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-2'>

        {/* Sidebar: Sub Categories */}
        <aside className='bg-white shadow rounded p-2 max-h-[88vh] overflow-y-auto scrollbarCustom'>
          {subCategories.map(sub => {
            const link = `/${valideURLConvert(sub.category[0]?.name)}-${sub.category[0]?._id}/${valideURLConvert(sub.name)}-${sub._id}`;
            const isActive = subCategoryId === sub._id;
            return (
              <Link
                key={sub._id}
                to={link}
                className={`flex items-center gap-2 p-2 rounded hover:bg-green-100 transition 
                  ${isActive ? 'bg-green-100' : ''}`}
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className='w-10 h-10 object-contain rounded'
                />
                <span className='hidden lg:block text-sm'>{sub.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Main Content: Products */}
        <div className='flex flex-col gap-2'>
          <div className="mb-4 p-4 bg-white shadow-md rounded flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">{subCategoryName}</h2>
          </div>

          <div className='bg-white shadow rounded p-3 min-h-[70vh]'>
            {products.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((product, idx) => (
                  <CardProduct
                    key={product._id + "_product_" + idx}
                    data={product}
                  />
                ))}
              </div>
            ) : (
              !loading && (
                <div className='text-center text-gray-500 mt-10'>
                  No products found.
                </div>
              )
            )}

            {loading && (
              <div className='flex justify-center mt-4'>
                <Loading />
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};