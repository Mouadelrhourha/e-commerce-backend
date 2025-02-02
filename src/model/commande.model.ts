export interface Commande {
    id: number;
    dateCreation: Date;
    idUser: number;
}

export interface ProductQuantity {
    idProduit: number;
    quantite: number;
    prixUnitaire: number;
}

export interface CommandeWithProducts extends Commande {
    products: ProductQuantity[]
    prixTotal:number;
}

export interface CreateCommandeDto {
    dateCreation: Date;
    idUser: number;
    products: ProductQuantity[]
}
