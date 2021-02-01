import React, { useEffect } from "react";
import classes from "./TestRespondent.module.scss";
import { Table } from "../../../uiElements";
import { Question, TakenTest, Test } from "@examsystem/common";
import TableRowRespondent from "./TableRowRespondent";

interface ITestRespondentProps {
  takenTests: TakenTest[] | undefined;
  selectedTestQuestions: Question[] | undefined;
}

const TestRespondent: React.FC<ITestRespondentProps> = ({
  takenTests,
  selectedTestQuestions
}) => {
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
          selectedTestQuestions={selectedTestQuestions}
        />
      </Table>
    </div>
  );
};

export default TestRespondent;
