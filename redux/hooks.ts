import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// ✅ Custom hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ Custom hook for selector with proper typing
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;