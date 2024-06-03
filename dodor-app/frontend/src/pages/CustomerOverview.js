import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import CustomerCard from "../components/CustomerCard";

const CustomerOverview = () => {
  const [customers, setCustomers] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get("/customer/all", {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setCustomers(res.data.customers);
        }
      })
      .catch((err) => {
        console.log(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user]);

  return (
    <div className="bg-gray-200 min-h-[90vh] flex justify-center p-5">
      <div className="bg-gray-100 rounded shadow-lg w-[1400px] py-5">
        <h1 className="text-4xl text-center">Klanten overzicht</h1>
        {customers &&
          customers.map((item) => <CustomerCard key={item._id} customer={item} />)}
      </div>
    </div>
  );
};

export default CustomerOverview;
