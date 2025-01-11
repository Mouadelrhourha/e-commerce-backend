import {client} from "../database/database";
export interface Users {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
}

export const getAllUsers = async () => {

    const queryGetUsers = await client.query(`select * from users`);
    return queryGetUsers.rows;
}

export const getuserById = async (id:number) : Promise<Users>=> {
        const userByUId =  await client.query(`select * from users where id=$1`,[id]);
        return userByUId.rows[0];

}

export const login = async (email : any , password : any ) => {

    const queryLogin = await client.query(`select *  from users where email=$1 and password=$2`,[email,password]);

    return queryLogin.rows[0];

}


export default { getAllUsers ,getuserById , login};