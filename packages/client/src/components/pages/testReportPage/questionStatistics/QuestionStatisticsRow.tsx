import {
  Answer,
  AnsweredQuestion,
  Question,
  TakenTest,
} from "@examsystem/common";
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

  const [expandIds, setExpandIds] = useState<string[]>([]);
  const expandHandler = (id: string) => {
    setExpandIds((ids) => {
      if (ids.includes(id)) return ids.filter((i) => i !== id);
      return [...ids, id];
    });
  };

  return (
    <React.Fragment>
      {notEmpty &&
        questions?.map((question) => [
          <tr
            key={question.id}
            style={{ cursor: "pointer" }}
            onClick={() => expandHandler(question.id)}
          >
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
          expandIds.includes(question.id) && (
            <tr
              key={question.id + "522"}
              onClick={() => expandHandler(question.id)}
            >
              <td colSpan={3} style={{ textAlign: "left", padding: "1rem" }}>
                <h5>Answers:</h5>
                {question.possibleAnswers.map((pa) => (
                  <div key={pa.id}>
                    {pa.content} {getAnswerPercentage(pa, question, takenTests)}
                    %
                  </div>
                ))}
              </td>
            </tr>
          ),
        ])}
    </React.Fragment>
  );
};

export default QuestionStatisticsRow;

const getAnswerPercentage = (
  answer: Answer,
  question: Question,
  takenTests?: TakenTest[]
) => {
  let answerWaschosen = 0;
  takenTests?.forEach(tt => {
    tt.questions.forEach((q) => {
      if (q.oringinalQuestionId === question.id) {
        q.possibleAnswers.forEach(pa => {
          if (pa.id === answer.id && answer.correct) answerWaschosen += 1;
        })
      }
    });
  })

  const numberOfTests = takenTests?.filter(tt => tt.questions.map(q => q.oringinalQuestionId).includes(question.id)).length;
  return (answerWaschosen / numberOfTests!) * 100;
};

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
