import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { default as TmdbReducer } from "./tmdb";

export const store = configureStore({
  reducer: {
    tmdb: TmdbReducer,
  },
  middleware: (gDM) => gDM(),
});

export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
