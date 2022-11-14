import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const handelSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <form className="login" onSubmit={handelSubmit}>
      <h3>Log in</h3>
      <label>Email : </label>
      <input
        type={"email"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label>password : </label>
      <input
        type={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
