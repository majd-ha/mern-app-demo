import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../components/Loader";
import { useSignup } from "../hooks/useSignnup";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+[.][^@ \t\r\n]+/;
const Signup = () => {
  //refs
  const fullnameRef = useRef();
  const phoneRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const emailRef = useRef();

  //state
  const [success, setSuccess] = useState(false);
  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [confpwd, setConfPwd] = useState("");
  const [isconfirmed, setIsconfirmed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [erroMsg, setErrorMsg] = useState("");

  const { signup, isLoading, error } = useSignup();
  //check if all fields is valid
  useEffect(() => {
    if (validName && validEmail && validPhone && validPwd && isconfirmed) {
      setSuccess(true);
      setErrorMsg("");
    } else {
      setSuccess(false);
    }
  }, [isconfirmed, validEmail, validName, validPhone, validPwd]);
  //check name validation
  useEffect(() => {
    const isValidname = USER_REGEX.test(fullname);
    setValidName(isValidname);
  }, [fullname]);
  //check password validation && if confimation matched
  useEffect(() => {
    const isValidPwd = PWD_REGEX.test(password);
    setValidPwd(isValidPwd);

    const isMatched = password === confpwd;
    setIsconfirmed(isMatched);
  }, [password, confpwd]);

  //phone validation
  useEffect(() => {
    const isValidPhone = PHONE_REGEX.test(phone);
    setValidPhone(isValidPhone);
  }, [phone]);
  //email validation
  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(email);

    setValidEmail(isValidEmail);
  }, [email]);
  const checkForm = () => {
    fullnameRef.current.className = validName ? "valid" : "invalid";
    phoneRef.current.className = validPhone ? "valid" : "invalid";
    emailRef.current.className = validEmail ? "valid" : "invalid";
    pwdRef.current.className = validPwd ? "valid" : "invalid";
  };
  useEffect(() => {
    if (error) {
      if (error.includes("name")) {
        fullnameRef.current.className = "invalid";
        fullnameRef.current.focus();
      } else if (error.includes("number")) {
        phoneRef.current.className = "invalid";
        phoneRef.current.focus();
      } else if (error.includes("Email")) {
        emailRef.current.className = "invalid";
        emailRef.current.focus();
      }
    }
  }, [error]);

  //function to submit the form
  const handelSubmit = async (e) => {
    e.preventDefault();
    checkForm();
    if (success) {
      await signup(email, password, phone, fullname);
    } else {
      setErrorMsg("form is not valid, all fields are required");
    }
  };
  //toggle password show/hide
  const ShowPassword = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };
  return isLoading ? (
    !error && <Loader />
  ) : (
    <>
      <form
        className="signup"
        onSubmit={handelSubmit}
        id={erroMsg.length > 0 ? "err-form" : ""}
      >
        {erroMsg.length > 0 ? <h2>{erroMsg}</h2> : <></>}
        <h3>Sign up</h3>

        <label>User name</label>
        <input
          type={"text"}
          id="fullname"
          ref={fullnameRef}
          value={fullname}
          autoComplete="on"
          className={fullname && !validName ? "invalid" : ""}
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />
        <p
          className={
            fullname && !validName ? "show-instuctions" : "hide-instuctions"
          }
        >
          at least 4 charecters not allowed to use spaces and !, @ ,# , ; , :
          you can use charecters and dash and under score
        </p>
        <label>Phone Number</label>
        <input
          type={"text"}
          id="phone"
          value={phone}
          ref={phoneRef}
          autoComplete="on"
          className={phone && !validPhone ? "invalid" : ""}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <p
          className={
            phone && !validPhone ? "show-instuctions" : "hide-instuctions"
          }
        >
          not a valid phone number
        </p>
        <label>Email : </label>
        <input
          type={"email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="on"
          className={email && !validEmail ? "invalid" : ""}
          ref={emailRef}
        />
        <p
          className={
            email && !validEmail ? "show-instuctions" : "hide-instuctions"
          }
        >
          enter a valid email
        </p>
        <div className="pass-cont">
          <label>password : </label>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={password && !validPwd ? "invalid" : ""}
            ref={pwdRef}
          />
          <span
            id={password ? "show-hide-pass" : "hide-element"}
            onClick={ShowPassword}
          >
            {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>

        <p
          className={
            password && !validPwd ? "show-instuctions" : "hide-instuctions"
          }
        >
          enter a valid password that contains at least 8 charecters and less
          than 23 charecters and capital letters and @,#,$... and numbers
        </p>
        {password && (
          <>
            <label>confirm password : </label>
            <input
              type={"password"}
              onChange={(e) => {
                setConfPwd(e.target.value);
              }}
              className={
                password && validPwd && isconfirmed
                  ? "valid"
                  : password && validPwd && !isconfirmed
                  ? "invalid"
                  : ""
              }
              value={confpwd}
              ref={confirmPwdRef}
            />
            <p
              className={
                password && validPwd && !isconfirmed
                  ? "show-instuctions"
                  : "hide-instuctions"
              }
            >
              you must enter an identical passowrds
            </p>
          </>
        )}

        {/*  */}
        <button disabled={isLoading}>Sign up</button>

        {error && <div className="error break-words">{error}</div>}
      </form>
    </>
  );
};

export default Signup;
