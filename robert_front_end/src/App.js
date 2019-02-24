import React, { Component, Fragment } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./components/Common/Theme";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { loadUser } from "./actions/auth";
import { getItems } from "./actions/items";

// import Register from "./accounts/Register";
// import PrivateRoute from "./common/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./views/LandingPage/LandingPage";
import SignupPage from "./views/SignupPage/SignupPage";
import LoginPage from "./views/LoginPage/LoginPage";
import OrderPage from "./views/OrderPage/OrderPage";
import Alerts from "./components/Common/Alerts";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getItems());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
              <Fragment>
                <Alerts />
                <div>
                  <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/order" component={OrderPage} />
                  </Switch>
                </div>
                <br />
              </Fragment>
            </Router>
          </AlertProvider>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
