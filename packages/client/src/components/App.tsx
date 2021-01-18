import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import PrivateRoute from "./utilComponents/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ActiveTest/:testId" component={ActiveTestPage} />
        <PrivateRoute path="/TestReport/:fieldId" Component={TestReportPage} />
        <PrivateRoute
          path="/StudentReport/:fieldId"
          Component={StudentReportPage}
        />
        <PrivateRoute path="/EditTest" Component={EditTestPage} />
        <PrivateRoute
          path="/EditQuestion/:questionId"
          Component={EditQuestionPage}
        />
        <PrivateRoute
          path="/ManageTests/:fieldId"
          Component={ManageTestsPage}
        />
        <PrivateRoute
          path="/ManageQuestions/:fieldId"
          Component={ManageQuestionsPage}
        />
        <PrivateRoute path="/MainMenu" Component={MainMenuPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
