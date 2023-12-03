import { useEffect, useReducer } from "react";
import {
  AuthContext,
  AuthDispatchContext,
  initialAuthState,
} from "../../context/AuthContext";
import { authReducer } from "../../reducers/authReducer";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    if (!state.access_token) return;

    fetch("/api/user/me", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.ok) {
          dispatch({
            type: "setuser",
            payload: user.me,
          });
          console.log(user);
        }
      });
  }, [state.access_token]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
