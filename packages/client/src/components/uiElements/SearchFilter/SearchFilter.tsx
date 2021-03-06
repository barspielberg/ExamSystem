import React from "react";
import classes from "./SearchFilter.module.scss";
import { Question, Student, Test } from "@examsystem/common";
import { useState } from "react";
import { useEffect } from "react";

interface ISearchFilterProps {
  originalTests?: Test[];
  onTestsChange?: (items: Test[]) => void;

  originalQuestions?: Question[];
  onQuestionsChange?: (items: Question[]) => void;

  originalStudents?: Student[];
  onStudentsChange?: (items: Student[]) => void;

  placeholder?: string;
}

export const SearchFilter: React.FC<ISearchFilterProps> = ({
  originalTests,
  onTestsChange,
  originalQuestions,
  onQuestionsChange,
  placeholder,
  onStudentsChange,
  originalStudents,
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (originalTests && onTestsChange)
      if (text)
        onTestsChange(
          originalTests.filter((i) => i.title.toLowerCase().includes(text))
        );
      else onTestsChange(originalTests);
    else if (originalQuestions && onQuestionsChange)
      if (text)
        onQuestionsChange(
          originalQuestions.filter(
            (q) =>
              q.mainTitle.toLowerCase().includes(text) ||
              q.secondaryTitle?.toLowerCase().includes(text) ||
              !q.tags.every((t) => !t.toLowerCase().includes(text))
          )
        );
      else onQuestionsChange(originalQuestions);
    else if (originalStudents && onStudentsChange)
      if (text)
        onStudentsChange(
          originalStudents.filter(
            (s) =>
              s.firstName.toLowerCase().includes(text) ||
              s.lastName.toLowerCase().includes(text) ||
              s.email.toLowerCase().includes(text)
          )
        );
      else onStudentsChange(originalStudents);
  }, [
    text,
    originalTests,
    onTestsChange,
    originalQuestions,
    onQuestionsChange,
    originalStudents,
    onStudentsChange,
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.rapper}>
        <input
          className={classes.search}
          onChange={(e) => setText(e.target.value.toLowerCase())}
          value={text}
          placeholder={placeholder}
        />
        {text && (
          <span className={classes.delete} onClick={() => setText("")}>
            X
          </span>
        )}
      </div>
      {text && <b>Filter is ON</b>}
    </div>
  );
};
