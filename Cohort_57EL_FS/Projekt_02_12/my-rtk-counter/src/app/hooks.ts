import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";


export const useAppDispatch = ()=>useDispatch<AppDispatch>();
// → Делаем свой useDispatch, который знает типы Actions.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// → Делаем свой useSelector, который знает структуру всего Redux state.