import axios from "axios";

function findAll() {
    return  axios.get("/api/customers")
        .then(response => response.data['hydra:member']);
}
function deleteCustomers(id) {
   return  axios.delete(`/api/customers/${id}`)
        .then(response => console.log('ok'))
}
export default {
    findAll,
    delete : deleteCustomers
}