import React, { useState } from "react";

import { Alignment, AnsweredQuestion, QuestionType } from "@examsystem/common";
import classes from "./TestQuestion.module.scss";

interface ITestQuestionProps {
  question: AnsweredQuestion;
}

const TestQuestion: React.FC<ITestQuestionProps> = ({ question: que }) => {
  const horizontal = que.alignment === Alignment.horizontal;
  const radio = que.type === QuestionType.singleChoiceQuestion;

  const currentIds = que.possibleAnswers.reduce(
    (pre, cur) => (cur.correct ? [...pre, cur.id] : pre),
    Array<string>()
  );
  const [selected, setSelected] = useState<string[]>(currentIds);

  const changeHandler = (checked: boolean, id: string) => {
    if (radio) setSelected([id]);
    else setSelected((s) => (checked ? [...s, id] : s.filter((i) => i !== id)));
  };

  return (
    <div>
      <h3>{que.mainTitle}</h3>
      <h4>{que.secondaryTitle}</h4>
      <div
        className={classes.answers}
        style={{ flexDirection: horizontal ? "row" : "column" }}
      >
        {que.possibleAnswers.map((a) => (
          <div key={a.id}>
            <input
              id={a.id}
              type={radio ? "radio" : "checkbox"}
              name={que.oringinalQuestionId}
              onChange={(e) => changeHandler(e.target.checked, a.id)}
              checked={selected.includes(a.id)}
            />
            <label htmlFor={a.id}>{a.content}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestQuestion;
