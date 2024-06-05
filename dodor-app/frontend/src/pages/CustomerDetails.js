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
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    axios
      .get(`/customer/get/${id}`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setSurname(res.data.surname);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setCreatedAt(res.data.createdAt);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user, id]);

  const handleSave = (e) => {
    e.preventDefault();

    console.log("HandleSave method not yet implemented");
  };

  const handleDelete = () => {
    console.log("HandleDelete method not yet implemented");
  };

  return (
    <div className="bg-gray-200 min-h-[93vh] flex justify-center">
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
          <h1 className="text-3xl font-bold">{name + " " + surname}</h1>
          <p className="italic">{formatDistanceToNow(createdAt, {locale: nl})} geleden gecreërd</p>
          <p className="italic mb-5">{formatDistanceToNow(createdAt, {locale: nl})} geleden laatst bewerkt</p>
          <div className="flex mb-5">
            <div>
              <label htmlFor="name" className="mr-2">
                Naam:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phoneNumber" className="mr-2">
              Email:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
    </div>
  );
};

export default CustomerDetails;
