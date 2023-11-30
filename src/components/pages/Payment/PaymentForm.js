import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { client } from "@/api/clientSide";
import { Theme_A } from "@/components/utilis/Themes";

const PaymentForm = ({onSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }    

    const response = await client.paymentIntent({amount: 1000, token: token.id});    
    const clientSecret = response.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      //console.log(result)
      onSuccess()
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className="w-full flex items-center justify-center">
          <button type="submit" disabled={!stripe || loading}
              className={`${Theme_A.button.bigGradientButton}`}
            >
              Vers le paiement{" "}
            </button>
          </div>      
    </form>
  );
};

export default PaymentForm;