import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
