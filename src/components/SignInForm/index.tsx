import { useContext, useState } from "react";
import { AuthDispatchContext } from "../../context/AuthContext";
import { useMutation } from "react-query";

type Credentials = { username: string; password: string };

const SignInForm = () => {
  let dispatch = useContext(AuthDispatchContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    message: string;
    type: string;
  } | null>(null);

  const signInMutation = useMutation<any, any, Credentials>(
    (credentials) => {
      return fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    },
    {
      async onSuccess(data) {
        setError(null);
        let response = await data.json();
        if (response.auth) {
          dispatch({
            type: "signin",
            payload: { access_token: response.access_token },
          });
          setUsername("");
          setPassword("");
        } else {
          setError({
            message: response.error.message,
            type: response.error.type,
          });
        }
      },
    }
  );

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInMutation.mutate({ username, password });
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <p>Sign in</p>
      <form onSubmit={signIn} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="sign-in-username">Username</label>
          <input
            className="border-2 p-2"
            type="text"
            id="sign-in-username"
            name="sign-in-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="sign-in-password">Password</label>
          <input
            className="border-2 p-2"
            type="sign-in-password"
            id="sign-in-password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
        <button
          type="submit"
          className="bg-blue-500 font-bold p-3 text-white"
          disabled={signInMutation.isLoading}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
