export const authReducer: React.Reducer<AuthState, AuthActions> = (
  state,
  action
): AuthState => {
  switch (action.type) {
    case "signin":
      return {
        ...state,
        access_token: action.payload.access_token,
      };
    case "signout":
      return {
        ...state,
        access_token: null,
        user: null,
      };
    case "setemail":
      return {
        ...state,
        user: {
          ...state.user!,
          email: action.payload,
        },
      };
    case "setuser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
