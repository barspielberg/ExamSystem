import { Question, TakenTest } from "@examsystem/common";
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
  const [questionStats, setQuestionStats] = useState<
    {
      id: string;
      mainTitle: string;
      tags: string[];
      numofSub: number;
      answeredCorrectly: number;
    }[]
  >([]);

  useEffect(() => {
    setNotEmpty(!!questions && questions.length > 0);
    const data = questions?.map<{
      id: string;
      mainTitle: string;
      tags: string[];
      numofSub: number;
      answeredCorrectly: number;
    }>((ques) => {
      const numofSub = takenTests?.filter((tt) =>
        tt.questions.filter((q) => q.oringinalQuestionId === ques.id)
      )?.length;

      const correct = takenTests?.filter((tt) =>
        tt.questions.filter(
          (q) =>
            q.oringinalQuestionId === ques.id &&
            q.possibleAnswers === ques.possibleAnswers
        )
      )?.length;

      return {
        id: ques.id,
        mainTitle: ques.mainTitle,
        tags: ques.tags,
        numofSub: numofSub || 0,
        answeredCorrectly: correct || 0,
      };
    });

    console.log(data);
  }, [questions, takenTests]);

  return (
    <React.Fragment>
      {notEmpty &&
        questions?.map((question) => [
          <tr key={question.id}>
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
            <td>{0}</td>
            <td>{0}</td>
          </tr>,
        ])}
    </React.Fragment>
  );
};

export default QuestionStatisticsRow;
