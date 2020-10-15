import React from "react";
import logo from "./logo.svg";
import "./App.css";
import preset from "@rebass/preset";
import { ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import { theme } from "./ui/theme";
import Company from "./pages/company";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Router>
          <Switch>
            <Route path="/:companyId">
              <Company />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
