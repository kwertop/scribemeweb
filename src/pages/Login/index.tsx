import { lazy } from "react";

const LoginSignupContainer = lazy(() => import("../../common/LoginSignupContainer"));
const LoginForm = lazy(() => import("../../components/LoginForm"));

const Login = () => {
  return (
    <LoginSignupContainer>
      <LoginForm id="login-form"/>
    </LoginSignupContainer>
  );
}

export default Login;