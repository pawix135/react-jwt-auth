import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  let auth = useContext(AuthContext);
  console.log(auth);

  return (
    <div>
      {auth.user ? (
        <div>
          <p>{auth.access_token}</p>
          <p>{auth.user?.email}</p>
        </div>
      ) : (
        <div className="flex flex-row gap-10 p-5">
          <SignInForm />
          <SignUpForm />
        </div>
      )}
    </div>
  );
}

export default App;
