import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { SalonRegisterParams, registration } from "@/api/registration";
import useSnackbar from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";
import { Theme_A } from "@/components/utilis/Themes";

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
    };
    const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
    const salonName = getLocalStorage("salon_name") as string;
    const salonAddress = JSON.parse(getLocalStorage("salon_address") as string);
    const salonType = getLocalStorage("salon_type") as string;
    const planType = JSON.parse(getLocalStorage("plan_type") as string);
    data.user_id = userInfo?.id;
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
    if (planType.name === "OneHaircut Regular") {
      data.plan_name = "Standard";
    } else if (planType.name === "OneHaircut Pro") {
      data.plan_name = "Pro";
    }
    await registration
      .registerSalon(data)
      .then((res) => {
        const userInfo = JSON.parse(getLocalStorage("user_Info") as string);

        setLocalStorage("auth-token", userInfo.token);
        setLocalStorage('hair_salon', JSON.stringify(res.data.hair_salon));

        showSnackbar("success", "Salon successfully created");

        // removeFromLocalStorage('user_Info')
        // removeFromLocalStorage('salon_name')
        // removeFromLocalStorage('salon_address')
        // removeFromLocalStorage('salon_type')
        // removeFromLocalStorage('plan_type')
        removeFromLocalStorage('secret_key')
        router.push("/dashboard");
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
    const clientSecret = getLocalStorage("secret_key")?.toString();
    const cardElement = elements.getElement(CardElement);
    if (clientSecret && cardElement) {
      await stripe
        .createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: userInfo.name,
          },
        })
        .then(function (result) {
          //console.log(result)
          registerSalon(result.paymentMethod?.id);
          // window.open("https://api.whatsapp.com/send?phone=" + userInfo.phone + "&text=Booking Success!", '_blank');
        })
        .catch(function (error) {
          setIsLoading(false)
          //console.log(error);
        })
    }
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
          className={`w-full h-14 mt-8 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-md shadow-stone-300 hover:scale-95 transition duration-300`}
          type="submit"
          disabled={!stripe || !elements}
        >
          Confirmer
        </button>
      </form>
    </div>
  );
}

export default StripePayment;
