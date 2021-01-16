import React from "react";
import { match } from "react-router";

interface IEditTestPageProps {
  match: match<{ testId: string }>;
}
//TODO by Bar
const EditTestPage: React.FC<IEditTestPageProps> = ({ match }) => {
  return <div>EditTestPage Worked! id: {match.params.testId}</div>;
};

export default EditTestPage;
