import { AnsweredQuestion, Question, TakenTest } from "@examsystem/common";
import React from "react";
import { useState } from "react";
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
  const reviewdQuestions = getReviewedQuestions(
    questions,
    studetTest.questions
  );
  const steps = reviewdQuestions.map((r, index) => ({
    index,
    ok: !r.possibleAnswers.find((a) => a.correct === false),
  }));

  return (
    <div>
      ReviewAnswers Worked!
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

const getReviewedQuestions = (
  questions: Question[],
  studentQuestions: AnsweredQuestion[]
): AnsweredQuestion[] => {
  const reviewdQuestions = studentQuestions.map((studetQuestion) => {
    const question = questions.find(
      (q) => q.id === studetQuestion.oringinalQuestionId
    );

    const reviewdAnswers = studetQuestion.possibleAnswers.map(
      (studentAnswer) => {
        const answer = question?.possibleAnswers.find(
          (a) => a.id === studentAnswer.id
        );
        let status;
        if (answer?.correct && studentAnswer.correct) status = true;
        else if (
          (!answer?.correct && studentAnswer.correct) ||
          (answer?.correct && !studentAnswer.correct)
        )
          status = false;

        return { ...studentAnswer, correct: status };
      }
    );
    return { ...studetQuestion, possibleAnswers: reviewdAnswers };
  });
  return reviewdQuestions;
};
