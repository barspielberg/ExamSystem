import React from "react";
import { match } from "react-router";
import StudentLogin from "./StudentLogin/StudentLogin";

interface IActiveTestPageProps {
  match: match<{ testId: string }>;
}
//TODO by Bar
const ActiveTestPage: React.FC<IActiveTestPageProps> = ({ match }) => {
  return (
    <div>
      <StudentLogin onStudentSubmited={(s) => console.log(s)} />
      ActiveTestPage Worked! id: {match.params.testId}{" "}
    </div>
  );
};

export default ActiveTestPage;
