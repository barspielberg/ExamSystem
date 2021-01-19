import React from "react";
import classes from "./Header.module.scss";

interface IHeaderProps {
  warning?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ children, warning }) => {
  return (
    <div className={`${classes.main} ${warning ? classes.warning : ""}`}>
      {children}
    </div>
  );
};
