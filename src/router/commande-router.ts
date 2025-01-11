import {Router} from 'express';
import commandeController from '../controller/commande'

const commnadeRouter: Router = Router();

commnadeRouter.post('/', commandeController.CreateCommandeHandler)
commnadeRouter.get('/user/:id', commandeController.getCommandeByUserHandler)
commnadeRouter.get('/:id', commandeController.getCommandeByIdHandler)

export default commnadeRouter;