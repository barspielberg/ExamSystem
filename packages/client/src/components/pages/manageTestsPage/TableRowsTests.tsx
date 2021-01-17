import React from "react";
import { Test } from "@examsystem/common";
import Button from "../../uiElements/Button/Button";
import { useHistory } from "react-router";

interface ITableRowsTestsProps {
  tests?: Test[];
}

const TableRowsTests: React.FC<ITableRowsTestsProps> = ({ tests }) => {
  const notEmpty = !!tests && tests.length > 0;
  const history = useHistory();
  const hostname = `${window.location.hostname}:${window.location.port}`;

  const copyHandler = (id: string) => {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = `${hostname}/ActiveTest/${id}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  };

  return (
    <React.Fragment>
      {notEmpty &&
        tests?.map((t, index) => (
          <tr key={index}>
            <td>{t.id}</td>
            <td>
              <Button onClick={() => copyHandler(t.id)}>Copy</Button>
            </td>
            <td>{t.title}</td>
            <td>{t.questionIds.length}</td>
            <td>{new Date(t.lastUpdate).toLocaleDateString()}</td>
            <td>{t.version}</td>
            <td>
              <Button onClick={() => history.push(`/EditTest/${t.id}`)}>
                Edit
              </Button>
              <Button disabled danger>
                Delete
              </Button>
            </td>
          </tr>
        ))}
    </React.Fragment>
  );
};

export default TableRowsTests;
