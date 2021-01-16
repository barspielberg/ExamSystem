import React from "react";
import { match } from "react-router";

interface IActiveTestPageProps {
  match: match<{ testId: string }>;
}
//TODO by Bar
const ActiveTestPage: React.FC<IActiveTestPageProps> = ({ match }) => {
  return <div>ActiveTestPage Worked! id: {match.params.testId} </div>;
};

export default ActiveTestPage;
