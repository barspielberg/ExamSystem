import React from "react";
import classes from "./Table.module.scss";

interface ITableProps {
  titles: string[];
}

export const Table: React.FC<ITableProps> = ({ titles, children }) => {
  return (
    <table className={classes.Table}>
      <thead>
        <tr>
          {titles.map((t, index) => (
            <th key={index}>{t}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
