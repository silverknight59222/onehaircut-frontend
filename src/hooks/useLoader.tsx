import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const useLoading = () => {
  const loadingView = () => {
    return (
      <div className="fixed top-0 left-0 overflow-hidden bg-white bg-opacity-40 flex items-center justify-center w-full h-full z-50">
        <Player
          autoplay
          loop
          src="https://lottie.host/ec18f429-5702-4229-830d-80a35a8c4bb0/Hl7EEO5ejf.json"
          style={{ height: "80px", width: "80px" }}
        />
      </div>
    );
  };

  return { loadingView };
};

export default useLoading;
