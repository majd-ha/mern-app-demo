import { useState } from "react";
import { useSignup } from "../hooks/useSignnup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const handelSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setPassword("");
    setEmail("");
  };
  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3>Sign up</h3>
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
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
