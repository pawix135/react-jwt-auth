import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeUsernameForm from "./ChangeUsernameForm";

const Authenticated: React.FC = () => {
  let { user, access_token } = useContext(AuthContext);

  return (
    <div className="p-5 flex flex-col gap-2">
      <h1 className="text-5xl">Welcome {user?.username}</h1>
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl">Settings</h2>
        <div className="flex flex-col gap-2">
          <ChangePasswordForm access_token={access_token!} />
          <ChangeEmailForm
            access_token={access_token!}
            prevEmail={user?.email}
          />
          <ChangeUsernameForm
            access_token={access_token!}
            prevUsername={user?.username!}
          />
        </div>
      </div>
    </div>
  );
};

export default Authenticated;
