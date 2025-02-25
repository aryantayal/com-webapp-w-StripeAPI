import ProductList from "@/components/ProductList";
import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Cozy Threads</h1>
      <ProductList products={products} />
    </main>
  );
}
