import classes from "./Table.module.scss";
import { Student } from "@examsystem/common";
import React from "react";
import { Table } from "../../../uiElements";

interface IStudentTableProps {
  students: Student[];
  setSelected: (email: string) => void;
  selected: string;
}
const titles = ["First Name", "Last Name", "Email"];
const StudentTable: React.FC<IStudentTableProps> = ({
  students,
  selected,
  setSelected,
}) => {
  return (
    <div className={classes.table}>
      <Table titles={titles}>
        {students.map((s) => (
          <tr
            key={s.email}
            onClick={() => setSelected(s.email)}
            aria-selected={s.email === selected}
          >
            <td>{s.firstName}</td>
            <td>{s.lastName}</td>
            <td>{s.email}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default StudentTable;
