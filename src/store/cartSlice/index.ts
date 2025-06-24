import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadCart, saveCart } from "../cartStorage";


export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  description: string;
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCart(), // inicializa com dados do localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (!existingItem) {
        state.items.push({ ...action.payload });
        saveCart(state.items); // salva após adicionar
      }
    },



    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCart(state.items); // salva após remover

    },


    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        if (action.payload.quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = action.payload.quantity;
        }
        saveCart(state.items); // salva após atualizar

      }
    },


    clearCart: (state) => {
      state.items = [];
      saveCart([]); // limpa no localStorage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
