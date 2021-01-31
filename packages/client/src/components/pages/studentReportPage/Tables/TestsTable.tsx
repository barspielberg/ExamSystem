import React from "react";
import classes from "./Table.module.scss";
import { Question, TakenTest, Test } from "@examsystem/common";
import { useCallback } from "react";
import { calcGrade } from "../../../../services/examService";
import { Table } from "../../../uiElements";

interface ITestsTableProps {
  studentTests: TakenTest[];
  questions: Question[];
  fieldTests: Test[];
  selected: string;
  setSelected: (id: string) => void;
}
const titles = ["Test ID", "Test Name", "Grade", "Date Submited"];
const TestsTable: React.FC<ITestsTableProps> = ({
  studentTests,
  fieldTests,
  questions,
  selected,
  setSelected,
}) => {
  const getTestGrade = useCallback(
    (studentTest: TakenTest) => {
      const test = fieldTests.find((t) => t.id === studentTest.testId);
      const testQuestions = questions.filter((q) =>
        test?.questionIds.includes(q.id)
      );
      return calcGrade(studentTest, testQuestions).grade;
    },
    [questions, fieldTests]
  );

  const avg =
    studentTests.map(getTestGrade).reduce((pre, cur) => pre + cur, 0) /
    studentTests.length;

  return (
    <div className={classes.table + " " + classes.spread}>
      <div className={classes.split}>
        <span>Click a test to show its results</span>
        <b>Average grade for a test: {avg}</b>
      </div>

      <Table titles={titles}>
        {studentTests.map((t) => (
          <tr
            key={t.id}
            onClick={() => setSelected(t.id)}
            aria-selected={t.id === selected}
          >
            <td>{t.id}</td>
            <td>{t.title}</td>
            <td>{getTestGrade(t)}</td>
            <td>{t.dateSubmitted}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default TestsTable;
