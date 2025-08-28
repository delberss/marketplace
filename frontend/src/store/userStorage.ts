import type { UserProps } from "./userSlice/index";

const USER_KEY = "user";

export const saveUser = (user: UserProps) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const loadUser = (): UserProps | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
