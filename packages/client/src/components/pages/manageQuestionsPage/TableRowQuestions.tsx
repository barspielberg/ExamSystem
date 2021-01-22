import React from "react";
import classes from "./ManageQuestionsPage.module.scss";
import { Question, QuestionType } from "@examsystem/common";
import { Button } from "../../uiElements";
import { useHistory } from "react-router";
import { useParams } from "../../../hooks";

interface ITableRowsQuestionsProps {
  questions?: Question[];
}

const TableRowsQuestions: React.FC<ITableRowsQuestionsProps> = ({
  questions,
}) => {
  const notEmpty = !!questions && questions.length > 0;
  const { fieldId, organizationId } = useParams();
  const history = useHistory();

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
            <td> 0 </td>
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
