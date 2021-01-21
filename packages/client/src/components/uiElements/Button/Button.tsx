import React from "react";
import classes from "./Button.module.scss";

interface IButtonProps {
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  disabled?: boolean;
  success?: boolean;
  danger?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  disabled,
  success,
  danger,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${classes.btn} ${danger ? classes.danger : ""} ${
        success ? classes.success : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
