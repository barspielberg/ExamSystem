import React from "react";
import classes from "./FormSections.module.scss";
import { FieldOfStudy, Test } from "@examsystem/common";

interface IGeneralDetailsProps {
  test?: Test;
  fieldTitle?: string;
  onTestChange: (test: Test) => void;
}

export const GeneralDetails: React.FC<IGeneralDetailsProps> = ({
  test,
  fieldTitle,
}) => {
  return (
    <section className={classes.section}>
      <header>General Test Details</header>
      <div>Field of study: {fieldTitle}</div>
    </section>
  );
};
