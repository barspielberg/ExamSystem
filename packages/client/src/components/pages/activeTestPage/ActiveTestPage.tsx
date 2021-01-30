import { Student, TakenTest } from "@examsystem/common";
import React from "react";
import { useState } from "react";
import { match } from "react-router";
import examService from "../../../services/examService";
import { PopupMessage } from "../../uiElements";
import StudentLogin from "./StudentLogin/StudentLogin";
import StudentTest from "./StudentTest/StudentTest";
import TestIntro from "./TestIntro/TestIntro";
enum ExamState {
  intro,
  in,
  after,
}
interface IActiveTestPageProps {
  match: match<{ testId: string }>;
}
//TODO by Bar
const ActiveTestPage: React.FC<IActiveTestPageProps> = ({ match }) => {
  const { testId } = match.params;
  const [test, setTest] = useState<TakenTest>();
  const [err, setErr] = useState("");
  const [examState, setExamState] = useState<ExamState>(0);

  const loginHandler = async (st: Student) => {
    const res = await examService.postStartNew(testId, st);
    setErrorOrTest(res);
  };

  const updateHandler = async (queIndex: number, selected: string[]) => {
    if (test) {
      const testCopy: TakenTest = { ...test };
      testCopy.questions[queIndex].possibleAnswers.forEach((a) =>
        selected.includes(a.id) ? (a.correct = true) : null
      );
      const res = await examService.putTest(testCopy);
      setErrorOrTest(res);
    }
  };

  const setErrorOrTest = (res: string | TakenTest) => {
    if (typeof res === "string") setErr(res);
    else setTest(res);
  };
  return (
    <div>
      {!test && <StudentLogin onStudentSubmited={loginHandler} />}
      {examState === ExamState.intro && test && (
        <TestIntro nextPage={() => setExamState(ExamState.in)} test={test} />
      )}
      {examState === ExamState.in && test && (
        <StudentTest
          test={test}
          testUpdated={updateHandler}
          submited={() => setExamState(ExamState.after)}
        />
      )}
      {examState === ExamState.after && test && <div> after</div>}
      <PopupMessage
        warning
        title="Error"
        text={err}
        show={!!err}
        clear={() => setErr("")}
      />
    </div>
  );
};

export default ActiveTestPage;
