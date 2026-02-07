// src/features/exchangeRate/ExchangeRates.tsx
import React from "react";
import { useGetRatesQuery } from "./exchangeRateApi";
import styles from "./ExchangeRates.module.css";

const ExchangeRates = () => {
  const { data, error, isLoading } = useGetRatesQuery("USD");

  if (isLoading) return <p>Lade Wechselkurse...</p>;
  if (error) return <p>Fehler beim Laden</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>USD Wechselkurse</h2>
      <ul className={styles.list}>
        {Object.entries(data?.rates || {}).slice(0, 5).map(([currency, rate]) => (
          <li key={currency} className={styles.item}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;

