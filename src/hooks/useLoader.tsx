import React from "react";

const useLoading = () => {
  const loadingView = () => {
    return (
      <div className="absolute top-0 left-0 overflow-hidden bg-white bg-opacity-40 flex items-center justify-center w-full h-full z-50">
        <div className="sp-loader-circle"></div>
      </div>
    );
  };

  return { loadingView };
};

export default useLoading;
