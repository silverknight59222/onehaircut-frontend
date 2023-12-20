import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { client } from "@/api/clientSide";
import { Theme_A } from "@/components/utilis/Themes";
import { getLocalStorage } from '@/api/storage';

const PaymentForm = ({onSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const salon = getLocalStorage('selectedSalon')
  const user = getLocalStorage('user');
  const userData = user ? JSON.parse(user) : null
  const salonData = salon ? JSON.parse(salon) : null
  const amount = salonData ? salonData.final_price * 100 : 0

  const customerEmail = userData ? userData.email : ''
  const serviceDescription = salonData ? 'Payment for Services at ' + salonData.name : 'Payment for Services';  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { token, error } = await stripe.createToken(elements.getElement(CardElement),{
      email: customerEmail
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }    
    
    const response = await client.paymentIntent(
      {
        amount: amount,
        token: token.id,
        email: customerEmail,
        description: serviceDescription,
        clientId : userData.id,
        salonId : salonData.id,
      }
    );    
    const clientSecret = response.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      receipt_email: customerEmail, // Optional: Include customer email in the payment request            
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