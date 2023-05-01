import React from "react";
import axios from "axios";

function register(user){
    return axios.post("/api/users",user);
}

export default {
    register,
}