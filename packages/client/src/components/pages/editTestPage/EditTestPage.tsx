import React from "react";
import classes from "./EditTestPage.module.scss";
import { FieldOfStudy, Organization, Test } from "@examsystem/common";
import { useState } from "react";
import { connect } from "react-redux";
import { match } from "react-router";
import { RootState } from "../../../redux/reducers/mainReducer";
import Stepper from "./Stepper/Stepper";
import { Header } from "../../uiElements";

interface IEditTestPageProps {
  match: match<{ testId: string }>;
  organizations?: Organization[];
}
//TODO by Bar
const EditTestPage: React.FC<IEditTestPageProps> = ({
  match,
  organizations,
}) => {
  const test = getTest(match.params.testId, organizations);
  const testClone = deepClone(test);
  const [step, setStep] = useState(0);

  return (
    <div className={classes.page}>
      <Header>{test ? `Edit: "${test.title}"` : "New Test"}</Header>
      <Stepper onChange={setStep} value={step} />
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(EditTestPage);

const getTest = (id: string, org?: Organization[]): Test | undefined => {
  const allFields = org?.reduce(
    (pre, cur) => [...pre, ...cur.fields],
    Array<FieldOfStudy>()
  );
  const allTests = allFields?.reduce(
    (pre, cur) => [...pre, ...cur.tests],
    Array<Test>()
  );
  return allTests?.find((t) => t.id === id);
};

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
