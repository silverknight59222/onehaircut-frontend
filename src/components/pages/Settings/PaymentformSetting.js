import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Theme_A } from "@/components/utilis/Themes";

const PaymentFormSetting = ({ showConfirmButton = true }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      switch (setupIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin.includes('127.0.0.1') ?
          'http://127.0.0.1:8000/api/web/stripe/processPM' :
          'https://api.onehaircut.com/api/web/stripe/processPM',
        // return_url: window.location.href
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  const buttonClassNames = [
    "flex", "items-center", "justify-center", "text-white", "font-semibold",
    "text-lg", // Taille du texte plus petite
    "rounded-md", "px-4", "py-2", // Padding plus petit
    "mt-2", "shadow-md", "transform", "hover:scale-105",
    "transition-transform", "hover:shadow-md",
    Theme_A.button.mediumGradientButton // ceci appliquera les gradients de couleur
  ].join(' ');

  // ...
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex justify-center w-full"> {/* Centrer le bouton dans ce div */}
        {showConfirmButton && (
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className={buttonClassNames}
          >
            <span id="button-text">
              {isLoading ? <div className='spinner' id="spinner"></div> : "Confirmer"}
            </span>
          </button>
        )}
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );

}

export default PaymentFormSetting;