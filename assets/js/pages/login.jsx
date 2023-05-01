import React, {useState} from "react";
import authApi from "../services/authApi";
import {Link, useNavigate} from 'react-router-dom';
import Field from "../component/forms/Field";
const Login = ({onLogin}) => {

const [credentials, setCredentials] =useState({
    username:"",
    password:""
});
const [error, setError] = useState("");
    const history = useNavigate();

    const handleChange = ({currentTarget}) => {
    const {value,name} = currentTarget;
    setCredentials({...credentials,[name]:value});
}
const handleSubmit = async event => {
    event.preventDefault();
    try {
       await authApi.authenticate(credentials);
    setError("");
    onLogin(true);
    history("/invoices")
    }catch (error){
        setError("Aucun compte ne correspond ou les informations sont mauvaises");
    }
};

    return(
        <>
        <div className="container">
            <h1>Connexion à l'application</h1>
                <form onSubmit={handleSubmit}>
                    <Field label="Adresse email" name='username' value={credentials.username} onChange={handleChange}
                           placeHolder="Adresse email de connexion" error={error} />
                    <Field label="Mot de passe" name='password' value={credentials.password} onChange={handleChange}
                           placeHolder="Votre mot de passe" error="" type="password"/>

                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Connexion</button>
                        <Link to="/inscription" className="btn btn-link">Je n'ai pas de compte</Link>
                    </div>
                </form>
        </div>
        </>
    )
}

export default Login;