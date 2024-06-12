import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { nl } from "date-fns/locale";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const TileDetails = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [tile, setTile] = useState(null);

  useEffect(() => {
    axios
      .get(`/tile/get/${id}`, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        console.log(res.data);
        setTile(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
        console.log(err);
      });
  }, [id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-200 min-h-[93vh] flex justify-center">
      {tile ? (
        <form
          type="submit"
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded shadow-lg max-h-[90vh] my-5 p-5 overflow-y-scroll"
        >
          {/* Back Button */}
          <Link
            to="/tileOverview"
            className="text-white inline-flex mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
          >
            <ArrowLeftIcon className="size-5 mr-2 text-white" />
            <button>Terug</button>
          </Link>

          {/* Content */}
          <div className="mb-5">
            <h1 className="text-3xl font-bold">{tile.title}</h1>
            <p className="italic">
              {formatDistanceToNow(tile.createdAt, { locale: nl })} geleden
              gecreërd
            </p>
            <p className="italic mb-5">
              {formatDistanceToNow(tile.updatedAt, { locale: nl })} geleden
              laatst bewerkt
            </p>

            {/* Title */}
            <div className="mb-5">
              <label htmlFor="title" className="mr-2">
                Titel:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={tile.title}
                onChange={(e) => setTile({ ...tile, title: e.target.value })}
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="showTitle" className="mr-2">
                Show Titel:
              </label>
              <input
                type="text"
                id="showTitle"
                name="showTitle"
                value={tile.showTitle}
                onChange={(e) =>
                  setTile({ ...tile, showTitle: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* size */}
            <div className="mb-5">
              <label htmlFor="size" className="mr-2">
                Maat:
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={tile.size}
                onChange={(e) => setTile({ ...tile, size: e.target.value })}
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* Outdoors Checkbox */}
            <div className="flex items-center mb-5 ps-4 border border-gray-300 rounded">
              <input
                type="checkbox"
                id="outdoors"
                name="outdoors"
                checked={tile.outdoors}
                onChange={(e) => setTile({ ...tile, outdoors: e.target.value })}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="outdoors"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Buiten tegel
              </label>
            </div>
            {/* articleNumber */}
            <div className="mb-5">
              <label htmlFor="articleNumber" className="mr-2">
                Artikel nummer:
              </label>
              <input
                type="text"
                id="articleNumber"
                name="articleNumber"
                value={tile.articleNumber}
                onChange={(e) =>
                  setTile({ ...tile, articleNumber: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* meterPerBox */}
            <div className="mb-5">
              <label htmlFor="meterPerBox" className="mr-2">
                M² per doos:
              </label>
              <input
                type="text"
                id="meterPerBox"
                name="meterPerBox"
                value={tile.meterPerBox}
                onChange={(e) =>
                  setTile({ ...tile, meterPerBox: e.target.value })
                }
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* Price & ImportPrice */}
            <div className="flex mb-5">
              <div>
                <label htmlFor="name" className="mr-2">
                  Verkoopprijs/{tile.unit}:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={tile.price}
                  onChange={(e) => setTile({ ...tile, price: e.target.value })}
                  className="mr-2 w-44 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
              <div >
                <label htmlFor="importPrice" className="mr-2">
                  Inkoopprijs/{tile.unit}:
                </label>
                <input
                  type="text"
                  id="importPrice"
                  name="importPrice"
                  value={tile.importPrice}
                  onChange={(e) =>
                    setTile({ ...tile, importPrice: e.target.value })
                  }
                  className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
            </div>
            {/* unit */}
            <div className="mb-5">
              <label htmlFor="unit" className="mr-2">
                Eenheid:
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={tile.unit}
                onChange={(e) => setTile({ ...tile, unit: e.target.value })}
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* Supplier selection box */}
            <div className="mb-5">
              <label htmlFor="supplier" className="mr-2">
                Leverancier:
              </label>
              <select
                id="supplier"
                name="supplier"
                value={tile.supplier}
                onChange={(e) => setTile({ ...tile, supplier: e.target.value })}
                className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                {tile.enumSupplier &&
                  tile.enumSupplier.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>
            </div>
            {/* inStore */}
            <div className="flex items-center mb-5 ps-4 border border-gray-300 rounded">
              <input
                type="checkbox"
                id="inStore"
                name="inStore"
                checked={tile.inStore}
                onChange={(e) => setTile({ ...tile, inStore: e.target.value })}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="inStore"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                In de winkel
              </label>
            </div>
          </div>
          {/* positionInStore */}
          <div className="mb-5">
            <label htmlFor="positionInStore" className="mr-2">
              Positie in winkel:
            </label>
            <select
              id="positionInStore"
              name="positionInStore"
              value={tile.positionInStore}
              onChange={(e) =>
                setTile({ ...tile, positionInStore: e.target.value })
              }
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              {tile.enumPositionInStore &&
                tile.enumPositionInStore.map((item) => (
                  <option key={item}>{item}</option>
                ))}
            </select>
          </div>
          {/* picture */}
          <div className="mb-5">
            <label htmlFor="picture" className="mr-2">
              Afbeelding link:
            </label>
            <input
              type="text"
              id="picture"
              name="picture"
              value={tile.picture}
              onChange={(e) => setTile({ ...tile, picture: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>

          {/* Actions Buttons */}
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
          <h1 className="text-4xl mb-5 font-bold">Tegel niet gevonden</h1>
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

export default TileDetails;
