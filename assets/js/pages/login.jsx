// import React, {useState} from "react";
// import axios from "axios";
// import {logPlugin} from "@babel/preset-env/lib/debug";
// import CustomersApi from "../services/customersApi";
//
// const Login = (props) => {
// const [credentials, setCredentials] =useState({
//     username:"",
//     password:""
// });
// const [error, setError] = useState("");
// const handleChange = event => {
//     const value = event.currentTarget.value;
//     const name = event.currentTarget.name;
//     setCredentials({...credentials,[name]:value});
// }
// const handleSubmit = async event => {
//     event.preventDefault();
//     try {
//        await axios.post("/api/login_check",credentials)
//            .then(response => response.data.token)
//         setError("");
//        //Je stoque le token dans le local storage
//        window.localStorage.setItem("authToken", token);
//        //je previen axios qu'on a maintenan un header par defau dans nos futur requete http
//        axios.defaults.headers["Authorization"]= "Bearer "+ token;
//
//        const data = await CustomersApi.findAll();
//        console.log(data);
//     }catch(error){
//         console.log(error.response)
//         setError("Aucun compte ne correspond ou les informations sont mauvaises")
//     }
// };
//
//
//     return(
//         <>
//         <h1>Connexion à l'application</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="_username">Adresse email</label>
//                     <input value={credentials.username}
//                            onChange={handleChange}
//                            className={"form-control" + (error && " is-invalid")}
//                            type="email"
//                            placeholder="Adresse email"
//                            name="username"
//                            id="username"/>
//                     {error && <p className="invalid-feedback">{error}</p> }
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="_username">Mot de passe</label>
//                     <input value={credentials.password}
//                            onChange={handleChange}
//                            className="form-control "
//                            type="password"
//                            placeholder="Mot de passe"
//                            name="password"
//                            id="password"/>
//                 </div>
//                 <div className="form-group">
//                     <button type="submit" className="btn btn-success">Connexion</button>
//
//                 </div>
//             </form>
//
//         </>
//     )
// }
//
// export default Login;