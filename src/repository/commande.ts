import {client} from "../database/database";
import {Commande, CommandeWithProducts, CreateCommandeDto, ProductQuantity} from "../model/commande.model";
import {computeTotalPrice, mapCommande, mapCommandeWithProducts, mapProductFromCommande} from "./utils";

/**
 * 1 => {
 *     dateCreation: "2021-01-01",
 *     idUser: 1
 *     products: [
 *     {
 *     idProduit: 1,
 *     quantite: 2,
 *     prixUnitaire: 10
 *     },
 *      {
 *     idProduit: 1,
 *     quantite: 2,
 *     prixUnitaire: 10
 *     },
 *          {
 *     idProduit: 1,
 *     quantite: 2,
 *     prixUnitaire: 10
 *     }
 *     ]
 * }
 *
 * => mr7ala lwla inserew l commande
 * => inserti les produits
 *
 * @param commande
 * @constructor
 */
export const createCommande = async (commande: CreateCommandeDto): Promise<CommandeWithProducts> => {
    // inserer la commande, et recuperer l'id de la commande
    const queryCreateCommnade = (`
        INSERT INTO commande
            (date_creation, id_user)
        VALUES ($1, $2) returning * `)
    const createCommandeQueryResult = await client.query(queryCreateCommnade, [commande.dateCreation, commande.idUser]);
    const createdCommande: Commande = mapCommande(createCommandeQueryResult.rows[0]);
    const insertProductsQueryString = (`
        INSERT INTO produit_commande
            (id_produit, id_commande, quantite, prix_unitaire)
        VALUES ($1, $2, $3, $4)
    `);
    // inserer les produits et les stocker dans un tableau
    const products : ProductQuantity[] = [];
    for (const product of commande.products) {
        const insertProductQuantityQuery = await client.query(insertProductsQueryString,
            [product.idProduit, createdCommande.id, product.quantite, product.prixUnitaire]
        )
        const insertedQuantity = insertProductQuantityQuery.rows[0];
        products.push(mapProductFromCommande(insertedQuantity));
    }
    // retourner la commande avec les produits
    return {
        ...createdCommande,
        products,
        prixTotal: computeTotalPrice(products)
    }

}

export const getCommandeByUser = async (idUser: number) : Promise<CommandeWithProducts[]> => {
    const queryCommandeByUser = (`
        select id,
               date_creation,
               id_user,
               id_produit,
               quantite,
               prix_unitaire

        from commande
                 join
             produit_commande on produit_commande.id_commande = commande.id
        where id_user = $1
    `)

    const commandeByUser = await client.query(queryCommandeByUser, [idUser])
    const result: Record<string, CommandeWithProducts> = {};

    for (const row of commandeByUser.rows) {
        const idCommande = row.id;
        if (result[idCommande]) {
            const commandeDetails = result[idCommande];
            commandeDetails.products.push(mapProductFromCommande(row));

        } else {
            result[idCommande] = mapCommandeWithProducts(row);
        }
    }

    return Object.values(result).map((commande:CommandeWithProducts) => {
        commande.prixTotal = computeTotalPrice(commande.products);
        return commande;
    })
}


export const getCommandeById = async (id: number): Promise<CommandeWithProducts> =>  {
    const commandeByIdQuery = await client.query(`
        select id_produit,
               id_commande,
               quantite,
               prix_unitaire,
               id_user,
               date_creation
        from produit_commande
                 join
             commande on commande.id = produit_commande.id_commande
        where id_commande = $1
    `, [id]);

    const commandeDetails=mapCommande(commandeByIdQuery.rows[0]);
    const products = commandeByIdQuery.rows.map(mapProductFromCommande);
    const prixTotal = computeTotalPrice(products);

    return {
        ...commandeDetails,
        products,
        prixTotal,
    }

}

export default {createCommande, getCommandeByUser, getCommandeById};
