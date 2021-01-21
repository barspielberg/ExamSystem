import React from "react";
import classes from "./SelectQuestions.module.scss";
import { Alignment, Question, QuestionType, Test } from "@examsystem/common";
import { Button } from "../../../../../uiElements";

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

      {tmpQues.map((q) => (
        <div
          key={q.id}
          className={classes.row}
          aria-selected={test.questionIds.includes(q.id)}
        >
          <div className={classes.des} onClick={() => rowClicked(q.id)}>
            <b>{q.mainTitle}</b>
            <h5>{q.secondaryTitle}</h5>
            <div className={classes.tags}>
              {q.tags.map((t, index) => (
                <span key={index}>{t}</span>
              ))}
            </div>
          </div>
          <div className={classes.showBtn}>
            <Button>Show</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectQuestions;

const tmpQue: Question = {
  id: "13588551315",
  mainTitle: "The Main Tilte",
  secondaryTitle: "Optional Secondary Title",
  alignment: Alignment.vertical,
  type: QuestionType.singleChoiceQuestion,
  tags: ["first", "second", "therd"],
  possibleAnswers: [
    { id: "4545923288", content: "Yes!", correct: true },
    { id: "454923f288", content: "no" },
    { id: "45459228f8", content: "no" },
    { id: "45s4923288", content: "no" },
  ],
};

const tmpQues: Question[] = ["41", "56", "12", "5689", "sdf"].map((id) => ({
  ...tmpQue,
  id: id,
}));
