import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "../userStorage";

export interface UserProps {
    name: string;
    email: string;
    token?: string;
}

interface UserState {
    user: UserProps | null;
}


const initialState: UserState = {
      user: loadUser(),
};

interface LoginPayload {
    name: string;
    email: string;
    token?: string;
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.user = {
                email: action.payload.email, 
                name: action.payload.name,
                token: action.payload.token,
            };
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
