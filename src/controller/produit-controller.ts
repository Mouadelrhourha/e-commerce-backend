import produitService from "../services/produit-service";
import  {Request, Response} from "express";
export const getAllProductsHandler = async (req: Request, res: Response) => {

    const allProduit = await produitService.getAllproducts()
    res.json(allProduit);
}

export default {getAllProductsHandler};