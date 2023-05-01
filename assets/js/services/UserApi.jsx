import React from "react";
import axios from "axios";
import {USERS_API} from "../config";
USERS_API
function register(user){
    return axios.post(USERS_API,user);
}

export default {
    register,
}