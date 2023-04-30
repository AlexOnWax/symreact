import axios from "axios";

function findAll() {
    return  axios.get("/api/customers")
        .then(response => response.data['hydra:member']);
}
function deleteCustomers(id) {
   return  axios.delete(`/api/customers/${id}`)
        .then(response => console.log('ok'))
}
function find(id){
    return  axios.get('/api/customers/'+id)
        .then(response=>response.data);
}
function edite(id,customer){
   axios.put('/api/customers/'+ id, customer);
}
function create(customer){
    axios.post('/api/customers', customer);
}

export default {
    findAll,
    delete : deleteCustomers,
    find,
    edite,
    create
}