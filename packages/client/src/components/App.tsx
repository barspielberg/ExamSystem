import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RootState } from "../redux/reducers/mainReducer";
import "./App.scss";
import ActiveTestPage from "./pages/activeTestPage/ActiveTestPage";
import EditQuestionPage from "./pages/editQuestionPage/EditQuestionPage";
import EditTestPage from "./pages/editTestPage/EditTestPage";
import LoginPage from "./pages/loginPage/LoginPage";
import MainMenuPage from "./pages/mainMenuPage/MainMenuPage";
import ManageQuestionsPage from "./pages/manageQuestionsPage/ManageQuestionsPage";
import ManageTestsPage from "./pages/manageTestsPage/ManageTestsPage";
import StudentReportPage from "./pages/studentReportPage/StudentReportPage";
import TestReportPage from "./pages/testReportPage/TestReportPage";
import { PopupMessage } from "./uiElements";
import PrivateRoute from "./utilComponents/PrivateRoute";
import { setError } from "../redux/actions/adminActions";

interface IAppProps {
  error: string;
  setError: (err: string) => void;
}

const App: React.FC<IAppProps> = ({ error, setError }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ActiveTest/:testId" component={ActiveTestPage} />
        <PrivateRoute path="/TestReport" Component={TestReportPage} />
        <PrivateRoute path="/StudentReport" Component={StudentReportPage} />
        <PrivateRoute path="/EditTest" Component={EditTestPage} />
        <PrivateRoute path="/EditQuestion" Component={EditQuestionPage} />
        <PrivateRoute path="/ManageTests" Component={ManageTestsPage} />
        <PrivateRoute path="/ManageQuestions" Component={ManageQuestionsPage} />
        <PrivateRoute path="/MainMenu" Component={MainMenuPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
      <PopupMessage
        show={!!error}
        clear={() => setError("")}
        title="Error"
        warning
        text={error}
      />
    </BrowserRouter>
  );
};

const mapState2Props = (state: RootState) => ({
  error: state.admin.error,
});
const mapDispatch2Props = {
  setError: setError,
};
export default connect(mapState2Props, mapDispatch2Props)(App);
