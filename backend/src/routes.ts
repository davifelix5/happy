import { Router } from 'express';
import upload from './config/uploads'

import OrphanagesController from './controllers/OrphanagesController'

const routes = Router();

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

export default routes;