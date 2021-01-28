import classes from "./TestSummary.module.scss";
import React from "react";
import { TakenTest } from "@examsystem/common";

interface ITestSummaryProps {
  selectedTest: TakenTest | undefined;
  dateFrom: string;
  dateTo: string;
}

const TestSummary: React.FC<ITestSummaryProps> = ({
  selectedTest,
  dateFrom,
  dateTo
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
            Test Name: <strong>Test Name</strong>
          </div>
          <div className={classes.div2}>
            Test Code: <strong>666</strong>
          </div>
          <div className={classes.div3}>
            Test ID: <strong>Test ID</strong>
          </div>
          <div className={classes.div4}>
            Test Type: <strong>Some kind of typr</strong>
          </div>
          <div className={classes.div5}>
            Number of Questions: <strong>17</strong>
          </div>
          <div className={classes.div6}>
            Passing Grade: <strong>77</strong>
          </div>
          <div className={classes.div7}>
            Date Range:{" "}
            <strong>
              {dateFrom} - {dateTo}
            </strong>
          </div>
          <div className={classes.div8}>
            Number of Submissions: <strong>27</strong>
          </div>
          <div className={classes.div9}>
            Number of Respondents Passed: <strong>7</strong>
          </div>
          <div className={classes.div10}>
            Passing Percentage: <strong>17%</strong>
          </div>
          <div className={classes.div11}>
            Average Grade: <strong>77</strong>
          </div>
          <div className={classes.div12}>
            Median Grade: <strong>71</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
