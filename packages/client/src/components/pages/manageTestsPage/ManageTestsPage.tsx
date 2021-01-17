import React, { useState } from "react";
import classes from "./ManageTestsPage.module.scss";

import { match } from "react-router";
import { Table, SearchFilter } from "../../uiElements";

import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import { FieldOfStudy, Organization } from "@examsystem/common";
import TableRowsTests from "./TableRowsTests";

interface IManageTestsPageProps {
  match: match<{ fieldId: string }>;
  organizations: Organization[] | undefined;
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
  organizations,
}) => {
  const fields = organizations?.reduce((pre, cur) => {
    return [...pre, ...cur.fields];
  }, Array<FieldOfStudy>());
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
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(ManageTestsPage);
