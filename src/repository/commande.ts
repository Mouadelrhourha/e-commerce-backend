import {client} from "../database/database";
import commandeRouter from "../router/commande-router";

export interface Commande {
    id: number;
    date_creation: Date;
    id_user: number;
}


export const CreateCommande = async (commande: Commande) => {
    const queryCreateCommnade = (`
    INSERT INTO commande
    ( date_creation, id_user)
    VALUES ($1, $2)
    returning * `)

    const createdCommande = await client.query(queryCreateCommnade, [commande.date_creation, commande.id_user]);
    return createdCommande.rows[0];


}

export const getCommandeByUser = async (id_user: number) => {
    const queryCommandeByUser = (`
     select 
        id,
        date_creation,
        id_user,
        id_produit,
        quantite,
        prix_unitaire
        
      from
        commande
      join
        produit_commande on produit_commande.id_commande = commande.id
      where id_user=$1
    `)
    const commandeByUser = await client.query(queryCommandeByUser, [id_user])

    const result :any= {};
    for(const row of commandeByUser.rows) {
        const idCommande =row.id;
       if(result[idCommande]) {
           const commandeDetails = result[idCommande];

            commandeDetails.products.push({
                idProduit : row.id_produit,
                quantite: row.quantite,
                prixUnitaire : row.prix_unitaire,
            })

       }else{
           result[idCommande]={
               idCommande:idCommande,
               isUser : row.id_user,

               products :[{
                   idProduit : row.id_produit,
                   quantite: row.quantite,
                   prixUnitaire : row.prix_unitaire,
               }]
           }

       }


    }

    return Object.values(result).map((commande:any)=>{
         let total =0;
       // const prixTotal = commande.products.map((produit:any)=>{
       //
       //     return  total = total + produit.quantite * produit.prixUnitaire
       //  })

        commande.products.forEach((produit:any)=>{
             total = total + produit.quantite*produit.prixUnitaire;
        })


        return {...commande,
            prixTotal:total}

 })
}


export const getCommandeById = async (id: number) => {

    const commandeById = await client.query(`
        select 
    id_produit,
    id_commande,
    quantite,
    prix_unitaire,
    id_user,
    date_creation
    from produit_commande
    join 
    commande on commande.id = produit_commande.id_commande
    where id_commande=$1
    `, [id]);

   const commnadesById = commandeById;
   const  id_user=commnadesById.rows[0].id_user;
   return {

       'products' : commnadesById.rows.map((row)=>({
           "idProduit":row.id_produit,
           "quantite" : row.quantite,
            "prixUnitaire": row.prix_unitaire,
           "dateCreation": row.date_creation,

       })),
       "idCommande":id,
       "idUser" : id_user


   }

}

export default {CreateCommande, getCommandeByUser, getCommandeById};