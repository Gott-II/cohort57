// src/components/Rates/Rates.tsx
import React, { useEffect } from 'react';
import { useGetRatesQuery } from '../../features/exchangeRate/exchangeRateApi';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setLastRates } from '../../features/exchangeRate/exchangeRateSlice';
import styles from './Rates.module.css';

export const Rates = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetRatesQuery('USD');
  const lastRates = useSelector((state: RootState) => state.exchangeRateApi.lastRates);

  // beim erfolgreichen Laden persistieren
  useEffect(() => {
    if (isSuccess && data?.rates) {
      dispatch(setLastRates(data.rates));
    }
  }, [isSuccess, data, dispatch]);

  const ratesToShow = data?.rates || lastRates;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>USD Wechselkurse</h2>
      <ul className={styles.list}>
        {ratesToShow &&
          Object.entries(ratesToShow).map(([currency, rate]) => (
            <li key={currency} className={styles.item}>
              {currency}: {rate}
            </li>
          ))}
      </ul>
    </div>
  );
};
