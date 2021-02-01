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
  anyDate: boolean;
  numofSub: number;
  setTakenTests: any;
}

const TestSummary: React.FC<ITestSummaryProps> = ({
  selectedTest,
  selectedTestQuestions,
  takenTests,
  dateFrom,
  dateTo,
  anyDate,
  numofSub,
  setTakenTests,
}) => {
  const [numofPassed, setNumofPassed] = useState(0);
  const [avgGrade, setAvgGrade] = useState(0);
  const [medianGrade, setMedianGrade] = useState(0);

  useEffect(() => {
    if (
      selectedTest &&
      takenTests &&
      takenTests.length > 0 &&
      selectedTestQuestions &&
      selectedTestQuestions?.length > 0
    ) {
      const { numofPassed, average, median } = calulateStatistics(
        takenTests,
        selectedTest,
        selectedTestQuestions
      );
      setNumofPassed(numofPassed);
      setAvgGrade(average);
      setMedianGrade(median);
    } else {
      setNumofPassed(0);
      setAvgGrade(0);
      setMedianGrade(0);
    }
  }, [selectedTest, takenTests, selectedTestQuestions]);

  return (
    <div className={classes.main}>
      <h1>
        Test Report:{" "}
        <span className={classes.fieldTitle}>{selectedTest?.title}</span>
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
            <strong>{numofPassed && (numofPassed / numofSub) * 100}%</strong>
          </div>
          <div className={classes.div9}>
            Average Grade: <strong>{avgGrade}</strong>
          </div>
          <div className={classes.div10}>
            Median Grade: <strong>{medianGrade}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;

const calulateStatistics = (
  takenTests: TakenTest[],
  selectedTest: Test,
  selectedTestQuestions: Question[]
): { numofPassed: number; average: number; median: number } => {
  let passed = 0;
  let grades: number[] = [];

  takenTests.reduce((prev, cur) => {
    const { grade } = calcGrade(cur, selectedTestQuestions);
    grades.push(grade);
    if (grade >= selectedTest.passingGrade) passed += 1;

    return prev;
  }, takenTests);
  const avg = grades.reduce((sum, val) => (sum += val)) / takenTests.length;
  const median = calcMedian(grades);
  return { numofPassed: passed, average: avg, median: median };
};

const calcMedian = (arr: number[]): number => {
  const arrSort = arr.sort();
  const mid = Math.ceil(arrSort.length / 2);

  return arrSort.length % 2 == 0
    ? (arrSort[mid] + arrSort[mid - 1]) / 2
    : arrSort[mid - 1];
};
