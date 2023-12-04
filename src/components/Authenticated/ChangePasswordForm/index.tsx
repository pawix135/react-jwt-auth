import { useState } from "react";
import { apiFetch } from "../../../utils/apiFetch";

interface Props {
  access_token: string;
}

const ChangePasswordForm: React.FC<Props> = ({ access_token }) => {
  const [password, setPassword] = useState<string>("");
  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let input = JSON.stringify({ password });

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
    <form onSubmit={changePassword} className="flex flex-row gap-3">
      <label htmlFor="password">Change password</label>
      <input
        className="border-2"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded-sm">
        Change
      </button>
    </form>
  );
};

export default ChangePasswordForm;
