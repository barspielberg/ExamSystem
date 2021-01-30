import { Question, Student, TakenTest, Test } from "@examsystem/common";
import React from "react";
import { useState } from "react";
import { match } from "react-router";
import examService from "../../../services/examService";
import { PopupMessage } from "../../uiElements";
import StudentLogin from "./StudentLogin/StudentLogin";
import StudentTest from "./StudentTest/StudentTest";
import TestIntro from "./TestIntro/TestIntro";
import TestReview from "./TestReview/TestReview";
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
  const [originalTest, setOriginalTest] = useState<{
    t: Test;
    q: Question[];
  }>();
  const [err, setErr] = useState("");
  const [examState, setExamState] = useState<ExamState>(0);

  const loginHandler = async (st: Student) => {
    const res = await examService.postStartNew(testId, st);
    setErrorOrTest(res);
  };

  const saveHandler = async (
    queIndex: number,
    selected: string[],
    submit?: boolean
  ) => {
    if (test) {
      const testCopy: TakenTest = { ...test };
      testCopy.questions[queIndex].possibleAnswers.forEach((a) =>
        selected.includes(a.id) ? (a.correct = true) : null
      );

      if (submit) await submitHandler(testCopy);
      else {
        const res = await examService.putTest(testCopy);
        setErrorOrTest(res);
      }
    }
  };
  const submitHandler = async (test: TakenTest) => {
    const res = await examService.putSubmitTest(test);
    if (typeof res === "string") setErr(res);
    else {
      setTest(res.studentTest);
      setOriginalTest({ t: res.originalTest, q: res.questions });
      setExamState(ExamState.after);
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
        <StudentTest test={test} saveTest={saveHandler} />
      )}
      {examState === ExamState.after && test && originalTest && (
        <TestReview
          originalTest={originalTest.t}
          questions={originalTest.q}
          studentTest={test}
        />
      )}
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
