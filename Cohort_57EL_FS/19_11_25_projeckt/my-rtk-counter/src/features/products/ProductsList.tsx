// src/features/products/ProductsList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
  removeProduct,
} from './productsSlice';
import type { Product } from './productsSlice';
import styles from './ProductsList.module.css';

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className={styles.loading}>⏳ Lade Produkte...</p>;
  if (error) return <p className={styles.error}>❌ Fehler: {error}</p>;
  if (!loading && products.length === 0) {
    return <p className={styles.noUsers}>Keine Produkte gefunden.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produktliste</h2>
      <ul className={styles.list}>
        {products.map((product: Product) => (
          <li key={product.id} className={styles.card}>
            {/* Roter Close-Button */}
            <button
              className={styles.closeButton}
              onClick={() => dispatch(removeProduct(product.id))}
            >
              ×
            </button>

            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <div className={styles.cardHeader}>{product.title}</div>
            <div className={styles.cardInfo}>
              <span>Preis:</span> {product.price} €
            </div>
            <div className={styles.cardInfo}>
              <span>Bewertung:</span> ⭐ {product.rating?.rate ?? '–'} (
              {product.rating?.count ?? '–'})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
// Selektoren
