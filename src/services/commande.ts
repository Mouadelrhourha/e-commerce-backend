import commandeRepo from '../repository/commande'
import {Commande, CreateCommandeDto} from "../model/commande.model";

export const createCommande = async (commande: CreateCommandeDto) => {
    return await commandeRepo.createCommande(commande)

}

export const getCommandeByUser = async (id_user: number) => {
    return await commandeRepo.getCommandeByUser(id_user)
}

export const getCommandeById = async (id: number) => {
    return await commandeRepo.getCommandeById(id)
}
export default {createCommande, getCommandeByUser, getCommandeById}
