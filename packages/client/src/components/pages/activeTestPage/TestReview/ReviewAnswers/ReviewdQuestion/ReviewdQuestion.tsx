import classes from "./ReviewdQuestion.module.scss";
import {
  Alignment,
  AnsweredQuestion,
  Question,
  QuestionType,
} from "@examsystem/common";
import React from "react";

interface IReviewdQuestionProps {
  question: Question;
  studentAnswers: AnsweredQuestion;
}

const ReviewdQuestion: React.FC<IReviewdQuestionProps> = ({
  question: que,
  studentAnswers,
}) => {
  const horizontal = que.alignment === Alignment.horizontal;
  const radio = que.type === QuestionType.singleChoiceQuestion;
  const selected = studentAnswers.possibleAnswers
    .filter((a) => a.correct)
    .map((a) => a.id);

  const getAnswerClass = (correct?: boolean, selected?: boolean) => {
    if (correct) return classes.correct;
    if (selected) return classes.incorrect;
    else return "";
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
          <div
            key={a.id}
            className={getAnswerClass(a.correct, selected.includes(a.id))}
          >
            <input
              readOnly
              id={a.id}
              type={radio ? "radio" : "checkbox"}
              name={que.id}
              checked={selected.includes(a.id)}
            />
            <label htmlFor={a.id}>{a.content}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewdQuestion;
