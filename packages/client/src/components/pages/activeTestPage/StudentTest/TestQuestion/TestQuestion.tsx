import React from "react";
import { Alignment, AnsweredQuestion, QuestionType } from "@examsystem/common";
import classes from "./TestQuestion.module.scss";
import { useMemo } from "react";
import { useEffect } from "react";

interface ITestQuestionProps {
  question: AnsweredQuestion;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const TestQuestion: React.FC<ITestQuestionProps> = ({
  question: que,
  selected,
  setSelected,
}) => {
  const horizontal = que.alignment === Alignment.horizontal;
  const radio = que.type === QuestionType.singleChoiceQuestion;

  const currentIds = useMemo(
    () =>
      que.possibleAnswers.reduce(
        (pre, cur) => (cur.correct ? [...pre, cur.id] : pre),
        Array<string>()
      ),
    [que]
  );

  useEffect(() => setSelected(currentIds), [setSelected, currentIds]);

  const changeHandler = (checked: boolean, id: string) => {
    if (radio) setSelected([id]);
    else setSelected((s) => (checked ? [...s, id] : s.filter((i) => i !== id)));
  };

  return (
    <div className={classes.que}>
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
