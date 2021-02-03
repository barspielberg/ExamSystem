import { Question, TakenTest } from "@examsystem/common";
import React, { useEffect, useState } from "react";
import { calcGrade } from "../../../../services/examService";

interface ITableRowRespondentProps {
  takenTests: TakenTest[] | undefined;
  answers: Question[] | undefined;
  setSelectedRespondent:any;
}

const TableRowRespondent: React.FC<ITableRowRespondentProps> = ({
  takenTests,
  answers,
  setSelectedRespondent
}) => {
  const [notEmpty, setNotEmpty] = useState(false);
  const [respondents, setRespondents] = useState<Respondent[]>();

  useEffect(() => {
    setNotEmpty(!!takenTests && takenTests.length > 0);
    if (takenTests && answers) {
      setRespondents(
        takenTests?.map<Respondent>((tt) => {
          const { numOfCurrect, grade } = calcGrade(tt, answers);

          return {
            email: tt.student.email,
            name: `${tt.student.firstName} ${tt.student.lastName}`,
            dateSubmitted: tt.dateSubmitted,
            numofAns: numOfCurrect,
            grade: grade,
          };
        })
      );
    }
  }, [takenTests, answers]);

  return (
    <React.Fragment>
      {notEmpty &&
        respondents?.map((re) => [
          <tr key={re.email} style={{cursor:"pointer"}} onClick={() => setSelectedRespondent(re)}>
            <td>{re.email}</td>
            <td>{re.name}</td>
            <td>{re.dateSubmitted}</td>
            <td>{re.numofAns}</td>
            <td>{re.grade.toString()}</td>
          </tr>,
        ])}
    </React.Fragment>
  );
};

export default TableRowRespondent;

export interface Respondent {
  email: string;
  name: string;
  dateSubmitted: string;
  numofAns: number;
  grade: number;
}
