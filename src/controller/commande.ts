import {Request, Response} from 'express';
import commandeService from '../services/commande'
import {CreateCommandeDto} from "../model/commande.model";

const isValidCreateCommandeDto = (createCommandeDto: any)=> {
    return createCommandeDto.idUser
        && createCommandeDto.dateCreation
        && Array.isArray(createCommandeDto.products)
        && createCommandeDto.products.length > 0
}

export const createCommandeHandler = async (req: Request, res: Response) => {
    const createCommandeDto : CreateCommandeDto = req.body;
    if(!isValidCreateCommandeDto(createCommandeDto)){
         res.status(400).json({error: 'Invalid input'})
    }
    const createdCommande = await commandeService.createCommande(createCommandeDto)
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
export default {createCommandeHandler, getCommandeByIdHandler, getCommandeByUserHandler}
