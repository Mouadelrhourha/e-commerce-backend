import usersRepo, {Users} from "../repository/users"

export const getAllUsers = async () => {
    return  await usersRepo.getAllUsers()
}
export const getUserById = async (id:number) => {
    return await usersRepo.getuserById(id)
}

export const login = async (email:any,password : any) => {
    const userLogin =  await usersRepo.login(email,password)


    delete userLogin.password


    return userLogin;
}

export default {getAllUsers,getUserById,login}