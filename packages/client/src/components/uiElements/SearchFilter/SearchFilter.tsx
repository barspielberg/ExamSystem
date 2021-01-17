import React from "react";
import classes from "./SearchFilter.module.scss";
import { Question, Test } from "@examsystem/common";
import { useState } from "react";
import { useEffect } from "react";

interface ISearchFilterProps {
  tests?: Test[];
  onTestsChange?: (items: Test[]) => void;

  questions?: Question[];
  onQuestionsChange?: (items: Question[]) => void;

  placeholder?: string;
}

const SearchFilter: React.FC<ISearchFilterProps> = ({
  tests,
  onTestsChange,
  questions,
  onQuestionsChange,
  placeholder,
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (tests && onTestsChange)
      if (text)
        onTestsChange(
          tests.filter((i) => i.title.toLowerCase().includes(text))
        );
      else onTestsChange(tests);
    else if (questions && onQuestionsChange)
      if (text)
        onQuestionsChange(
          questions.filter(
            (q) =>
              q.mainTitle.toLowerCase().includes(text) ||
              q.secondaryTitle?.toLowerCase().includes(text) ||
              !q.tags.every((t) => !t.toLowerCase().includes(text))
          )
        );
      else onQuestionsChange(questions);
  }, [text, tests, onTestsChange, questions, onQuestionsChange]);

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

export default SearchFilter;
