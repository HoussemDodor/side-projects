import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const CustomerDetails = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const [customer, setCustomer] = useState("");

  useEffect(() => {
    axios
      .get(`/customer/get/${id}`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  return (
    <div className="bg-gray-200 min-h-[93vh] md:flex md:flex-row-reverse justify-center p-5">
      <div className="bg-gray-100 rounded shadow-lg md:w-[1300px] max-h-[90vh] mt-5 p-5 overflow-y-scroll">
        <Link
          to="/customerOverview"
          className="text-white mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
            <span>
          <ArrowLeftIcon className="size-8 text-white" />
          <button>Terug</button></span>
        </Link>
        <p>{customer.name}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
