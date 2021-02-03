import React, { useState } from "react";
import classes from "./TestRespondent.module.scss";
import { Table } from "../../../uiElements";
import { Question, TakenTest } from "@examsystem/common";
import TableRowRespondent, { Respondent } from "./TableRowRespondent";
import Details from "../../studentReportPage/TestResults/Details/Details";

interface ITestRespondentProps {
  takenTests: TakenTest[] | undefined;
  answers: Question[] | undefined;
}

const TestRespondent: React.FC<ITestRespondentProps> = ({
  takenTests,
  answers,
}) => {
  const [selectedRespondent, setSelectedRespondent] = useState<Respondent>();

  const titles = [
    "Email",
    "Respondent",
    "Submitted",
    "Number of Questions Answered",
    "Grade",
  ];

  return (
    <div className={classes.main}>
      <h2>Respondent Grade and Answers</h2>
      <p>click a name from the list to see respondent's test</p>
      <Table titles={titles}>
        <TableRowRespondent
          takenTests={takenTests}
          answers={answers}
          setSelectedRespondent={setSelectedRespondent}
        />
      </Table>
      {selectedRespondent && answers && (
        <Details
          answers={answers}
          test={
            takenTests?.find(
              (tt) => tt.student.email === selectedRespondent.email
            )!
          }
        />
      )}
    </div>
  );
};

export default TestRespondent;
