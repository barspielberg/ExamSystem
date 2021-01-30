import classes from "./TestSummary.module.scss";
import React, { useEffect, useState } from "react";
import { Question, TakenTest, Test } from "@examsystem/common";
import { calcGrade } from "../../../../services/examService";

interface ITestSummaryProps {
  selectedTest: Test | undefined;
  selectedTestQuestions: Question[] | undefined;
  takenTests: TakenTest[] | undefined;
  dateFrom: string;
  dateTo: string;
  numofSub: number;
}

const TestSummary: React.FC<ITestSummaryProps> = ({
  selectedTest,
  selectedTestQuestions,
  takenTests,
  dateFrom,
  dateTo,
  numofSub,
}) => {
  const [numofPassed, setNumofPassed] = useState(0);
  const [avgGrade, setAvgGrade] = useState(0);

  useEffect(() => {
    let sumofgrades = 0;
    if (selectedTestQuestions && selectedTest)
      takenTests?.map((tt) => {
        const { grade } = calcGrade(tt, selectedTestQuestions);
        sumofgrades += grade;
        if (grade >= selectedTest?.passingGrade)
          setNumofPassed(numofPassed + 1);
      });
    setAvgGrade(sumofgrades / numofSub);
  }, [selectedTest]);

  return (
    <div className={classes.main}>
      {/* #TODO change to test.title after bar merges*/}
      <h1>
        Test Report: <span className={classes.fieldTitle}>Test Title</span>
      </h1>
      <div>
        <h2>Summary</h2>
        <div className={classes.parent}>
          <div className={classes.div1}>
            Test Name: <strong>{selectedTest?.title}</strong>
          </div>
          <div className={classes.div2}>
            Test ID: <strong>{selectedTest?.id}</strong>
          </div>
          <div className={classes.div3}>
            Number of Questions:{" "}
            <strong>{selectedTest?.questionIds.length}</strong>
          </div>
          <div className={classes.div4}>
            Passing Grade: <strong>{selectedTest?.passingGrade}</strong>
          </div>
          <div className={classes.div5}>
            Date Range:{" "}
            <strong>
              {dateFrom} - {dateTo}
            </strong>
          </div>
          <div className={classes.div6}>
            Number of Submissions: <strong>{numofSub}</strong>
          </div>
          <div className={classes.div7}>
            Number of Respondents Passed: <strong>{numofPassed}</strong>
          </div>
          <div className={classes.div8}>
            Passing Percentage:{" "}
            <strong>{(numofPassed / numofSub) * 100}</strong>
          </div>
          <div className={classes.div9}>
            Average Grade: <strong>{avgGrade}</strong>
          </div>
          <div className={classes.div10}>
            Median Grade: <strong>{}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
