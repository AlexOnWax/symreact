import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import Navbar from "../component/Navbar";
import axios from "axios";
import Pagination from "../component/Pagination";

const CustomersPageWithPagination = props =>{
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems]= useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 15;
    useEffect(()=>{
        axios.get(`/api/customers?pagination=true&count=${itemPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
            })

            .catch(error=>console.log(error.response));
    },[currentPage]);
    const handleDelete = (id)  =>{
        console.log(id);
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer=>customer.id !== id))

        axios.delete(`/api/customeres/${id}`)
            .then(response=> console.log('ok'))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    }
    const handleChangePage = (page) => {
        // setCustomers([]);
        setCurrentPage(page);
    }

    const paginatedCustomers = Pagination.getData(customers,currentPage , itemPerPage)
    return (
        <>
            <Navbar />
            <h1>Liste des clients (Pagination)</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entrprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total</th>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody>
                {customers.length=== 0 &&<tr><td>Chargement ...</td></tr>}
                {customers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td> <Link className="navbar-brand" to={""}>{customer.firstName} {customer.lastName}</Link></td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span>{customer.invoices.length}</span>
                    </td>
                    <td>{customer.totalAmount.toLocaleString()}</td>
                    <td> <button onClick={()=>handleDelete(customer.id)} disabled={customer.invoices.length > 0 } className="btn btn-danger btn-sm">Supprimer</button> </td>

                </tr>)}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={totalItems} onPageChanged={handleChangePage}/>


        </>



    )
}

export default CustomersPageWithPagination;