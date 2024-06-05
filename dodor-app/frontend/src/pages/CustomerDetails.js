import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { nl } from "date-fns/locale";
import axios from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const CustomerDetails = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios
      .get(`/customer/get/${id}`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user, id]);

  const handleSave = (e) => {
    e.preventDefault();
    console.log(customer);

    console.log("HandleSave method not yet implemented");
  };

  const handleDelete = () => {
    console.log("HandleDelete method not yet implemented");
  };

  return (
    <div className="bg-gray-200 min-h-[93vh] flex justify-center">
      {customer ? (
        <form
          onSubmit={handleSave}
          className="bg-gray-100 rounded shadow-lg max-h-[90vh] my-5 p-5 overflow-y-scroll"
        >
          <Link
            to="/customerOverview"
            className="text-white inline-flex mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
          >
            <ArrowLeftIcon className="size-5 mr-2 text-white" />
            <button>Terug</button>
          </Link>

          <div className="mb-5">
            <h1 className="text-3xl font-bold">
              {customer.name + " " + customer.surname}
            </h1>
            <p className="italic">
              {formatDistanceToNow(customer.createdAt, { locale: nl })} geleden
              gecreërd
            </p>
            <p className="italic mb-5">
              {formatDistanceToNow(customer.createdAt, { locale: nl })} geleden
              laatst bewerkt
            </p>
            <div className="flex mb-5">
              <div>
                <label htmlFor="name" className="mr-2">
                  Naam:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
              <div>
                <label htmlFor="surname" className="mr-2">
                  Achternaam:
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={customer.surname}
                  onChange={(e) =>
                    setCustomer({ ...customer, surname: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mr-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="phoneNumber" className="mr-2">
                Telefoon:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={customer.phoneNumber}
                onChange={(e) =>
                  setCustomer({ ...customer, phoneNumber: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div>
              <label htmlFor="status" className="mr-2">
                Status:
              </label>
              <select
                id="status"
                name="status"
                onChange={(e) =>
                  setCustomer({ ...customer, status: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option>In afwachting</option>
                <option>Geaccepteerd</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="text-white inline-flex mr-2 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
            >
              Opslaan
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-white inline-flex mr-2 bg-red-800 hover:bg-rose-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
            >
              Verwijderen
            </button>
          </div>

          {error && (
            <div className="bg-[#ffefef] p-2 max-w-80 border-solid border-2 border-red-600 rounded-xl">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div className="bg-gray-100 rounded shadow-lg max-h-[90vh] w-full m-5 p-5">
          <h1 className="text-4xl mb-5 font-bold">Klant niet gevonden</h1>
          <div className="bg-[#ffefef] p-2 mb-5 max-w-80 border-solid border-2 border-red-600 rounded-xl">
              {error}
            </div>
            <Link
          to="/customerOverview"
          className="text-white inline-flex mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
        >
          <ArrowLeftIcon className="size-5 mr-2 text-white" />
          <button>Terug</button>
        </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
