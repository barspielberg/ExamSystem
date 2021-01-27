import classes from "./TestReportPage.module.scss";
import { Organization, Test } from "@examsystem/common";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";
import TestReportForm from "./testReportForm/TestReportForm";

interface ITestReportPageProps {
  organizations: Organization[] | undefined;
}

const TestReportPage: React.FC<ITestReportPageProps> = ({ organizations }) => {
  const { organizationId, fieldId } = useParams();
  const [selectedTest, setSelectedTest] = useState<Test>();
  const [anyDate, setAnyDate] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>();
  const [dateTo, setDateTo] = useState<string>();

  const field = organizations
    ?.find((o) => o.id === organizationId)
    ?.fields.find((f) => f.id === fieldId);
  const tests = field?.tests;

  return (
    <div className={classes.main}>
      <h1>
        Test Report for{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </h1>
      <TestReportForm
        tests={tests}
        dateFrom={dateFrom}
        dateTo={dateTo}
        anyDate={anyDate}
        setSelectedTest={setSelectedTest}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setAnyDate={setAnyDate}
      />
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TestReportPage);
