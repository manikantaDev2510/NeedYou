import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';

import CardProduct from '../components/CardProduct';
import CardLoading from '../components/CardLoading';
import noDataImage from '../assets/nothing here yet.webp';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadingSkeletons = new Array(10).fill(null);
  const location = useLocation();
  const searchText = location?.search?.slice(3); // Extract search query from URL

  // Fetch products based on search text and page
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProducts(prev =>
          responseData.page === 1 ? responseData.data : [...prev, ...responseData.data]
        );
        setTotalPages(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset to first page on search change
  }, [searchText]);

  useEffect(() => {
    fetchProducts();
  }, [page, searchText]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className='bg-white min-h-screen'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold text-gray-800 text-lg'>
          Search Results: {products.length}
        </p>

        <InfiniteScroll
          dataLength={products.length}
          hasMore={page < totalPages}
          next={loadMore}
          loader={null}
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-6'>
            {products.map((product, index) => (
              <CardProduct
                data={product}
                key={`${product?._id}_search_${index}`}
              />
            ))}

            {/* Loading placeholders */}
            {loading &&
              loadingSkeletons.map((_, index) => (
                <CardLoading key={`loading_skeleton_${index}`} />
              ))}
          </div>
        </InfiniteScroll>

        {/* No data fallback */}
        {!products.length && !loading && (
          <div className='flex flex-col items-center justify-center text-center mt-10'>
            <img
              src={noDataImage}
              alt='No results'
              className='w-full max-w-xs h-auto mb-4'
            />
            <p className='text-gray-600 font-semibold'>No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};