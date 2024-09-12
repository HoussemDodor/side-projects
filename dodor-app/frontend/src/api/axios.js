import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const api = axios.create({
  baseURL: "http://localhost:3001",
});


export { api };