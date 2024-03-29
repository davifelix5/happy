import { Router } from 'express';
import upload from './config/uploads'

import OrphanagesController from './controllers/OrphanagesController'
import UserController from './controllers/UserController'

import authMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/users/sign-up', UserController.register)
routes.post('/users/sign-in', UserController.login)
routes.post('/users/forgot-password', UserController.forgotPassword)
routes.post('/users/reset-password', UserController.resetPassword)

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.get('/pending-orphanages', OrphanagesController.listPending)

routes.use(authMiddleware)

routes.get('/users/me', UserController.show)

routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.delete('/orphanages/delete/:id', OrphanagesController.delete)
routes.put('/orphanages/update/:id', OrphanagesController.update)
routes.patch('/orphanages/approve/:id', OrphanagesController.approve)


export default routes;