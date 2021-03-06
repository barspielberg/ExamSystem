import React, { useState } from "react";
import classes from "./ManageTestsPage.module.scss";
import { Table, SearchFilter, Button } from "../../uiElements";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Organization } from "@examsystem/common";
import TableRowsTests from "./TableRowsTests";
import { useParamsFull } from "../../../hooks";
import { useHistory } from "react-router";

interface IManageTestsPageProps {
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
  organizations,
}) => {
  const { field, organization } = useParamsFull(organizations);
  const [tests, setTests] = useState(field?.tests);

  const history = useHistory();

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
      <div className={classes.btns}>
        <Button
          success
          onClick={() =>
            history.push(
              `/EditTest?organizationId=${organization?.id}&fieldId=${field?.id}`
            )
          }
        >
          Add New Test
        </Button>
      </div>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(ManageTestsPage);
