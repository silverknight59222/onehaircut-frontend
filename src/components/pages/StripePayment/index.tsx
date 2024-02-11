import React, { useEffect, useMemo, useState } from "react";
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

  return (
    <div>
      
    </div>

  );
}

export default StripePayment;
