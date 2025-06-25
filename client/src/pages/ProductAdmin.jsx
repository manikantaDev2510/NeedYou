import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';

export default function ProductAdmin() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      });

      if (response.data.success) {
        setProductData(response.data.data);
        setTotalPageCount(response.data.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProductData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <section>
      <div className="mb-4 p-4 bg-white shadow-md rounded flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => (
              <ProductCardAdmin key={p._id || index} data={p} fetchProductData={fetchProductData} />
            ))}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
          <button className="w-full bg-slate-100">{page} / {totalPageCount}</button>
          <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
        </div>
      </div>
    </section>
  );
}
