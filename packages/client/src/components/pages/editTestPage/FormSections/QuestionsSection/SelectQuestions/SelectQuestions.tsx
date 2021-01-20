import { Question, Test } from "@examsystem/common";
import React from "react";

interface ISelectQuestionsProps {
  test: Test;
  onTestChange: (test: Test) => void;
  questions?: Question[];
}

const SelectQuestions: React.FC<ISelectQuestionsProps> = ({
  test,
  onTestChange,
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
  return <div>SelectQuestions Worked!</div>;
};

export default SelectQuestions;
