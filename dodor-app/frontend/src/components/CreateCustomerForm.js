import { useState } from "react";
import { api } from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateCustomerForm = (props) => {
  const { user } = useAuthContext();

  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    api
      .post(
        "/customer/create",
        {
          name,
          email,
          phoneNumber,
          adress,
        },
        { headers: { Authorization: `Bearer ${user.acces_token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          setName("");
          setEmail("");
          setPhoneNumber("");
          setAdress("");
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  };

  return (
    <form
      className="bg-gray-100 min-w-[30%] p-5 mb-5 rounded shadow-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl mb-5">Nieuwe klant</h1>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Naam:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Telefoon:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          type="tel"
          pattern="[0-9]{6,}"
          onInvalid={(e) => e.target.setCustomValidity("Minimaal 6 cijfers")}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Adres:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="text-white mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Voeg toe
      </button>
      <br />
      {error && (
        <div className="bg-[#ffefef] p-2 max-w-80 border-solid border-2 border-red-600 rounded-xl">
          {error}
        </div>
      )}
    </form>
  );
};

export default CreateCustomerForm;
