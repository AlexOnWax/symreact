import React from "react";
import {Link} from "react-router-dom"

const Navbar = props => {

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>Alexandre API</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={`/customers`}>Clients</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/invoices`}>Factures</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="btn btn-success" to={""}>Connexion</Link>
                </li>
                <li className="nav-item">
                    <Link className="btn" to={""}>Inscription</Link>
                </li>
                <li className="nav-item">
                    <Link className="btn btn-danger" to={""}>Déconnexion</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>)
}
export default Navbar;