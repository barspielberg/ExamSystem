import React from "react";
import classes from "./ManageTestsPage.module.scss";

import { match } from "react-router";
import Table from "../../uiElements/Table/Table";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import { FieldOfStudy } from "@examsystem/common";
import TableRowsTests from "../../uiElements/Table/TableRowsTests/TableRowsTests";

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

  return (
    <div className={classes.Page}>
      <header>
        Available Tests for:{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </header>
      <p className={classes.filterRow}>
        Filter names by keywords:{" "}
        <input type="text" placeholder="not working yet..." />
      </p>

      <Table titles={titles}>
        <TableRowsTests tests={field?.tests} />
      </Table>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  fields: state.organization.organization?.fields,
});
export default connect(mapState2Props)(ManageTestsPage);
