import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

export const FormField = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);
