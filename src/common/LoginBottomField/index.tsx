import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

export const LoginBottomField = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);
