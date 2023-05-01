import React, {useEffect, useState} from "react";
import Field from "../component/forms/Field";
import {Link, useNavigate, useParams} from "react-router-dom";
import CustomersApi from "../services/customersApi";
const CustomerPage = props => {
    const history = useNavigate();
    const { id } = useParams();
    // if (id !== "new")
    // {
    //     console.log(id)
    // }
    // console.log(id);
    const [customer, setCustomer] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:"",

    })
    const [errors,setErrors]= useState({
        lastName:"",
        firstName:"",
        email:"",
        company:""
    })
    const [editing, setEditing] =useState(false);
    //recuperation du customers en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {

            // const data = await CustomersApi.find(id);
            // const {firstName, lastName,email,company} = data;
            const {firstName, lastName,email,company} = await CustomersApi.find(id);
            //console.log(data);
            setCustomer({firstName, lastName,email,company})
        }catch(error) {
            //console.log(error.response);
            history("/customers")
        }
    }
    //chargement du customers si besoin au chargement du compoasant
    //oi au changement de l'identifiant
    useEffect(() =>{
        if (id !== "new")
        {
            setEditing(true)
            fetchCustomer(id);

        }
    },[id]);




//gestion du changement des inpit dans le form
    const handleChange = ({currentTarget}) =>{
        //extrait name et value à partir de current Target
        const {value,name}= currentTarget;
        setCustomer({...customer,[name]:value})
        //Elle modifie le customers dans mon état, mais remplace la donnée dans Name par value
    }

    //gestion de la soumission du form
    const handleSubmit = async event => {
       event.preventDefault();
       try {
           if (editing){
                await CustomersApi.edite(id,customer)
           }else {
               await CustomersApi.create(customer);
               history("/customers")
               setErrors({});
           }

       }catch ({response}){
           const {violations} =response.data
           //console.log(error.response)
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

    return(
        <>
            <div className="container">
                {!editing &&<h1> Création d'un client</h1> || <h1> Modification du client</h1>}
                    <form onSubmit={handleSubmit}>
                        <Field  name="lastName" type="text" label="Nom de famille" placeHolder="Nom de famille du client" value={customer.lastName} onChange={handleChange} error={errors.lastName}/>
                        <Field name="firstName" type="text" label="Prénom" placeHolder="Prénom du client" value={customer.firstName} onChange={handleChange} error={errors.firstName}/>
                        <Field name="email" type="email" label="Email" placeHolder="Email du client" value={customer.email} onChange={handleChange} error={errors.email}/>
                        <Field name="company" type="text" label="Entreprise" placeHolder="Entreprise du client" value={customer.company} onChange={handleChange} error={errors.company} />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" >Enregistrer</button>
                            <Link to="/customers" className="btn btn-link">Retour à la liste des clients</Link>
                        </div>
                    </form>
            </div>
        </>
    )
}

export default CustomerPage;