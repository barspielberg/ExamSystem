import React from "react";
import { match } from "react-router";

interface IEditQuestionPageProps {
  match: match<{ questionId: string }>;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({ match }) => {
  return <div>EditQuestionPage Worked! id: {match.params.questionId}</div>;
};

export default EditQuestionPage;
