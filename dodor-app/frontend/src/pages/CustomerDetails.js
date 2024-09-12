import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { nl } from "date-fns/locale";
import { api } from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const CustomerDetails = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [customer, setCustomer] = useState(null);
  const [statuses, setStatuses] = useState("");

  useEffect(() => {
    api
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

    api
      .get(`/customer/statuses`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user, id]);

  const handleSave = (e) => {
    e.preventDefault();

    api
      .patch(`/customer/update/${id}`, customer, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setCustomer(res.data);
          setSucces("Klant bijgewerkt");
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  };

  const handleDelete = () => {
    if (!window.confirm("Ben je zeker dat je deze klant wilt verwijderen?"))
      return;

    api
      .delete(`/customer/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/customerOverview");
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
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
            <h1 className="text-3xl font-bold">{customer.name}</h1>
            <p className="italic">
              {formatDistanceToNow(customer.createdAt, { locale: nl })} geleden
              gecreërd
            </p>
            <p className="italic mb-5">
              {formatDistanceToNow(customer.updatedAt, { locale: nl })} geleden
              laatst bewerkt
            </p>
            <div className="flex mb-5">
              <div>
                <label htmlFor="name" className="mr-2">
                  Naam:
                </label>
                <input
                  required
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
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mr-2">
                Email:
              </label>
              <input
                required
                type="email"
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
                required
                type="tel"
                pattern="[0-9]{6,}"
                id="phoneNumber"
                name="phoneNumber"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Minimaal 6 cijfers")
                }
                value={customer.phoneNumber}
                onChange={(e) =>
                  setCustomer({ ...customer, phoneNumber: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="adress" className="mr-2">
                Adres:
              </label>
              <input
                required
                type="text"
                id="adress"
                name="adress"
                value={customer.adress}
                onChange={(e) =>
                  setCustomer({ ...customer, adress: e.target.value })
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
                value={customer.status}
                onChange={(e) =>
                  setCustomer({ ...customer, status: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                {statuses &&
                  statuses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-5">
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

          {succes && (
            <div className="bg-[#efffef] p-2 max-w-80 border-solid border-2 border-green-600 rounded-xl">
              {succes}
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
