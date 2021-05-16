import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utils';

import { setCurrentUser } from './redux/user/user.actions';

// hoc
import WithAuth from './hoc/withAuth';

// layouts
import MainLayout from './layouts/mainLayout';

// pages
import Home from './pages/homepage/home';
import Registration from './pages/registration/registration';
import Login from './pages/login/login';
import Recovery from './pages/recovery/recovery';
import Dashboard from './pages/dashboard/dashboard';

// styles
import "bootswatch/dist/lux/bootstrap.min.css";
import './default.scss';

const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        });
      }
      dispatch(setCurrentUser(userAuth));
    });
    return () => {
      authListener();
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )} />
        <Route path="/register"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        <Route path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />
      </Switch>
    </div>
  );
}

export default App;