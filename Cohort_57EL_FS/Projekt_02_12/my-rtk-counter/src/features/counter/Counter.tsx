import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { decrement, increment } from "./counterSlice";


export const Counter = () =>{

    const value  = useAppSelector((state)=> state.counter.value);
     // → Получаем текущий счётчик из Redux.
    const dispatch = useAppDispatch();
     // → Берём типизированный dispatch.

     return(
        <div style={{textAlign:"center", marginTop:"40px"}}>
            <h1>Счетчик: {value}</h1>
            <div style={{display:"flex", gap:"10px", justifyContent:"center"}}>
                <button onClick={()=>dispatch(increment())}>+1</button>
                 {/* // → Отправляем действие увеличения счётчика. */}
                <button onClick={()=>dispatch(decrement())}>-1</button>
            </div>
        </div>
     )
}