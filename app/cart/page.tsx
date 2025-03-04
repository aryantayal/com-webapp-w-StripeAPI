"use client";
import ShoppingCartTile from "@/components/ShoppingCartTile";
import { useCart } from "@/lib/CartContext";
import styles from "./cart.module.css";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { items, getCartTotal, getCartItemsQuantity } = useCart();
  const router = useRouter();
  const handleCheckout = () => {
    if (items.length > 0) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };
  const totalAmount = getCartTotal() / 100;
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {items.length > 0
          ? `Your Cart (${getCartItemsQuantity()} Items)`
          : "Your Cart is Empty"}
      </h1>
      {items.length === 0 ? (
        <h3 className={styles.emptyMessage}>Your cart is empty.</h3>
      ) : (
        <ShoppingCartTile />
      )}
      <br />
      <div className={styles.totalContainer}>
        <h2 className={styles.total}>Total: ${totalAmount.toFixed(2)}</h2>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          {items.length > 0 ? "Checkout" : "Please Add Items to Cart"}
        </button>
      </div>
    </main>
  );
};

export default CartPage;
