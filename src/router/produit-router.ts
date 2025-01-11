import {Router} from "express";

import produitController from "../controller/produit-controller";

 const routerProduit :Router = Router()

routerProduit.get('/',produitController.getAllProductsHandler)


export default routerProduit