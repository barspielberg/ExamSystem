import classes from "./TestReview.module.scss";
import { Question, TakenTest, Test } from "@examsystem/common";
import React from "react";
import { Header } from "../../../uiElements";
import { calcGrade } from "../../../../services/examService";

interface ITestReviewProps {
  studentTest: TakenTest;
  originalTest: Test;
  questions: Question[];
}

const TestReview: React.FC<ITestReviewProps> = ({
  originalTest: orig,
  studentTest: stu,
  questions: ques,
}) => {
  const { grade, numOfCurrect } = calcGrade(stu, ques);
  const passed = grade >= orig.passingGrade;
  return (
    <div className={classes.page}>
      <Header>{orig.title}</Header>
      <h2>{orig.title} - Results</h2>
      <div className={classes.report}>
        <label>Your Grade: </label>
        <span>{grade}</span>
        <label>Status: </label>
        <span>{passed ? "Passed" : "Fail"}</span>
        <label>Summary: </label>
        <span>
          You answerd {numOfCurrect} question currectly out of {ques.length}{" "}
          questions in total.
        </span>
        <label>Passing Grade: </label>
        <span>The minimum grade to pass this test is {orig.passingGrade}</span>
      </div>
    </div>
  );
};

export default TestReview;
