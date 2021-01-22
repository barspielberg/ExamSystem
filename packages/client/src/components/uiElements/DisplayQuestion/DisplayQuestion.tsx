import { Alignment, Question } from "@examsystem/common";
import React from "react";
import { useState } from "react";
import classes from "./DisplayQuestion.module.scss";

interface IDisplayQuestionProps {
  question: Question;
}

export const DisplayQuestion: React.FC<IDisplayQuestionProps> = ({
  question: q,
}) => {
  return (
    <div className={classes.que}>
      <h4>{q.mainTitle}</h4>
      <h5>{q.secondaryTitle}</h5>
      <div
        className={`${classes.answers} ${
          q.alignment === Alignment.horizontal ? classes.row : ""
        }`}
      >
        {q.possibleAnswers.map((a) => (
          <div key={a.id} className={classes.answer} aria-selected={a.correct}>
            - {a.content}
          </div>
        ))}
      </div>
    </div>
  );
};
