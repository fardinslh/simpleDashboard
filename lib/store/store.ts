import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./authSlice";

export type AppReducers = {
  auth: AuthState;
};

export const makeStore = (): EnhancedStore<AppReducers> => {
  return configureStore<AppReducers>({
    reducer: {
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const { dispatch, getState } = makeStore();
