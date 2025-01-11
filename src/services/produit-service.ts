export const getAllproducts = async ()=>{
    const url_api = "https://api.escuelajs.co/api/v1/products";
    const response = await fetch(url_api);
    const result =  await response.json();
    return result;

}



export default {getAllproducts}