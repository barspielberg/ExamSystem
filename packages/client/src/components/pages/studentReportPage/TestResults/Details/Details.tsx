import classes from "./Details.module.scss";
import { Question, TakenTest } from "@examsystem/common";
import React from "react";
import { Button, Table } from "../../../../uiElements";
import { useState } from "react";

interface IDetailsProps {
  test: TakenTest;
  answers: Question[];
}
const titles = ["ID", "Qusetion", "Answered Correctly"];
const Details: React.FC<IDetailsProps> = ({ answers, test }) => {
  const [expandIds, setExpandIds] = useState<string[]>([]);
  const expandHandler = (id: string) => {
    setExpandIds((ids) => {
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
      <Button onClick={() => setExpandIds(answers.map((a) => a.id))}>
        Expand All
      </Button>
      <Table titles={titles}>
        {answers.map((a) => [
          <tr key={a.id} onClick={() => expandHandler(a.id)}>
            <td>{a.id}</td>
            <td>{a.mainTitle}</td>
            <td>{getStatus(a, test)}</td>
          </tr>,
          expandIds.includes(a.id) && (
            <tr key={a.id + "522"} onClick={() => expandHandler(a.id)}>
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
const getStatus = (answer: Question, test: TakenTest) => {
  const studentAnswer = test.questions.find(
    (q) => q.oringinalQuestionId === answer.id
  );

  const studentSelections = studentAnswer?.possibleAnswers
    .filter((p) => p.correct)
    .map((p) => p.id);
  const corrects = answer.possibleAnswers
    .filter((p) => p.correct)
    .map((p) => p.id);

  return corrects.every((c) => studentSelections?.includes(c)) &&
    studentSelections?.every((c) => corrects.includes(c))
    ? "Correct"
    : "False";
};
