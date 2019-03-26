import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/Common/Theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { loadUser } from './actions/auth';
import { getItems } from './actions/items';
import { getAreas } from './actions/areas';
// import Register from "./accounts/Register";
// import PrivateRoute from "./common/PrivateRoute";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import LandingPage from './views/LandingPage/LandingPage';
import SignupPage from './views/SignupPage/SignupPage';
import LoginPage from './views/LoginPage/LoginPage';
import OrderPage from './views/OrderPage/OrderPage';
import AccountPage from './views/AccountPage/AccountPage';
import Alerts from './components/Common/Alerts';
import Starter from '../src/components/Starter/Starter';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

class App extends Component {
  componentWillMount = () => {
    store.dispatch(loadUser());
    store.dispatch(getItems());
    store.dispatch(getAreas());
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {' '}
            {/* loading={<LoadingView />} */}
            <AlertProvider template={AlertTemplate} {...alertOptions}>
              <Starter>
                <Router>
                  <Fragment>
                    <Alerts />
                    <div>
                      <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/signup" component={SignupPage} />
                        <Route exact path="/order" component={OrderPage} />
                        <Route exact path="/account" component={AccountPage} />
                      </Switch>
                    </div>
                    <br />
                  </Fragment>
                </Router>
              </Starter>
            </AlertProvider>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
