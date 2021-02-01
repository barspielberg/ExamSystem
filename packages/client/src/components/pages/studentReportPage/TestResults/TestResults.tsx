import classes from "./TestResults.module.scss";
import { Question, TakenTest } from "@examsystem/common";
import React from "react";
import { calcGrade } from "../../../../services/examService";
import Details from "./Details/Details";

interface ITestResultsProps {
  test: TakenTest;
  fieldQuestions: Question[];
  passingGrade: number;
}

const TestResults: React.FC<ITestResultsProps> = ({
  fieldQuestions,
  test,
  passingGrade,
}) => {
  const answers = fieldQuestions.filter((q) =>
    test.questions.map((stq) => stq.oringinalQuestionId).includes(q.id)
  );
  const { grade, numOfCurrect } = calcGrade(test, answers);

  return (
    <div>
      <h2>
        Test Results for <span className={classes.orenge}>{test.title}</span>
      </h2>
      <h3>
        Respondent:{" "}
        <span className={classes.orenge}>
          {test.student.firstName} {test.student.lastName}
        </span>
      </h3>
      <br />
      <h3>Summary</h3>
      <div className={classes.grid}>
        <div>
          Test Name: <b>{test.title}</b>
        </div>
        <div>
          Submited: <b>{test.dateSubmitted}</b>
        </div>
        <div>
          Test Id: <b>{test.testId}</b>
        </div>
        <div>
          Number Of Questions Submitted: <b>{test.questions.length}</b>
        </div>
        <div>
          Student Test Id: <b>{test.id}</b>
        </div>
        <div>
          Number Of Currect Answers: <b>{numOfCurrect}</b>
        </div>
        <div>
          Passing Grade: <b>{passingGrade}</b>
        </div>
        <div>
          Final Grade: <b>{grade}</b>
        </div>
        <div>
          Status: <b>{grade >= passingGrade ? "Passed" : "Fail"}</b>
        </div>
      </div>
      <br />
      <Details test={test} answers={answers} />
    </div>
  );
};

export default TestResults;
