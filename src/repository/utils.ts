import {Commande, CommandeWithProducts, ProductQuantity} from "../model/commande.model";

export const mapCommande = (commande: any) : Commande => {
    return {
        id: commande.id,
        dateCreation: commande.date_creation,
        idUser: commande.id_user,
    }
}

export const mapProductFromCommande = (commande: any): ProductQuantity => {
    return {
        idProduit: commande.id_produit,
        quantite: commande.quantite,
        prixUnitaire: commande.prix_unitaire
    }
}

export const mapCommandeWithProducts = (commande: any): CommandeWithProducts => {
    return {
        ...mapCommande(commande),
        prixTotal: 0,
        products: [
            mapProductFromCommande(commande)
        ],
    }
}


export const computeTotalPrice = (products : ProductQuantity[]): number => {
    return products.reduce((acc, produit) => {
        return acc + produit.quantite * produit.prixUnitaire
    },0)
}
