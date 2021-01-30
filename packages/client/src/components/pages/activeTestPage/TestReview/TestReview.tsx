import classes from "./TestReview.module.scss";
import { Question, TakenTest, Test } from "@examsystem/common";
import React from "react";
import { Header } from "../../../uiElements";

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
  return (
    <div className={classes.page}>
      <Header>{orig.title}</Header>
      <h2>{orig.title} - Results</h2>
      <div className={classes.report}>
        <label>Your Grade: </label>
        <span>{555}</span>
        <label>Status: </label>
        <span>{555}</span>
        <label>Summary: </label>
        <span>
          You answerd {} question currectly out of {orig.questionIds.length}{" "}
          questions in total.
        </span>
        <label>Passing Grade: </label>
        <span>The minimum grade to pass this test is {orig.passingGrade}</span>
      </div>
    </div>
  );
};

export default TestReview;

const getNumOfCorrectQuestions = (
  studentTest: TakenTest,
  originalTest: Test
) => {};
