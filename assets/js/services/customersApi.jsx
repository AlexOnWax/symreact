import axios from "axios";
import {CUSTOMERS_API} from "../config";


// async function findAll() {
//     const cachedCustomers = await  Cache.get("customers");
//     if (cachedCustomers) return cachedCustomers;
//     return  axios.get("/api/customers").then(response => {
//         const customers = response.data['hydra:member'];
//         Cache.set("customers",customers);
//         return customers;
//     })
// }
function findAll() {
    return  axios.get(CUSTOMERS_API)
        .then(response => response.data['hydra:member']);
}
function deleteCustomers(id) {
   return  axios.delete(CUSTOMERS_API + "/" + id)
        .then(response => console.log('ok'))
}
function find(id){
    return  axios.get(CUSTOMERS_API + "/" + id)
        .then(response=>response.data);
}
function edite(id,customer){
   axios.put(CUSTOMERS_API + "/" + id, customer);
}
function create(customer){
    axios.post(CUSTOMERS_API, customer);
}

export default {
    findAll,
    delete : deleteCustomers,
    find,
    edite,
    create
}