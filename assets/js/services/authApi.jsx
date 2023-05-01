import React from "react";
import axios from "axios";
import {func} from "prop-types";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

// import CustomersApi from "./customersApi";

function authenticate(credentials) {
    return axios
        .post(LOGIN_API,credentials)
        .then(response =>  response.data.token)
        .then(token =>{
            //Je stock le token dans le local storage
            window.localStorage.setItem("authToken", `${token}`);
            //je previen axios qu'on a maintenant un header par defau dans nos futur requete http
          setAxiosToken(token);
            // CustomersApi.findAll().then(console.log);

        })
}
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    // CustomersApi.findAll().then(console.log);
}
function setAxiosToken(token)
{
    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
}
function setUp(){
    const token = window.localStorage.getItem("authToken");
    //npm install jwt-decode
    if (token){
        const jwtData = jwtDecode(token);

        if (jwtData.exp > new Date().getTime()/1000)
        {
            setAxiosToken(token);
        }
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    //npm install jwt-decode
    if (token){
        const jwtData = jwtDecode(token);
        if (jwtData.exp > new Date().getTime()/1000)
        {
            return  true
        }
        return false
    }
    return false
}


export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
};