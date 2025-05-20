import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/userSlice';

const store = configureStore({
    reducer: userReducer,
})


export default store;
export type AppDispatch = typeof store.dispatch;
