import { useState } from "react";
import { apiFetch } from "../../../utils/apiFetch";

interface Props {
  access_token: string;
  prevUsername: string;
}

const ChangeUsernameForm: React.FC<Props> = ({
  access_token,
  prevUsername,
}) => {
  const [username, setUsername] = useState<string>(prevUsername ?? "");
  const [error, setErrr] = useState<ResponseError | null>(null);

  const changeUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let input = JSON.stringify({ username });

      let response = await apiFetch(
        "/api/user/settings/password",
        input,
        access_token!
      );

      let data = await response.json();
      console.log(response, data);
    } catch (error) {
      console.log(error);
    }
    console.log("change password");
  };

  return (
    <form onSubmit={changeUsername} className="flex flex-row gap-3">
      <label htmlFor="password">Change username</label>
      <input
        className="border-2"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded-sm">
        Change
      </button>
    </form>
  );
};

export default ChangeUsernameForm;
