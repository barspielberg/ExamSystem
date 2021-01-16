import React from "react";
import { match } from "react-router";

interface IManageTestsPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Bar
const ManageTestsPage: React.FC<IManageTestsPageProps> = ({ match }) => {
  return <div>ManageTestsPage Worked! id: {match.params.fieldId}</div>;
};

export default ManageTestsPage;
