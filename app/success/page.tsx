"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./SuccessPage.module.css";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return (
    <div className={styles.container} role="alert" aria-live="polite">
      <h1 className={styles.title}>Payment Successful!</h1>
      <p className={styles.message}>Thank you for your purchase.</p>
      {amount && (
        <p>
          You paid <strong>${(Number(amount) / 100).toFixed(2)}</strong>.
        </p>
      )}
      <Link href="/" className={styles.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
