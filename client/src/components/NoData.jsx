import React from 'react';
import noDataImage from '../assets/nothing here yet.webp';

export default function NoData() {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <img
        src={noDataImage}
        alt="No data available"
        className="w-32 sm:w-40 md:w-48 max-w-full object-contain"
      />
      <p className="text-gray-500 text-sm sm:text-base text-center">
        No Data Available
      </p>
    </div>
  );
};
