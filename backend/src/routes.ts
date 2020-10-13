import { Router } from 'express';
import multer from 'multer'
import multerConfig from './config/uploads'

import OrphanagesController from './controllers/OrphanagesController'

const routes = Router();
const upload = multer(multerConfig)

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

export default routes;