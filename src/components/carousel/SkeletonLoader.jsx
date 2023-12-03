import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col sm:me-8 me-4 border-none outline-none rounded-xl w-[125px] sm:w-[208px] animate-pulse min-h-[252px] h-[257px] sm:h-[394px]">
      <div className="h-60 bg-secondary-v50 opacity-10 rounded-xl"></div>
      <div className="flex-1 px-1 py-8 items-start space-y-4 bg-transparent bg-opacity-80">
        <div className="w-[70%] h-5 rounded bg-secondary-v50 opacity-10"></div>
        <div className="w-[50%] h-5 rounded bg-secondary-v50 opacity-10"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
