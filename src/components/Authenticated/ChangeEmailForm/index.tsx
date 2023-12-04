import { useContext, useState } from "react";
import { apiFetch } from "../../../utils/apiFetch";
import { AuthDispatchContext } from "../../../context/AuthContext";
import ErrorMessage from "../../ErrorMessage";

interface Props {
  access_token: string;
  prevEmail?: string;
}

const ChangeEmailForm: React.FC<Props> = ({ access_token, prevEmail }) => {
  const [email, setEmail] = useState<string>(prevEmail ?? "");
  const [error, setError] = useState<ResponseError | null>(null);

  const dispatch = useContext(AuthDispatchContext);

  const changeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let input = JSON.stringify({ email });

      let response = await apiFetch(
        "/api/user/settings/email",
        input,
        access_token!
      );

      let data = await response.json();

      if (data.ok) {
        dispatch({ type: "setemail", payload: email });
      } else {
        console.log(data);

        setError(data.error);
      }
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  return (
    <form onSubmit={changeEmail} className="flex flex-row gap-3">
      <label htmlFor="email">Change email</label>
      <input
        className="border-2"
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {error && <ErrorMessage message={error.message} />}
      <button type="submit" className="bg-blue-500 text-white px-3 rounded-sm">
        Change
      </button>
    </form>
  );
};

export default ChangeEmailForm;
