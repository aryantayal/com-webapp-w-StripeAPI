"use client";

import { ProductListProps } from "@/types";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useCart } from "@/lib/CartContext";

const ProductList = ({ products }: ProductListProps) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
