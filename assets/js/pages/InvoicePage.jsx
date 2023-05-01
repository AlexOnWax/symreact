import React, {useState,useEffect} from "react";
import Field from "../component/forms/Field";
import Select from "../component/forms/Select";
import {Link, useNavigate, useParams} from "react-router-dom";
import CustomersApi from "../services/customersApi";
import axios from "axios";
import InvoicesApi from "../services/invoicesApi";

const InvoicePage = props =>
{
    const history = useNavigate();
    const { id } = useParams();

    const [invoice,setInvoice] = useState({
        amount:"",
        customer:"",
        status:"SENT" //je defini le sent pour eviter que si on ne touche pas au Select le champ ne soit pa vide
    })
    const [errors,setErrors] = useState({
        amount:"",
        customer:"",
        status:""
    })
    const [editing, setEditing] =useState(false);

    const [customers, setCustomers]= useState([])
    const fetchCustomers = async () => {
        try {
            const data  = await CustomersApi.findAll();
            setCustomers(data);
            //permet de donnet au Select la valeur de base au demarage de la page
             if (!invoice.customer && id === "new")

            {
                setInvoice({...invoice,customer:data[0].id})
            }

        }catch (error){
            history("/invoices")
        }
}
    //UseEffect est une fonction dont la dépendance est " aucune variable"
    // elle va donc se lancer à chaque chargement de ce composant
    useEffect(()=>{
        fetchCustomers();


    },[])

    useEffect(()=>{
        if (id !== "new")
        {
            setEditing(true)
            fetchInvoice(id);

        }
    },[id]);
    const fetchInvoice= async id => {
        try {
            const {amount,status,customer} = await InvoicesApi.find(id);
            setInvoice({amount,status,customer:customer.id});
        }catch(error) {
            console.log(error.response);
            history("/invoices")
        }
    }

    const handleChange = ({ currentTarget }) => {
        //extrait name et value à partir de current Target
        const { name, value } = currentTarget;
        if (name === "amount") {
            //transforme mon amount en float
            setInvoice({ ...invoice, [name]: parseFloat(value) });
        } else {
            setInvoice({ ...invoice, [name]: value });
        }
    };

    const handleSubmit= async event =>{
        event.preventDefault();
        //transforme mon amount en float
        try{
        if (editing){
            await InvoicesApi.edite(id,invoice);
            history("/invoices")
        }else{
            await InvoicesApi.create(invoice);
            history("/invoices")
        }

        }catch({response}){
           const {violations} =response.data;
            if (violations){
                const apiErrors={};
                violations.forEach(({propertyPath,message})=>{
                    apiErrors[propertyPath] = message;
                });
                // console.log(apiErrors);
                setErrors(apiErrors);
            }
        }
    }

    return (
        <>
            <div className="container">
            {!editing && <h1> Création d'une facture</h1> || <h1> Modification de la facture</h1>}

            <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeHolder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                    //className={"form-control" + (error && " is-invalid")}
                >

                    {customers.map(customer =>
                        <option key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName}
                        </option>
                    )}
                </Select>
                <Select
                    name="status"
                    label="Status"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                    //className={"form-control" + (error && " is-invalid")}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" >Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste des factures</Link>
                </div>

            </form>
            </div>
        </>
    );
}

export default InvoicePage;
