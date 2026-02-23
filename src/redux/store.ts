import { persistMiddleware } from "@/middleware/persistMiddleware";
import {
  combineReducers,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { resetState } from "./actions/resetState";
import appReducer from "./slices/appSlice";

const rootReducer = combineReducers({
  app: appReducer,
});

// Định nghĩa RootState từ rootReducer trước để tránh loop type
export type RootState = ReturnType<typeof rootReducer>;

const appReducerWithReset = (
  state: RootState | undefined,
  action: UnknownAction
) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const store = configureStore({
  reducer: appReducerWithReset,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      persistMiddleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
