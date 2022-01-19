import { lazy } from "react";

const LoginSignupContainer = lazy(() => import("../../common/LoginSignupContainer"));
const SignupForm = lazy(() => import("../../components/SignupForm"));

const Signup = () => {
  return (
    <LoginSignupContainer>
      <SignupForm id="signup-form"/>
    </LoginSignupContainer>
  );
}

export default Signup;