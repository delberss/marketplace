import type { CartItem } from "./cartSlice/index";

const CART_KEY = "cart";

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const removeCart = () => {
  localStorage.removeItem(CART_KEY);
};
