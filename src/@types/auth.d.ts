interface AuthState {
  user: User | null;
  access_token: string | null;
}

interface User {
  username: string;
  email: string;
  id: number;
}

type AuthSignIn = {
  type: "signin";
  payload: {
    access_token: string;
  };
};

type AuthSetEmail = {
  type: "setemail";
  payload: string;
};

type AuthSetUser = {
  type: "setuser";
  payload: User | null;
};

type AuthSignOut = {
  type: "signout";
  payload: null;
};

type AuthActions = AuthSetEmail | AuthSetUser | AuthSignIn | AuthSignOut;
