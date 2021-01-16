import React from "react";
import { match } from "react-router";

interface ITestReportPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Michael
const TestReportPage: React.FC<ITestReportPageProps> = ({ match }) => {
  return <div>TestReportPage Worked! id: {match.params.fieldId}</div>;
};

export default TestReportPage;
