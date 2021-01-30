import { Student } from "@examsystem/common";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, Header } from "../../../uiElements";
import classes from "./StudentLogin.module.scss";
interface IStudentLoginProps {
  onStudentSubmited: (student: Student) => void;
}

const StudentLogin: React.FC<IStudentLoginProps> = ({ onStudentSubmited }) => {
  const [student, setStudent] = useState<Student>(newStudent);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStudentSubmited(student);
    setStudent(newStudent);
  };

  return (
    <div className={classes.box}>
      <Header>Student Login</Header>
      <form className={classes.inputs} ref={formRef} onSubmit={submitHandler}>
        <label htmlFor="first_input">First Name</label>
        <input
          id="first_input"
          name="first_input"
          type="text"
          required
          value={student.firstName}
          onChange={({ target }) =>
            setStudent((st) => ({ ...st, firstName: target.value }))
          }
        />

        <label htmlFor="last_input">Last Name</label>
        <input
          id="last_input"
          name="last_input"
          type="text"
          required
          value={student.lastName}
          onChange={({ target }) =>
            setStudent((st) => ({ ...st, lastName: target.value }))
          }
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={student.email}
          onChange={({ target }) =>
            setStudent((st) => ({ ...st, email: target.value }))
          }
        />
        <div className={classes.btns}>
          <Button submit success>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;

const newStudent: Student = {
  firstName: "",
  lastName: "",
  email: "",
};
