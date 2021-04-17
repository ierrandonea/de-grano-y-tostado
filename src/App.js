import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import { setCurrentUser } from './redux/user/user.actions';

// layouts
import MainLayout from './layouts/mainLayout';

// pages
import Home from './pages/homepage/home';
import Registration from './pages/registration/registration';
import Login from './pages/login/login';
import Recovery from './pages/recovery/recovery';

// styles
import "bootswatch/dist/lux/bootstrap.min.css";
import './default.scss';

class App extends Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.authListener();

  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <MainLayout>
              <Home />
            </MainLayout>
          )} />
          <Route exact path="/registro"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )} />
          <Route exact path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
          <Route exact path="/recovery" render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);