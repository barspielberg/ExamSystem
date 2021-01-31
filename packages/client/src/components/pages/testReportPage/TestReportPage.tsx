import classes from "./TestReportPage.module.scss";
import { Organization, Question, TakenTest, Test } from "@examsystem/common";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useParamsFull } from "../../../hooks";
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
  const { field } = useParamsFull(organizations);
  const [tests, setTests] = useState<Test[]>();
  const [selectedTest, setSelectedTest] = useState<Test>();
  const [selectedTestQuestions, setselectedTestQuestions] = useState<
    Question[] | undefined
  >([]);
  const [takenTests, setTakenTests] = useState<TakenTest[]>();
  const [anyDate, setAnyDate] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [numofSub, setNumofSub] = useState(0);

  const history = useHistory();
  useEffect(() => {
      const fetchedTests = field?.tests;
      setTests(fetchedTests);
  }, [organizationId, fieldId,field]);

  useEffect(() => {
    (async () => {
      if (selectedTest) {
        const fetchedTakenTests = await dataService.getTakenTests(
          selectedTest?.id
        );
        if (typeof fetchedTakenTests !== "string") {
          setTakenTests(fetchedTakenTests);
          setNumofSub(fetchedTakenTests.length);
        }

        setselectedTestQuestions(
          organizations
            ?.find((o) => o.id === organizationId)
            ?.questions.filter((q) => !selectedTest.questionIds.includes(q.id))
        );
      }
    })();
    // #TODO fetch questions of selected test move to questions statistics
  }, [selectedTest, organizationId, organizations, setTakenTests, setNumofSub]);

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
        takenTests={takenTests}
        dateFrom={dateFrom}
        dateTo={dateTo}
        numofSub={numofSub}
        selectedTestQuestions={selectedTestQuestions}
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
