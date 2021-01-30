import classes from "./TestReportPage.module.scss";
import { Organization, TakenTest, Test } from "@examsystem/common";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";
import TestReportForm from "./testReportForm/TestReportForm";
import TestSummary from "./testSummary/TestSummary";
import TestRespondent from "./testRespondent/TestRespondent";
import QuestionStatistics from "./questionStatistics/QuestionStatistics";
import { Button } from "../../uiElements";
import { useHistory } from "react-router";
import dataService from "../../../services/dataService";

interface ITestReportPageProps {
  organizations: Organization[] | undefined;
}

const TestReportPage: React.FC<ITestReportPageProps> = ({ organizations }) => {
  const { organizationId, fieldId } = useParams();
  const [tests, setTests] = useState<Test[]>();
  const [selectedTest, setSelectedTest] = useState<Test>();
  const [takenTests, setTakenTests] = useState<TakenTest[]>();
  const [anyDate, setAnyDate] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const fetchedTests = await dataService.getTests(organizationId, fieldId);
      if (typeof fetchedTests !== "string") setTests(fetchedTests);
      else console.log(fetchedTests);
    })();
  }, []);

  useEffect(() => {
    // #TODO fetch taken tests for selected test,use the test ID,need redux action
    // #TODO fetch questions of selected test move to questions statistics
    console.log("selected test changed");
  }, [selectedTest]);

  const field = organizations
    ?.find((o) => o.id === organizationId)
    ?.fields.find((f) => f.id === fieldId);

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
        selectedTest={selectedTest}
        setSelectedTest={setSelectedTest}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setAnyDate={setAnyDate}
        goBack={history.goBack}
      />
      {/* Report */}
      <TestSummary
        selectedTest={selectedTest}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      <TestRespondent takenTests={takenTests} originalTest={selectedTest} />
      <QuestionStatistics questions={[]} />
      <Button onClick={() => history.goBack()}>« Back</Button>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TestReportPage);
