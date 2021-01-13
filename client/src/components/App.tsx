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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ActiveTest/:testId" component={ActiveTestPage} />
        <Route path="/TestReport" component={TestReportPage} />
        <Route path="/StudentReport" component={StudentReportPage} />
        <Route path="/EditTest" component={EditTestPage} />
        <Route path="/EditQuestion" component={EditQuestionPage} />
        <Route path="/ManageTests" component={ManageTestsPage} />
        <Route path="/ManageQuestions" component={ManageQuestionsPage} />
        <Route path="/MainMenu" component={MainMenuPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
