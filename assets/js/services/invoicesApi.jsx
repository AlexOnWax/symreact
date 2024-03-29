import axios from "axios";
import {func} from "prop-types";
import {INVOICES_API} from "../config";

function findAll() {
    return  axios.get(INVOICES_API)
        .then(response => response.data['hydra:member']);
}
function deleteInvoices(id) {
    return  axios.delete(INVOICES_API + "/" + id)
        .then(response => console.log('ok'))
}
function find(id){
    return  axios.get(INVOICES_API + "/" + id)
        .then(response=>response.data);
}
function edite(id,invoice) {
   return axios.put(INVOICES_API + "/" + id,{...invoice, customer : `/api/customers/${invoice.customer}`})
}
function create(invoice){
  return  axios.post(INVOICES_API,{...invoice, customer : `/api/customers/${invoice.customer}`})
}
export default {
    findAll,
    delete : deleteInvoices,
    find,
    edite,
    create

}