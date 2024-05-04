import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../api/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    await axios.post("/api/user/login", {email, password}).then((res) => {
      if (res.status === 200) {      
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });  
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false);
      setError(err.response.data.error);
    })
  };
  return { login, isLoading, error };
};
