import classes from "./Details.module.scss";
import { Question, TakenTest } from "@examsystem/common";
import React from "react";
import { Table } from "../../../../uiElements";

interface IDetailsProps {
  test: TakenTest;
  answers: Question[];
}
const titles = ["ID", "Qusetion", "Answered Correctly"];
const Details: React.FC<IDetailsProps> = ({ answers }) => {
  return (
    <div className={classes.details}>
      <h3>Details</h3>
      <p>
        Click a question to see which of its answers were selected and whether
        they were correct, or click "Expand All" to see it for all questions.
      </p>
      <Table titles={titles}>
        {answers.map((a) => (
          <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.mainTitle}</td>
            <td>{a.id}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Details;
