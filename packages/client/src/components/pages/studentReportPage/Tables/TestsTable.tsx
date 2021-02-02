import React from "react";
import classes from "./Table.module.scss";
import { Question, TakenTest } from "@examsystem/common";
import { useCallback } from "react";
import { calcGrade } from "../../../../services/examService";
import { Table } from "../../../uiElements";

interface ITestsTableProps {
  studentTests: TakenTest[];
  questions: Question[];
  selected?: TakenTest;
  setSelected: (test: TakenTest) => void;
}
const titles = ["Test ID", "Test Name", "Grade", "Date Submited"];
const TestsTable: React.FC<ITestsTableProps> = ({
  studentTests,
  questions,
  selected,
  setSelected,
}) => {
  const getTestGrade = useCallback(
    (studentTest: TakenTest) => {
      const testQuestions = questions.filter((q) =>
        studentTest.questions
          .map((stq) => stq.oringinalQuestionId)
          .includes(q.id)
      );
      return calcGrade(studentTest, testQuestions).grade;
    },
    [questions]
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
            onClick={() => setSelected(t)}
            aria-selected={t.id === selected?.id}
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
