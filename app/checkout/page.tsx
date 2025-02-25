"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import CheckoutPage from "@/components/CheckoutForm";
import { useCart } from "@/lib/CartContext";
import styles from "./checkout.module.css";
import ShoppingCartTile from "@/components/ShoppingCartTile";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const { getCartTotal } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const amount = getCartTotal() / 100;

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: getCartTotal() }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [getCartTotal]);

  return (
    <main className={styles.main}>
      <div className={styles.checkoutContainer}>
        <div className={styles.shoppingCartTile}>
          <ShoppingCartTile />
        </div>
        <div className={styles.paymentContainer}>
          <div className={styles.total}>Total: ${amount.toFixed(2)}</div>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <CheckoutPage amount={getCartTotal()} />
            </Elements>
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
