import React from "react";
import { Organization } from "@examsystem/common";
import classes from "./Selects.module.scss";

interface ISelectOrganizationProps {
  organizations: Organization[];
  onChange: (selcted: Organization | undefined) => void;
}

export const SelectOrganization: React.FC<ISelectOrganizationProps> = ({
  organizations,
  onChange,
}) => {
  const changHandler = (id: string) => {
    onChange(organizations.find((o) => o.id === id));
  };
  return (
    <select
      className={classes.select}
      onChange={(e) => changHandler(e.target.value)}
    >
      {organizations.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
};
