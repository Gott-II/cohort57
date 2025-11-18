import { useState, type JSX } from 'react';
import style from './Counter.module.css'; // Pfad anpassen, falls nötig

export default function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  // создали переменную состояния counter
  // и функцию setCounter для изменения состояния
  // useState -  это хук
  // в круглых скобках начальное состояние переменной состояния
  // хук useState  принимает начальное значение переменной состояния
  // возвращает массив в котором на первом месте переменная состояния
  // а на втором месте функция  сетер
  // Хук - это функция которая используется только внутри компонента
  // В жизненном цикле компонента React есть 3 фазы:
  // 1 Сборка (mounting)
  // 2 Обновление (updating)
  // 3 Разборка (unmounting)
  function handlePlus(): void {
    setCount(count + 1);
  }

  function handleMinus(): void {
    setCount(count - 1);
  }

    function handleReset(): void {
    setCount(0);
  }

  function handlePlus100(): void {
    setCount(count + 100);
  }

  return (
     <div>
      <h1>Money Counter €</h1>
      <div className={style.container}>
        <button type="button" onClick={handleMinus} className={style.btn}>
          Geld Auszahlen
        </button>
        <span>{count.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
        <button type="button" onClick={handlePlus} className={style.btn}>
          Geld Einzahlen
        </button>
      </div>
      <div className={style.container}>
        <button type="button" onClick={handleReset} className={style.btn}>
          Zähler zurücksetzen
        </button>
        <button type="button" onClick={handlePlus100} className={style.btn}>
          +100 €
        </button>
      </div>
    </div>
  );
}
