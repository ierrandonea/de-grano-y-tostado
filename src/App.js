import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// layouts
import MainLayout from './layouts/mainLayout';

// components
import Home from './pages/homepage/home';
import Registration from './pages/registration/registration';
import Login from './pages/login/login';

// styles
import "bootswatch/dist/lux/bootstrap.min.css";
import './default.scss';

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      this.setState({
        ...initialState
      })
    });
  }

  componentWillUnmount() {
    this.authListener();

  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <MainLayout currentUser={currentUser}>
              <Home />
            </MainLayout>
          )} />
          <Route exact path="/registro"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )} />
          <Route exact path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
        </Switch>
      </div>
    );
  }
}

export default App;
