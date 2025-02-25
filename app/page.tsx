"use client";
import ProductList from "@/components/ProductList";
import { products } from "@/lib/products";
import styles from "./page.module.css";
import { useRef } from "react";

export default function Home() {
  const productsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Elevate Your Style with Cozy Threads
        </h1>
        <p className={styles.heroSubtitle}>
          Discover premium quality apparel that combines comfort and elegance
          for every occasion.
        </p>
        <button onClick={handleClick} className={styles.shopButton}>
          Shop Now
        </button>
      </div>

      <div className={styles.featured}>
        <h2 ref={productsRef} className={styles.sectionTitle}>
          Featured Products
        </h2>
        <ProductList products={products} />
      </div>
    </main>
  );
}
