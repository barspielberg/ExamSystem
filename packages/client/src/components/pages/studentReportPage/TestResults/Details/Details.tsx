import classes from "./Details.module.scss";
import { Question, TakenTest } from "@examsystem/common";
import React from "react";
import { Table } from "../../../../uiElements";
import { useState } from "react";

interface IDetailsProps {
  test: TakenTest;
  answers: Question[];
}
const titles = ["ID", "Qusetion", "Answered Correctly"];
const Details: React.FC<IDetailsProps> = ({ answers, test }) => {
  const [extendIds, setExtendIds] = useState<string[]>([]);
  const extendHandler = (id: string) => {
    setExtendIds((ids) => {
      if (ids.includes(id)) return ids.filter((i) => i !== id);
      return [...ids, id];
    });
  };
  return (
    <div className={classes.details}>
      <h3>Details</h3>
      <p>
        Click a question to see which of its answers were selected and whether
        they were correct, or click "Expand All" to see it for all questions.
      </p>
      <Table titles={titles}>
        {answers.map((a) => [
          <tr key={a.id} onClick={() => extendHandler(a.id)}>
            <td>{a.id}</td>
            <td>{a.mainTitle}</td>
            <td>{a.id}</td>
          </tr>,
          extendIds.includes(a.id) && (
            <tr key={a.id + "522"} onClick={() => extendHandler(a.id)}>
              <td colSpan={3} className={classes.full}>
                <h5>Answers:</h5>
                {a.possibleAnswers.map((p) => (
                  <div
                    key={p.id}
                    className={getAnswerClasses(
                      p.correct,
                      test.questions
                        .find((qu) => qu.oringinalQuestionId === a.id)
                        ?.possibleAnswers.find((pa) => pa.id === p.id)?.correct
                    )}
                  >
                    {p.content}
                  </div>
                ))}
              </td>
            </tr>
          ),
        ])}
      </Table>
    </div>
  );
};

export default Details;

const getAnswerClasses = (right?: boolean, chosen?: boolean) => {
  if (right && chosen) return classes.success;
  if (!right && chosen) return classes.wrong;
  if (right) return classes.correct;
  return "";
};
