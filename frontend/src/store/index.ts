import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import userReducer, { login, logout } from "../store/userSlice";
import cartReducer from '../store/cartSlice';
import searchProductReducer from "./searchProductSlice";

import { removeUser, saveUser } from "./userStorage";

const localStorageMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action);

  if (login.match(action)) {
    const state = storeAPI.getState();
    if (state.user.user) saveUser(state.user.user);
  } else if (logout.match(action)) {
    removeUser();
  }

  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    searchProduct: searchProductReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
