import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { client } from "@/api/clientSide";
import { Theme_A } from "@/components/utilis/Themes";
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import useSnackbar from "@/hooks/useSnackbar";
import { dashboard } from '@/api/dashboard';

const PaymentForm = ({ onSuccess, showConfirmButton = true }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const salon = getLocalStorage('selectedSalon')
  const user = getLocalStorage('user');
  const userData = user ? JSON.parse(user) : null
  const salonData = salon ? JSON.parse(salon) : null
  const amount = salonData ? salonData.final_price * 100 : 0
  const datetime = getLocalStorage('selectDate')
  const slot = getLocalStorage('slotData')
  const stripe_trace_id = getLocalStorage('client_stripe_trace_id')
  const slotData = slot ? JSON.parse(slot) : null
  const haircut = getLocalStorage("haircut")
  const [haircutPrize, setHaircutPrize] = useState(0)
  const showSnackbar = useSnackbar()
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const getHaircutPrize = async () => {
    setLoading(true)
    if (haircut) {
      const selectedHaircutId = JSON.parse(haircut).id
      await dashboard.getAllSalonHaircuts(Number(salonData.id))
        .then(resp => {
          resp.data.data.forEach((haircut) => {
            if (haircut.haircut_id === selectedHaircutId) {
              setHaircutPrize(haircut.base_price)
            }
          });
        })
        .catch(err => {
          //console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    getHaircutPrize()
  }, [])

  const customerEmail = userData ? userData.email : 'guest@onehaircut.com'
  const serviceDescription = salonData ? 'Payment for Services at ' + salonData.name : 'Payment for Services';

  useEffect(() => {
    setLoading(true)
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setLoading(false)
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          // setMessage("Payment succeeded!");
          showSnackbar("success", "Payment Succeeded !")
          createBooking();
          router.push('/confirm-payment')
          break;
        case "processing":
          // setMessage("Your payment is processing.");
          createBooking();
          showSnackbar("warning", "Your payment is processing!")
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          showSnackbar("error", "Your payment was not successful, please try again.")
          break;
        default:
          showSnackbar("error", "Payment Failed ! Something Went Wrong")
          // break;
          break;
      }
    });
    setLoading(false)
  }, [stripe]);

  const createBooking = async () => {
    setLoading(true)
    const targetDayOfWeek = slotData.slot[0].day;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const number = daysOfWeek.indexOf(targetDayOfWeek);
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    let difference = number - currentDayOfWeek;
    if (difference < 0) {
      difference += 7;
    }
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + difference);

    const formattedDate = targetDate.toISOString().split('T')[0];
    const bookingDate = getLocalStorage('selectDate');
    const data = {
      user_id: userData ? userData.id : null,
      hair_salon_id: Number(salonData.id),
      slot_ids: slotData.slot.map((prevSlot) => prevSlot.id),
      hair_dresser_id: slotData.hairDresser.id,
      amount: salonData.final_price,
      salon_haircut_id: salonData.salon_haircut ? salonData.salon_haircut.id : null,
      services: salonData.services || [],
      date: bookingDate,
      clientId: userData == null ? null : userData.id,
      salonId: salonData.id,
      go_home: getLocalStorage("go_home") == "salon" ? false : true,
      stripe_trace_id: stripe_trace_id,
    }
    await client.createBooking(data).then((resp) => {
      if (resp.data.status == 200) {
        showSnackbar("success", resp?.data?.message);
        continue_payment = 1;
      }
      else {
        showSnackbar("error", resp.data.message);
      }
    })
    setLocalStorage("plan_type", haircutPrize)
    setLoading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    let payment_success = 1;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: window.location.origin.includes('http') ?
        //   'http://127.0.0.1:8000/api/web/stripe/processPM' :
        //   'https://api.onehaircut.com/api/web/stripe/processPM',
        return_url: window.location.href
      },
    });

    if (error) {
      console.error(error);
      showSnackbar('error', error.message)
      setLoading(false);
      // return;
    }

    // const response = await client.paymentIntent(
    //   {
    //     amount: amount,
    //     token: token.id,
    //     email: customerEmail,
    //     description: serviceDescription,
    //     clientId: userData ? userData.id : '0',
    //     salonId: salonData.id,
    //     go_home: getLocalStorage("go_home") == "salon" ? false : true
    //   }
    // );
    // const clientSecret = response.data.clientSecret;

    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    //   receipt_email: customerEmail, // Optional: Include customer email in the payment request            
    // });
    // console.log(result)

    // if (result.error) {
    //   console.error(result.error.message);
    // } else {
    //   //console.log(result)
    //   router.push('/confirm-payment')
    //   onSuccess()
    // }
  };

  const buttonClassNames = [
    "flex", "items-center", "justify-center", "text-white", "font-semibold",
    "text-lg", // Taille du texte plus petite
    "rounded-md", "px-4", "py-2", // Padding plus petit
    "mt-2", "shadow-md", "transform", "hover:scale-105",
    "transition-transform", "hover:shadow-md",
    Theme_A.button.mediumGradientButton // ceci appliquera les gradients de couleur
  ].join(' ');

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} className='w-100' />
      <div className="flex justify-center w-full"> {/* Centrer le bouton dans ce div */}
        {showConfirmButton && (
          <button
            disabled={loading || !stripe || !elements}
            id="submit"
            className={buttonClassNames}
          >
            <span id="button-text">
              {loading ? <div className='spinner' id="spinner"></div> : "Confirmer"}
            </span>
          </button>
        )}
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;