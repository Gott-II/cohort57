// src/features/crypto/BitcoinPrice.tsx
import React from "react";
import { useGetBitcoinPriceQuery } from "./cryptoApi";
import styles from "./BitcoinPrice.module.css";

const BitcoinPrice = () => {
  const { data, error, isLoading } = useGetBitcoinPriceQuery();

  if (isLoading) return <p>Lade aktuellen Bitcoin-Kurs...</p>;
  if (error) return <p>Fehler beim Laden</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bitcoin (EUR)</h2>
      <p className={styles.item}>
        €{data?.bitcoin.eur}
      </p>
    </div>
  );
};

export default BitcoinPrice;
