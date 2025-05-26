import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import userReducer, { login, logout } from "../store/userSlice";
import { removeUser, saveUser } from "./storage";

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
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
