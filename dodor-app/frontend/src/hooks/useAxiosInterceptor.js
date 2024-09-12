import { useLogout } from "./useLogout";
import { redirect } from "react-router-dom";
import { api } from "../api/axios";

export const useAxiosInterceptor = () => {
  const { logout } = useLogout();

  api.interceptors.response.use(
    (response) => response, // If the response is successful, just return it
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("ERROR FROM /api/axios.js");
        console.log(error);
        logout();
        redirect("/login"); // Redirect to the login page
      }
      return Promise.reject(error); // Return the error so it can be caught by other handlers
    }
  );
};
