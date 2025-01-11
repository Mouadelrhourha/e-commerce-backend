import express, {Express, Response, Request} from 'express';
import {connecteDb} from "./database/database";
import cors from 'cors';
import routerProduit from "./router/produit-router";
import commandeRouter from "./router/commande-router";
import usersRouter from "./router/users-router";
import usersController from "./controller/users-controller";

const app: Express = express();
app.use(express.json())
app.use(cors());
app.use('/produit', routerProduit)
app.use('/commande', commandeRouter)
app.use('/users',usersRouter)
app.use('/login',usersController.loginHandler)

const port = process.env.PORT || 3001;
app.listen(port, connecteDb);