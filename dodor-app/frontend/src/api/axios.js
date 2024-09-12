import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const useAxiosInterceptor = () => {
  const navigate = useNavigate(); // React Router's navigation function
  const { logout } = useLogout();

  // Add a response interceptor
  api.interceptors.response.use(
    (response) => response, // If the response is successful, just return it
    (error) => {
      if (error.response && error.response.status === 401) {
        // If the response status is 401, log out the user
        logout();
        navigate("/login"); // Redirect to the login page
      }
      return Promise.reject(error); // Return the error so it can be caught by other handlers
    }
  );
};

export { api, useAxiosInterceptor };