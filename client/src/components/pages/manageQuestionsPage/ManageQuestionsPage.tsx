import React from "react";
import { match } from "react-router";

interface IManageQuestionsPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Michael
const ManageQuestionsPage: React.FC<IManageQuestionsPageProps> = ({
  match,
}) => {
  return <div>ManageQuestionsPage Worked! id: {match.params.fieldId}</div>;
};

export default ManageQuestionsPage;
