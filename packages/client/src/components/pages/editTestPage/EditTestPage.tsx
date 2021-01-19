import React from "react";
import classes from "./EditTestPage.module.scss";
import { FieldOfStudy, Organization, Test } from "@examsystem/common";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { RootState } from "../../../redux/reducers/mainReducer";
import Stepper from "./Stepper/Stepper";
import { Button, Header, PopupMessage } from "../../uiElements";
import {
  EmailDelivery,
  GeneralDetails,
  QuestionsSection,
} from "./FormSections";
import { useDebugValue } from "react";

interface IEditTestPageProps {
  organizations?: Organization[];
}
//TODO by Bar
//TODO add error msg if no test found
const EditTestPage: React.FC<IEditTestPageProps> = ({ organizations }) => {
  const { fieldId, testId } = useParams();
  const field = getFields(organizations)?.find((f) => f.id === fieldId);
  const testClone = deepClone(field?.tests.find((t) => t.id === testId));

  const history = useHistory();
  const [test, setTest] = useState(testClone || newTest);
  const [step, setStep] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

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
      <div className={classes.btns}>
        <Button onClick={() => setShowMsg(true)}>« Back</Button>
        <div className={classes.filler} />
        <Button disabled>Show</Button>
        <Button success>Save »</Button>
      </div>
      <PopupMessage
        show={showMsg}
        clear={() => setShowMsg(false)}
        warning
        action={() => history.goBack()}
        actionTag="« Go Back"
        clearTag="Stay"
        title="Warning!"
        text="Are you sure you want to go back? The changes you have made will not be saved!"
      />
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(EditTestPage);

const getFields = (org?: Organization[]): FieldOfStudy[] | undefined =>
  org?.reduce((pre, cur) => [...pre, ...cur.fields], Array<FieldOfStudy>());

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const useParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const res = { fieldId: params.get("fieldId"), testId: params.get("testId") };
  useDebugValue(res ?? "loading...");
  return res;
};

const newTest: Test = {
  id: "",
  lang: 0,
  title: "",
  introduction: "",
  lastUpdate: new Date().toString(),
  passingGrade: 0,
  questionIds: [],
  reviewAnswers: false,
  successMessage: "",
  failMessage: "",
  testerEmail: "",
  version: 1,
};
