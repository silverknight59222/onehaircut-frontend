import React, { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import userLoader from "@/hooks/useLoader";

function StripePayment() {
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async (e:any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
     await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/registration`,
      },
    }).then(res=>{
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading && loadingView()}
      <PaymentElement />
      <div className="w-full flex items-center justify-center my-5">
        <button
          onClick={(e) => onSubmit(e)}
          className="w-full h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
        >
          Vers le paiement
        </button>
      </div>
    </div>
  );
}

export default StripePayment;
