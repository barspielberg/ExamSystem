import classes from "./StudentTest.module.scss";
import React from "react";
import { TakenTest } from "@examsystem/common";
import { Header } from "../../../uiElements";
import TestQuestion from "./TestQuestion/TestQuestion";
import { useState } from "react";
import Stepper, { step } from "./Stepper/Stepper";
import { useMemo } from "react";

interface IStudentTestProps {
  test: TakenTest;
  testUpdated: (queIndex: number, selected: string[]) => Promise<void>;
}

const StudentTest: React.FC<IStudentTestProps> = ({ test, testUpdated }) => {
  const [queIndex, setQueIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const steps: step[] = useMemo(
    () =>
      test.questions.reduce(
        (pre, cur, i) => [
          ...pre,
          { index: i, ok: cur.possibleAnswers.some((a) => a.correct) },
        ],
        Array<step>()
      ),
    [test]
  );
  const done = steps.every((s) => s.ok);
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
        steps={steps}
        max={test.questions.length - 1}
        done={done}
        moveTo={moveTo}
      />
    </div>
  );
};

export default StudentTest;
