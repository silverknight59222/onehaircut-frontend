import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { client } from "@/api/clientSide";
import { Theme_A } from "@/components/utilis/Themes";
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import useSnackbar from "@/hooks/useSnackbar";

const PaymentForm = ({ onSuccess }) => {
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
  const slotData = slot ? JSON.parse(slot) : null
  const haircut = getLocalStorage("haircut")
  const [haircutPrize, setHaircutPrize] = useState(0)
  const showSnackbar = useSnackbar()
  const router = useRouter();
  const getHaircutPrize = async () => {
    if (haircut) {
      setLoading(true)
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

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
      salon_haircut_id: salonData.haircut ? salonData.haircut.id : null,
      services: salonData.services || [],
      date: bookingDate,
      clientId: userData == null ? null : userData.id,
      salonId: salonData.id,
      go_home: getLocalStorage("go_home") == "salon" ? false : true
    }

    let resp = await client.createBooking(data)
    setLocalStorage("plan_type", haircutPrize)
    showSnackbar("success", 'Booking Created Successfully');

    const { token, error } = await stripe.createToken(elements.getElement(CardElement), {
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
        clientId: userData ? userData.id : '0',
        salonId: salonData.id,
        go_home: getLocalStorage("go_home") == "salon" ? false : true
      }
    );
    const clientSecret = response.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      receipt_email: customerEmail, // Optional: Include customer email in the payment request            
    });
    console.log(result)

    if (result.error) {
      console.error(result.error.message);
    } else {
      //console.log(result)
      router.push('/confirm-payment')
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