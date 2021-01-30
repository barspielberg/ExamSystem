import classes from "./TestReview.module.scss";
import { Question, TakenTest, Test } from "@examsystem/common";
import React from "react";
import { Button, Header } from "../../../uiElements";
import { calcGrade } from "../../../../services/examService";
import ReviewAnswers from "./ReviewAnswers/ReviewAnswers";

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
        <b className={passed ? classes.pass : classes.fail}>{grade}</b>
        <label>Status: </label>
        <b className={passed ? classes.pass : classes.fail}>
          {passed ? "Passed" : "Fail"}
        </b>
        <label>Summary: </label>
        <span>
          You answerd <b>{numOfCurrect}</b> question currectly out of{" "}
          <b>{ques.length}</b> questions in total.
        </span>
        <label>Passing Grade: </label>
        <span>
          The minimum grade to pass this test is <b>{orig.passingGrade}</b>
        </span>
      </div>
      <Button>Review Your Answers</Button>
      <ReviewAnswers studetTest={stu} questions={ques} />
    </div>
  );
};

export default TestReview;
