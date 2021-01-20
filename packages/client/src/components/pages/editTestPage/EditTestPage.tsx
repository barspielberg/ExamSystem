import React from "react";
import classes from "./EditTestPage.module.scss";
import { FieldOfStudy, Organization, Question, Test } from "@examsystem/common";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../redux/reducers/mainReducer";
import Stepper from "./Stepper/Stepper";
import { Button, Header, PopupMessage } from "../../uiElements";
import {
  EmailDelivery,
  GeneralDetails,
  QuestionsSection,
} from "./FormSections";
import { useParamsFull } from "../../../hooks";

interface IEditTestPageProps {
  organizations?: Organization[];
}
//TODO by Bar
//TODO add error msg if no test found
const EditTestPage: React.FC<IEditTestPageProps> = ({ organizations }) => {
  const { organization, field, test: originalTets } = useParamsFull(
    organizations
  );

  const questions = getQuestions(organization, field);
  const testClone = originalTets ? deepClone(originalTets) : newTest;

  const history = useHistory();
  const [test, setTest] = useState(testClone);
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
      {step === 2 && (
        <QuestionsSection
          test={test}
          onTestChange={setTest}
          allQuestionsInField={questions}
        />
      )}
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

const getQuestions = (
  org?: Organization,
  field?: FieldOfStudy
): Question[] | undefined => {
  if (org && field) {
    return field.questionIds
      .map((id) => org?.questions.find((q) => q.id === id))
      .reduce((pre, cur) => (cur ? [...pre, cur] : pre), Array<Question>());
  } else return undefined;
};

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

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
