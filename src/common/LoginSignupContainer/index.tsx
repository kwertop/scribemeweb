import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

const LoginSignupContainer = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default LoginSignupContainer;
