import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphapage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route name="landing" path='/' component={Landing} exact />
        <Route name="map" path='/app' component={OrphanagesMap} />
        <Route name="create-orphanage" path='/orphanage/create' component={CreateOrphapage} />
        <Route name="orphanage" path='/orphanage/:id' component={Orphanage} />
        <Route name="not-found" component={() => <div>Página não encontrada</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes