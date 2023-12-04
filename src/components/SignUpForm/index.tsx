import { useState } from "react";
import { useMutation } from "react-query";

type Credentials = { username: string; password: string };

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ message: string; type: string } | null>(
    null
  );

  const signUpMutation = useMutation<any, any, Credentials>(
    (credentials) => {
      return fetch("/api/auth/signup", {
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
        console.log(response);

        if (response.auth) {
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

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({ username, password });
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <p>Sign up</p>
      <form onSubmit={signUp} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="sign-up-username">Username</label>
          <input
            className="border-2 p-2"
            type="text"
            id="sign-up-username"
            name="sign-up-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="sign-up-password">Password</label>
          <input
            className="border-2 p-2"
            type="password"
            id="sign-up-password"
            name="sign-up-password"
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
          disabled={signUpMutation.isLoading}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
