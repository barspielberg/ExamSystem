import classes from "./QuestionStatistics.module.scss";
import React from "react";
import { SearchFilter, Table } from "../../../uiElements";

interface IQuestionStatisticsProps {}

const QuestionStatistics: React.FC<IQuestionStatisticsProps> = ({}) => {
  const titles = [
    "ID",
    "Question",
    "Number of Submissions",
    "% Answered Correctly",
  ];

  return (
    <div className={classes.main}>
      <h2>Question Statistics</h2>
      <p>Click a question to see statistics regarding its answers</p>
      <span>Filter by tags or content: </span>
      <SearchFilter />
      <Table titles={titles}></Table>
    </div>
  );
};

export default QuestionStatistics;
