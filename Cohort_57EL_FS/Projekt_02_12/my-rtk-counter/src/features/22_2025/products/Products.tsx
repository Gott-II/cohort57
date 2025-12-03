import { useEffect } from "react";
import { fetchProducts, removeProduct } from "./productsSlice";


import styles from "./Products.module.css";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../cart/cartSlice";

const Products = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className={styles.status}>Loading...</p>;

  if (error)
    return (
      <p className={styles.status} style={{ color: "red" }}>
        {error}
      </p>
    );

  return (
    <div className={styles.grid}>
      {items.map((product) => (
        <div key={product.id} className={styles.card}>
          <button
            className={styles.deleteBtn}
            onClick={() => dispatch(removeProduct(product.id))}
          >
            ✕
          </button>

          <img src={product.image} alt={product.title} className={styles.image} />

          <h3 className={styles.title}>{product.title}</h3>

          <p className={styles.price}>${product.price}</p>

          <button
            className={styles.addBtn}
            onClick={() => dispatch(addToCart(product))}
          >
            Добавить в корзину
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
