import React from "react";
import classes from "./TestIntro.module.scss";
import { TakenTest } from "@examsystem/common";
import { Button, Header } from "../../../uiElements";

interface ITestIntroProps {
  test: TakenTest;
  nextPage: () => void;
}

const TestIntro: React.FC<ITestIntroProps> = ({ nextPage, test }) => {
  return (
    <div className={classes.page}>
      <Header>{test.title}</Header>
      <p>{test.introduction}</p>
      <span>Click here to start the test: </span>
      <Button onClick={nextPage}>Start Test</Button>
    </div>
  );
};

export default TestIntro;
