import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface UserProps {
    name: string;
    email: string;
    token?: string;
}

interface UserState {
    user: UserProps | null;
}

const initialState: UserState = {
    user: null,
};

interface LoginPayload {
    email: string;
    password: string;
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.user = { email: action.payload.email, name: ''};
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
