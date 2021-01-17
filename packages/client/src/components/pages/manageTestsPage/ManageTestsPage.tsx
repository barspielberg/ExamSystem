import React from "react";
import classes from "./ManageTestsPage.module.scss";

import { match } from "react-router";
import Table from "../../uiElements/Table/Table";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import { FieldOfStudy } from "@examsystem/common";
import TableRowsTests from "../../uiElements/Table/TableRowsTests/TableRowsTests";
import SearchFilter from "../../uiElements/SearchFilter/SearchFilter";
import { useState } from "react";

interface IManageTestsPageProps {
  match: match<{ fieldId: string }>;
  fields: FieldOfStudy[] | undefined;
}

const titles = [
  "ID",
  "Link",
  "Test Name",
  "Num of Questions",
  "Last Update",
  "Version",
  "",
];
//TODO by Bar
const ManageTestsPage: React.FC<IManageTestsPageProps> = ({
  match,
  fields,
}) => {
  const field = fields?.find((f) => f.id === match.params.fieldId);
  const [tests, setTests] = useState(field?.tests);

  return (
    <div className={classes.Page}>
      <header>
        Available Tests for:{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </header>
      <div className={classes.filterRow}>
        Filter names by keywords:{" "}
        <SearchFilter
          originalTests={field?.tests}
          onTestsChange={setTests}
          placeholder="Search..."
        />
      </div>

      <Table titles={titles}>
        <TableRowsTests tests={tests} />
      </Table>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  fields: state.organization.organization?.fields,
});
export default connect(mapState2Props)(ManageTestsPage);
