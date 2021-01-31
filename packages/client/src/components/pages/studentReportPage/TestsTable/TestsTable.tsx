import { Question, TakenTest, Test } from "@examsystem/common";
import React from "react";
import { useCallback } from "react";
import { calcGrade } from "../../../../services/examService";
import { Table } from "../../../uiElements";

interface ITestsTableProps {
  studentTests: TakenTest[];
  questions: Question[];
  fieldTests: Test[];
}
const titles = ["Test ID", "Test Name", "Grade", "Date Submited"];
const TestsTable: React.FC<ITestsTableProps> = ({
  studentTests,
  fieldTests,
  questions,
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

  return (
    <div>
      <Table titles={titles}>
        {studentTests.map((t) => (
          <tr key={t.id}>
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
