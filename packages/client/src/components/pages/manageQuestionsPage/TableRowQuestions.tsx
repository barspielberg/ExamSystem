import React, { useState } from "react";
import classes from "./ManageQuestionsPage.module.scss";
import { Organization, Question, QuestionType, Test } from "@examsystem/common";
import { Button, DisplayQuestion } from "../../uiElements";
import { useHistory } from "react-router";

interface ITableRowsQuestionsProps {
  questions?: Question[];
  tests: Test[];
  organization?: Organization;
}

const TableRowsQuestions: React.FC<ITableRowsQuestionsProps> = ({
  questions,
  tests,
  organization,
}) => {
  const notEmpty = !!questions && questions.length > 0;
  const [showId, setShowId] = useState("");
  const history = useHistory();

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
        questions?.map((q) => [
          <tr key={q.id}>
            <td>{q.id}</td>
            <td style={{ textAlign: "revert" }}>
              <div>
                <h4>{q.mainTitle}</h4>
                <p>
                  {q.tags.map((t, index) => (
                    <span style={{ color: "#3399ff" }}>
                      {t} {index !== q.tags.length - 1 && "|"}
                    </span>
                  ))}
                </p>
              </div>
            </td>
            <td>{new Date(q.lastUpdate).toLocaleDateString()}</td>
            <td>{QuestionType[q.type]}</td>
            <td> {numberOfTest(q, tests)} </td>
            <td className={classes.btns}>
              <Button
                onClick={() =>
                  history.push(
                    `/EditQuestion/?organizationId=${organization?.id}&questionId=${q.id}`
                  )
                }
              >
                Edit
              </Button>
              <Button onClick={() => setShowId(showId === q.id ? "" : q.id)}>
                {showId === q.id ? "Shrink" : "Show"}
              </Button>
            </td>
          </tr>,
          showId === q.id && (
            <tr key={q.id + 5}>
              <td style={{ textAlign: "start" }} colSpan={6}>
                <DisplayQuestion question={q} />
              </td>
            </tr>
          ),
        ])}
    </React.Fragment>
  );
};

export default TableRowsQuestions;
