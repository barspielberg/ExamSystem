import React from "react";
import classes from "./QuestionsSection.module.scss";
import { Question, Test } from "@examsystem/common";
import { Button, SearchFilter } from "../../../../uiElements";
import { useState } from "react";
import SelectQuestions from "./SelectQuestions/SelectQuestions";

interface IQuestionsSectionProps {
  test: Test;
  onTestChange: (test: Test) => void;
  allQuestionsInField?: Question[];
}

export const QuestionsSection: React.FC<IQuestionsSectionProps> = ({
  allQuestionsInField,
  test,
  onTestChange,
}) => {
  const [displayQ, setDisplayQ] = useState(allQuestionsInField);
  return (
    <section className={classes.section}>
      <header>Questions</header>
      <div className={classes.inputs}>
        <h4>Select the questions that you want to include in the test</h4>
        <p>
          You can use the tag filter to narrow down the list to specific subject
          - Don't worry, filtering won't affect your previous selections
        </p>
        <div className={classes.row}>
          <b>Filter by tag or content: </b>
          <SearchFilter
            originalQuestions={allQuestionsInField}
            onQuestionsChange={setDisplayQ}
          />
          <div className={classes.filler} />
          <Button>Select All Filterd</Button>
        </div>
        <SelectQuestions
          test={test}
          onTestChange={onTestChange}
          questions={displayQ}
        />
      </div>
    </section>
  );
};
