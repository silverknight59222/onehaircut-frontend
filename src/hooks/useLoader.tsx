import React from "react";

const useLoading = () => {
  const loadingView = () => {
    return (
      <div className="fixed top-0 left-0 overflow-hidden bg-white bg-opacity-40 flex items-center justify-center w-full h-full z-50">
        <div className="loader ">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      </div>
    );
  };

  return { loadingView };
};

export default useLoading;
