import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage } from "@/api/storage";
import { SalonRegisterParams, registration } from "@/api/registration";
import useSnackbar from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";

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

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const router = useRouter();

  const registerSalon = async (paymentMethod?: string) => {
    setIsLoading(true);
    let data: SalonRegisterParams = {
      user_id: "",
      salon_name: "",
      salon_address: "",
      salon_type: "",
      payment_method: "",
      plan_id: "",
      plan_name: "",
    };
    const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
    const salonName = getLocalStorage("salon_name") as string;
    const salonAddress = getLocalStorage("salon_address") as string;
    const salonType = getLocalStorage("salon_type") as string;
    const planType = JSON.parse(getLocalStorage("plan_type") as string);
    data.user_id = userInfo?.id;
    data.salon_name = salonName;
    data.salon_address = salonAddress;
    data.salon_type = salonType;
    data.payment_method = paymentMethod || "";
    data.plan_id = planType.plan_id;
    if (planType.name === "OneHaircut Regular") {
      data.plan_name = "Standard";
    } else if (planType.name === "OneHaircut Pro") {
      data.plan_name = "Pro";
    }
    await registration
      .registerSalon(data)
      .then((res) => {
        showSnackbar("success", "Salon successfully created");
        router.push('/confirm-payment');
      })
      .catch((err) => {
        showSnackbar("error", "Error Occured!");
      }).finally(()=>{
        setIsLoading(false);
      });
  };
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
          registerSalon(result.paymentMethod?.id);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && loadingView()}
      <form onSubmit={handleSubmit}>
        <div className="text-sm font-semibold mb-8">
          Enter your card details here:
        </div>
        <CardElement options={options} />
        <button
          className="w-full h-14 mt-8 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default StripePayment;
