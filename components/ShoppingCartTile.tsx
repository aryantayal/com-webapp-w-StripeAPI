"use client";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import styles from "./ShoppingCartTile.module.css";

const ShoppingCartTile = () => {
  const { items, removeFromCart } = useCart();

  return (
    <main className={styles.mainContainer}>
      {items.map((item) => (
        <div className={styles.itemContainer} key={item.id}>
          <div className={styles.flexContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={120}
                height={120}
                className={styles.image}
              />
            </div>
            <div className={styles.contentContainer}>
              <h2 className={styles.title}>{item.name}</h2>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.details}>
                <p className={styles.price}>${(item.price / 100).toFixed(2)}</p>
                <p className={styles.quantity}>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ShoppingCartTile;
