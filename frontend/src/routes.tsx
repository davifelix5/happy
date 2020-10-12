import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route name="landing" path='/' component={Landing} exact />
        <Route name="map" path='/app' component={OrphanagesMap} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes