import { Organization } from "@examsystem/common";
import React from "react";

interface ISelectOrganizationProps {
  organizations: Organization[];
  onChange: (selcted: Organization | undefined) => void;
}

const SelectOrganization: React.FC<ISelectOrganizationProps> = ({
  organizations,
  onChange,
}) => {
  const changHandler = (id: string) => {
    onChange(organizations.find((o) => o.id === id));
  };
  return (
    <select onChange={(e) => changHandler(e.target.value)}>
      {organizations.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOrganization;
