import React from "react";
import { match } from "react-router";

interface IStudentReportPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Michael
const StudentReportPage: React.FC<IStudentReportPageProps> = ({ match }) => {
  return <div>StudentReportPage Worked! id: {match.params.fieldId}</div>;
};

export default StudentReportPage;
