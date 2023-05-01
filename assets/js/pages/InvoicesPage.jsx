import React, {useEffect, useState} from "react";
import Navbar from "../component/Navbar";
import invoicesApi from "../services/invoicesApi";
import moment from "moment";
import Pagination from "../component/Pagination";
import {Link, NavLink} from "react-router-dom";



const STATUS_CLASSES = {
    PAID:"success",
    SENT:"primary",
    CANCELLED:"danger",
}
const STATUS_LABELS ={
    PAID:"Payée",
    SENT:"Envoyée",
    CANCELLED:"Annulée",
}

const InvoicesPage = props => {
    const [invoices,setInvoices]=useState([]);
    useEffect(() => {
        invoicesApi.findAll()
            .then(data => setInvoices(data))
            .catch(error => console.log(error.response));
    }, []);
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }
    const handleDelete = (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoices => invoices.id !== id))

        invoicesApi.delete(id)
            .catch(error => {
                setInvoices(originalInvoices);
                console.log(error.response);
            });
    }
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }
    const itemPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().includes(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())

    );
const formatDate = (str)=>moment(str).format('DD/MM/YYYY')
    const paginatedInvoices= Pagination.getData(filteredInvoices, currentPage, itemPerPage)

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb3" >
                    <h1>Liste des Factures</h1>
                    <Link to="/invoices/new" className="btn btn-primary">Créé une facture</Link>
                </div>

                <div className="form-group">
                    <input type="text" onChange={handleSearch} value={search} className="form-control"
                           placeholder="Rechercher"/>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Editer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedInvoices.map(invoice =>  <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                        <td>{formatDate(invoice.sentAt)}</td>
                        <td>{invoice.amount.toLocaleString()}</td>
                        <td><span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span></td>
                        <td>

                            <NavLink className="btn btn-success" to={`/invoices/${invoice.id}`}>Editer</NavLink>&nbsp;
                            <button className="btn btn-sm btn-primary" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>

                    </tr>)}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onPageChanged={handleChangePage} length={filteredInvoices.length} />
            </div>
            </>
    );
};
export default InvoicesPage
