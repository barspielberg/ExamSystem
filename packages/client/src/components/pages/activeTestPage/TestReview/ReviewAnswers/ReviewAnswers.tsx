import { AnsweredQuestion, Question, TakenTest } from "@examsystem/common";
import React from "react";
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
  const lastQueIndex = studetTest.questions.length - 1;
  const steps = getSteps(questions, studetTest.questions);

  return (
    <div>
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
