"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Cozy Threads</h3>
          <p>High-quality, ethically-sourced apparel and accessories.</p>
        </div>

        <div className={styles.section}>
          <h3>Shop</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Contact</h3>
          <p>Email: hello@cozythreads.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} Cozy Threads. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
