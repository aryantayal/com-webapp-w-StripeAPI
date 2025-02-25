"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
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
        return_url: `http://localhost:3000/success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.paymentElement}>
        {clientSecret && <PaymentElement />}
      </div>
      <button className={styles.payButton} disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </form>
  );
};

export default CheckoutForm;
