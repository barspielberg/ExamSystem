import React from "react";
import classes from "./Header.module.scss";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default Header;
