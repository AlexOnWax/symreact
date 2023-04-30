import React, {useState} from "react";
import authApi from "../services/authApi";
import { useNavigate } from 'react-router-dom';
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

        <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="_username">Adresse email</label>
                    <input value={credentials.username}
                           onChange={handleChange}
                           className={"form-control" + (error && " is-invalid")}
                           type="email"
                           placeholder="Adresse email"
                           name="username"
                           id="username"/>
                    {error && <p className="invalid-feedback">{error}</p> }
                </div>
                <div className="form-group">
                    <label htmlFor="_username">Mot de passe</label>
                    <input value={credentials.password}
                           onChange={handleChange}
                           className="form-control "
                           type="password"
                           placeholder="Mot de passe"
                           name="password"
                           id="password"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default Login;