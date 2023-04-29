import axios from "axios";

function findAll() {
    return  axios.get("/api/invoices")
        .then(response => response.data['hydra:member']);
}
function deleteInvoices(id) {
    return  axios.delete(`/api/invoices/${id}`)
        .then(response => console.log('ok'))
}
export default {
    findAll,
    delete : deleteInvoices
}