import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchProduct: ''
}

const searchProductSlice = createSlice({
    name: 'searchProduct',
    initialState,
    reducers: {
        setSearchProduct: (state, action) => {
            state.searchProduct = action.payload
        }
    }
})

export const { setSearchProduct } = searchProductSlice.actions;
export default searchProductSlice.reducer;
