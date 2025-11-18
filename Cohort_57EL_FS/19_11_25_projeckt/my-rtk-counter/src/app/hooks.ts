import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Spezialisierter Hook für Dispatch mit Typ
export const useAppDispatch: () => AppDispatch = useDispatch;

// Spezialisierter Hook für Selector mit Typ
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
