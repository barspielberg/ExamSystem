import classes from "./StudentTest.module.scss";
import React from "react";
import { TakenTest } from "@examsystem/common";
import { Button, Header } from "../../../uiElements";
import TestQuestion from "./TestQuestion/TestQuestion";
import { useState } from "react";

interface IStudentTestProps {
  test: TakenTest;
  testUpdated: (queIndex: number, selected: string[]) => void;
}

const StudentTest: React.FC<IStudentTestProps> = ({ test, testUpdated }) => {
  const [queIndex, setQueIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const nextQue = (goBack?: boolean) => {
    testUpdated(queIndex, selected);
    if (goBack) setQueIndex((i) => i - 1);
    else setQueIndex((i) => i + 1);
  };
  return (
    <div className={classes.page}>
      <Header>{test.title}</Header>
      <TestQuestion
        question={test.questions[queIndex]}
        {...{ selected, setSelected }}
      />
      <Button disabled={queIndex <= 0} onClick={() => nextQue(true)}>
        Pre
      </Button>
      <Button
        disabled={queIndex >= test.questions.length - 1}
        onClick={() => nextQue()}
      >
        Next
      </Button>
    </div>
  );
};

export default StudentTest;
