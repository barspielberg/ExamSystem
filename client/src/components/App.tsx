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

//TODO add guard when user is null

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ActiveTest/:testId" component={ActiveTestPage} />
        <Route path="/TestReport/:fieldId" component={TestReportPage} />
        <Route path="/StudentReport/:fieldId" component={StudentReportPage} />
        <Route path="/EditTest/:testId" component={EditTestPage} />
        <Route path="/EditQuestion/:questionId" component={EditQuestionPage} />
        <Route path="/ManageTests/:fieldId" component={ManageTestsPage} />
        <Route
          path="/ManageQuestions/:fieldId"
          component={ManageQuestionsPage}
        />
        <Route path="/MainMenu" component={MainMenuPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
