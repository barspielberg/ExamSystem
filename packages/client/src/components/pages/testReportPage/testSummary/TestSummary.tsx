import classes from "./TestSummary.module.scss";
import React from "react";
import { Test } from "@examsystem/common";

interface ITestSummaryProps {
  selectedTest: Test | undefined;
  dateFrom: string;
  dateTo: string;
}

const TestSummary: React.FC<ITestSummaryProps> = ({
  selectedTest,
  dateFrom,
  dateTo,
}) => {
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
            Number of Submissions: <strong>27</strong>
          </div>
          <div className={classes.div7}>
            Number of Respondents Passed: <strong>7</strong>
          </div>
          <div className={classes.div8}>
            Passing Percentage: <strong>17%</strong>
          </div>
          <div className={classes.div9}>
            Average Grade: <strong>77</strong>
          </div>
          <div className={classes.div10}>
            Median Grade: <strong>71</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
