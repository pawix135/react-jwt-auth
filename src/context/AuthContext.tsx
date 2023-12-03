import { createContext } from "react";

export let initialAuthState: AuthState = {
  access_token: null,
  user: null,
};

export const AuthContext = createContext<AuthState>(initialAuthState);
export const AuthDispatchContext = createContext<React.Dispatch<AuthActions>>(
  () => {}
);
