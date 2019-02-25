import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../views/LoginPage/LoginPage';
import NotFound from '../components/NotFound/NotFound';

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Routes;
