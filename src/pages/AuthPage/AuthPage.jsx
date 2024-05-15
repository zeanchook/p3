import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useState } from "react";

export default function AuthPage({setUser}) {
  const [state, setLoginState] = useState("signup");
  return  <>
  {state === "signup" ? <SignUpForm setUser={setUser} setLoginState={setLoginState}/> : 
  <LoginForm setUser={setUser} setLoginState={setLoginState}/>}
  </>;
}
