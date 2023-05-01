import React, {useState} from "react";
import Field from "../component/forms/Field";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UserApi from "../services/UserApi";

const RegisterPage = (props) => {
    const history = useNavigate();
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    })
    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    })
//Gestion des chargements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        //extrait name et value à partir de current Target
        const { name, value } = currentTarget;
            setUser({ ...user, [name]: value });
    };

    //Gestion de la soumission
    const handleSubmit = async event => {
        //todo revoir les erreur

        event.preventDefault();
        const apiErrors={...errors};
        if (user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm="Votre confirmation de mot de passe ne correspond pas au mot de passe original";
            setErrors(apiErrors);
            return;
        }
        try {
            await UserApi.register(user);
            setErrors({});
            history("/login")

        }catch(error){
            console.log(error.response)
            const {violations} = error.response.data;
            if (violations){

                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                // console.log(apiErrors);
                setErrors(apiErrors);
            }
        }
    }
    return(
        <>
            <div className="container">


            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    placeHolder="Votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field
                    name="lastName"
                    label="Nom"
                    placeHolder="Votre nom"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="email"
                    placeHolder="Votre email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    type="password"
                    label="Mot de passe"
                    placeHolder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    type="password"
                    label="Confirmez votre mot de passe"
                    placeHolder="Confirmez votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success" >Inscription</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>

            </div>
        </>
    )
}

export default RegisterPage;