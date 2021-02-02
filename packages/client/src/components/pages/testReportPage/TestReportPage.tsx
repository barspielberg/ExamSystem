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
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [anyDate, setAnyDate] = useState<boolean>(!(dateFrom && dateTo));
  const [numofSub, setNumofSub] = useState(0);

  const history = useHistory();
  useEffect(() => {
    const fetchedTests = field?.tests;
    setTests(fetchedTests);
  }, [organizationId, fieldId, field]);

  useEffect(() => {
    (async () => {
      if (selectedTest) {
        const fetchedTakenTests = await dataService.getTakenTests(
          selectedTest?.id
        );
        if (typeof fetchedTakenTests !== "string") {
          if (anyDate) setTakenTests(fetchedTakenTests);
          else if (dateFrom && dateTo && !anyDate) {
            //#TODO fix date filtering
            const filteredByDateTakenTests = fetchedTakenTests.filter(
              (tt) =>
                new Date(tt.dateSubmitted) >= new Date(dateFrom) &&
                new Date(tt.dateSubmitted) <= new Date(dateTo)
            );
            console.log(filteredByDateTakenTests);
            setTakenTests(filteredByDateTakenTests);
          }
          setNumofSub(fetchedTakenTests.length);
        }

        setselectedTestQuestions(
          organizations
            ?.find((o) => o.id === organizationId)
            ?.questions.filter((q) => selectedTest.questionIds.includes(q.id))
        );
      }
    })();
    // #TODO fetch questions of selected test move to questions statistics
  }, [
    selectedTest,
    organizationId,
    organizations,
    setTakenTests,
    setNumofSub,
    setselectedTestQuestions,
    dateFrom,
    dateTo,
    anyDate,
  ]);

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
      <TestSummary
        selectedTest={selectedTest}
        takenTests={takenTests}
        dateFrom={dateFrom}
        dateTo={dateTo}
        anyDate={anyDate}
        numofSub={numofSub}
        selectedTestQuestions={selectedTestQuestions}
        setTakenTests={setTakenTests}
      />
      <TestRespondent takenTests={takenTests} answers={selectedTestQuestions} />
      <QuestionStatistics
        questions={selectedTestQuestions}
        takenTests={takenTests}
      />
      <Button onClick={() => history.goBack()}>« Back</Button>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TestReportPage);
