import React from "react";
import classes from "./SelectQuestions.module.scss";
import { Question, Test } from "@examsystem/common";
import { Button, DisplayQuestion } from "../../../../../uiElements";
import { useState } from "react";

interface ISelectQuestionsProps {
  test: Test;
  onTestChange: (test: Test) => void;
  questions?: Question[];
}

const SelectQuestions: React.FC<ISelectQuestionsProps> = ({
  test,
  onTestChange,
  questions,
}) => {
  const [showId, setShowId] = useState("");

  const addQuestion = (id: string) => {
    onTestChange({ ...test, questionIds: [...test.questionIds, id] });
  };
  const removeQuestion = (id: string) => {
    onTestChange({
      ...test,
      questionIds: test.questionIds.filter((i) => i !== id),
    });
  };

  const rowClicked = (id: string) => {
    if (test.questionIds.includes(id)) removeQuestion(id);
    else addQuestion(id);
  };

  return (
    <div className={classes.questions}>
      <header>
        <div>Currently showing {questions?.length} questions</div>
        <div>
          Total selected for the test{" "}
          <span className={classes.num}>{test.questionIds.length}</span>{" "}
        </div>
      </header>

      {questions?.map((q) => (
        <div
          key={q.id}
          className={classes.row}
          aria-selected={test.questionIds.includes(q.id)}
        >
          <div className={classes.des} onClick={() => rowClicked(q.id)}>
            <b>{q.mainTitle}</b>
            <div className={classes.tags}>
              {q.tags.map((t, index) => (
                <span key={index}>{t}</span>
              ))}
            </div>
          </div>
          <div className={classes.showBtn}>
            <Button onClick={() => setShowId(showId === q.id ? "" : q.id)}>
              {showId === q.id ? "Shrink" : "Show"}
            </Button>
          </div>
          {q.id === showId && (
            <div className={classes.fullQ}>
              <DisplayQuestion question={q} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectQuestions;
