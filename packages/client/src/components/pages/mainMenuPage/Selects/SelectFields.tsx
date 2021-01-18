import React from "react";
import { FieldOfStudy } from "@examsystem/common";
import classes from "./Selects.module.scss";

interface ISelectFieldsProps {
  fields?: FieldOfStudy[];
  onChange: (selcted: FieldOfStudy | undefined) => void;
}

export const SelectFields: React.FC<ISelectFieldsProps> = ({
  fields,
  onChange,
}) => {
  const changHandler = (id: string) => {
    onChange(fields?.find((f) => f.id === id));
  };
  return (
    <select
      className={classes.select}
      onChange={(e) => changHandler(e.target.value)}
    >
      {fields?.map((f) => (
        <option key={f.id} value={f.id}>
          {f.title}
        </option>
      ))}
    </select>
  );
};
