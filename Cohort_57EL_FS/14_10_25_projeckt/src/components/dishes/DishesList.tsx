import type { JSX } from 'react';
import styles from './DishesList.module.css';
import DishEditForm from './DishEditForm';
import { useSelector, useDispatch } from 'react-redux';
import selectDishes from './selectors';
import ClearIcon from '@mui/icons-material/Clear';

export default function DishesList(): JSX.Element {
    const dishes = useSelector(selectDishes);
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch({ type: 'DELETE_DISH', payload: id });
    };

    return (
        <ul className={styles.list}>
            {dishes.map((dish) => (
                <li key={dish.id} className={styles.dishCard}>
                    <h3 className={styles.heading}>Titel: {dish.title}</h3>
                    <p className={styles.category}>Kategorie: {dish.category}</p>
                    <img
                        src={dish.image}
                        alt={dish.title}
                        className={styles.dishImage}
                    />
                    <p className={styles.price}>{dish.price} €</p>
                    <div className={styles.icons}>
                        <ClearIcon
                            className={styles.icon}
                            onClick={() => handleDelete(dish.id)}
                        />
                        <DishEditForm dish={dish} onClose={function (): void {
                            throw new Error('Function not implemented.');
                        } } />
                    </div>
                </li>
            ))}
        </ul>
    );
}

