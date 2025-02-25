"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useCart } from "@/lib/CartContext";

const Navbar = () => {
  const { getCartItemsQuantity } = useCart();
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Cozy Threads</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/cart">Cart ({getCartItemsQuantity()})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
