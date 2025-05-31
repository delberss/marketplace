import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface CartItem {
  id: string;
  quantity: number;
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },


    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },


    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        if (action.payload.quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = action.payload.quantity;
        }
      }
    },


    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
