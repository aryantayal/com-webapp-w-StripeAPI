"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Client secret is not available.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Checkout form">
      <div className={styles.addressElement}>
        {clientSecret && (
          <>
            <h3 className={styles.paymentTitle} id="shipping-info">
              Shipping Information
            </h3>
            <AddressElement
              options={{ mode: "shipping" }}
              aria-labelledby="shipping-info"
            />
          </>
        )}
      </div>

      <div className={styles.paymentElement}>
        {clientSecret && (
          <>
            <h3 className={styles.paymentTitle} id="payment-info">
              Payment Information
            </h3>
            <PaymentElement aria-labelledby="payment-info" />
          </>
        )}
      </div>
      <button
        className={styles.payButton}
        disabled={!stripe || loading}
        aria-disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      {errorMessage && (
        <div className={styles.errorMessage} role="alert" tabIndex={-1}>
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
