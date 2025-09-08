import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppReducers, AppStore } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppReducers>();
export const useAppStore = useStore.withTypes<AppStore>();
