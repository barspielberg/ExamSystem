import classes from "./TestReportForm.module.scss";
import React from "react";
import { Button } from "../../../uiElements";
import { Test } from "@examsystem/common";

interface ITestReportFormProps {
  tests: Test[] | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  anyDate: boolean;
  selectedTest: Test | undefined;
  setSelectedTest: any;
  setDateFrom: any;
  setDateTo: any;
  setAnyDate: any;
  goBack: any;
}

const TestReportForm: React.FC<ITestReportFormProps> = ({
  tests,
  dateFrom,
  dateTo,
  anyDate,
  selectedTest,
  setSelectedTest,
  setDateFrom,
  setDateTo,
  setAnyDate,
  goBack,
}) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <section className={classes.section}>
      <form className={classes.inputs} onSubmit={handleSubmit}>
        <div className={classes.parent}>
          <div className={classes.div1}>
            <select
              className={classes.select}
              onChange={(e) =>
                setSelectedTest(tests?.find((t) => t.id === e.target.value))
              }
            >
              <option>Select a test please</option>
              {tests?.map((test) => {
                return (
                  <option key={test.id} value={test.id}>
                    {test.title}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className={classes.div2}>
            <label>Select Test: </label>{" "}
          </div>
          <div className={classes.div3}>
            <label>Date Range: </label>{" "}
          </div>
          <div className={classes.div4}>
            <label>From: </label>
            <input
              type="Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />{" "}
          </div>
          <div className={classes.div5}>
            <label>To: </label>
            <input
              type="Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />{" "}
          </div>
          <div className={classes.div6}>
            <strong>Or</strong>
          </div>
          <div className={classes.div7}>
            <input
              type="checkbox"
              name="anyDate"
              checked={anyDate}
              onChange={() => setAnyDate(!anyDate)}
            />
            <label> Any Date In The Past</label>
          </div>
          <div className={classes.div8}>
            <Button onClick={goBack}>« Back</Button>{" "}
          </div>
          <div className={classes.div9}>
            <Button submit>Generate Report</Button>{" "}
          </div>
        </div>
      </form>
    </section>
  );
};

export default TestReportForm;
