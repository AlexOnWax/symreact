import axios from "axios";
import {func} from "prop-types";

function findAll() {
    return  axios.get("/api/invoices")
        .then(response => response.data['hydra:member']);
}
function deleteInvoices(id) {
    return  axios.delete(`/api/invoices/${id}`)
        .then(response => console.log('ok'))
}
function find(id){
    return  axios.get('/api/invoices/'+id)
        .then(response=>response.data);
}
function edite(id,invoice) {
   return axios.put('/api/invoices/' + id,{...invoice, customer : `/api/customers/${invoice.customer}`})
}
function create(invoice){
  return  axios.post('/api/invoices',{...invoice, customer : `/api/customers/${invoice.customer}`})
}
export default {
    findAll,
    delete : deleteInvoices,
    find,
    edite,
    create

}