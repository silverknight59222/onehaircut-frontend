import React from 'react';
import { TailSpin } from "react-loader-spinner";

const useLoading = () => {

    const loadingView = () => {
        return (
            <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-40 flex items-center justify-center w-full h-full z-50">
                <TailSpin height="60" width="60" color="#ffffff" visible={true} radius="1" />
            </div>
        );
    };

    return { loadingView };
};

export default useLoading;
