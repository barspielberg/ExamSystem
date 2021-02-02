import classes from "./QuestionStatistics.module.scss";
import React from "react";
import { SearchFilter, Table } from "../../../uiElements";
import { Question, TakenTest } from "@examsystem/common";
import QuestionStatisticsRow from "./QuestionStatisticsRow";

interface IQuestionStatisticsProps {
  questions:Question[] | undefined;
  takenTests: TakenTest[] | undefined;
}

const QuestionStatistics: React.FC<IQuestionStatisticsProps> = ({
  questions,
  takenTests
}) => {
  const titles = [
    "ID",
    "Question",
    "% Answered Correctly",
  ];

  return (
    <div className={classes.main}>
      <h2>Question Statistics</h2>
      <p>Click a question to see statistics regarding its answers</p>
      <span>Filter by tags or content: </span>
      <SearchFilter />
      <Table titles={titles}>
        <QuestionStatisticsRow questions={questions} takenTests={takenTests}/>
      </Table>
    </div>
  );
};

export default QuestionStatistics;
