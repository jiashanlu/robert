import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { loadUser } from "./actions/auth";

// import Register from "./accounts/Register";
// import PrivateRoute from "./common/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/index/Landing";
import Alerts from "./components/layout/Alerts";
import Header from "./components/layout/Header";
import Registration from "./components/accounts/Registration";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <Header />
              <div className="container-fluid main wrapper-3">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/login" component={Registration} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
