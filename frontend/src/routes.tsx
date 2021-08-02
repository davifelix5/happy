import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphapage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route name="landing" path='/' component={Landing} exact />
      <Route name="map" path='/app' component={OrphanagesMap} />
      <Route name="create-orphanage" path='/orphanage/create' component={CreateOrphapage} />
      <Route name="orphanage" path='/orphanage/:id' component={Orphanage} />
      <Route name="admin" path='/admin' component={Dashboard} exact />
      <Route name="login" path='/auth/login' component={Login} />
      <Route name="forgot-password" path='/auth/forgot-password' component={ForgotPassword} />
      <Route name="reset-password" path='/auth/reset-password' component={ResetPassword} />
    </Switch>
  );
}

export default Routes