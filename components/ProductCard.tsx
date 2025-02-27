"use client";

import { ProductCardProps } from "@/types";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { useState } from "react";

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [buttonText, setButtonText] = useState("Add to Cart");

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${(product.price / 100).toFixed(2)}</p>
        <button
          className={styles.button}
          onClick={() => {
            setButtonText("Added to Cart!");
            addToCart(product);
            setTimeout(() => {
              setButtonText("Add to Cart");
            }, 1200);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
