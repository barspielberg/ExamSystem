import React from "react";
import classes from "./EditTestPage.module.scss";
import { FieldOfStudy, Organization, Test } from "@examsystem/common";
import { useState } from "react";
import { connect } from "react-redux";
import { Location } from "history";
import { useLocation } from "react-router";
import { RootState } from "../../../redux/reducers/mainReducer";
import Stepper from "./Stepper/Stepper";
import { Header } from "../../uiElements";
import {
  EmailDelivery,
  GeneralDetails,
  QuestionsSection,
} from "./FormSections";

interface IEditTestPageProps {
  organizations?: Organization[];
}
//TODO by Bar
const EditTestPage: React.FC<IEditTestPageProps> = ({ organizations }) => {
  const location = useLocation();
  const { fieldId, testId } = getParams(location);
  const testClone = deepClone(getTest(testId, organizations));
  const field = getFields(organizations)?.find((f) => f.id === fieldId);

  const [test, setTest] = useState(testClone);
  const [step, setStep] = useState(0);

  return (
    <div className={classes.page}>
      <Header>{test ? `Edit: "${test.title}"` : "New Test"}</Header>
      <Stepper onChange={setStep} value={step} />
      {step === 0 && (
        <GeneralDetails
          test={test}
          onTestChange={setTest}
          fieldTitle={field?.title}
        />
      )}
      {step === 1 && <EmailDelivery test={test} onTestChange={setTest} />}
      {step === 2 && <QuestionsSection test={test} onTestChange={setTest} />}
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(EditTestPage);

const getTest = (id: string | null, org?: Organization[]): Test | undefined => {
  const allFields = getFields(org);
  const allTests = allFields?.reduce(
    (pre, cur) => [...pre, ...cur.tests],
    Array<Test>()
  );
  return allTests?.find((t) => t.id === id);
};

const getFields = (org?: Organization[]): FieldOfStudy[] | undefined =>
  org?.reduce((pre, cur) => [...pre, ...cur.fields], Array<FieldOfStudy>());

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const getParams = (location: Location) => {
  const params = new URLSearchParams(location.search);
  return { fieldId: params.get("fieldId"), testId: params.get("testId") };
};
