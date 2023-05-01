import React, {useState} from "react";
import Navbar from "../component/Navbar";

const HomePage = props => {
    return(
        <>
        <div className="container">
            <div className="card border-primary mb-3">
                <div className="card-header">Alexandre API</div>
                <div className="card-body">
                    <h4 className="card-title">Gestion des factures</h4>
                    <p className="card-text">Test des fonctionnalités offerte par mon API REST</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;