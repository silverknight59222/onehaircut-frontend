import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement, PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { SalonRegisterParams, registration } from "@/api/registration";
import useSnackbar from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";
import { Theme_A } from "@/components/utilis/Themes";
import CardWrapper from "@/@core/styles/libs/react-credit-cards";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          display: "block",
          fontSize: "16px",
          margin: "10px",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

function StripePayment() {
  const { loadingView } = userLoader();
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const salonAddress = JSON.parse(getLocalStorage("salon_address") as string);
  const planType = JSON.parse(getLocalStorage("plan_type") as string);

  const stripe = useStripe();
  // const elements = useElements();
  // const options = useOptions();
  const router = useRouter();
  const clientSecret = getLocalStorage("secret_key")?.toString();

  const appearance = {
    theme: 'flat',
    variables: { colorPrimaryText: '#262626' }
  };
  const options = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        focus: {
          backgroundColor: "#F3D3E3",
        },
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    value: {
      postalCode: salonAddress.postalCode,
    },
    // iconStyle : 'solid',
  };
  const elements = useElements();

  const registerSalon = async (paymentMethod?: string) => {
    setIsLoading(true);
    let data: SalonRegisterParams = {
      user_id: "",
      salon_name: "",
      salon_description: "",
      country: '',
      city: '',
      state: '',
      zone_radius: 0,
      lat: 0,
      long: 0,
      salon_type: "",
      payment_method: "",
      plan_id: "",
      plan_name: "",
      plan_slug: "",
      street: "",
      postalCode: "",
      isMobile: false,
      dob: "1991-01-01",
      country_code: ""
    };
    const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
    const salonName = getLocalStorage("salon_name") as string;
    const salonType = getLocalStorage("salon_type") as string;
    data.user_id = userInfo?.id;
    data.dob = userInfo?.dob;
    data.salon_name = salonName;
    data.salon_description = 'Description text here';
    data.country = salonAddress.country
    data.state = salonAddress.state
    data.city = salonAddress.city
    data.lat = salonAddress.lat
    data.long = salonAddress.long
    data.zone_radius = salonAddress.zone
    data.salon_type = salonType;
    data.payment_method = paymentMethod || "";
    data.plan_id = planType.plan_id;
    data.plan_name = planType.name;
    data.plan_slug = planType.slug;
    data.street = salonAddress.street;
    data.postalCode = salonAddress.postalCode;
    data.country_code = salonAddress.country_code;
    data.isMobile = salonAddress.isMobile;
    // if (planType.name === "OneHaircut Regular") {
    //   data.plan_name = "Standard";
    // } else if (planType.name === "OneHaircut Pro") {
    //   data.plan_name = "Pro";
    // }
    await registration
      .registerSalon(data)
      .then((res) => {
        showSnackbar("success", "Salon successfully created");
        router.push("/verification");
      })
      .catch((err) => {
        showSnackbar("error", "Error Occured!");
      }).finally(() => {
        setIsLoading(false);
      });
  };
  const handleSubmit = async (e: any) => {
    const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);
    console.log(cardElement)
    if (clientSecret && cardElement) {
      // await stripe
      //   .createPaymentMethod({
      //     card: cardElement,
      //     billing_details: {
      //       name: userInfo.name,
      //     },
      //     // clientSecret,
      //     // elements,
      //     // confirmParams : {
      //     //   return_url : 'https://onehaircut.com',
      //     // }
      //   })
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      // const { token, error } = await stripe.createToken(cardElement);
      console.log(paymentMethod)
      registerSalon(paymentMethod?.id)
      //Old Flow
      // await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      //   billing_details: {
      //     name: userInfo.name,
      //   },
      // })
      //   .then(function (result) {
      //     console.log(result)
      //     registerSalon(result.paymentMethod?.id);
      //     // window.open("https://api.whatsapp.com/send?phone=" + userInfo.phone + "&text=Booking Success!", '_blank');
      //   })
      //   .catch(function (error) {
      //     setIsLoading(false)
      //     //console.log(error);
      //   })
    }
  };

  return (
    <div>
      {isLoading && loadingView()}
      <form onSubmit={handleSubmit}>
        {/* <CardElement id="my-input" options={options} /> */}
        {/* <div className="card-element-container">
          <label>
            Card number
            <div className="card-element">
              <CardNumberElement options={options} />
            </div>
          </label>
        </div>
        <div className="card-element-container">
          <label>
            Expiration date
            <div className="card-element">
              <CardExpiryElement options={options} />
            </div>
          </label>
        </div>
        <div className="card-element-container">
          <label>
            CVC / CVV
            <div className="card-element">
              <CardCvcElement options={options} />
            </div>
          </label>
        </div> */}
        <div className="card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
        <button
          className={`w-full h-14 mt-8 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-md shadow-stone-300 hover:scale-95 transition duration-300`}
          type="submit"
          disabled={!stripe || !elements}
        >
          Confirmer
        </button>
      </form>
    </div>
    // <div>
    //   {isLoading && loadingView()}
    //   <form onSubmit={handleSubmit}>
    //     <div className="text-sm font-semibold mb-8">
    //       Enter your card details here:
    //     </div>
    //     <CardElement />
    //     <button
    //       className={`w-full h-14 mt-8 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-md shadow-stone-300 hover:scale-95 transition duration-300`}
    //       type="submit"
    //       disabled={!stripe || !elements}
    //     >
    //       Confirmer
    //     </button>
    //   </form>
    // </div>
  );
}

export default StripePayment;
