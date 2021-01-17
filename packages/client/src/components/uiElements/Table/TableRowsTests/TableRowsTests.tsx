import React from "react";
import { Test } from "@examsystem/common";
import Button from "../../Button/Button";

interface ITableRowsTestsProps {
  tests?: Test[];
}

const TableRowsTests: React.FC<ITableRowsTestsProps> = ({ tests }) => {
  const notEmpty = !!tests && tests.length > 0;

  return (
    <React.Fragment>
      {notEmpty &&
        tests?.map((t, index) => (
          <tr key={index}>
            <td>{t.id}</td>
            <td>
              <Button>Copy</Button>
            </td>
            <td>{t.title}</td>
            <td>{t.questionIds.length}</td>
            <td>{new Date(t.lastUpdate).toLocaleDateString()}</td>
            <td>{t.version}</td>
            <td>
              <Button>Edit</Button>
              <Button>Duplicate</Button>
              <Button danger>Delete</Button>
            </td>
          </tr>
        ))}
    </React.Fragment>
  );
};

export default TableRowsTests;
