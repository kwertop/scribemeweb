import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

export const LoginFooter = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);
