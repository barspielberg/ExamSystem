import { Question, TakenTest } from "@examsystem/common";
import React from "react";

interface IQuestionStatisticsRowProps {
  questions: Question[] | undefined;
  takenTests: TakenTest[] | undefined;
}

const QuestionStatisticsRow: React.FC<IQuestionStatisticsRowProps> = ({
  questions,
  takenTests,
}) => {
  // const notEmpty = !!questions && questions.length > 0;

  return (
    <React.Fragment>
      {/* {notEmpty &&
        questions?.map((question) => [
          <tr>
            <td>{question.id}</td>
            <td>
              {question.mainTitle}
            </td>
            <td>{#TODO get number of question submitions}</td>
            <td>{#TODO Aswered correctly %}</td>
          </tr>;
        ])} */}
      {/* test purpose only  */}
      <tr>
        <td>7</td>
        <td>question text and tags</td>
        <td>17</td>
        <td>47%</td>
      </tr>
    </React.Fragment>
  );
};

export default QuestionStatisticsRow;
