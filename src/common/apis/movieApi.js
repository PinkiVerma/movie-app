import axios from "axios";
//creates axios instance
export default axios.create({ 
    baseURL:"https://www.omdbapi.com/" 
})