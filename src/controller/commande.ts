import {Request, Response} from 'express';
import commandeService, {getCommandeById} from '../services/commande'
import Commande from "../services/commande";


export const CreateCommandeHandler = async (req: Request, res: Response) => {

    const createdCommande = await commandeService.createCommande(req.body)
    res.status(201).json(createdCommande)

}

export const getCommandeByUserHandler = async (req: Request, res: Response) => {
    const id_user = parseInt(req.params.id);
    const commandeByUser = await commandeService.getCommandeByUser(id_user);
    res.status(200).json(commandeByUser)
}

export const getCommandeByIdHandler = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const commandeById = await commandeService.getCommandeById(id)
    res.status(200).json(commandeById);

}
export default {CreateCommandeHandler, getCommandeByIdHandler, getCommandeByUserHandler}