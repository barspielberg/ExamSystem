import classes from "./StudentTest.module.scss";
import React from "react";
import { TakenTest } from "@examsystem/common";
import { Header } from "../../../uiElements";
import TestQuestion from "./TestQuestion/TestQuestion";
import { useState } from "react";
import Stepper from "./Stepper/Stepper";

interface IStudentTestProps {
  test: TakenTest;
  testUpdated: (queIndex: number, selected: string[]) => Promise<void>;
}

const StudentTest: React.FC<IStudentTestProps> = ({ test, testUpdated }) => {
  const [queIndex, setQueIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const moveTo = async (index: number) => {
    await testUpdated(queIndex, selected);
    setQueIndex(index);
  };
  return (
    <div className={classes.page}>
      <Header>{test.title}</Header>
      <TestQuestion
        question={test.questions[queIndex]}
        {...{ selected, setSelected }}
      />
      <Stepper
        current={queIndex}
        max={test.questions.length - 1}
        moveTo={moveTo}
      />
    </div>
  );
};

export default StudentTest;
