import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import Pagination from "../component/Pagination";
import customersApi from "../services/customersApi";
const CustomersPage = props => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    useEffect(() => {
        customersApi.findAll()
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, []);
    const handleDelete = (id) => {
        console.log(id);
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id))

       customersApi.delete(id)
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    }
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }
    const itemPerPage = 15;
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemPerPage)
    return (
        <>

            <h1>Liste des clients</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher"/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total</th>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><Link className="navbar-brand" to={""}>{customer.firstName} {customer.lastName}</Link></td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span>{customer.invoices.length}</span>
                    </td>
                    <td>{customer.totalAmount.toLocaleString()}</td>
                    <td>
                        <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0}
                                className="btn btn-danger btn-sm">Supprimer
                        </button>
                    </td>

                </tr>)}

                </tbody>
            </table>
            {itemPerPage < filteredCustomers.length &&
            <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={filteredCustomers.length}
                        onPageChanged={handleChangePage}/>}


        </>


    )
}

export default CustomersPage;