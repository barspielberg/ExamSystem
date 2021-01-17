import { Organization } from "@examsystem/common";
import React from "react";

interface ISelectOrganizationProps {
  Organizations: Organization[];
  onChange: (selcted: Organization | undefined) => void;
}

const SelectOrganization: React.FC<ISelectOrganizationProps> = ({
  Organizations,
  onChange,
}) => {
  const changHandler = (id: string) => {
    onChange(Organizations.find((o) => o.id === id));
  };
  return (
    <select onChange={(e) => changHandler(e.target.value)}>
      {Organizations.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOrganization;
