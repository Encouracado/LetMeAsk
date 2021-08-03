import { ButtonHTMLAttributes } from "react";
import "../../styles/theme.scss";
import { StyledButton } from "./buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined, ...props }: ButtonProps) {
  return (
    <StyledButton
      className={`button ${isOutlined ? "outlined" : ""}`}
      {...props}
    />
  );
}
