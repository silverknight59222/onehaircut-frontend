import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage } from "@/api/storage";
import { StripeCardNumberElement } from "@stripe/stripe-js";

function StripePayment() {
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const clientSecret = getLocalStorage("secret_key")?.toString();
    const cardElement = elements.getElement(CardElement);
    if (clientSecret && cardElement) {
      await stripe
        .createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: "Mohid khan",
          },
        })
        .then(function (result) {
          console.log(result)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    setIsLoading(false);
  };

  const CARD_OPTIONS = {
    // iconStyle: 'solid',
    style: {
      // base: {
      //   iconColor: '#c4f0ff',
      //   color: '#000',
      //   fontWeight: 500,
      //   fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      //   fontSize: '16px',
      //   fontSmoothing: 'antialiased',
      //   ':-webkit-autofill': {
      //     color: '#fce883',
      //   },
      //   '::placeholder': {
      //     color: '#87bbfd',
      //   },
      // },
      // invalid: {
      //   iconColor: '#ffc7ee',
      //   color: '#ffc7ee',
      // },
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    // <div>
    //   {isLoading && loadingView()}
    //   {/* <PaymentElement /> */}
    //   <div className="w-full flex items-center justify-center my-5">
    //     <button
    //       onClick={(e) => onSubmit(e)}
    //       className="w-full h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
    //     >
    //       Vers le paiement
    //     </button>
    //   </div>
    // </div>
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />
      <button className="w-full h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]" type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </form>
  );
}

export default StripePayment;
