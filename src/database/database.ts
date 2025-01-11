import {Client} from 'pg';
export const client = new Client({
    user : 'postgres',
    password : '',
    database: 'e-commerce',
    host: 'localhost',
    port:5432,
})
export async function connecteDb(){
    await client.connect();
    console.log("Connected to DB");
}

module.exports={
    client,connecteDb
};
