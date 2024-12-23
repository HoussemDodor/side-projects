import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import CustomerCard from "../components/CustomerCard";
import CreateCustomerForm from "../components/CreateCustomerForm";

const CustomerOverview = () => {
  const [customers, setCustomers] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    api
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
  }, [user.acces_token]);

  return (
    <div className="bg-gray-200 min-h-[93vh] md:flex md:flex-row-reverse justify-center p-5">
      <CreateCustomerForm />
      <div className="bg-gray-100 rounded shadow-lg md:w-[900px] max-h-[90vh] p-5 md:mr-5 overflow-y-scroll">
        <h1 className="text-4xl">Klanten overzicht</h1>
        {customers &&
          customers.map((item) => (
            <CustomerCard key={item._id} customer={item} />
          ))}
      </div>
    </div>
  );
};

export default CustomerOverview;
