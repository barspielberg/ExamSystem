import React from "react";
import classes from "./FormSections.module.scss";
import { Test } from "@examsystem/common";

interface IQuestionsSectionProps {
  test: Test;
  onTestChange: (test: Test) => void;
}

export const QuestionsSection: React.FC<IQuestionsSectionProps> = ({}) => {
  return (
    <section className={classes.section}>
      <header>Questions</header>
    </section>
  );
};
