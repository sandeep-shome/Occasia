import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { sidebarReducer } from "./features/sidebar-slice";
import { tokenReducer } from "./features/token-slice";
import { subscriptionReducer } from "./features/subscription-slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    token: tokenReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
