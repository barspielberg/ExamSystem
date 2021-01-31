import { AnsweredQuestion, Question, TakenTest } from "@examsystem/common";
import React from "react";
import { useEffect } from "react";
import { CSSProperties } from "react";
import { useState } from "react";
import ReviewdQuestion from "./ReviewdQuestion/ReviewdQuestion";
import Stepper from "./Stepper/Stepper";

interface IReviewAnswersProps {
  studetTest: TakenTest;
  questions: Question[];
}

const ReviewAnswers: React.FC<IReviewAnswersProps> = ({
  studetTest,
  questions,
}) => {
  const [queIndex, setQueIndex] = useState(0);
  const [hight, setHight] = useState("0px");
  const lastQueIndex = studetTest.questions.length - 1;
  const steps = getSteps(questions, studetTest.questions);

  const style: CSSProperties = {
    maxHeight: hight,
    transition: "all 0.6s",
    overflow: "hidden",
  };
  useEffect(() => setHight("800px"), [setHight]);

  return (
    <div style={style}>
      <ReviewdQuestion
        question={questions[queIndex]}
        studentAnswers={studetTest.questions[queIndex]}
      />
      <Stepper
        current={queIndex}
        moveTo={setQueIndex}
        max={lastQueIndex}
        steps={steps}
      />
    </div>
  );
};

export default ReviewAnswers;

const getSteps = (
  questions: Question[],
  studentQuestions: AnsweredQuestion[]
): { index: number; ok: boolean }[] => {
  return studentQuestions.map((stq, index) => {
    const question = questions.find((q) => q.id === stq.oringinalQuestionId);

    const correctIds = question?.possibleAnswers
      .filter((a) => a.correct)
      .map((a) => a.id);
    const studentSelection = stq.possibleAnswers
      .filter((a) => a.correct)
      .map((a) => a.id);
    const ok = correctIds?.every((c) => studentSelection.includes(c)) ?? false;
    return { ok, index };
  });
};
