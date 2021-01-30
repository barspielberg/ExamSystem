import { AnsweredQuestion, TakenTest, Test } from "@examsystem/common";
import React from "react";

interface ITableRowRespondentProps {
  takenTests: TakenTest[] | undefined;
  originalTest: Test | undefined;
}

const TableRowRespondent: React.FC<ITableRowRespondentProps> = ({
  takenTests,
  originalTest,
}) => {
  const notEmpty = !!takenTests && takenTests.length > 0;

  const calculateGrade = (questinsAnswered: AnsweredQuestion[]) => {
    return 8;
  };

  return (
    <React.Fragment>
      {/* {notEmpty &&
        takenTests?.map((test) => {
          <tr>
            <td>{test.student.email}</td>
            <td>
              {test.student.firstName} {test.student.lastName}
            </td>
            <td>{test.dateSubmitted}</td>
            <td>{test.questions.length}</td>
            <td>{calculateGrade(test.questions)}</td>
          </tr>;
        })} */}
        {/* test purpose only  */}
        <tr>
            <td>teest@test.com</td>
            <td>
              michael tolchinsky
            </td>
            <td>27/01/1999</td>
            <td>13</td>
            <td>77</td>
          </tr>
    </React.Fragment>
  );
};

export default TableRowRespondent;
