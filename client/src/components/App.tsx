import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/2"> 2</Route>
        <Route path="/1"> 1</Route>
        <Route path="/"> home</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
