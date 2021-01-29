import classes from "./StudentTest.module.scss";
import React from "react";
import { TakenTest } from "@examsystem/common";
import { Header } from "../../../uiElements";
import TestQuestion from "./TestQuestion/TestQuestion";

interface IStudentTestProps {
  test: TakenTest;
}

const StudentTest: React.FC<IStudentTestProps> = ({ test }) => {
  return (
    <div className={classes.page}>
      <Header>{test.title}</Header>
      <TestQuestion question={test.questions[0]} />
    </div>
  );
};

export default StudentTest;
