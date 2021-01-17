import React from "react";
import { Test } from "@examsystem/common";

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
              <button>Copy</button>
            </td>
            <td>{t.title}</td>
            <td>{t.questionIds.length}</td>
            <td>{new Date(t.lastUpdate).toLocaleDateString()}</td>
            <td>{t.version}</td>
            <td>
              <button>btn</button>
              <button>btn</button>
              <button>btn</button>
            </td>
          </tr>
        ))}
    </React.Fragment>
  );
};

export default TableRowsTests;
