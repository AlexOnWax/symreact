import React, {useState} from "react";
import {NavLink} from "react-router-dom"
import AuthApi from "../services/authApi";
import authApi from "../services/authApi";
import {isElement} from "react-dom/test-utils";
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
const Navbar = ({isAuthenticated, onLogout}) => {

    const history = useNavigate();
    const handleLogout = () =>{

        authApi.logout();
        onLogout(false);
        toast.info("Vous êtes déconnecté");
        history("/login")

    }
    // const handleClick = () => {
    //     toast.info("Vous êtes déconnecté");
    // }

    return (

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    {/*<div><button onClick={handleClick}>click toast</button>*/}
    {/*</div>*/}

    <div  className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>Alexandre API</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to={`/customers`}>Clients</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={`/invoices`}>Factures</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                {(!isAuthenticated && (
                    <>
                        <li className="nav-item">
                            <NavLink className="btn" to={`/register`}>Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="btn btn-success" to={`/login`}>Connexion</NavLink>
                        </li>
                    </>
                )) || (
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
                    </li>
                )}
            </ul>
        </div>
    </div>
</nav>)
}
export default Navbar;