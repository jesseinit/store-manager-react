import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../views/LoginPage/LoginPage';
import NotFound from '../components/NotFound/NotFound';
import Dashboard from '../views/DashboardPage/DashboardPage';
import AdminRoutesHOC from '../containers/AdminRoutes';

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <AdminRoutesHOC exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Routes;
