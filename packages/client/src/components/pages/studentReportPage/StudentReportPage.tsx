import classes from "./StudentReportPage.module.scss";
import { Organization, Student, TakenTest } from "@examsystem/common";
import React from "react";
import { connect } from "react-redux";
import { useParamsFull } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Header, PopupMessage, SearchFilter } from "../../uiElements";
import { useState } from "react";
import { useEffect } from "react";
import examService from "../../../services/examService";
import StudentTable from "./StudentTable/StudentTable";
import { useMemo } from "react";
import TestsTable from "./TestsTable/TestsTable";

interface IStudentReportPageProps {
  organizations?: Organization[];
}

const StudentReportPage: React.FC<IStudentReportPageProps> = ({
  organizations,
}) => {
  const { organization, field } = useParamsFull(organizations);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState("");
  const [allTests, setAllTests] = useState<testsByEmail>({});
  const [allStudents, setAllStudents] = useState<Student[]>([]);

  const selectedStudent = useMemo(() => {
    try {
      return allTests[selected][0].student;
    } catch (error) {
      return undefined;
    }
  }, [allTests, selected]);
  const fieldQuestions = useMemo(
    () =>
      organization?.questions.filter((q) => field?.questionIds.includes(q.id)),
    [organization, field]
  );
  useEffect(() => {
    examService.getAll().then((res) => {
      if (isString(res)) setErr(res);
      else setAllTests(groupByEmail(res));
    });
  }, [setAllTests, setErr]);

  useEffect(() => {
    const tests = Object.values(allTests);
    const students = tests.map((tests) => tests[0].student);
    setAllStudents(students);
  }, [allTests, setAllStudents]);

  return (
    <div className={classes.page}>
      <Header>
        <h2>Reports by Respondent Name</h2>
      </Header>
      <h3>Organization: {organization?.name}</h3>
      <h3>Field Of Study: {field?.title}</h3>
      <br />
      <h3>Find rspondent:</h3>
      Respondent name: <SearchFilter />
      <StudentTable students={allStudents} {...{ selected, setSelected }} />
      {selectedStudent && (
        <h2>
          Activity Report for:{" "}
          <span className={classes.name}>
            {selectedStudent.firstName} {selectedStudent.lastName}
          </span>
        </h2>
      )}
      {selected && field && fieldQuestions && (
        <TestsTable
          studentTests={allTests[selected]}
          fieldTests={field.tests}
          questions={fieldQuestions}
        />
      )}
      <PopupMessage
        warning
        title="Error"
        show={!!err}
        text={err}
        clear={() => setErr("")}
      />
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});

export default connect(mapState2Props)(StudentReportPage);

function isString(str: any): str is string {
  return typeof str === "string";
}

function groupByEmail(tests: TakenTest[]) {
  return tests.reduce((pre: testsByEmail, cur) => {
    (pre[cur.student.email] = pre[cur.student.email] || []).push(cur);
    return pre;
  }, {});
}

type testsByEmail = {
  [email: string]: TakenTest[];
};
