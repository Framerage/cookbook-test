import axios from "axios";
import Cookies from "js-cookie";
const aCsTkn = Cookies.get("aCsTkn");
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: aCsTkn,
  },
});
export default instance;
