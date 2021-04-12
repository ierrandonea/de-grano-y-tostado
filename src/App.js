import React from 'react';
import { Route, Switch } from 'react-router-dom';

// layouts
import MainLayout from './layouts/mainLayout';
// layouts

// components
import Home from './pages/homepage/home';
import Registration from './pages/registration/registration';
// components

// styles
import './default.scss';
// styles



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (<MainLayout>
          <Home />
        </MainLayout>)} />
        <Route exact path="/login_register" render={() => (<MainLayout>
          <Registration />
        </MainLayout>)} />
      </Switch>
    </div>
  );
}

export default App;
