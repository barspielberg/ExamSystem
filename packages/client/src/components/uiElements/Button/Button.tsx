import React from "react";
import classes from "./Button.module.scss";

interface IButtonProps {
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  disabled?: boolean;
  danger?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  disabled,
  danger,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${classes.btn} ${danger ? classes.danger : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
