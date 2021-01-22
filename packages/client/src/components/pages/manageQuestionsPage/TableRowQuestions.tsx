import React from "react";
import classes from "./ManageQuestionsPage.module.scss";
import { Question, QuestionType, Test } from "@examsystem/common";
import { Button } from "../../uiElements";
import { useHistory } from "react-router";

interface ITableRowsQuestionsProps {
  questions?: Question[];
  tests: Test[];
}

const TableRowsQuestions: React.FC<ITableRowsQuestionsProps> = ({
  questions,
  tests,
}) => {
  const notEmpty = !!questions && questions.length > 0;
  // const { fieldId, organizationId } = useParams();
  const history = useHistory();
  // console.log(questions);
  const numberOfTest = (ques: Question, tests: Test[]): number => {
    let counter = 0;
    for (let index = 0; index < tests.length; index++) {
      if (tests[index].questionIds.includes(ques.id)) counter += 1;
    }

    return counter;
  };

  return (
    <React.Fragment>
      {notEmpty &&
        questions?.map((q, index) => (
          <tr key={index}>
            <td>{q.id}</td>
            <td>
              {q.mainTitle} {q.tags}
            </td>
            <td>{new Date(q.lastUpdate).toLocaleDateString()}</td>
            <td>{QuestionType[q.type]}</td>
            <td> {numberOfTest(q, tests)} </td>
            <td className={classes.btns}>
              <Button
                onClick={
                  () => history.push("") //TODO push to edit question
                }
              >
                Edit
              </Button>
              <Button>show</Button>
            </td>
          </tr>
        ))}
    </React.Fragment>
  );
};

export default TableRowsQuestions;
