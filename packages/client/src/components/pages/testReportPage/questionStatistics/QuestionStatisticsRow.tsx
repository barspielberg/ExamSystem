import { AnsweredQuestion, Question, TakenTest } from "@examsystem/common";
import React, { useEffect, useState } from "react";

interface IQuestionStatisticsRowProps {
  questions: Question[] | undefined;
  takenTests: TakenTest[] | undefined;
}

const QuestionStatisticsRow: React.FC<IQuestionStatisticsRowProps> = ({
  questions,
  takenTests,
}) => {
  const [notEmpty, setNotEmpty] = useState(false);

  useEffect(() => {
    setNotEmpty(!!questions && questions.length > 0);
  }, [questions, takenTests]);

  return (
    <React.Fragment>
      {notEmpty &&
        questions?.map((question) => [
          <tr key={question.id} style={{ cursor: "pointer" }}>
            <td>{question.id}</td>
            <td style={{ textAlign: "revert" }}>
              <div>
                <h4>{question.mainTitle}</h4>
                <p>
                  {question.tags.map((t, index) => (
                    <span key={index} style={{ color: "#3399ff" }}>
                      {t} {index !== question.tags.length - 1 && "|"}
                    </span>
                  ))}
                </p>
              </div>
            </td>
            <td>{takenTests && getPercentages(question, takenTests)}%</td>
          </tr>,
        ])}
    </React.Fragment>
  );
};

export default QuestionStatisticsRow;

const getPercentages = (question: Question, takenTests: TakenTest[]) => {
  return (getNumberOfCorrect(question, takenTests) / takenTests.length) * 100;
};

const getNumberOfCorrect = (question: Question, takenTests: TakenTest[]) => {
  return takenTests.reduce((pre, cur) => {
    if (
      isCorrect(
        question,
        cur.questions.find((q) => q.oringinalQuestionId === question.id)
      )
    )
      return pre + 1;
    return pre;
  }, 0);
};

const isCorrect = (
  correctAnswer: Question,
  studentAnswer?: AnsweredQuestion
): boolean => {
  const studentAnswers = studentAnswer?.possibleAnswers
    .filter((p) => p.correct)
    .map((p) => p.id);
  const corrects = correctAnswer.possibleAnswers
    .filter((p) => p.correct)
    .map((p) => p.id);

  return (
    (corrects.every((c) => studentAnswers?.includes(c)) &&
      studentAnswers?.every((c) => corrects.includes(c))) ||
    false
  );
};
