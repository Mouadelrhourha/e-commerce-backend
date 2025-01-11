import commandeRepo, {Commande} from '../repository/commande'

export const createCommande = async (commande: Commande) => {

    return await commandeRepo.CreateCommande(commande)

}

export const getCommandeByUser = async (id_user: number) => {
    return await commandeRepo.getCommandeByUser(id_user)
}

export const getCommandeById = async (id: number) => {
    return await commandeRepo.getCommandeById(id)
}
export default {createCommande, getCommandeByUser, getCommandeById}