import usersService, {getUserById} from '../services/user-service'
import {Request, Response} from 'express'

export const getAllusersHandler = async (req: Request, res: Response) => {

    const users = await usersService.getAllUsers()
     res.status(200).json(users)


}
export const getUserByIdHandler = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const userById = await usersService.getUserById(id)
    res.status(200).json(userById)
}
export const loginHandler = async (req: Request, res: Response) => {
    const {email,password} = req.body;
    const login = await usersService.login(email, password);
    res.status(200).json(login)
}

export default {getAllusersHandler,getUserByIdHandler,loginHandler}