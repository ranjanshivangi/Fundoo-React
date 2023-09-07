import axios from "axios";

export const userSignup = async (obj) =>{
    console.log(obj);
    let responseOne = await axios.post("http://localhost:3000/api/v1/users", obj);
    return responseOne
}

export const userLogin = async (obj) => {
    let responseTwo = await axios.post("http://localhost:3000/api/v1/users/login", obj);
    return responseTwo;
}